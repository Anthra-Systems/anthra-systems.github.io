# Anthra Interview Scheduler Firebase Setup

This feature is built as a static Astro frontend with Firebase Authentication and Firestore.

## Required environment variables

Add these to the deployment environment and local `.env` when the Firebase project is created:

```txt
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_STORAGE_BUCKET=
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_FIREBASE_APP_ID=
```

The app shows a developer-friendly Firebase config error if any value is missing.

## Firebase console setup

1. Create a Firebase web app.
2. Enable Firebase Authentication with Email/Password.
3. Create the Anthra admin user manually in Firebase Console.
4. Enable Firestore.
5. Add Firestore security rules before sharing real schedule links.

## Security rule expectations

The UI already validates admin auth, allowlisted email, schedule status, expiry, one booking per email, and slot availability. Real production security must also be enforced in Firestore rules and/or a Cloud Function, because browser-side checks alone can be bypassed.

Rules/functions should enforce:

- only authenticated admin users can create/update/delete schedules, allowed candidates, slots, bookings, ratings, statuses, and admin notes
- public candidate reads expose only the schedule and the candidate's own allowlist/booking result after email entry
- public booking writes must be allowed only for active, non-expired schedules
- booking writes must require the normalized email to exist in `allowedCandidates`
- booking writes must reject candidates with `hasBooked: true`
- slot booking must be atomic; the current frontend uses a Firestore transaction, but rules should also reject writes if slot status is not `available`
- candidates must not write `overallRating`, `candidateStatus`, `isSelected`, or `adminNotes`

For stricter production behavior, move candidate booking into a callable Cloud Function. That would hide allowlist internals better and centralize the transaction on trusted backend code.

## Static hosting rewrite

The generated share link uses:

```txt
/interview/{scheduleId}
```

Because this site builds statically, configure hosting to rewrite `/interview/*` to `/interview/index.html`.

For local/manual testing without a rewrite, use:

```txt
/interview?scheduleId={scheduleId}
```

## Version 1 intentional exclusions

No automated email, OTP, password reset UI, candidate account, self-rescheduling, Google Calendar/Meet integration, payments, multi-admin roles, analytics, resume upload, or full ATS workflow is included.
