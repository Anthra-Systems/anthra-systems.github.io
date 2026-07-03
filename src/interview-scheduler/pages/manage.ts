import { logoutAdmin, requireAdmin } from "../auth";
import {
  addAllowedCandidates,
  addSlot,
  createSchedule,
  getInviteMessageSettings,
  getSchedule,
  getScheduleCounts,
  listAllowedCandidates,
  listSlots,
  removeAllowedCandidate,
  setScheduleStatus,
  updateSchedule,
  updateSlotStatus,
} from "../services";
import { candidateLink, formatDateOnly, formatDateTime, formatSlotRange, isValidEmail } from "../utils";
import type { AllowedCandidate, InterviewSlot, InviteMessageSettings, InterviewSchedule, ScheduleStatus, SlotStatus } from "../types";

function onReady(callback: () => void) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }
  callback();
}

type PickerInput = HTMLInputElement & { showPicker?: () => void };

function isPickerInput(target: EventTarget | null): target is PickerInput {
  return target instanceof HTMLInputElement && (target.type === "date" || target.type === "datetime-local" || target.type === "time");
}

function bindNativePickerOpen() {
  document.addEventListener("click", (event) => {
    const input = event.target;
    if (!isPickerInput(input) || input.disabled || input.readOnly) return;
    input.focus({ preventScroll: true });
    try {
      input.showPicker?.();
    } catch {
      // Some browsers only allow the picker during specific trusted interactions.
    }
  });
}

onReady(() => {
const params = new URLSearchParams(window.location.search);
const scheduleId = params.get("id");
const statusBox = document.querySelector<HTMLElement>("[data-manage-status]");
const createForm = document.querySelector<HTMLFormElement>("[data-schedule-form]");
const manageRoot = document.querySelector<HTMLElement>("[data-manage-root]");
const title = document.querySelector<HTMLElement>("[data-manage-title]");
const share = document.querySelector<HTMLInputElement>("[data-share-link]");
bindNativePickerOpen();

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

function value(form: FormData, key: string) {
  return String(form.get(key) ?? "").trim();
}

function openingTitlesFrom(raw: string, fallback: string) {
  const titles = raw
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
  return [...new Set([fallback, ...titles].filter(Boolean))];
}

function openingTitlesFor(schedule: { roleName: string; openingTitles?: string[] }) {
  return [...new Set([...(schedule.openingTitles || []), schedule.roleName].map((item) => item.trim()).filter(Boolean))];
}

function openingOptions(titles: string[], selected = "") {
  return titles.map((title) => `<option value="${escapeHtml(title)}"${title === selected ? " selected" : ""}>${escapeHtml(title)}</option>`).join("");
}

function candidateSpecificLink(scheduleId: string, email: string) {
  return `${candidateLink(scheduleId)}&email=${encodeURIComponent(email)}`;
}

function renderInviteTemplate(template: string, schedule: InterviewSchedule, candidate: AllowedCandidate) {
  const replacements: Record<string, string> = {
    position: candidate.roleAppliedFor || schedule.roleName,
    scheduleLink: candidateSpecificLink(schedule.id, candidate.email),
    meetingLink: schedule.commonMeetingLink || "",
    email: candidate.email,
    scheduleTitle: schedule.title,
    interviewDate: formatDateOnly(schedule.interviewDate),
  };
  return Object.entries(replacements).reduce((message, [key, value]) => message.replaceAll(`{{${key}}}`, value), template);
}

function inviteHtmlFromText(text: string) {
  const body = escapeHtml(text)
    .replace(/&lt;(strong|b)&gt;([\s\S]*?)&lt;\/\1&gt;/gi, "<strong>$2</strong>")
    .replace(/\*\*([\s\S]*?)\*\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+)/g, `<a href="$1">$1</a>`)
    .replace(/\n/g, "<br>");
  return `<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.5;color:#000">${body}</div>`;
}

function invitePlainText(text: string) {
  return text
    .replace(/<\/?(strong|b)>/gi, "")
    .replace(/\*\*([\s\S]*?)\*\*/g, "$1");
}

function gmailComposeLink(email: string, subject: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}`;
}

function candidateRows(schedule: InterviewSchedule, candidates: AllowedCandidate[], inviteSettings: InviteMessageSettings) {
  if (!candidates.length) return `<tr><td colspan="5">No allowed candidates yet.</td></tr>`;
  return candidates
    .map((candidate) => {
      const message = renderInviteTemplate(inviteSettings.template, schedule, candidate);
      const subject = renderInviteTemplate(inviteSettings.subject, schedule, candidate);
      return `<tr><td>${escapeHtml(candidate.email)}</td><td>${escapeHtml(candidate.roleAppliedFor || "-")}</td><td>${candidate.hasBooked ? "Yes" : "No"}</td><td><div class="scheduler-actions"><button class="scheduler-button" data-invite-copy="${escapeHtml(candidate.email)}" data-invite-message="${escapeHtml(message)}" type="button">Copy Message</button><button class="scheduler-button" data-gmail-copy="${escapeHtml(candidate.email)}" data-gmail-link="${escapeHtml(gmailComposeLink(candidate.email, subject))}" data-invite-message="${escapeHtml(message)}" type="button">Open Gmail + Copy</button></div></td><td>${candidate.hasBooked ? "" : `<button class="scheduler-button danger" data-remove-email="${escapeHtml(candidate.email)}" type="button">Remove</button>`}</td></tr>`;
    })
    .join("");
}

async function copyInviteMessage(message: string) {
  const html = inviteHtmlFromText(message);
  const plain = invitePlainText(message);
  const copyHost = document.createElement("div");
  copyHost.contentEditable = "true";
  copyHost.setAttribute("aria-hidden", "true");
  copyHost.style.position = "fixed";
  copyHost.style.left = "-9999px";
  copyHost.style.top = "0";
  copyHost.style.whiteSpace = "normal";
  copyHost.innerHTML = html;
  document.body.append(copyHost);

  let copied = false;
  const copyHandler = (event: ClipboardEvent) => {
    event.preventDefault();
    event.clipboardData?.setData("text/html", html);
    event.clipboardData?.setData("text/plain", plain);
    copied = true;
  };
  const range = document.createRange();
  range.selectNodeContents(copyHost);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  document.addEventListener("copy", copyHandler, { once: true });
  document.execCommand("copy");
  document.removeEventListener("copy", copyHandler);
  selection?.removeAllRanges();
  copyHost.remove();
  if (!copied) await navigator.clipboard.writeText(plain);
}

function autoExpiryForInterviewDate(interviewDate: string) {
  const [year, month, day] = interviewDate.split("-").map(Number);
  if (!year || !month || !day) throw new Error("Please choose a valid interview date.");
  const expiry = new Date(year, month - 1, day + 2, 0, 0, 0, 0);
  const yyyy = expiry.getFullYear();
  const mm = String(expiry.getMonth() + 1).padStart(2, "0");
  const dd = String(expiry.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T00:00`;
}

