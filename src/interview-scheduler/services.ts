import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  writeBatch,
  where,
} from "firebase/firestore";
import { getFirebaseClient } from "./firebase";
import type {
  AllowedCandidate,
  CandidateBookingInput,
  CandidateStatus,
  InterviewBooking,
  InviteMessageSettings,
  InterviewSchedule,
  InterviewSlot,
  ScheduleCounts,
  ScheduleStatus,
  SlotStatus,
} from "./types";
import { effectiveScheduleStatus, emailDocId, normalizeEmail, nowIso } from "./utils";

const schedulesCol = () => collection(getFirebaseClient().db, "schedules");
const scheduleDoc = (scheduleId: string) => doc(getFirebaseClient().db, "schedules", scheduleId);
const inviteSettingsDoc = () => doc(getFirebaseClient().db, "schedulerSettings", "inviteMessage");
const schedulePrivateDoc = (scheduleId: string) => doc(getFirebaseClient().db, "schedules", scheduleId, "private", "config");
const allowedDoc = (scheduleId: string, email: string) =>
  doc(getFirebaseClient().db, "schedules", scheduleId, "allowedCandidates", emailDocId(email));
const candidateMeetingLinkDoc = (scheduleId: string, email: string) =>
  doc(getFirebaseClient().db, "schedules", scheduleId, "candidateMeetingLinks", emailDocId(email));
const slotsCol = (scheduleId: string) => collection(getFirebaseClient().db, "schedules", scheduleId, "slots");
const slotPrivateDoc = (scheduleId: string, slotId: string) => doc(getFirebaseClient().db, "schedules", scheduleId, "privateSlotLinks", slotId);
const bookingsCol = (scheduleId: string) => collection(getFirebaseClient().db, "schedules", scheduleId, "bookings");
const bookingPrivateDoc = (scheduleId: string, bookingId: string) => doc(getFirebaseClient().db, "schedules", scheduleId, "bookings", bookingId, "private", "review");

function withId<T>(snap: { id: string; data: () => Record<string, unknown> }) {
  return { id: snap.id, ...snap.data() } as T;
}

export async function listSchedules(includeArchived = false) {
  const snap = await getDocs(query(schedulesCol(), orderBy("createdAt", "desc")));
  const schedules = snap.docs.map((item) => withId<InterviewSchedule>(item));
  const visible = schedules.filter((schedule) => schedule.status !== "deleted");
  return includeArchived ? visible : visible.filter((schedule) => schedule.status !== "archived");
}

export async function getSchedule(scheduleId: string) {
  const snap = await getDoc(scheduleDoc(scheduleId));
  if (!snap.exists()) return null;
  const schedule = withId<InterviewSchedule>(snap);
  if (!getFirebaseClient().auth.currentUser) return schedule;
  try {
    const privateSnap = await getDoc(schedulePrivateDoc(scheduleId));
    return privateSnap.exists() ? { ...schedule, ...(privateSnap.data() as Partial<InterviewSchedule>) } : schedule;
  } catch {
    return schedule;
  }
}

export async function createSchedule(input: Omit<InterviewSchedule, "id" | "createdAt" | "updatedAt">) {
  const { auth } = getFirebaseClient();
  const stamp = nowIso();
  const { commonMeetingLink, ...publicInput } = input;
  const created = await addDoc(schedulesCol(), {
    ...publicInput,
    expiryAtMs: new Date(input.expiryAt).getTime(),
    createdAt: stamp,
    updatedAt: stamp,
    createdBy: auth.currentUser?.email ?? "admin",
  });
  if (commonMeetingLink) await setDoc(schedulePrivateDoc(created.id), { commonMeetingLink, updatedAt: stamp }, { merge: true });
  return created.id;
}

export async function updateSchedule(scheduleId: string, input: Partial<InterviewSchedule>) {
  const stamp = nowIso();
  const { commonMeetingLink, ...publicInput } = input;
  if (commonMeetingLink !== undefined) {
    await setDoc(schedulePrivateDoc(scheduleId), { commonMeetingLink, updatedAt: stamp }, { merge: true });
    await updateDoc(scheduleDoc(scheduleId), { ...publicInput, ...(input.expiryAt ? { expiryAtMs: new Date(input.expiryAt).getTime() } : {}), commonMeetingLink: deleteField(), updatedAt: stamp });
    const candidates = await getDocs(collection(getFirebaseClient().db, "schedules", scheduleId, "allowedCandidates"));
    const batch = writeBatch(getFirebaseClient().db);
    candidates.docs.forEach((item) => {
      const candidate = item.data() as AllowedCandidate;
      if (candidate.normalizedEmail) batch.set(candidateMeetingLinkDoc(scheduleId, candidate.normalizedEmail), { meetingLink: commonMeetingLink, updatedAt: stamp }, { merge: true });
    });
    await batch.commit();
    return;
  }
  await updateDoc(scheduleDoc(scheduleId), { ...publicInput, ...(input.expiryAt ? { expiryAtMs: new Date(input.expiryAt).getTime() } : {}), updatedAt: stamp });
}

