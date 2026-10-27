import { useState } from "react";
import { useAuth } from "../../hooks/useAuth.js";

function validate(values) {
  const errors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
    errors.phone = "Please enter a phone number with 7 to 15 digits.";
  }
  return errors;
}

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setSaved(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    updateProfile({
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    });
    setSaved(true);
  }

  function field(name, label, type = "text", autoComplete) {
    const hasError = Boolean(errors[name]);
    return (
      <div className="form-field">
        <label htmlFor={`profile-${name}`}>{label}</label>
        <input
          id={`profile-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={values[name]}
          onChange={handleChange}
          aria-invalid={hasError}
          aria-describedby={hasError ? `profile-${name}-error` : undefined}
        />
        {hasError && (
          <p id={`profile-${name}-error`} className="field-error" role="alert">
            {errors[name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Profile</h2>
        <span className="demo-pill">Demo account</span>
      </div>
      <p className="provisional">Signed in with: {user.method}</p>

      <form className="profile-form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-wide">{field("name", "Name", "text", "name")}</div>
          {field("email", "Email address", "email", "email")}
          {field("phone", "Phone number", "tel", "tel")}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
          {saved && (
            <span className="saved-note" role="status">
              Saved in this browser (demo)
            </span>
          )}
        </div>
      </form>
    </div>
  );
}