function updateScheduleExpiryPreview(form: HTMLFormElement) {
  const interviewDate = String(new FormData(form).get("interviewDate") ?? "");
  const expiryInput = form.querySelector<HTMLInputElement>("[name='expiryAt']");
  const preview = form.querySelector<HTMLElement>("[data-expiry-preview]");
  if (!interviewDate) {
    if (expiryInput) expiryInput.value = "";
    if (preview) preview.textContent = "Select interview date.";
    return;
  }
  try {
    const expiryAt = autoExpiryForInterviewDate(interviewDate);
    if (expiryInput) expiryInput.value = expiryAt;
    if (preview) preview.textContent = formatDateTime(expiryAt);
  } catch {
    if (preview) preview.textContent = "Choose a valid interview date.";
  }
}

function durationOptions() {
  return Array.from({ length: 24 }, (_, index) => (index + 1) * 5)
    .map((minutes) => `<option value="${minutes}"${minutes === 30 ? " selected" : ""}>${minutes} minutes</option>`)
    .join("");
}

function addMinutes(value: string, minutes: number) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error("Please choose a valid slot start time.");
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

function buildSlotStartAt(interviewDate: string, startTime: string) {
  if (!interviewDate) throw new Error("Schedule interview date is missing.");
  if (!startTime) throw new Error("Please choose a slot start time.");
  return `${interviewDate}T${startTime}`;
}

function slotTimestamp(value: string) {
  const timestamp = new Date(value).getTime();
  if (Number.isNaN(timestamp)) throw new Error("Please choose a valid slot date and time.");
  return timestamp;
}

