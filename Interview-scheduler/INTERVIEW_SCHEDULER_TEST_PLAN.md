# Anthra Interview Scheduler — Test Plan

## 1. Purpose

This test plan verifies the interview scheduler feature for Anthra Systems.

The goal is to ensure that admins can create and manage interview schedules, candidates can book only if eligible, duplicate bookings are prevented, and history/rating/selection workflows work correctly.

---

## 2. Test Scope

Test these areas:

- Admin authentication
- Admin dashboard access
- Schedule creation
- Allowed candidate email management
- Slot management
- Candidate schedule access
- Candidate booking
- Duplicate booking prevention
- Schedule expiry and close behavior
- Existing booking lookup
- Admin bookings table
- Rating and selection workflow
- Archive/history behavior
- Security and invalid access handling
- UI responsiveness and empty/error states

---

## 3. Test Data

Use test schedule:

```txt
Schedule title: Embedded & IoT Intern Interview — Test Batch
Role: Embedded & IoT Intern
Job opening date: 2026-07-01
Interview date: 2026-07-10
Expiry date/time: 2026-07-10 18:00
Status: active
```

Allowed candidate emails:

```txt
rahul@example.com
sneha@example.com
amit@example.com
```

Slots:

```txt
10:00 AM - 10:30 AM
10:30 AM - 11:00 AM
11:00 AM - 11:30 AM
```

Invalid candidate email:

```txt
random@example.com
```

---

## 4. Admin Login Tests

### Test 4.1 — Admin Login Page Loads

Steps:

1. Open admin login route.
2. Confirm email and password fields are visible.
3. Confirm login button is visible.

Expected result:

- Login page loads correctly.

---

### Test 4.2 — Invalid Admin Login

Steps:

1. Enter wrong email/password.
2. Click login.

Expected result:

- Login fails.
- User remains on login page.
- Error message is shown.

---

### Test 4.3 — Valid Admin Login

Steps:

1. Enter valid admin email/password.
2. Click login.

Expected result:

- Login succeeds.
- Admin is redirected to interview dashboard.

---

### Test 4.4 — Protected Admin Routes

Steps:

1. Logout or open incognito window.
2. Try opening admin dashboard URL directly.

Expected result:

- User is redirected to login page.
- Admin data is not visible.

---

## 5. Schedule Creation Tests

### Test 5.1 — Create Draft Schedule

Steps:

1. Login as admin.
2. Open create schedule page.
3. Fill title, role, job opening date, interview date, expiry date/time.
4. Save as draft.

Expected result:

- Schedule is created.
- Status is `draft`.
- Schedule appears in admin dashboard.

---

### Test 5.2 — Required Fields Validation

Steps:

1. Open create schedule page.
2. Leave required fields empty.
3. Submit.

Expected result:

- Form does not submit.
- Required field errors are shown.

---

### Test 5.3 — Invalid Expiry Date

Steps:

1. Create schedule with expiry date/time in the past.
2. Try to activate it.

Expected result:

- Activation is blocked.
- Clear error is shown.

---

### Test 5.4 — Activate Schedule Without Slots

Steps:

1. Create schedule.
2. Do not add slots.
3. Try to activate schedule.

Expected result:

- Activation is blocked.
- Error says at least one slot is required.

---

### Test 5.5 — Activate Schedule Without Allowed Candidates

Steps:

1. Create schedule.
2. Add slots.
3. Do not add candidate emails.
4. Try to activate schedule.

Expected result:

- Activation is blocked.
- Error says at least one allowed candidate email is required.

---

## 6. Allowed Candidate Email Tests

### Test 6.1 — Add Single Candidate Email

Steps:

1. Open schedule manage page.
2. Add `rahul@example.com`.

Expected result:

- Email is saved.
- Email appears in allowed candidates list.
- Email is normalized to lowercase internally.

---

### Test 6.2 — Add Multiple Candidate Emails

Steps:

1. Paste multiple emails separated by new lines or commas.
2. Save.

Expected result:

- All valid emails are saved.
- Invalid email entries are rejected or reported.
- Duplicates are ignored or handled gracefully.

---

### Test 6.3 — Email Normalization

Steps:

1. Add `  Rahul@Example.COM  `.
2. Candidate later enters `rahul@example.com`.

Expected result:

- Candidate is recognized as allowed.

---

### Test 6.4 — Remove Unbooked Candidate Email

Steps:

1. Add an allowed email.
2. Remove it before candidate books.

Expected result:

- Email is removed.
- Candidate cannot access schedule using that email.

---

## 7. Slot Management Tests

### Test 7.1 — Add Slot

Steps:

1. Open schedule manage page.
2. Add slot `10:00 AM - 10:30 AM`.

Expected result:

- Slot is created.
- Slot status is `available`.

---

### Test 7.2 — Add Multiple Slots

Steps:

1. Add three slots.
2. Save.

Expected result:

- All slots are visible in admin schedule detail.
- Available slot count is correct.

---

### Test 7.3 — Block Slot

Steps:

1. Mark one available slot as blocked.

Expected result:

- Slot status becomes `blocked`.
- Candidate cannot book the blocked slot.

---

### Test 7.4 — Invalid Slot Time

Steps:

1. Add slot where end time is before start time.
2. Save.

Expected result:

- Save is blocked.
- Error message is shown.

---

## 8. Candidate Access Tests

### Test 8.1 — Active Schedule Link Opens

Steps:

1. Open candidate schedule link for active schedule.

Expected result:

- Candidate page loads.
- Email entry field is shown.

---

### Test 8.2 — Schedule Not Found

Steps:

1. Open invalid schedule URL.

Expected result:

- Page shows schedule not found message.
- No booking form is shown.

---

### Test 8.3 — Draft Schedule Not Accessible

Steps:

1. Open candidate link for draft schedule.

Expected result:

- Page says schedule is not accepting bookings.
- Candidate cannot book.

---

### Test 8.4 — Closed Schedule Not Accessible

Steps:

1. Admin closes schedule.
2. Candidate opens link.

Expected result:

- Page says schedule is no longer accepting bookings.

---

### Test 8.5 — Expired Schedule Not Accessible

Steps:

1. Set expiry date/time in past or simulate current time after expiry.
2. Candidate opens link.

Expected result:

- Page says schedule is expired or no longer accepting bookings.
- Booking write is blocked.

---

## 9. Candidate Email Allowlist Tests

### Test 9.1 — Allowed Email Can Continue

Steps:

1. Candidate enters `rahul@example.com`.

Expected result:

- Candidate is allowed to continue.
- Available slots are shown.

---

### Test 9.2 — Non-Allowed Email Denied

Steps:

1. Candidate enters `random@example.com`.

Expected result:

- Access denied message appears.
- Slots are not shown.
- Candidate cannot submit booking.

---

### Test 9.3 — Case-Insensitive Email Match

Steps:

1. Allowed email is `rahul@example.com`.
2. Candidate enters `Rahul@Example.com`.

Expected result:

- Candidate is allowed.

---

## 10. Candidate Booking Tests

### Test 10.1 — Successful Booking

Steps:

1. Candidate enters allowed email.
2. Candidate fills name, phone, resume/profile link.
3. Candidate selects available slot.
4. Candidate submits.

Expected result:

- Booking succeeds.
- Confirmation page is shown.
- Slot status becomes `booked`.
- Candidate `hasBooked` becomes true.
- Booking appears in admin table.

---

### Test 10.2 — Required Candidate Fields

Steps:

1. Candidate enters allowed email.
2. Leave name or phone empty.
3. Try to book.

Expected result:

- Booking is blocked.
- Required field errors are shown.

---

### Test 10.3 — Invalid Resume/Profile URL

Steps:

1. Enter invalid resume/profile URL if validation exists.
2. Try to book.

Expected result:

- Error is shown or field is accepted only if URL validation is intentionally relaxed.

---

### Test 10.4 — Meeting Link Display

Steps:

