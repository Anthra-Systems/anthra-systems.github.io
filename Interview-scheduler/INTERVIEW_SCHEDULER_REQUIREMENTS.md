# Anthra Interview Scheduler — Requirements Specification

## 1. Purpose

Build a simple interview scheduling system as part of the existing Anthra Systems website.

The system should allow Anthra admins to create interview schedules, add allowed candidate emails, define available slots, share a schedule link, and track candidate bookings. Candidates should be able to open the schedule link, verify access through their email, book one available slot, and later re-check their booked slot using the same email.

This is intended for early-stage hiring and should remain simple, free-tier friendly, and maintainable.

---

## 2. Scope

### Build in Version 1

- Admin login page
- Admin dashboard
- Create interview schedules
- Add role/opening details
- Add allowed candidate email IDs
- Add interview time slots
- Generate or display candidate schedule link
- Candidate booking page
- Email allowlist-based access
- One booking per candidate email per schedule
- Schedule expiry and manual close behavior
- Admin table showing bookings
- Admin candidate rating
- Admin candidate selection/status marking
- Schedule history/archive view
- Firebase integration for storing schedules, candidates, slots, and bookings

### Do Not Build in Version 1

- Automated email sending
- OTP verification
- Password reset UI
- Candidate login account
- Candidate self-rescheduling
- Google Calendar integration
- Google Meet link generation
- Payment features
- Multi-admin roles
- Advanced analytics
- Resume file upload storage
- Complex applicant tracking system

Resume, GitHub, LinkedIn, or portfolio should be accepted as links only.

---

## 3. High-Level User Roles

### Admin

Anthra team member who manages interview schedules and candidate booking data.

Admin can:

- Login
- Create schedules
- Add candidate emails
- Add slots
- Activate, close, archive, or delete schedules
- View bookings
- Rate candidates
- Mark candidate interview status
- Add admin notes
- View past schedules/history

### Candidate / Interviewee

Shortlisted candidate who receives a private schedule link.

Candidate can:

- Open schedule link
- Enter email
- Access schedule only if email is allowlisted
- Book one available slot
- Re-open same link and enter same email to view already booked slot
- See a message if schedule is closed or expired

---

## 4. Page Structure

Use the existing Anthra website project structure and add these pages/routes as appropriate.

Suggested route names may be adjusted to fit the existing Astro project conventions.

### Admin Routes

```txt
/admin/interviews/login
/admin/interviews
/admin/interviews/new
/admin/interviews/:scheduleId
/admin/interviews/:scheduleId/bookings
/admin/interviews/history
```

### Candidate Routes

```txt
/interview/:scheduleId
```

or

```txt
/interview/schedule/:scheduleId
```

Use one reusable candidate page. Do not create separate static pages for each interview date.

---

## 5. Admin Login Requirements

Admin area must not be accessible publicly.

Important:

- Do not store fixed admin email/password inside frontend code.
- Do not hardcode secret credentials in public files.
- Use Firebase Authentication or equivalent Firebase-compatible auth method.
- For v1, only one admin account is required.
- Do not build a password reset screen in the UI.
- Admin password reset/change can be handled manually from Firebase Console if needed.

Admin login page should include:

- Email
- Password
- Login button
- Basic error message for invalid login

After successful login:

- Redirect admin to interview dashboard.

If unauthenticated user tries to access admin dashboard:

- Redirect to admin login page.

---

## 6. Admin Dashboard Requirements

The main admin dashboard should show schedules in a table.

Each schedule row should display:

- Schedule title
- Role/opening name
- Job opening date
- Interview date
- Expiry date/time
- Schedule status
- Number of allowed candidates
- Number of booked slots
- Number of available slots
- Created date
- Actions

Possible actions:

- View/manage schedule
- View bookings
- Close schedule
- Archive schedule
- Delete schedule, preferably with confirmation

Schedule statuses:

```txt
draft
active
closed
expired
archived
deleted
```

Status meaning:

- `draft`: admin is preparing the schedule; candidates cannot book.
- `active`: candidates can access and book if valid.
- `closed`: admin manually closed schedule; no new bookings.
- `expired`: schedule expiry time has passed; no new bookings.
- `archived`: old schedule kept for history.
- `deleted`: removed or soft-deleted.

Prefer soft delete if practical.

---

## 7. Create Schedule Requirements

Admin should be able to create a schedule with these fields:

- Schedule title
- Role/opening name
- Job opening date
- Interview date
- Expiry date/time
- Optional description/instructions for candidates
- Optional common meeting link field
- Status: draft or active

Example:

```txt
Schedule title: Embedded & IoT Intern Interview — July Batch
Role/opening name: Embedded & IoT Intern
Job opening date: 2026-07-01
Interview date: 2026-07-10
Expiry date/time: 2026-07-10 18:00
Status: active
```

After creating schedule, admin should be able to copy/share the candidate booking link:

```txt
https://anthrasystems.com/interview/{scheduleId}
```

Actual domain may vary depending on deployment.

---

## 8. Allowed Candidate Emails

Inside each schedule, admin should be able to add expected candidate emails.