function isPastSlot(startAt: string, endAt: string) {
  return slotTimestamp(startAt) <= Date.now() || slotTimestamp(endAt) <= Date.now();
}

function overlapsExistingSlot(startAt: string, endAt: string, slots: InterviewSlot[]) {
  const start = slotTimestamp(startAt);
  const end = slotTimestamp(endAt);
  return slots.some((slot) => {
    if (slot.status === "cancelled") return false;
    return start < slotTimestamp(slot.endAt) && end > slotTimestamp(slot.startAt);
  });
}

function comparisonPanel(candidates: AllowedCandidate[], slots: InterviewSlot[]) {
  const activeSlots = slots.filter((slot) => (slot.status === "available" || slot.status === "booked") && new Date(slot.startAt).getTime() > Date.now());
  return `<section class="scheduler-panel mt-4"><h2 class="anthra-section-title text-2xl">Slot / Email Comparison</h2><div class="scheduler-grid two mt-4"><div class="scheduler-alert"><strong>${activeSlots.length}</strong><br>Active slots</div><div class="scheduler-alert"><strong>${candidates.length}</strong><br>Entered candidate emails</div></div><div class="scheduler-grid two mt-4"><div class="scheduler-compare-list">${activeSlots.map((slot) => `<div>${formatSlotRange(slot.startAt, slot.endAt)} <span class="scheduler-status ${slot.status}">${slot.status}</span></div>`).join("") || "<div>No active slots yet.</div>"}</div><div class="scheduler-compare-list">${candidates.map((candidate) => `<div>${candidate.email}${candidate.roleAppliedFor ? `<br><span class="anthra-muted">${candidate.roleAppliedFor}</span>` : ""} <span class="scheduler-status ${candidate.hasBooked ? "active" : "draft"}">${candidate.hasBooked ? "booked" : "not booked"}</span></div>`).join("") || "<div>No candidate emails yet.</div>"}</div></div></section>`;
}

function updateSlotPreview(form: HTMLFormElement) {
  const preview = form.querySelector<HTMLElement>("[data-slot-preview]");
  if (!preview) return;
  const data = new FormData(form);
  const startTime = String(data.get("startTime") ?? "");
  const interviewDate = String(data.get("interviewDate") ?? "");
  const durationMinutes = Number(data.get("durationMinutes") ?? 30);
  if (!startTime || !durationMinutes) {
    preview.textContent = "Choose a start time and duration.";
    return;
  }
  try {
    const startAt = buildSlotStartAt(interviewDate, startTime);
    preview.textContent = `${formatDateTime(startAt)} to ${formatDateTime(addMinutes(startAt, durationMinutes))}`;
  } catch {
    preview.textContent = "Choose a valid start time.";
  }
}

createForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  updateScheduleExpiryPreview(createForm);
  const data = new FormData(createForm);
  const interviewDate = value(data, "interviewDate");
  const expiryAt = value(data, "expiryAt") || autoExpiryForInterviewDate(interviewDate);
  if (value(data, "status") === "active" && new Date(expiryAt).getTime() <= Date.now()) {
    setStatus("Expiry date/time must be in the future before activation.", "error");
    return;
  }
  setStatus("Saving schedule...");
  try {
    const id = await createSchedule({
      title: value(data, "title"),
      roleName: value(data, "roleName"),
      openingTitles: openingTitlesFrom(value(data, "openingTitles"), value(data, "roleName")),
      jobOpeningDate: value(data, "jobOpeningDate") || interviewDate,
      interviewDate,
      expiryAt,
      status: value(data, "status") as ScheduleStatus,
      description: value(data, "description"),
      commonMeetingLink: value(data, "commonMeetingLink"),
    });
    window.location.href = `/admin/interviews/manage?id=${id}`;
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "Schedule could not be saved.", "error");
  }
});

