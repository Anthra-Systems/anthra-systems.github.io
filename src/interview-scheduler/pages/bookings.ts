import { logoutAdmin, requireAdmin } from "../auth";
import { cancelBooking, getSchedule, listBookings, listSlots, updateBookingReview } from "../services";
import { formatDateTime, formatSlotRange } from "../utils";
import type { CandidateStatus, InterviewBooking, InterviewSlot } from "../types";

function onReady(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

onReady(() => {
const scheduleId = new URLSearchParams(window.location.search).get("id");
const root = document.querySelector<HTMLElement>("[data-bookings-root]");
const statusBox = document.querySelector<HTMLElement>("[data-bookings-status]");
const title = document.querySelector<HTMLElement>("[data-bookings-title]");
const manageLink = document.querySelector<HTMLAnchorElement>("[data-manage-link]");
let bookings: InterviewBooking[] = [];
let slots: InterviewSlot[] = [];

function setStatus(message: string, state = "") {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = `scheduler-alert ${state}`.trim();
}

function slotLabel(slotId: string) {
  const slot = slots.find((item) => item.id === slotId);
  return slot ? formatSlotRange(slot.startAt, slot.endAt) : slotId;
}

async function render() {
  if (!scheduleId || !root) return;
  setStatus("Loading bookings...");
  const [schedule, bookingList, slotList] = await Promise.all([getSchedule(scheduleId), listBookings(scheduleId), listSlots(scheduleId)]);
  if (!schedule) {
    root.innerHTML = `<div class="scheduler-alert error">Schedule not found.</div>`;
    return;
  }
  bookings = bookingList;
  slots = slotList;
  if (title) title.textContent = `${schedule.title} Bookings`;
  if (manageLink) manageLink.href = `/admin/interviews/manage?id=${schedule.id}`;
  if (!bookings.length) {
    root.innerHTML = `<div class="scheduler-alert">No candidate bookings yet.</div>`;
    setStatus("Ready.");
    return;
  }
  root.innerHTML = `<div class="scheduler-table-wrap"><table class="scheduler-table"><thead><tr><th>Slot</th><th>Candidate</th><th>Position</th><th>Links</th><th>Status</th><th>Rating</th><th>Admin Notes</th><th>Actions</th></tr></thead><tbody>${bookings.map(row).join("")}</tbody></table></div>`;
  setStatus("Ready.");
}

function row(booking: InterviewBooking) {
  const candidateStatus = booking.candidateStatus || "booked";
  return `<tr data-booking-row="${booking.id}">
    <td>${slotLabel(booking.slotId)}<br><span class="anthra-muted">Booked: ${formatDateTime(booking.bookedAt)}</span></td>
    <td><strong>${booking.candidateName}</strong><br>${booking.email}<br>${booking.phone}</td>
    <td>${booking.roleAppliedFor || "-"}</td>
    <td>${booking.resumeLink ? `<a class="text-orange-300" href="${booking.resumeLink}" target="_blank">Resume</a>` : "-"}<br>${booking.profileLink ? `<a class="text-orange-300" href="${booking.profileLink}" target="_blank">Profile</a>` : "-"}</td>
    <td><select class="scheduler-select" data-review-field="candidateStatus"><option value="booked">Booked</option><option value="interview_done">Interview done</option><option value="selected">Selected</option><option value="rejected">Rejected</option><option value="on_hold">On hold</option><option value="no_show">No show</option></select><script type="application/json" data-status-value>${candidateStatus}</script><br><span class="scheduler-status ${booking.bookingStatus}">${booking.bookingStatus}</span></td>
    <td><select class="scheduler-select" data-review-field="overallRating"><option value="">-</option>${[1,2,3,4,5].map((rating) => `<option value="${rating}">${rating}</option>`).join("")}</select><script type="application/json" data-rating-value>${booking.overallRating ?? ""}</script></td>
    <td><textarea class="scheduler-textarea" data-review-field="adminNotes">${booking.adminNotes ?? ""}</textarea></td>
    <td><div class="scheduler-actions"><button class="scheduler-button primary" data-save-review="${booking.id}" type="button">Save</button>${booking.bookingStatus === "booked" ? `<button class="scheduler-button danger" data-cancel-booking="${booking.id}" type="button">Cancel booking</button>` : ""}</div></td>
  </tr>`;
}

function hydrateSelectValues() {
  document.querySelectorAll<HTMLTableRowElement>("[data-booking-row]").forEach((row) => {
    const status = row.querySelector<HTMLScriptElement>("[data-status-value]")?.textContent ?? "booked";
    const rating = row.querySelector<HTMLScriptElement>("[data-rating-value]")?.textContent ?? "";
    const statusSelect = row.querySelector<HTMLSelectElement>("[data-review-field='candidateStatus']");
    const ratingSelect = row.querySelector<HTMLSelectElement>("[data-review-field='overallRating']");
    if (statusSelect) statusSelect.value = status;
    if (ratingSelect) ratingSelect.value = rating;
  });
}

root?.addEventListener("click", async (event) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-save-review], [data-cancel-booking]");
  if (!target) return;
  if (!scheduleId) return;
  const saveId = target.dataset.saveReview;
  const cancelId = target.dataset.cancelBooking;
  try {
    if (saveId) {
      const row = document.querySelector<HTMLElement>(`[data-booking-row='${saveId}']`)!;
      const ratingValue = row.querySelector<HTMLSelectElement>("[data-review-field='overallRating']")?.value;
      const candidateStatus = row.querySelector<HTMLSelectElement>("[data-review-field='candidateStatus']")?.value as CandidateStatus;
      const adminNotes = row.querySelector<HTMLTextAreaElement>("[data-review-field='adminNotes']")?.value;
      await updateBookingReview(scheduleId, saveId, { overallRating: ratingValue ? Number(ratingValue) : undefined, candidateStatus, adminNotes });
      setStatus("Candidate review saved.", "success");
    }
    if (cancelId) {
      const booking = bookings.find((item) => item.id === cancelId);
      if (!booking || !confirm("Cancel this booking and release the slot?")) return;
      await cancelBooking(scheduleId, booking);
      setStatus("Booking cancelled and slot released.", "success");
    }
    await render();
    hydrateSelectValues();
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Booking update failed.", "error");
  }
});

document.querySelector<HTMLElement>("[data-admin-logout]")?.addEventListener("click", () => logoutAdmin());
requireAdmin(() => render().then(hydrateSelectValues).catch((error) => setStatus(error.message, "error")), (message) => setStatus(message, "error"));
});