Admin should be able to:

- Add one email
- Add multiple emails
- Paste a newline-separated or comma-separated list of emails
- Remove an email before booking
- See whether each email has booked or not

Each allowed candidate entry should include:

- Email
- Optional candidate name
- Optional role applied for
- Status
- Created timestamp
- Booked or not booked indicator

Normalize emails before storing/checking:

- Trim spaces
- Convert to lowercase

Example:

```txt
rahul@example.com
sneha@example.com
amit@example.com
```

Candidate access should be based on normalized email match.

---

## 9. Slot Management

Inside each schedule, admin should be able to create slots.

Each slot should have:

- Start time
- End time or duration
- Status
- Optional meeting link
- Optional internal note

Slot statuses:

```txt
available
booked
blocked
cancelled
```

Status meaning:

- `available`: visible and bookable by candidates.
- `booked`: already booked; not visible as available to other candidates.
- `blocked`: manually blocked by admin; not bookable.
- `cancelled`: cancelled by admin.

Admin should be able to:

- Add slot
- Add multiple slots
- Mark slot blocked
- Cancel booked slot manually
- View candidate assigned to booked slot

For v1, slot creation can be simple manual entry. Bulk slot generation is optional but useful if easy.

---

## 10. Candidate Booking Flow

Candidate opens:

```txt
/interview/{scheduleId}
```

Initial checks:

- Schedule exists
- Schedule status is active
- Current date/time is before expiry date/time
- Schedule is not closed or archived
- At least one slot may be available

If schedule is unavailable, show:

```txt
This interview schedule is no longer accepting bookings.
```

Candidate first enters email.

System checks:

- Email exists in allowed list for that schedule
- Email has not already booked a slot

If email is not allowed, show:

```txt
This email is not authorized for this interview schedule.
Please use the same email address where you received the interview invitation.
```

If email has already booked, show existing booking details:

```txt
You have already booked your interview slot.

Date:
Time:
Role:
```

Also show:

```txt
If you need to change your slot, please contact Anthra Systems.
```

Do not allow candidate self-rescheduling in v1.

If email is allowed and not booked, show available slots.

Candidate then selects one available slot and submits details.

Candidate form fields:

- Full name
- Email, prefilled from entered email and not casually editable after verification
- Phone number
- Resume link
- LinkedIn/GitHub/portfolio link
- Optional message/note
- Selected slot

After successful booking, show confirmation:

```txt
Your interview slot has been booked successfully.

Date:
Time:
Role:
```

If a meeting link exists for that schedule or slot, display it after booking.

Do not send automated email in v1.

---

## 11. Booking Rules

The system must enforce these rules:

1. Candidate can book only if schedule is active.
2. Candidate cannot book if schedule has expired.
3. Candidate cannot book if schedule is closed or archived.
4. Candidate can book only if their normalized email is in the allowed candidate list.
5. Candidate can book only once per schedule.
6. A slot can be booked by only one candidate.
7. Booked slots must not appear as available to other candidates.
8. If two candidates try booking the same slot at nearly the same time, only one booking should succeed.
9. Admin can manually cancel or modify booking if needed.
10. Candidate cannot self-reschedule in v1.

Double-booking prevention is important. Use transaction-like logic or equivalent atomic update behavior when booking a slot.

---

## 12. Candidate Existing Booking Lookup

Candidate should be able to reopen the same schedule link and enter the same email.

If the email has already booked, the page should show their booking details.

Show:

- Schedule title
- Role/opening name
- Interview date
- Booked slot time
- Candidate name
- Optional meeting link if available
- Contact instruction for changes

Do not show other candidates' data.

---

## 13. Admin Bookings Table

For each schedule, admin should see a bookings table.

Table columns:

- Slot time
- Candidate name
- Email
- Phone
- Resume link
- LinkedIn/GitHub/portfolio link
- Booking timestamp
- Interview status
- Rating
- Selected or not
- Admin notes
- Actions

Possible actions:

- Edit candidate details
- Cancel booking
- Mark interview done
- Mark selected
- Mark rejected
- Mark on hold
- Mark no show
- Add/update rating
- Add/update notes

For v1, keep actions simple.

---

## 14. Candidate Rating and Selection Workflow

Admin should be able to rate and mark candidates after the interview.

Use simple fields:

```txt
overallRating: 1 to 5
candidateStatus:
  - booked
  - interview_done
  - selected
  - rejected
  - on_hold
  - no_show
```

Admin notes:

```txt
adminNotes: string
```

Optional later fields:

```txt
technicalRating
communicationRating
attitudeRating
```

For v1, only overall rating is required.

History should allow admin to later see:

- Which role the candidate applied for
- Job opening date
- Interview date
- Whether selected/rejected/on hold
- Rating
- Notes

---

## 15. Schedule History

Admin should be able to view past schedules.

History view should include:

- Active schedules
- Closed schedules
- Archived schedules

For each schedule:

- Title
- Role
- Opening date
- Interview date
- Status
- Number of candidates
- Number booked
- Number selected
- Number rejected
- Number on hold

