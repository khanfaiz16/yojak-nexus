import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { sampleOrderHistory } from "../../data/demoAccount.js";
import { loadOrderHistory } from "../../utils/order.js";
import { formatPrice } from "../../utils/format.js";

function totalOf(items) {
  return items.reduce((sum, i) => sum + i.qty * i.price, 0);
}

function OrderCard({ order, source }) {
  const total = order.subtotal ?? totalOf(order.items);
  const statusLabel = order.status || "Request received (demo)";
  const tone = order.statusTone || "info";

  return (
    <details className="order-card">
      <summary>
        <div>
          <strong>{order.reference}</strong>
          <span className="order-date">
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
        <span className={`badge badge-${tone}`}>{statusLabel}</span>
        <span className="order-total">{formatPrice(total)}</span>
      </summary>

      <div className="order-body">
        <p className="provisional">{source}</p>
        <ul className="summary-list">
          {order.items.map((item) => (
            <li key={item.key}>
              <div>
                <strong>{item.name}</strong>
                {item.variant && <span className="summary-variant">{item.variant}</span>}
                <span className="summary-qty">
                  {item.qty} × {formatPrice(item.price)}
                </span>
              </div>
              <span className="summary-line">{formatPrice(item.qty * item.price)}</span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function OrderHistory() {
  const [submitted] = useState(loadOrderHistory);

  const hasAny = submitted.length > 0 || sampleOrderHistory.length > 0;

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Order history</h2>
        <span className="demo-pill">Demo records</span>
      </div>

      {!hasAny ? (
        <div className="empty-state">
          <ShoppingBag size={44} strokeWidth={1.4} aria-hidden="true" />
          <h3>No orders yet</h3>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <>
          {submitted.length > 0 && (
            <>
              <h3 className="order-group">Submitted in this demo</h3>
              <div className="order-list">
                {submitted.map((order) => (
                  <OrderCard
                    key={order.reference}
                    order={order}
                    source="Demo order request submitted in this browser. Nothing was sent."
                  />
                ))}
              </div>
            </>
          )}

          <h3 className="order-group">Sample records</h3>
          <div className="order-list">
            {sampleOrderHistory.map((order) => (
              <OrderCard
                key={order.reference}
                order={order}
                source="Fictional sample record for demonstration only."
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}