export async function setScheduleStatus(scheduleId: string, status: ScheduleStatus) {
  await updateSchedule(scheduleId, { status });
}

export const defaultInviteMessage: InviteMessageSettings = {
  subject: "Anthra Systems interview slot booking",
  template:
    "Hi,\n\nCongratulations! 🎉\n\nYou have been shortlisted for the **{{position}}** opening at Anthra Systems.\n\nPlease book your interview slot using this link:\n{{scheduleLink}}\n\nUse this email address while booking: {{email}}\n\nRegards,\nAnthra Systems",
};

export async function getInviteMessageSettings(): Promise<InviteMessageSettings> {
  const snap = await getDoc(inviteSettingsDoc());
  return snap.exists() ? { ...defaultInviteMessage, ...(snap.data() as Partial<InviteMessageSettings>) } : defaultInviteMessage;
}

export async function updateInviteMessageSettings(input: InviteMessageSettings) {
  await setDoc(inviteSettingsDoc(), { ...input, updatedAt: nowIso() }, { merge: true });
}

export async function deleteSchedule(scheduleId: string) {
  const { db } = getFirebaseClient();
  const batch = writeBatch(db);
  const [candidates, slots, bookings, privateDocs, privateSlotLinks, candidateMeetingLinks] = await Promise.all([
    getDocs(collection(db, "schedules", scheduleId, "allowedCandidates")),
    getDocs(collection(db, "schedules", scheduleId, "slots")),
    getDocs(collection(db, "schedules", scheduleId, "bookings")),
    getDocs(collection(db, "schedules", scheduleId, "private")),
    getDocs(collection(db, "schedules", scheduleId, "privateSlotLinks")),
    getDocs(collection(db, "schedules", scheduleId, "candidateMeetingLinks")),
  ]);
  const bookingPrivateDocs = await Promise.all(bookings.docs.map((item) => getDocs(collection(item.ref, "private"))));
  candidates.docs.forEach((item) => batch.delete(item.ref));
  slots.docs.forEach((item) => batch.delete(item.ref));
  bookingPrivateDocs.forEach((snap) => snap.docs.forEach((item) => batch.delete(item.ref)));
  bookings.docs.forEach((item) => batch.delete(item.ref));
  privateDocs.docs.forEach((item) => batch.delete(item.ref));
  privateSlotLinks.docs.forEach((item) => batch.delete(item.ref));
  candidateMeetingLinks.docs.forEach((item) => batch.delete(item.ref));
  batch.delete(scheduleDoc(scheduleId));
  await batch.commit();
}

export async function listAllowedCandidates(scheduleId: string) {
  const snap = await getDocs(query(collection(getFirebaseClient().db, "schedules", scheduleId, "allowedCandidates")));
  return snap.docs.map((item) => withId<AllowedCandidate>(item)).filter((candidate) => candidate.status !== "removed");
}

export async function addAllowedCandidates(scheduleId: string, rawList: string) {
  const stamp = nowIso();
  const entries = rawList
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .flatMap((line) => {
      if (line.includes("|")) return [line];
      return line.split(",").map((item) => item.trim()).filter(Boolean);
    })
    .map((line) => {
      const [emailPart, rolePart = ""] = line.split("|").map((item) => item.trim());
      return { email: normalizeEmail(emailPart), roleAppliedFor: rolePart };
    })
    .filter((entry) => entry.email);
  const unique = [...new Map(entries.map((entry) => [entry.email, entry])).values()];
  const privateSchedule = await getDoc(schedulePrivateDoc(scheduleId));
  const commonMeetingLink = privateSchedule.exists() ? String(privateSchedule.data().commonMeetingLink ?? "") : "";
  await Promise.all(
    unique.flatMap(({ email, roleAppliedFor }) => [
      setDoc(allowedDoc(scheduleId, email), { email, normalizedEmail: email, roleAppliedFor, status: "allowed", hasBooked: false, createdAt: stamp, updatedAt: stamp }, { merge: true }),
      setDoc(candidateMeetingLinkDoc(scheduleId, email), { meetingLink: commonMeetingLink, updatedAt: stamp }, { merge: true }),
    ]),
  );
  return unique.length;
}

