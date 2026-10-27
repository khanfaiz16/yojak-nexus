// DEMO ACCOUNT DATA - all fictional. Not real customers or orders.

// The only code the demo OTP screens accept. No code is ever sent.
export const DEMO_OTP = "123456";

export const demoCustomerName = "Demo Customer";

export const demoGoogleUser = {
  name: "Demo Customer",
  email: "demo.customer@example.com",
  phone: "",
  method: "Google (demo)",
};

// Fictional sample orders shown in the order history screen.
export const sampleOrderHistory = [
  {
    reference: "SAMPLE-0001",
    createdAt: "2026-09-12T10:30:00.000Z",
    status: "Completed (sample)",
    statusTone: "in-stock",
    items: [
      { key: "s1a", name: "Sample Product 02", variant: "Colour: Teal", qty: 2, price: 649 },
      { key: "s1b", name: "Sample Product 06", variant: null, qty: 1, price: 999 },
    ],
  },
  {
    reference: "SAMPLE-0002",
    createdAt: "2026-10-03T15:10:00.000Z",
    status: "In progress (sample)",
    statusTone: "low-stock",
    items: [{ key: "s2a", name: "Sample Product 04", variant: null, qty: 1, price: 1199 }],
  },
];