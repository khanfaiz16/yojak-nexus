import { formatPrice } from "../utils/format.js";

export default function OrderSummary({ items, subtotal, title = "Order summary" }) {
  return (
    <aside className="summary" aria-label={title}>
      <h2>{title}</h2>
      <ul className="summary-list">
        {items.map((item) => (
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
      <div className="summary-total">
        <span>Subtotal (demo prices)</span>
        <strong>{formatPrice(subtotal)}</strong>
      </div>
      <p className="provisional">
        Delivery and any other costs are not calculated in this demo.
      </p>
    </aside>
  );
}