export async function removeAllowedCandidate(scheduleId: string, email: string) {
  const candidateSnap = await getDoc(allowedDoc(scheduleId, email));
  const candidate = candidateSnap.exists() ? (candidateSnap.data() as AllowedCandidate) : null;
  if (candidate?.hasBooked) throw new Error("Booked candidates cannot be removed. Cancel the booking first.");
  await Promise.all([deleteDoc(allowedDoc(scheduleId, email)), deleteDoc(candidateMeetingLinkDoc(scheduleId, email))]);
}

export async function listSlots(scheduleId: string) {
  const isAdmin = Boolean(getFirebaseClient().auth.currentUser);
  const snap = await getDocs(
    isAdmin
      ? query(slotsCol(scheduleId), orderBy("startAt", "asc"))
      : query(slotsCol(scheduleId), where("status", "==", "available"), where("startAtMs", ">", Date.now()), orderBy("startAtMs", "asc")),
  );
  const slots = snap.docs.map((item) => withId<InterviewSlot>(item));
  if (!isAdmin) return slots;
  return Promise.all(
    slots.map(async (slot) => {
      try {
        const privateSnap = await getDoc(slotPrivateDoc(scheduleId, slot.id));
        return privateSnap.exists() ? { ...slot, ...(privateSnap.data() as Partial<InterviewSlot>) } : slot;
      } catch {
        return slot;
      }
    }),
  );
}

export async function addSlot(scheduleId: string, input: Omit<InterviewSlot, "id" | "createdAt" | "updatedAt">) {
  if (new Date(input.startAt).getTime() >= new Date(input.endAt).getTime()) throw new Error("Slot start time must be before end time.");
  if (new Date(input.startAt).getTime() <= Date.now() || new Date(input.endAt).getTime() <= Date.now()) {
    throw new Error("Slots cannot be created for a date or time that has already passed.");
  }
  const stamp = nowIso();
  const { meetingLink, internalNote, ...publicInput } = input;
  const slotRef = await addDoc(slotsCol(scheduleId), {
    ...publicInput,
    startAtMs: new Date(input.startAt).getTime(),
    endAtMs: new Date(input.endAt).getTime(),
    createdAt: stamp,
    updatedAt: stamp,
  });
  if (meetingLink || internalNote) await setDoc(slotPrivateDoc(scheduleId, slotRef.id), { meetingLink, internalNote, updatedAt: stamp }, { merge: true });
}

export async function updateSlotStatus(scheduleId: string, slotId: string, status: SlotStatus) {
  const { db } = getFirebaseClient();
  await runTransaction(db, async (transaction) => {
    const slotRef = doc(db, "schedules", scheduleId, "slots", slotId);
    const slotSnap = await transaction.get(slotRef);
    if (!slotSnap.exists()) throw new Error("Slot not found.");
    const slot = slotSnap.data() as InterviewSlot;
    const stamp = nowIso();

    if (slot.status === "booked" && slot.bookingId && status !== "booked") {
      const bookingRef = doc(db, "schedules", scheduleId, "bookings", slot.bookingId);
      const bookingSnap = await transaction.get(bookingRef);
      if (bookingSnap.exists()) {
        const booking = bookingSnap.data() as InterviewBooking;
        const candidateRef = allowedDoc(scheduleId, booking.normalizedEmail || slot.bookedByEmail || "");
        transaction.update(bookingRef, { bookingStatus: "cancelled", updatedAt: stamp });
        transaction.set(candidateRef, { hasBooked: false, bookingId: "", updatedAt: stamp }, { merge: true });
        transaction.set(bookingPrivateDoc(scheduleId, slot.bookingId), { candidateStatus: "on_hold", isSelected: false, updatedAt: stamp }, { merge: true });
      }
      transaction.update(slotRef, { status, bookedByEmail: "", bookingId: "", updatedAt: stamp });
      return;
    }

    transaction.update(slotRef, { status, updatedAt: stamp });
  });
}

