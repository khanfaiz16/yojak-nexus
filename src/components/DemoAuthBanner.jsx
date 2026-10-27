import { Info } from "lucide-react";

export default function DemoAuthBanner() {
  return (
    <p className="demo-notice" role="note">
      <Info size={18} aria-hidden="true" />
      <span>
        <strong>Demo account screens.</strong> No real sign-in, OTP, Google connection or
        password is used. Real authentication will be integrated during production
        development.
      </span>
    </p>
  );
}