async function renderManage() {
  if (!scheduleId || !manageRoot) return;
  const [schedule, candidates, slots, counts, inviteSettings] = await Promise.all([
    getSchedule(scheduleId),
    listAllowedCandidates(scheduleId),
    listSlots(scheduleId),
    getScheduleCounts(scheduleId),
    getInviteMessageSettings(),
  ]);
  if (!schedule) {
    manageRoot.innerHTML = `<div class="scheduler-alert error">Schedule not found.</div>`;
    return;
  }
  if (title) title.textContent = schedule.title;
  if (share) share.value = candidateLink(schedule.id);
  const bookingsLink = document.querySelector<HTMLAnchorElement>("[data-bookings-link]");
  if (bookingsLink) bookingsLink.href = `/admin/interviews/bookings?id=${schedule.id}`;
  const openingTitles = openingTitlesFor(schedule);
  manageRoot.innerHTML = `<div class="scheduler-grid two">
    <section class="scheduler-panel"><h2 class="anthra-section-title text-2xl">Schedule Summary</h2><p class="anthra-muted mt-2">${schedule.roleName}</p><div class="scheduler-grid two mt-5"><div>Interview<br><strong>${formatDateOnly(schedule.interviewDate)}</strong></div><div>Expiry<br><strong>${formatDateTime(schedule.expiryAt)}</strong></div><div>Status<br><span class="scheduler-status ${schedule.status}">${schedule.status}</span></div><div>Counts<br><strong>${counts.allowedCandidates}</strong> candidates, <strong>${counts.availableSlots}</strong> available</div></div><form data-meeting-link-form class="scheduler-grid mt-5"><label class="scheduler-field">Common meeting link<input class="scheduler-input" type="url" name="commonMeetingLink" value="${escapeHtml(schedule.commonMeetingLink || "")}" placeholder="https://..."></label><div><button class="scheduler-button" type="submit">Save Meeting Link</button></div></form><div class="scheduler-actions mt-5"><button class="scheduler-button primary" data-activate type="button">Activate</button><button class="scheduler-button" data-status="draft" type="button">Draft</button><button class="scheduler-button" data-status="closed" type="button">Close</button><button class="scheduler-button" data-status="archived" type="button">Archive</button></div></section>
    <section class="scheduler-panel"><h2 class="anthra-section-title text-2xl">Opening Titles</h2><form data-opening-form class="scheduler-grid two mt-4"><label class="scheduler-field">Add opening title<input class="scheduler-input" name="openingTitle" required placeholder="Embedded Engineer"></label><div class="scheduler-field"><span>&nbsp;</span><button class="scheduler-button primary" type="submit">Add Title</button></div></form><div class="scheduler-compare-list mt-4">${openingTitles.map((item) => `<div>${escapeHtml(item)}${item === schedule.roleName ? ` <span class="scheduler-status active">default</span>` : `<button class="scheduler-button danger" data-remove-title="${escapeHtml(item)}" type="button">Remove</button>`}</div>`).join("")}</div></section>
  </div>
  <section class="scheduler-panel mt-4"><h2 class="anthra-section-title text-2xl">Allowed Candidate Emails</h2><form data-candidate-form class="scheduler-grid three mt-4"><label class="scheduler-field">Candidate email<input class="scheduler-input" type="email" name="email" required placeholder="rahul@example.com"></label><label class="scheduler-field">Opening title<select class="scheduler-select" name="roleAppliedFor" required>${openingOptions(openingTitles)}</select></label><div class="scheduler-field"><span>&nbsp;</span><button class="scheduler-button primary" type="submit">Add Candidate</button></div></form><div class="scheduler-table-wrap mt-5"><table class="scheduler-table"><thead><tr><th>Email</th><th>Position</th><th>Booked</th><th>Invite</th><th></th></tr></thead><tbody>${candidateRows(schedule, candidates, inviteSettings)}</tbody></table></div></section>
  ${comparisonPanel(candidates, slots)}
  <section class="scheduler-panel mt-4"><h2 class="anthra-section-title text-2xl">Slot Management</h2><form data-slot-form class="scheduler-grid three mt-4"><input type="hidden" name="interviewDate" value="${schedule.interviewDate}"><label class="scheduler-field">Interview date<input class="scheduler-input" value="${formatDateOnly(schedule.interviewDate)}" readonly></label><label class="scheduler-field">Start time<input class="scheduler-input" type="time" name="startTime" required></label><label class="scheduler-field">Duration<select class="scheduler-select" name="durationMinutes" required>${durationOptions()}</select></label><label class="scheduler-field">Meeting link<input class="scheduler-input" type="url" name="meetingLink" placeholder="https://..."></label><label class="scheduler-field">Internal note<input class="scheduler-input" name="internalNote"></label><div class="scheduler-field"><span>Slot preview</span><div class="scheduler-alert" data-slot-preview>Choose a start time and duration.</div></div><div class="scheduler-actions scheduler-slot-actions"><button class="scheduler-button" data-confirm-slot-time type="button">Confirm time</button><button class="scheduler-button primary" type="submit">Add Slot</button></div></form><div class="scheduler-table-wrap mt-5"><table class="scheduler-table"><thead><tr><th>Slot</th><th>Status</th><th>Candidate</th><th>Actions</th></tr></thead><tbody>${slots.map((slot) => `<tr><td>${formatSlotRange(slot.startAt, slot.endAt)}</td><td><span class="scheduler-status ${slot.status}">${slot.status}</span></td><td>${slot.bookedByEmail || "-"}</td><td><div class="scheduler-actions"><button class="scheduler-button" data-slot="${slot.id}" data-slot-status="available" data-slot-booked="${slot.status === "booked" ? "true" : ""}" type="button">Available</button><button class="scheduler-button" data-slot="${slot.id}" data-slot-status="blocked" data-slot-booked="${slot.status === "booked" ? "true" : ""}" type="button">Block</button><button class="scheduler-button danger" data-slot="${slot.id}" data-slot-status="cancelled" data-slot-booked="${slot.status === "booked" ? "true" : ""}" type="button">Cancel</button></div></td></tr>`).join("") || `<tr><td colspan="4">No slots yet.</td></tr>`}</tbody></table></div></section>`;
}