export async function listBookings(scheduleId: string) {
  const snap = await getDocs(query(bookingsCol(scheduleId), orderBy("bookedAt", "desc")));
  const bookings = snap.docs.map((item) => withId<InterviewBooking>(item));
  if (!getFirebaseClient().auth.currentUser) return bookings;
  return Promise.all(
    bookings.map(async (booking) => {
      try {
        const privateSnap = await getDoc(bookingPrivateDoc(scheduleId, booking.id));
        return privateSnap.exists() ? { ...booking, ...(privateSnap.data() as Partial<InterviewBooking>) } : booking;
      } catch {
        return booking;
      }
    }),
  );
}

export async function getExistingBooking(scheduleId: string, email: string) {
  const normalizedEmail = normalizeEmail(email);
  const snap = await getDoc(doc(getFirebaseClient().db, "schedules", scheduleId, "bookings", emailDocId(normalizedEmail)));
  if (!snap.exists()) return null;
  const booking = withId<InterviewBooking>(snap);
  return booking.normalizedEmail === normalizedEmail && booking.bookingStatus === "booked" ? booking : null;
}

export async function getCandidateMeetingLink(scheduleId: string, email: string) {
  const snap = await getDoc(candidateMeetingLinkDoc(scheduleId, email));
  return snap.exists() ? String(snap.data().meetingLink ?? "") : "";
}

export async function verifyCandidate(scheduleId: string, email: string) {
  const normalizedEmail = normalizeEmail(email);
  let schedule: InterviewSchedule | null = null;
  try {
    schedule = await getSchedule(scheduleId);
  } catch (error) {
    throw new Error(`Schedule read failed: ${error instanceof Error ? error.message : "Request failed."}`);
  }

  if (!schedule || schedule.status === "deleted") throw new Error("Schedule not found.");
  if (effectiveScheduleStatus(schedule.status, schedule.expiryAt) !== "active") throw new Error("This interview schedule is no longer accepting bookings.");

  let candidateSnap;
  try {
    candidateSnap = await getDoc(allowedDoc(scheduleId, normalizedEmail));
  } catch (error) {
    throw new Error(`Candidate allowlist read failed: ${error instanceof Error ? error.message : "Request failed."}`);
  }

  if (!candidateSnap.exists() || (candidateSnap.data() as AllowedCandidate).status === "removed") {
    throw new Error("This email is not authorized for this interview schedule. Please use the same email address where you received the interview invitation.");
  }

  const candidate = candidateSnap.data() as AllowedCandidate;
  let existingBooking: InterviewBooking | null = null;
  if (candidate.hasBooked || candidate.bookingId) {
    try {
      existingBooking = await getExistingBooking(scheduleId, normalizedEmail);
    } catch (error) {
      throw new Error(`Existing booking check failed: ${error instanceof Error ? error.message : "Request failed."}`);
    }
  }

  let slots: InterviewSlot[] = [];
  try {
    slots = await listSlots(scheduleId);
  } catch (error) {
    throw new Error(`Available slots read failed: ${error instanceof Error ? error.message : "Request failed."}`);
  }

  const activeExistingBooking = candidate.hasBooked && existingBooking?.bookingStatus === "booked" ? existingBooking : null;
  return { schedule, candidate, existingBooking: activeExistingBooking, slots, availableSlots: slots.filter((slot) => slot.status === "available" && new Date(slot.startAt).getTime() > Date.now()) };
}

