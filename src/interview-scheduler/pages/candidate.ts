import { bookCandidateSlot, getCandidateMeetingLink, getSchedule, verifyCandidate } from "../services";
import { formatDateOnly, formatSlotRange, isValidEmail, isValidIndianMobile, isValidUrl } from "../utils";
import type { InterviewSchedule, InterviewSlot } from "../types";

function onReady(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

onReady(() => {
const scheduleId = new URLSearchParams(window.location.search).get("scheduleId") || window.location.pathname.split("/").filter(Boolean)[1] || "";
const emailFromLink = new URLSearchParams(window.location.search).get("email") || "";
const root = document.querySelector<HTMLElement>("[data-candidate-root]");
const statusBox = document.querySelector<HTMLElement>("[data-candidate-status]");
let schedule: InterviewSchedule | null = null;
let verifiedEmail = "";
let verifiedRole = "";
let availableSlots: InterviewSlot[] = [];
let allSlots: InterviewSlot[] = [];

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);
}

function setStatus(message: string, state = "") {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = `scheduler-alert ${state}`.trim();
}

function showPopup(title: string, message: string, state = "error") {
  document.querySelector("[data-scheduler-modal]")?.remove();
  const modal = document.createElement("div");
  modal.className = "scheduler-modal-backdrop";
  modal.dataset.schedulerModal = "true";
  modal.innerHTML = `<div class="scheduler-modal" role="dialog" aria-modal="true" aria-labelledby="scheduler-modal-title">
    <div class="scheduler-modal-head scheduler-modal-head-center">
      <h2 id="scheduler-modal-title" class="anthra-section-title text-2xl">${escapeHtml(title)}</h2>
    </div>
    <div class="scheduler-alert ${state} mt-4">${escapeHtml(message)}</div>
    <div class="scheduler-actions scheduler-modal-actions mt-5"><button class="scheduler-button primary" data-modal-close type="button">Okay</button></div>
  </div>`;
  document.body.append(modal);
  modal.querySelector<HTMLButtonElement>("[data-modal-close]")?.focus();
}

function updateAvailableCount(count: number) {
  const countNode = document.querySelector<HTMLElement>("[data-available-count]");
  if (countNode) countNode.textContent = String(count);
}

function meetingLinkHtml(link: string) {
  if (!link) return "";
  return `<br><strong>Meeting link:</strong> <a class="text-orange-300" href="${escapeHtml(link)}" target="_blank" rel="noopener">Open meeting</a> <button class="scheduler-inline-button" data-copy-meeting="${escapeHtml(link)}" type="button">Copy</button>`;
}

async function init() {
  if (!root) return;
  if (!scheduleId) {
    root.innerHTML = `<div class="scheduler-alert error">Schedule link is missing.</div>`;
    return;
  }
  setStatus("Loading schedule...");
  schedule = await getSchedule(scheduleId);
  if (!schedule || schedule.status === "deleted") {
    root.innerHTML = `<div class="scheduler-alert error">Schedule not found.</div>`;
    return;
  }
  root.innerHTML = `<section class="scheduler-panel"><p class="anthra-kicker">Interview Booking</p><h1 class="anthra-page-title mt-3 text-3xl sm:text-5xl">${escapeHtml(schedule.title)}</h1><p class="anthra-muted mt-3 max-w-2xl">${escapeHtml(schedule.roleName)}. Enter the same email address where you received the interview invitation.</p><div class="scheduler-grid two mt-5"><div>Interview date<br><strong>${formatDateOnly(schedule.interviewDate)}</strong></div><div>Available slots<br><strong data-available-count>-</strong></div></div><div data-email-step><form data-email-form class="scheduler-grid two mt-6"><label class="scheduler-field">Email address<input class="scheduler-input" type="email" name="email" value="${escapeHtml(emailFromLink)}" required></label><div class="scheduler-field"><span>&nbsp;</span><button class="scheduler-button primary" type="submit">Continue</button></div></form></div><div data-booking-stage class="mt-6"></div></section>`;
  setStatus("Ready.");
}

root?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  try {
    if (form.matches("[data-email-form]")) await verifyEmail(form);
    if (form.matches("[data-booking-form]")) await submitBooking(form);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed.";
    setStatus(message, "error");
    showPopup("Booking issue", message);
  }
});

root?.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  if (input.name !== "phone") return;
  input.value = input.value.replace(/\D/g, "").slice(0, 10);
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.matches("[data-modal-close]") || target.matches("[data-scheduler-modal]")) {
    document.querySelector("[data-scheduler-modal]")?.remove();
  }
  const copyMeeting = target.closest<HTMLElement>("[data-copy-meeting]");
  if (copyMeeting?.dataset.copyMeeting) {
    navigator.clipboard.writeText(copyMeeting.dataset.copyMeeting);
    setStatus("Meeting link copied.", "success");
  }
});