Admin should be able to open any past schedule and view its bookings and candidate decisions.

Do not automatically delete old schedules.

Admin may manually archive or delete schedules.

---

## 16. Firebase Data Model

Use Firebase as the backend/data store.

The exact implementation can be adjusted, but use a clean schedule-based structure.

Recommended Firestore structure:

```txt
schedules/{scheduleId}
  title
  roleName
  jobOpeningDate
  interviewDate
  expiryAt
  status
  description
  commonMeetingLink
  createdAt
  updatedAt
  createdBy

schedules/{scheduleId}/allowedCandidates/{candidateEmailKey}
  email
  normalizedEmail
  candidateName
  roleAppliedFor
  status
  hasBooked
  bookingId
  createdAt
  updatedAt

schedules/{scheduleId}/slots/{slotId}
  startAt
  endAt
  durationMinutes
  status
  meetingLink
  bookedByEmail
  bookingId
  createdAt
  updatedAt

schedules/{scheduleId}/bookings/{bookingId}
  scheduleId
  slotId
  candidateName
  email
  normalizedEmail
  phone
  resumeLink
  profileLink
  candidateNote
  bookedAt
  bookingStatus
  overallRating
  candidateStatus
  isSelected
  adminNotes
  updatedAt
```

Use normalized email as document ID for allowedCandidates if practical.

Example:

```txt
allowedCandidates/rahul_example_com
```

or use a safe encoded form.

Important: avoid document IDs with invalid/problematic characters if needed. Store original email as a field.

---

## 17. Firebase Security Expectations

Security must not rely only on hiding pages.

Expected behavior:

- Public users/candidates should not access admin data.
- Only authenticated admin can create, edit, close, archive, or delete schedules.
- Only authenticated admin can view complete booking tables and candidate lists.
- Candidate booking should be restricted by schedule status, expiry, allowlisted email, and one-booking rule.
- Candidate should only be able to view their own booking after entering their email.
- Candidate should not see the list of all allowed emails.
- Candidate should not see other candidates' bookings.
- Candidate should not modify rating, status, selection, or admin notes.
- Candidate should not update arbitrary schedule data.

If client-side-only security is insufficient for some operations, create a clear TODO and structure the code so secure server-side/Firebase-function logic can be added later.

Do not expose Firebase admin credentials in frontend code.

Firebase web config is allowed to be public, but security must be enforced through Firebase Auth, Firestore Security Rules, and/or backend functions.

---

## 18. Environment and Configuration

Do not hardcode Firebase project secrets or credentials randomly in components.

Use a central Firebase config file and environment variables where appropriate.

Suggested variables:

```txt
PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID
```

The actual Firebase project may be created manually later.

If Firebase config is missing, show a clear developer-friendly error.

---

## 19. UI/UX Expectations

The UI should match Anthra Systems branding and website style.

General style:

- Clean
- Professional
- Minimal
- Not cluttered
- Mobile responsive
- Easy for students/candidates to use

Candidate page should be simple and reassuring.

Admin page should be functional and table-oriented.

Avoid unnecessary animations or complex UI.

---

## 20. Error and Empty States

Handle these cases clearly:

- Schedule not found
- Schedule not active
- Schedule expired
- Schedule closed
- Email not allowed
- Email already booked
- No slots available
- Slot booked by someone else during submission
- Invalid phone number
- Invalid email format
- Missing required fields
- Firebase connection/config error

---

## 21. Data Validation

Validate:

- Email format
- Phone number presence
- Required candidate name
- Required selected slot
- Valid URL format for resume/profile links if practical
- Expiry date/time must be after current time when activating schedule
- Slot start time should be before end time
- Cannot activate schedule with zero slots
- Cannot activate schedule with zero allowed candidates

---

## 22. Deployment Assumptions

The existing website is an Astro website.

The interview scheduler should integrate into the same project/package.

The admin and candidate pages should work with static frontend deployment plus Firebase backend.

Avoid requiring a paid server for v1.

---

## 23. Deliverables

Codex should create or update:

- Admin login page
- Admin interview dashboard
- Create/edit schedule page
- Schedule detail/manage page
- Bookings table page/component
- Candidate interview booking page
- Firebase initialization/config module
- Firestore access helper functions/services
- Type definitions/interfaces for schedules, slots, candidates, bookings
- Basic UI components
- Error/empty/loading states
- Any required route guards for admin routes
- Documentation comments where useful

---

## 24. Success Criteria

The feature is successful when:

- Admin can login.
- Admin can create a schedule.
- Admin can add allowed candidate emails.
- Admin can add available slots.
- Admin can activate the schedule and copy/share the candidate link.
- Candidate with allowed email can book one slot.
- Candidate with non-allowed email cannot access slots.
- Same candidate email cannot book twice.
- Booked slot disappears from available slots.
- Candidate can re-enter email later and see existing booking.
- Admin can view all bookings in a table.
- Admin can rate candidates and mark selected/rejected/on hold/no show.
- Admin can close/archive schedules.
- Closed or expired schedules no longer accept bookings.