1. Admin adds common meeting link or slot meeting link.
2. Candidate books slot.

Expected result:

- Confirmation page shows meeting link if available.

---

## 11. Duplicate Booking Prevention Tests

### Test 11.1 — Same Email Cannot Book Twice

Steps:

1. Candidate `rahul@example.com` books a slot.
2. Open schedule link again.
3. Enter `rahul@example.com`.

Expected result:

- Candidate sees existing booking details.
- Candidate cannot select another slot.

---

### Test 11.2 — Booked Slot Hidden

Steps:

1. Candidate A books 10:00 AM slot.
2. Candidate B opens schedule.

Expected result:

- 10:00 AM slot is not shown as available.
- Other available slots are shown.

---

### Test 11.3 — Concurrent Booking Same Slot

Steps:

1. Simulate two allowed candidates attempting to book the same slot at nearly the same time.

Expected result:

- Only one booking succeeds.
- Second candidate receives message that slot was just booked and must choose another slot.
- No duplicate booking exists in database.

---

## 12. Existing Booking Lookup Tests

### Test 12.1 — Candidate Can View Existing Booking

Steps:

1. Candidate books a slot.
2. Candidate opens same schedule link later.
3. Candidate enters same email.

Expected result:

- Page displays already booked slot details.

---

### Test 12.2 — Existing Booking Does Not Reveal Others

Steps:

1. Candidate enters their own booked email.
2. Inspect displayed information.

Expected result:

- Only that candidate’s booking is shown.
- Other candidates' names/emails/slots are not shown.

---

## 13. Admin Bookings Table Tests

### Test 13.1 — Booking Appears in Admin Table

Steps:

1. Candidate completes booking.
2. Admin opens schedule bookings table.

Expected result:

- Booking is visible with correct slot, name, email, phone, links, and timestamp.

---

### Test 13.2 — Available Slots Display in Admin View

Steps:

1. Admin opens schedule detail.

Expected result:

- Booked and available slots are both visible.
- Counts are correct.

---

### Test 13.3 — Cancel Booking

Steps:

1. Admin cancels a candidate booking.

Expected result:

- Booking status updates appropriately.
- Slot becomes available or cancelled depending on chosen implementation.
- Candidate’s booking indicator updates appropriately if cancellation allows rebooking.

Expected v1 behavior should be explicitly implemented and consistent.

---

## 14. Rating and Selection Tests

### Test 14.1 — Add Overall Rating

Steps:

1. Admin opens booking row.
2. Set overall rating from 1 to 5.
3. Save.

Expected result:

- Rating is saved.
- Rating remains visible after page refresh.

---

### Test 14.2 — Mark Candidate Selected

Steps:

1. Admin marks candidate as selected.

Expected result:

- Candidate status becomes `selected`.
- `isSelected` becomes true if implemented.
- Selected count updates in schedule summary/history.

---

### Test 14.3 — Mark Candidate Rejected

Steps:

1. Admin marks candidate as rejected.

Expected result:

- Candidate status becomes `rejected`.
- `isSelected` becomes false if implemented.

---

### Test 14.4 — Mark Candidate On Hold

Steps:

1. Admin marks candidate as on hold.

Expected result:

- Candidate status becomes `on_hold`.

---

### Test 14.5 — Mark Candidate No Show

Steps:

1. Admin marks candidate as no show.

Expected result:

- Candidate status becomes `no_show`.

---

### Test 14.6 — Add Admin Notes

Steps:

1. Admin adds notes to candidate.
2. Save.
3. Refresh page.

Expected result:

- Notes are saved and visible to admin.
- Notes are not visible to candidate.

---

## 15. Schedule Close, Expiry, Archive Tests

### Test 15.1 — Admin Manually Closes Schedule

Steps:

1. Admin clicks close schedule.
2. Candidate opens link.

Expected result:

- Schedule no longer accepts bookings.
- Admin can still view schedule and bookings.

---

### Test 15.2 — Archive Schedule

Steps:

1. Admin archives a closed schedule.

Expected result:

- Schedule moves to history/archive view.
- Candidate booking is not allowed.
- Admin can still view historical data.

---

### Test 15.3 — Delete Schedule

Steps:

1. Admin deletes or soft-deletes schedule.
2. Try to open schedule in admin and candidate views.

Expected result:

- Deleted schedule is hidden from normal dashboard.
- Candidate cannot access it.
- If soft delete is used, data may still exist internally but not appear normally.

---

## 16. Security Tests

### Test 16.1 — Candidate Cannot Access Admin Dashboard

Steps:

1. Open admin route without login.

Expected result:

- Redirected to login.
- No admin data visible.

---

### Test 16.2 — Candidate Cannot View Allowed Email List

Steps:

1. Open candidate page.
2. Inspect available UI/data behavior.

Expected result:

- Candidate cannot see list of allowed candidate emails.

---

### Test 16.3 — Candidate Cannot View Other Bookings

Steps:

1. Candidate enters own email.
2. Confirm only own booking is displayed.

Expected result:

- Other candidates' booking data is not displayed.

---

### Test 16.4 — Candidate Cannot Modify Admin Fields

Steps:

1. Attempt to update rating/status/admin notes from candidate path or client.

Expected result:

- Operation is rejected by security rules or app logic.

---

### Test 16.5 — Non-Allowed Email Cannot Write Booking

Steps:

1. Attempt booking using non-allowed email.

Expected result:

- Booking is rejected.
- No booking document is created.

---

### Test 16.6 — Expired/Closed Schedule Write Rejected

Steps:

1. Close or expire schedule.
2. Attempt to submit booking.

Expected result:

- Booking is rejected.
- No new booking is created.

---

## 17. UI and Responsive Tests

### Test 17.1 — Candidate Page Mobile View

Steps:

1. Open candidate page on mobile viewport.

Expected result:

- Email form, slot list, and booking form are usable.
- No horizontal overflow.

---

### Test 17.2 — Admin Dashboard Desktop View

Steps:

1. Open admin dashboard on desktop.

Expected result:

- Tables are readable.
- Actions are accessible.

---

### Test 17.3 — Admin Dashboard Mobile View

Steps:

1. Open admin dashboard on mobile.

Expected result:

- Layout remains usable.
- Tables may scroll horizontally if needed.

---

### Test 17.4 — Loading States

Steps:

1. Simulate slow Firebase connection.

Expected result:

- Loading state is shown.
- UI does not appear broken.

---

### Test 17.5 — Empty States

Steps:

1. View dashboard with no schedules.
2. View schedule with no bookings.
3. View candidate page with no available slots.

Expected result:

- Clear empty state messages are shown.

---

## 18. Error Handling Tests

### Test 18.1 — Firebase Config Missing

Steps:

1. Run app without Firebase config.

Expected result:

- Developer-friendly error appears.
- App does not silently fail.

---

### Test 18.2 — Firebase Read Error

Steps:

1. Simulate read permission/network error.

Expected result:

- User sees appropriate error message.
- App remains stable.

---

### Test 18.3 — Firebase Write Error

Steps:

1. Simulate write failure while booking.

Expected result:

- Candidate sees booking failed message.
- Slot is not falsely shown as booked unless write succeeded.

---

## 19. Acceptance Checklist

Feature can be accepted when all are true:

- Admin can login.
- Admin routes are protected.
- Admin can create schedule.
- Admin can add allowed candidate emails.
- Admin can add slots.
- Admin can activate schedule.
- Candidate with allowed email can book one slot.
- Candidate with non-allowed email cannot book.
- Same email cannot book twice.
- Booked slot is hidden from other candidates.
- Candidate can re-check existing booking using same email.
- Admin can see all bookings in a table.
- Admin can rate candidate.
- Admin can mark candidate selected/rejected/on hold/no show.
- Admin can close schedule.
- Expired/closed schedule does not accept bookings.
- Archived schedule remains visible in history.
- Candidate cannot see admin-only data.
- Candidate cannot modify admin-only fields.
- System is usable on desktop and mobile.
