import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Lightbulb } from "lucide-react";
import PageHeader from "../../components/PageHeader.jsx";
import DemoAuthBanner from "../../components/DemoAuthBanner.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { DEMO_OTP } from "../../data/demoAccount.js";

export default function VerifyOtp({ channel }) {
  const { user, pending, verifyOtp } = useAuth();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [resent, setResent] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timer = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  if (user) {
    return <Navigate to="/account/profile" replace />;
  }

  if (!pending || pending.channel !== channel) {
    return <Navigate to="/account/sign-in" replace />;
  }

  const label = channel === "email" ? "email" : "phone";

  function handleSubmit(e) {
    e.preventDefault();
    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    if (!verifyOtp(code)) {
      setError(`That code is not correct. In this demo, use ${DEMO_OTP}.`);
    }
    // On success the page redirects to the profile automatically.
  }

  function handleResend() {
    setSeconds(30);
    setResent(true);
    setError("");
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title={channel === "email" ? "Check your email" : "Check your phone"}
        text={`Enter the 6-digit code for ${pending.value}.`}
      />

      <section className="section">
        <div className="container auth-wrap">
          <div className="auth-card">
            <p className="demo-code-hint">
              <Lightbulb size={18} aria-hidden="true" />
              <span>
                <strong>Demo code: {DEMO_OTP}</strong>
                <br />
                No message was sent to your {label}.
              </span>
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-field">
                <label htmlFor="otp-code">6-digit code</label>
                <input
                  id="otp-code"
                  className="otp-input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "otp-error" : undefined}
                  autoFocus
                />
                {error && (
                  <p id="otp-error" className="field-error" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <button type="submit" className="btn btn-primary auth-submit">
                Verify and continue
              </button>
            </form>

            <div className="otp-links">
              {seconds > 0 ? (
                <span className="provisional">Resend available in {seconds}s</span>
              ) : (
                <button type="button" className="link-btn" onClick={handleResend}>
                  Resend code
                </button>
              )}
              <Link to="/account/sign-in" className="text-link">
                Change {label}
              </Link>
            </div>

            {resent && (
              <p className="provisional" role="status">
                Demo only — no code was sent.
              </p>
            )}
          </div>

          <DemoAuthBanner />
        </div>
      </section>
    </>
  );
}