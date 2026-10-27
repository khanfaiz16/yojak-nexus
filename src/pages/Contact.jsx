import { useState } from "react";
import { CheckCircle2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { contactInfo } from "../data/siteContent.js";

const emptyForm = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.subject.trim().length < 3) {
    errors.subject = "Please enter a subject (at least 3 characters).";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Please write a message (at least 10 characters).";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setValues(emptyForm);
    setErrors({});
    setSubmitted(false);
  }

  function field(name, label, props = {}) {
    const hasError = Boolean(errors[name]);
    const common = {
      id: name,
      name,
      value: values[name],
      onChange: handleChange,
      "aria-invalid": hasError,
      "aria-describedby": hasError ? `${name}-error` : undefined,
    };
    return (
      <div className="form-field">
        <label htmlFor={name}>{label}</label>
        {props.multiline ? (
          <textarea rows={6} {...common} />
        ) : (
          <input type={props.type || "text"} autoComplete={props.autoComplete} {...common} />
        )}
        {hasError && (
          <p id={`${name}-error`} className="field-error" role="alert">
            {errors[name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact us"
        title="Get in touch"
        text="Send an enquiry using the form. In this demo the form is checked in your browser only."
      />

      <section className="section">
        <div className="container contact-layout">
          <div>
            {submitted ? (
              <div className="form-success" role="status">
                <CheckCircle2 size={36} aria-hidden="true" />
                <h2>Thank you, {values.name.trim()}.</h2>
                <p>
                  <strong>Demo only — your enquiry has not been sent.</strong>
                </p>
                <p>
                  In the production version, this form would deliver your message to the
                  YOJAK NEXUS team.
                </p>
                <button type="button" className="btn btn-outline" onClick={handleReset}>
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {field("name", "Your name", { autoComplete: "name" })}
                {field("email", "Email address", { type: "email", autoComplete: "email" })}
                {field("subject", "Subject")}
                {field("message", "Message", { multiline: true })}
                <button type="submit" className="btn btn-primary">
                  Send enquiry
                </button>
                <p className="provisional">
                  Demo only — your enquiry will not be sent anywhere.
                </p>
              </form>
            )}
          </div>

          <aside className="contact-info">
            <span className="demo-pill">Placeholder details</span>
            <h2>Contact details</h2>
            <ul>
              <li>
                <Mail size={20} aria-hidden="true" />
                <span>{contactInfo.email}</span>
              </li>
              <li>
                <Phone size={20} aria-hidden="true" />
                <span>{contactInfo.phone}</span>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <ExternalLink size={20} aria-hidden="true" />
                <a href={contactInfo.instagram} target="_blank" rel="noreferrer">
                  Instagram profile
                </a>
              </li>
            </ul>
            <p className="provisional">
              These are not official details. They will be replaced with the client's real
              contact information.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}