manageRoot?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!scheduleId) return;
  const form = event.target as HTMLFormElement;
  try {
    if (form.matches("[data-candidate-form]")) {
      const data = new FormData(form);
      const email = String(data.get("email") ?? "").trim();
      const roleAppliedFor = String(data.get("roleAppliedFor") ?? "").trim();
      if (!isValidEmail(email)) throw new Error(`Invalid email entry: ${email}`);
      if (!roleAppliedFor) throw new Error("Please choose an opening title.");
      await addAllowedCandidates(scheduleId, `${email} | ${roleAppliedFor}`);
    }
    if (form.matches("[data-opening-form]")) {
      const data = new FormData(form);
      const openingTitle = String(data.get("openingTitle") ?? "").trim();
      if (!openingTitle) throw new Error("Opening title is required.");
      const schedule = await getSchedule(scheduleId);
      if (!schedule) throw new Error("Schedule not found.");
      await updateSchedule(scheduleId, { openingTitles: openingTitlesFor(schedule).concat(openingTitle).filter((item, index, all) => all.indexOf(item) === index) });
    }
    if (form.matches("[data-meeting-link-form]")) {
      const data = new FormData(form);
      await updateSchedule(scheduleId, { commonMeetingLink: String(data.get("commonMeetingLink") ?? "").trim() });
    }
    if (form.matches("[data-slot-form]")) {
      const data = new FormData(form);
      const startAt = buildSlotStartAt(String(data.get("interviewDate") ?? ""), String(data.get("startTime") ?? ""));
      const durationMinutes = Number(data.get("durationMinutes") ?? 30);
      const endAt = addMinutes(startAt, durationMinutes);
      if (isPastSlot(startAt, endAt)) throw new Error("Slots cannot be created for a date or time that has already passed.");
      const existingSlots = await listSlots(scheduleId);
      if (overlapsExistingSlot(startAt, endAt, existingSlots) && !confirm("This slot overlaps with an existing slot. Do you want to add it anyway?")) {
        setStatus("Overlapping slot was not added.", "error");
        return;
      }
      await addSlot(scheduleId, {
        startAt,
        endAt,
        status: "available",
        meetingLink: String(data.get("meetingLink") ?? ""),
        internalNote: String(data.get("internalNote") ?? ""),
      });
    }
    await renderManage();
    setStatus("Saved.", "success");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed.";
    setStatus(message, "error");
    showPopup("Unable to save", message);
  }
});

manageRoot?.addEventListener("input", (event) => {
  const form = (event.target as HTMLElement).closest<HTMLFormElement>("[data-slot-form]");
  if (form) updateSlotPreview(form);
});

manageRoot?.addEventListener("change", (event) => {
  const form = (event.target as HTMLElement).closest<HTMLFormElement>("[data-slot-form]");
  if (form) updateSlotPreview(form);
});

createForm?.addEventListener("input", () => updateScheduleExpiryPreview(createForm));
createForm?.addEventListener("change", () => updateScheduleExpiryPreview(createForm));

