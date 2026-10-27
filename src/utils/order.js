export const orderDemoNotice =
  "This is a demonstration of the proposed ordering experience. No real order has been submitted.";

const ORDER_KEY = "yojak-demo-last-order";
const HISTORY_KEY = "yojak-demo-order-history";

// Demo reference only. It is not a real order number.
export function createReference() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(
    now.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DEMO-${stamp}-${rand}`;
}

export function loadLastOrder() {
  try {
    const raw = localStorage.getItem(ORDER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Demo orders submitted in this browser, newest first
export function loadOrderHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    // fall through to the last-order fallback below
  }
  // Orders made before history existed: show the last one if there is one
  const last = loadLastOrder();
  return last ? [last] : [];
}

export function saveLastOrder(order) {
  try {
    const history = loadOrderHistory().filter((o) => o.reference !== order.reference);
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    localStorage.setItem(HISTORY_KEY, JSON.stringify([order, ...history].slice(0, 20)));
  } catch {
    // Storage unavailable: the confirmation page will show an empty state.
  }
}

export function validateCheckout(values) {
  const errors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a phone number with 7 to 15 digits.";
  }
  if (values.address.trim().length < 5) {
    errors.address = "Please enter your delivery address.";
  }
  if (values.city.trim().length < 2) {
    errors.city = "Please enter your city.";
  }
  if (values.postalCode.trim().length < 3) {
    errors.postalCode = "Please enter your postal code.";
  }
  return errors;
}