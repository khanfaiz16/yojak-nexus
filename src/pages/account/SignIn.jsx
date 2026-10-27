import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import DemoAuthBanner from "../../components/DemoAuthBanner.jsx";
import { useAuth } from "../../hooks/useAuth.js";

function validate(method, value) {
  const text = value.trim();
  if (method === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? "" : "Please enter a valid email address.";
  }
  const digits = text.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15
    ? ""
    : "Please enter a phone number with 7 to 15 digits.";
}

export default function SignIn() {
  const { user, startOtp, signInWithGoogleDemo } = useAuth();
  const navigate = useNavigate();

  const [method, setMethod] = useState("email");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [googleOpen, setGoogleOpen] = useState(false);

  if (user) {
    return <Navigate to="/account/profile" replace />;
  }

  function chooseMethod(next) {
    setMethod(next);
    setValue("");
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const message = validate(method, value);
    setError(message);
    if (message) return;
    startOtp(method, value.trim());
    navigate(method === "email" ? "/account/verify-email" : "/account/verify-phone");
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Sign in"
        text="A preview of the proposed customer sign-in experience."
      />

      <section className="section">
        <div className="container auth-wrap">
          <div className="auth-card">
            <div className="segmented" role="group" aria-label="Sign-in method">
              <button
                type="button"
                className={method === "email" ? "seg-active" : ""}
                aria-pressed={method === "email"}
                onClick={() => chooseMethod("email")}
              >
                <Mail size={16} aria-hidden="true" /> Email
              </button>
              <button
                type="button"
                className={method === "phone" ? "seg-active" : ""}
                aria-pressed={method === "phone"}
                onClick={() => chooseMethod("phone")}
              >
                <Phone size={16} aria-hidden="true" /> Phone
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="auth-identifier">
                  {method === "email" ? "Email address" : "Phone number"}
                </label>
                <input
                  id="auth-identifier"
                  type={method === "email" ? "email" : "tel"}
                  autoComplete={method === "email" ? "email" : "tel"}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "auth-identifier-error" : undefined}
                />
                {error && (
                  <p id="auth-identifier-error" className="field-error" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary auth-submit">
                Send demo code
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="google-btn"
              aria-expanded={googleOpen}
              onClick={() => setGoogleOpen((o) => !o)}
            >
              <span className="google-g" aria-hidden="true">
                G
              </span>
              Continue with Google
            </button>

            {googleOpen && (
              <div className="google-demo" role="region" aria-label="Google sign-in demo">
                <p>
                  <strong>Demo only.</strong> In the production version this opens Google's own
                  secure sign-in window. No Google account is used here.
                </p>
                <div className="google-demo-actions">
                  <button type="button" className="btn btn-primary btn-sm" onClick={signInWithGoogleDemo}>
                    Continue as demo customer
                  </button>
                  <button type="button" className="link-btn" onClick={() => setGoogleOpen(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <p className="provisional auth-note">
              No password is requested or stored. No code is actually sent.
            </p>
          </div>

          <DemoAuthBanner />
        </div>
      </section>
    </>
  );
}