manageRoot?.addEventListener("click", async (event) => {
  const confirmButton = (event.target as HTMLElement).closest<HTMLElement>("[data-confirm-slot-time]");
  if (confirmButton) {
    const form = confirmButton.closest<HTMLFormElement>("[data-slot-form]");
    if (form) {
      updateSlotPreview(form);
      form.querySelector<HTMLInputElement>("[name='startTime']")?.blur();
      setStatus("Slot time confirmed. Add Slot will save it.", "success");
    }
    return;
  }
  const titleButton = (event.target as HTMLElement).closest<HTMLElement>("[data-remove-title]");
  if (titleButton) {
    if (!scheduleId) return;
    const schedule = await getSchedule(scheduleId);
    if (!schedule) return;
    const nextTitles = openingTitlesFor(schedule).filter((title) => title !== titleButton.dataset.removeTitle);
    await updateSchedule(scheduleId, { openingTitles: nextTitles });
    await renderManage();
    setStatus("Opening title removed.", "success");
    return;
  }
  const inviteButton = (event.target as HTMLElement).closest<HTMLElement>("[data-invite-copy]");
  if (inviteButton) {
    await copyInviteMessage(inviteButton.dataset.inviteMessage || "");
    setStatus(`Invite message copied for ${inviteButton.dataset.inviteCopy}.`, "success");
    return;
  }
  const gmailButton = (event.target as HTMLElement).closest<HTMLElement>("[data-gmail-copy]");
  if (gmailButton) {
    await copyInviteMessage(gmailButton.dataset.inviteMessage || "");
    if (gmailButton.dataset.gmailLink) window.open(gmailButton.dataset.gmailLink, "_blank", "noopener");
    setStatus(`Gmail opened and formatted message copied for ${gmailButton.dataset.gmailCopy}. Paste it into the email body.`, "success");
    return;
  }
  const target = (event.target as HTMLElement).closest<HTMLElement>("[data-remove-email], [data-slot], [data-status], [data-activate]");
  if (!target) return;
  if (!scheduleId) return;
  try {
    if (target.dataset.removeEmail) await removeAllowedCandidate(scheduleId, target.dataset.removeEmail);
    if (target.dataset.slot && target.dataset.slotStatus) {
      if (target.dataset.slotBooked && !confirm("This slot has a candidate booking. Changing it will cancel the candidate booking and make the candidate eligible to book again. Continue?")) return;
      await updateSlotStatus(scheduleId, target.dataset.slot, target.dataset.slotStatus as SlotStatus);
    }
    if (target.dataset.status) await setScheduleStatus(scheduleId, target.dataset.status as ScheduleStatus);
    if (target.dataset.activate !== undefined) {
      const counts = await getScheduleCounts(scheduleId);
      const schedule = await getSchedule(scheduleId);
      if (!schedule || new Date(schedule.expiryAt).getTime() <= Date.now()) throw new Error("Expiry date/time must be in the future before activation.");
      if (counts.availableSlots < 1) throw new Error("At least one available slot is required before activation.");
      if (counts.allowedCandidates < 1) throw new Error("At least one allowed candidate email is required before activation.");
      await setScheduleStatus(scheduleId, "active");
    }
    await renderManage();
    setStatus("Updated.", "success");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Update failed.";
    setStatus(message, "error");
    showPopup("Update failed", message);
  }
});

document.querySelector<HTMLElement>("[data-confirm-schedule-date]")?.addEventListener("click", () => {
  if (!createForm) return;
  updateScheduleExpiryPreview(createForm);
  createForm.querySelector<HTMLInputElement>("[name='interviewDate']")?.blur();
  setStatus("Interview date confirmed. Expiry was set automatically.", "success");
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.matches("[data-modal-close]") || target.matches("[data-scheduler-modal]")) {
    document.querySelector("[data-scheduler-modal]")?.remove();
  }
});

document.querySelector<HTMLElement>("[data-copy-share]")?.addEventListener("click", async () => {
  if (!share?.value) return;
  await navigator.clipboard.writeText(share.value);
  setStatus("Candidate link copied.", "success");
});
document.querySelector<HTMLElement>("[data-admin-logout]")?.addEventListener("click", () => logoutAdmin());
requireAdmin(() => renderManage().catch((error) => setStatus(error.message, "error")), (message) => setStatus(message, "error"));
});
