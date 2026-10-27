import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import OrderSummary from "../components/OrderSummary.jsx";
import DemoNotice from "../components/DemoNotice.jsx";
import { loadLastOrder } from "../utils/order.js";

export default function OrderConfirmation() {
  const [order] = useState(loadLastOrder);

  if (!order) {
    return (
      <>
        <PageHeader eyebrow="Order request" title="No order request to show" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <ShoppingBag size={44} strokeWidth={1.4} aria-hidden="true" />
              <h2>Nothing here yet</h2>
              <p>Submit a demo order request to see the confirmation screen.</p>
              <Link to="/products" className="btn btn-primary">
                Explore Products
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const { customer } = order;

  return (
    <section className="section">
      <div className="container confirm">
        <div className="confirm-head" role="status">
          <CheckCircle2 size={44} aria-hidden="true" />
          <p className="eyebrow">Demo order request</p>
          <h1>Thank you, {customer.name.trim()}.</h1>
          <p className="lead confirm-lead">
            Your demo order request has been recorded in this browser only.
          </p>
          <div className="reference">
            <span>Demo reference</span>
            <strong>{order.reference}</strong>
          </div>
          <p className="provisional">
            This reference is a demo value and is not a real order number.
          </p>
        </div>

        <DemoNotice />

        <div className="confirm-grid">
          <div className="review-block">
            <h2>Contact and delivery</h2>
            <dl className="review-list">
              <div>
                <dt>Submitted</dt>
                <dd>{new Date(order.createdAt).toLocaleString("en-IN")}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{customer.email}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{customer.phone}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {customer.address}, {customer.city}, {customer.postalCode}
                </dd>
              </div>
              {customer.notes && customer.notes.trim() && (
                <div>
                  <dt>Notes</dt>
                  <dd>{customer.notes}</dd>
                </div>
              )}
            </dl>
          </div>

          <OrderSummary items={order.items} subtotal={order.subtotal} title="Items requested" />
        </div>

        <div className="confirm-actions">
          <Link to="/products" className="btn btn-primary">
            Continue browsing
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}