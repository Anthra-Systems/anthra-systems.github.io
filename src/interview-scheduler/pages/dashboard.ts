import { logoutAdmin, requireAdmin } from "../auth";
import { deleteSchedule, getInviteMessageSettings, getScheduleCounts, listSchedules, setScheduleStatus, updateInviteMessageSettings } from "../services";
import { candidateLink, effectiveScheduleStatus, formatDateOnly, formatDateTime } from "../utils";
import type { InterviewSchedule, ScheduleStatus } from "../types";

function onReady(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

onReady(() => {
const root = document.querySelector<HTMLElement>("[data-dashboard]");
const table = document.querySelector<HTMLElement>("[data-dashboard-table]");
const statusBox = document.querySelector<HTMLElement>("[data-dashboard-status]");
const includeArchived = document.querySelector<HTMLInputElement>("[data-include-archived]");
const inviteSettingsForm = document.querySelector<HTMLFormElement>("[data-invite-settings]");

function setStatus(message: string, state = "") {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = `scheduler-alert ${state}`.trim();
}

async function render() {
  if (!table) return;
  setStatus("Loading schedules...");
  const schedules = await listSchedules(Boolean(includeArchived?.checked));
  const enriched = await Promise.all(schedules.map(async (schedule) => ({ ...schedule, counts: await getScheduleCounts(schedule.id) })));
  if (!enriched.length) {
    table.innerHTML = `<div class="scheduler-alert">No schedules yet. Create the first interview schedule to begin.</div>`;
    setStatus("Ready.");
    return;
  }
  table.innerHTML = `<div class="scheduler-table-wrap"><table class="scheduler-table"><thead><tr><th>Schedule</th><th>Dates</th><th>Status</th><th>Candidates</th><th>Slots</th><th>Created</th><th>Actions</th></tr></thead><tbody>${enriched.map(row).join("")}</tbody></table></div>`;
  setStatus("Ready.");
}

async function hydrateInviteSettings() {
  if (!inviteSettingsForm) return;
  const settings = await getInviteMessageSettings();
  const subject = inviteSettingsForm.querySelector<HTMLInputElement>("[name='subject']");
  const template = inviteSettingsForm.querySelector<HTMLTextAreaElement>("[name='template']");
  if (subject) subject.value = settings.subject;
  if (template) template.value = settings.template;
}

function row(schedule: InterviewSchedule) {
  const status = effectiveScheduleStatus(schedule.status, schedule.expiryAt);
  const counts = schedule.counts!;
  return `<tr>
    <td><strong>${schedule.title}</strong><br><span class="anthra-muted">${schedule.roleName}</span></td>
    <td>Opening: ${formatDateOnly(schedule.jobOpeningDate)}<br>Interview: ${formatDateOnly(schedule.interviewDate)}<br>Expiry: ${formatDateTime(schedule.expiryAt)}</td>
    <td><span class="scheduler-status ${status}">${status}</span></td>
    <td>${counts.allowedCandidates} allowed<br>${counts.selected} selected / ${counts.rejected} rejected / ${counts.onHold} hold</td>
    <td>${counts.bookedSlots} booked<br>${counts.availableSlots} available</td>
    <td>${formatDateTime(schedule.createdAt)}</td>
    <td><div class="scheduler-actions">
      <a class="scheduler-button" href="/admin/interviews/manage?id=${schedule.id}">Manage</a>
      <a class="scheduler-button" href="/admin/interviews/bookings?id=${schedule.id}">Bookings</a>
      <button class="scheduler-button" data-copy="${schedule.id}">Copy link</button>
      <button class="scheduler-button" data-status="closed" data-id="${schedule.id}">Close</button>
      <button class="scheduler-button" data-status="archived" data-id="${schedule.id}">Archive</button>
      <button class="scheduler-button danger" data-delete="${schedule.id}">Delete</button>
    </div></td>
  </tr>`;
}

root?.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  const status = target.dataset.status as ScheduleStatus | undefined;
  const id = target.dataset.id;
  const copy = target.dataset.copy;
  const deleteId = target.dataset.delete;
  if (copy) {
    await navigator.clipboard.writeText(candidateLink(copy));
    setStatus("Candidate schedule link copied.", "success");
  }
  if (deleteId) {
    if (!confirm("Permanently delete this schedule and all candidate emails, slots, and bookings from Firebase? Archive instead if you want to keep history.")) return;
    await deleteSchedule(deleteId);
    await render();
    setStatus("Schedule permanently deleted.", "success");
  }
  if (status && id) {
    await setScheduleStatus(id, status);
    await render();
  }
});

includeArchived?.addEventListener("change", render);
inviteSettingsForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(inviteSettingsForm);
  await updateInviteMessageSettings({
    subject: String(data.get("subject") ?? "").trim(),
    template: String(data.get("template") ?? "").trim(),
  });
  setStatus("Invite message settings saved.", "success");
});
document.querySelector<HTMLElement>("[data-admin-logout]")?.addEventListener("click", () => logoutAdmin());
requireAdmin(() => Promise.all([hydrateInviteSettings(), render()]).catch((error) => setStatus(error.message, "error")), (message) => setStatus(message, "error"));
});
