export type ScheduleStatus = "draft" | "active" | "closed" | "expired" | "archived" | "deleted";
export type SlotStatus = "available" | "booked" | "blocked" | "cancelled";
export type CandidateStatus = "booked" | "interview_done" | "selected" | "rejected" | "on_hold" | "no_show";
export type BookingStatus = "booked" | "cancelled";

export interface InterviewSchedule {
  id: string;
  title: string;
  roleName: string;
  openingTitles?: string[];
  jobOpeningDate: string;
  interviewDate: string;
  expiryAt: string;
  expiryAtMs?: number;
  status: ScheduleStatus;
  description?: string;
  commonMeetingLink?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  counts?: ScheduleCounts;
}

export interface ScheduleCounts {
  allowedCandidates: number;
  bookedSlots: number;
  availableSlots: number;
  selected: number;
  rejected: number;
  onHold: number;
}

export interface AllowedCandidate {
  id: string;
  email: string;
  normalizedEmail: string;
  candidateName?: string;
  roleAppliedFor?: string;
  status: "allowed" | "removed";
  hasBooked: boolean;
  bookingId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewSlot {
  id: string;
  startAt: string;
  endAt: string;
  startAtMs?: number;
  endAtMs?: number;
  durationMinutes?: number;
  status: SlotStatus;
  meetingLink?: string;
  internalNote?: string;
  bookedByEmail?: string;
  bookingId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InterviewBooking {
  id: string;
  scheduleId: string;
  slotId: string;
  slotStartAt?: string;
  slotEndAt?: string;
  emailKey?: string;
  roleAppliedFor?: string;
  candidateName: string;
  email: string;
  normalizedEmail: string;
  phone: string;
  resumeLink?: string;
  profileLink?: string;
  candidateNote?: string;
  meetingLink?: string;
  bookedAt: string;
  bookingStatus: BookingStatus;
  overallRating?: number;
  candidateStatus?: CandidateStatus;
  isSelected?: boolean;
  adminNotes?: string;
  updatedAt?: string;
}

export interface CandidateBookingInput {
  scheduleId: string;
  slotId: string;
  roleAppliedFor?: string;
  candidateName: string;
  email: string;
  phone: string;
  resumeLink?: string;
  profileLink?: string;
  candidateNote?: string;
}

export interface InviteMessageSettings {
  template: string;
  subject: string;
  updatedAt?: string;
}
