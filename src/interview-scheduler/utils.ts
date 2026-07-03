import type { ScheduleStatus } from "./types";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function emailDocId(email: string) {
  return normalizeEmail(email).replace(/[^a-z0-9_-]/g, "_");
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

export function isValidUrl(value?: string) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function isValidIndianMobile(value: string) {
  return /^\d{10}$/.test(value.trim());
}

export function nowIso() {
  return new Date().toISOString();
}

export function effectiveScheduleStatus(status: ScheduleStatus, expiryAt: string): ScheduleStatus {
  if (status === "active" && expiryAt && new Date(expiryAt).getTime() <= Date.now()) return "expired";
  return status;
}

export function formatDateTime(value?: string) {
  if (!value) return "-";
  const date = parseDateValue(value);
  if (Number.isNaN(date.getTime())) return value;
  const datePart = new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  const timePart = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(date);
  return `${datePart}, ${timePart}`;
}

export function formatDateOnly(value?: string) {
  if (!value) return "-";
  const date = parseDateValue(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

export function formatSlotRange(startAt?: string, endAt?: string) {
  if (!startAt) return "-";
  const start = parseDateValue(startAt);
  const end = endAt ? parseDateValue(endAt) : null;
  if (Number.isNaN(start.getTime())) return startAt;
  const date = formatDateOnly(startAt);
  const startTime = new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(start);
  const endTime = end && !Number.isNaN(end.getTime())
    ? new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit" }).format(end)
    : "";
  return endTime ? `${date}, ${startTime} to ${endTime}` : `${date}, ${startTime}`;
}

function parseDateValue(value: string) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  return new Date(value);
}

export function candidateLink(scheduleId: string) {
  return `${window.location.origin}/interview?scheduleId=${encodeURIComponent(scheduleId)}`;
}
