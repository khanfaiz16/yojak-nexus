import { createContext, useCallback, useMemo, useState } from "react";
import { DEMO_OTP, demoCustomerName, demoGoogleUser } from "../../data/demoAccount.js";

export const AuthContext = createContext(null);

const USER_KEY = "yojak-demo-user";
const PENDING_KEY = "yojak-demo-pending-otp";

function read(storage, key) {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(storage, key, value) {
  try {
    if (value === null) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // Storage unavailable: the demo still works for this session.
  }
}

// DEMO AUTHENTICATION ONLY. No real sign-in, OTP delivery or OAuth happens here.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => read(localStorage, USER_KEY));
  const [pending, setPending] = useState(() => read(sessionStorage, PENDING_KEY));

  const startOtp = useCallback((channel, value) => {
    const next = { channel, value };
    setPending(next);
    write(sessionStorage, PENDING_KEY, next);
  }, []);

  const verifyOtp = useCallback(
    (code) => {
      if (!pending || code !== DEMO_OTP) return false;
      const next = {
        name: demoCustomerName,
        email: pending.channel === "email" ? pending.value : "",
        phone: pending.channel === "phone" ? pending.value : "",
        method: pending.channel === "email" ? "Email OTP (demo)" : "Phone OTP (demo)",
      };
      setUser(next);
      write(localStorage, USER_KEY, next);
      setPending(null);
      write(sessionStorage, PENDING_KEY, null);
      return true;
    },
    [pending]
  );

  const signInWithGoogleDemo = useCallback(() => {
    setUser(demoGoogleUser);
    write(localStorage, USER_KEY, demoGoogleUser);
    setPending(null);
    write(sessionStorage, PENDING_KEY, null);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    write(localStorage, USER_KEY, null);
    setPending(null);
    write(sessionStorage, PENDING_KEY, null);
  }, []);

  const updateProfile = useCallback(
    (changes) => {
      if (!user) return;
      const next = { ...user, ...changes };
      setUser(next);
      write(localStorage, USER_KEY, next);
    },
    [user]
  );

  const value = useMemo(
    () => ({ user, pending, startOtp, verifyOtp, signInWithGoogleDemo, signOut, updateProfile }),
    [user, pending, startOtp, verifyOtp, signInWithGoogleDemo, signOut, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}