export async function bookCandidateSlot(input: CandidateBookingInput) {
  const { db } = getFirebaseClient();
  const normalizedEmail = normalizeEmail(input.email);
  const emailKey = emailDocId(normalizedEmail);
  const bookingRef = doc(bookingsCol(input.scheduleId), emailKey);
  const stamp = nowIso();

  return runTransaction(db, async (transaction) => {
    const scheduleRef = scheduleDoc(input.scheduleId);
    const slotRef = doc(db, "schedules", input.scheduleId, "slots", input.slotId);
    const candidateRef = allowedDoc(input.scheduleId, normalizedEmail);
    const scheduleSnap = await transaction.get(scheduleRef);
    const slotSnap = await transaction.get(slotRef);
    const candidateSnap = await transaction.get(candidateRef);

    if (!scheduleSnap.exists()) throw new Error("Schedule not found.");
    const schedule = withId<InterviewSchedule>(scheduleSnap);
    if (effectiveScheduleStatus(schedule.status, schedule.expiryAt) !== "active") throw new Error("This interview schedule is no longer accepting bookings.");
    if (!candidateSnap.exists()) throw new Error("This email is not authorized for this interview schedule.");

    const candidate = candidateSnap.data() as AllowedCandidate;
    if (candidate.hasBooked || candidate.bookingId) {
      const existingBookingRef = candidate.bookingId ? doc(db, "schedules", input.scheduleId, "bookings", candidate.bookingId) : bookingRef;
      const existingBookingSnap = existingBookingRef ? await transaction.get(existingBookingRef) : null;
      const existingBooking = existingBookingSnap?.exists() ? (existingBookingSnap.data() as InterviewBooking) : null;
      if (existingBooking?.bookingStatus === "booked") {
        const existingSlotRef = doc(db, "schedules", input.scheduleId, "slots", existingBooking.slotId);
        const existingSlotSnap = await transaction.get(existingSlotRef);
        const existingSlot = existingSlotSnap.exists() ? (existingSlotSnap.data() as InterviewSlot) : null;
        if (existingSlot?.status === "booked" && existingSlot.bookingId === candidate.bookingId) {
          throw new Error("You have already booked your interview slot.");
        }
      }
    }

    if (!slotSnap.exists()) throw new Error("Selected slot was not found.");
    const slot = slotSnap.data() as InterviewSlot;
    if (slot.status !== "available") throw new Error("This slot was just booked. Please choose another slot.");
    if (new Date(slot.startAt).getTime() <= Date.now()) throw new Error("This interview slot has already passed. Please choose another slot.");

    const booking: Omit<InterviewBooking, "id"> = {
      ...input,
      slotStartAt: slot.startAt,
      slotEndAt: slot.endAt,
      emailKey,
      roleAppliedFor: candidate.roleAppliedFor || input.roleAppliedFor || schedule.roleName,
      email: normalizedEmail,
      normalizedEmail,
      bookedAt: stamp,
      bookingStatus: "booked",
      updatedAt: stamp,
    };

    transaction.set(bookingRef, booking);
    transaction.update(slotRef, { status: "booked", bookedByEmail: normalizedEmail, bookingId: bookingRef.id, updatedAt: stamp });
    transaction.update(candidateRef, { hasBooked: true, bookingId: bookingRef.id, updatedAt: stamp });

    return { id: bookingRef.id, ...booking };
  });
}

export async function updateBookingReview(scheduleId: string, bookingId: string, input: { overallRating?: number; candidateStatus: CandidateStatus; adminNotes?: string }) {
  await setDoc(bookingPrivateDoc(scheduleId, bookingId), {
    ...input,
    isSelected: input.candidateStatus === "selected",
    updatedAt: nowIso(),
  }, { merge: true });
}

export async function cancelBooking(scheduleId: string, booking: InterviewBooking) {
  const { db } = getFirebaseClient();
  await runTransaction(db, async (transaction) => {
    const bookingRef = doc(db, "schedules", scheduleId, "bookings", booking.id);
    const slotRef = doc(db, "schedules", scheduleId, "slots", booking.slotId);
    const candidateRef = allowedDoc(scheduleId, booking.normalizedEmail);
    transaction.update(bookingRef, { bookingStatus: "cancelled", updatedAt: nowIso() });
    transaction.update(slotRef, { status: "available", bookedByEmail: "", bookingId: "", updatedAt: nowIso() });
    transaction.set(candidateRef, { hasBooked: false, bookingId: "", updatedAt: nowIso() }, { merge: true });
    transaction.set(bookingPrivateDoc(scheduleId, booking.id), { candidateStatus: "on_hold", isSelected: false, updatedAt: nowIso() }, { merge: true });
  });
}

export async function getScheduleCounts(scheduleId: string): Promise<ScheduleCounts> {
  const [candidates, slots, bookings] = await Promise.all([listAllowedCandidates(scheduleId), listSlots(scheduleId), listBookings(scheduleId)]);
  return {
    allowedCandidates: candidates.length,
    bookedSlots: slots.filter((slot) => slot.status === "booked").length,
    availableSlots: slots.filter((slot) => slot.status === "available" && new Date(slot.startAt).getTime() > Date.now()).length,
    selected: bookings.filter((booking) => booking.candidateStatus === "selected").length,
    rejected: bookings.filter((booking) => booking.candidateStatus === "rejected").length,
    onHold: bookings.filter((booking) => booking.candidateStatus === "on_hold").length,
  };
}

