import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { getFirebaseClient } from "./firebase";

export function loginAdmin(email: string, password: string) {
  return signInWithEmailAndPassword(getFirebaseClient().auth, email, password);
}

export function logoutAdmin() {
  return signOut(getFirebaseClient().auth);
}

export function requireAdmin(onReady: (user: User) => void, onError: (message: string) => void) {
  try {
    const { auth } = getFirebaseClient();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = `/admin/interviews/login?next=${encodeURIComponent(window.location.pathname + window.location.search)}`;
        return;
      }
      onReady(user);
    });
  } catch (error) {
    onError(error instanceof Error ? error.message : "Firebase authentication failed.");
  }
}