async function verifyEmail(form: HTMLFormElement) {
  const email = String(new FormData(form).get("email") ?? "").trim();
  if (!isValidEmail(email)) throw new Error("Please enter a valid email address.");
  setStatus("Checking your invitation...");
  const result = await verifyCandidate(scheduleId, email);
  schedule = result.schedule;
  verifiedEmail = email.trim().toLowerCase();
  verifiedRole = result.candidate.roleAppliedFor || schedule.roleName;
  availableSlots = result.availableSlots;
  allSlots = result.slots;
  const stage = document.querySelector<HTMLElement>("[data-booking-stage]")!;
  updateAvailableCount(availableSlots.length);
  const emailStep = document.querySelector<HTMLElement>("[data-email-step]");
  if (emailStep) {
    emailStep.innerHTML = `<div class="scheduler-alert success mt-6"><strong>Verified email:</strong> ${escapeHtml(verifiedEmail)}<br><strong>Position:</strong> ${escapeHtml(verifiedRole)}</div>`;
  }
  if (result.existingBooking) {
    const link = await getCandidateMeetingLink(scheduleId, verifiedEmail);
    const bookedSlot = allSlots.find((slot) => slot.id === result.existingBooking?.slotId);
    const startAt = bookedSlot?.startAt || result.existingBooking.slotStartAt;
    const endAt = bookedSlot?.endAt || result.existingBooking.slotEndAt;
    stage.innerHTML = `<div class="scheduler-alert success"><strong>You have already booked your interview slot.</strong><br>Slot: ${formatSlotRange(startAt, endAt)}<br>Position: ${escapeHtml(result.existingBooking.roleAppliedFor || verifiedRole)}${meetingLinkHtml(link || result.existingBooking.meetingLink || "")}<br><br>If you need to change your slot, please contact Anthra Systems.</div>`;
    setStatus("Existing booking found.", "success");
    showPopup("Already booked", "You have already booked your interview slot. The confirmed details are shown on this page.", "success");
    return;
  }
  if (!availableSlots.length) {
    stage.innerHTML = `<div class="scheduler-alert error">No slots are available right now.</div>`;
    setStatus("No slots available.", "error");
    showPopup("No slots available", "No interview slots are available right now. Please contact Anthra Systems.");
    return;
  }
  stage.innerHTML = bookingForm();
  setStatus("Invitation verified. Choose a slot and complete your details.", "success");
}

function bookingForm() {
  return `<form data-booking-form class="scheduler-grid two"><label class="scheduler-field">Full name<input class="scheduler-input" name="candidateName" required></label><label class="scheduler-field">Mobile number<input class="scheduler-input" name="phone" inputmode="numeric" pattern="\\d{10}" maxlength="10" required placeholder="10 digit mobile number"></label><label class="scheduler-field">Resume link<input class="scheduler-input" type="url" name="resumeLink" placeholder="https://..."></label><label class="scheduler-field">LinkedIn / GitHub / portfolio<input class="scheduler-input" type="url" name="profileLink" placeholder="https://..."></label><label class="scheduler-field" style="grid-column:1/-1">Optional note<textarea class="scheduler-textarea" name="candidateNote"></textarea></label><div class="scheduler-panel" style="grid-column:1/-1"><h2 class="anthra-section-title text-2xl">Available Slots</h2><div class="scheduler-grid two mt-4">${availableSlots.map((slot) => `<label class="scheduler-slot"><input type="radio" name="slotId" value="${slot.id}" required><strong>${formatSlotRange(slot.startAt, slot.endAt)}</strong></label>`).join("")}</div></div><div><button class="scheduler-button primary" type="submit">Book Interview Slot</button></div></form>`;
}

async function submitBooking(form: HTMLFormElement) {
  const data = new FormData(form);
  const resumeLink = String(data.get("resumeLink") ?? "").trim();
  const profileLink = String(data.get("profileLink") ?? "").trim();
  if (!String(data.get("candidateName") ?? "").trim()) throw new Error("Full name is required.");
  if (!isValidIndianMobile(String(data.get("phone") ?? ""))) throw new Error("Please enter a valid 10 digit mobile number.");
  if (!String(data.get("slotId") ?? "")) throw new Error("Please choose an available slot.");
  if (!isValidUrl(resumeLink) || !isValidUrl(profileLink)) throw new Error("Please enter valid http/https links.");
  setStatus("Booking your slot...");
  const booking = await bookCandidateSlot({
    scheduleId,
    slotId: String(data.get("slotId")),
    roleAppliedFor: verifiedRole,
    candidateName: String(data.get("candidateName")),
    email: verifiedEmail,
    phone: String(data.get("phone")).trim(),
    resumeLink,
    profileLink,
    candidateNote: String(data.get("candidateNote") ?? ""),
  });
  const bookedSlot = availableSlots.find((slot) => slot.id === booking.slotId);
  let link = "";
  try {
    link = await getCandidateMeetingLink(scheduleId, verifiedEmail);
  } catch {
    link = "";
  }
  availableSlots = availableSlots.filter((slot) => slot.id !== booking.slotId);
  updateAvailableCount(availableSlots.length);
  document.querySelector<HTMLElement>("[data-booking-stage]")!.innerHTML = `<div class="scheduler-alert success"><strong>Your interview slot has been booked successfully.</strong><br>Slot: ${formatSlotRange(bookedSlot?.startAt, bookedSlot?.endAt)}<br>Position: ${escapeHtml(booking.roleAppliedFor || verifiedRole)}${meetingLinkHtml(link || booking.meetingLink || "")}</div>`;
  setStatus("Booking confirmed.", "success");
  showPopup("Booking confirmed", "Your interview slot has been booked successfully.", "success");
}

init().catch((error) => {
  const message = error instanceof Error ? error.message : "Schedule failed to load.";
  setStatus(message, "error");
  showPopup("Schedule issue", message);
});
});
