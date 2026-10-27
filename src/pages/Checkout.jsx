import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, ShoppingBag } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import DemoNotice from "../components/DemoNotice.jsx";
import { useCart } from "../hooks/useCart.js";
import { createReference, saveLastOrder, validateCheckout } from "../utils/order.js";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [stage, setStage] = useState("details"); // "details" | "review"
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleContinue(e) {
    e.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setStage("review");
      window.scrollTo(0, 0);
    }
  }

  function handleSubmit() {
    const order = {
      reference: createReference(),
      createdAt: new Date().toISOString(),
      customer: values,
      items,
      subtotal,
    };
    saveLastOrder(order);
    clearCart();
    navigate("/order-confirmation", { replace: true });
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
      <div className={`form-field ${props.wide ? "form-wide" : ""}`}>
        <label htmlFor={name}>
          {label}
          {props.optional && <span className="optional"> (optional)</span>}
        </label>
        {props.multiline ? (
          <textarea rows={3} {...common} />
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

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Order request" title="Order request" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <ShoppingBag size={44} strokeWidth={1.4} aria-hidden="true" />
              <h2>Your cart is empty</h2>
              <p>Add products to your cart before making an order request.</p>
              <Link to="/products" className="btn btn-primary">
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Order request"
        title={stage === "details" ? "Your details" : "Review your request"}
        text="This demo shows the proposed ordering flow. No payment is taken and nothing is sent."
      />

      <section className="section">
        <div className="container cart-layout">
          <div>
            <ol className="steps" aria-label="Order request progress">
              <li className={stage === "details" ? "step-current" : "step-done"}>
                <span>1</span> Details
              </li>
              <li className={stage === "review" ? "step-current" : ""}>
                <span>2</span> Review
              </li>
            </ol>

            {stage === "details" ? (
              <form className="checkout-form" onSubmit={handleContinue} noValidate>
                <div className="form-grid">
                  {field("name", "Full name", { autoComplete: "name" })}
                  {field("email", "Email address", { type: "email", autoComplete: "email" })}
                  {field("phone", "Phone number", { type: "tel", autoComplete: "tel" })}
                  {field("address", "Delivery address", {
                    autoComplete: "street-address",
                    wide: true,
                  })}
                  {field("city", "City", { autoComplete: "address-level2" })}
                  {field("postalCode", "Postal code", { autoComplete: "postal-code" })}
                  {field("notes", "Order notes", { multiline: true, optional: true, wide: true })}
                </div>
                <div className="form-actions">
                  <Link to="/cart" className="text-link">
                    <ArrowLeft size={16} aria-hidden="true" /> Back to cart
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Review order request
                  </button>
                </div>
                <DemoNotice />
              </form>
            ) : (
              <div className="review">
                <div className="review-block">
                  <h2>Contact and delivery</h2>
                  <dl className="review-list">
                    <div>
                      <dt>Name</dt>
                      <dd>{values.name}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{values.email}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{values.phone}</dd>
                    </div>
                    <div>
                      <dt>Address</dt>
                      <dd>
                        {values.address}, {values.city}, {values.postalCode}
                      </dd>
                    </div>
                    {values.notes.trim() && (
                      <div>
                        <dt>Notes</dt>
                        <dd>{values.notes}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setStage("details")}
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Edit details
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                    <Send size={16} aria-hidden="true" /> Submit order request
                  </button>
                </div>
                <DemoNotice />
              </div>
            )}
          </div>

          <OrderSummary items={items} subtotal={subtotal} />
        </div>
      </section>
    </>
  );
}