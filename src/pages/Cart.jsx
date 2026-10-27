import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import ProductVisual from "../components/ProductVisual.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import DemoNotice from "../components/DemoNotice.jsx";
import { useCart } from "../hooks/useCart.js";
import { formatPrice } from "../utils/format.js";

export default function Cart() {
  const { items, count, subtotal, updateQty, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Cart" title="Your cart" />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <ShoppingBag size={44} strokeWidth={1.4} aria-hidden="true" />
              <h2>Your cart is empty</h2>
              <p>Add some demo products to try the ordering experience.</p>
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
        eyebrow="Cart"
        title="Your cart"
        text={`${count} item${count === 1 ? "" : "s"} in your cart.`}
      />

      <section className="section">
        <div className="container cart-layout">
          <div>
            <ul className="cart-list">
              {items.map((item) => (
                <li key={item.key} className="cart-row">
                  <Link
                    to={`/products/${item.id}`}
                    className="cart-thumb"
                    aria-label={`View ${item.name}`}
                  >
                    <ProductVisual tone={item.tone} categoryId={item.categoryId} ratio="1 / 1" />
                  </Link>

                  <div className="cart-info">
                    <h2>
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </h2>
                    {item.variant && <p className="cart-variant">{item.variant}</p>}
                    <p className="cart-unit">{formatPrice(item.price)} each (demo price)</p>
                  </div>

                  <div className="cart-qty">
                    <QuantitySelector
                      value={item.qty}
                      onChange={(v) => updateQty(item.key, v)}
                      label={`Quantity for ${item.name}`}
                    />
                  </div>

                  <div className="cart-total">{formatPrice(item.qty * item.price)}</div>

                  <button
                    type="button"
                    className="icon-btn cart-remove"
                    aria-label={`Remove ${item.name}${item.variant ? ` (${item.variant})` : ""} from cart`}
                    onClick={() => removeItem(item.key)}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-actions">
              <Link to="/products" className="text-link">
                Continue browsing
              </Link>
              <button type="button" className="link-btn" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </div>

          <aside className="summary">
            <h2>Cart total</h2>
            <div className="summary-total summary-total-flat">
              <span>Subtotal (demo prices)</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="provisional">
              Delivery and any other costs are not calculated in this demo.
            </p>
            <Link to="/checkout" className="btn btn-primary summary-btn">
              Continue to order request <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <DemoNotice />
          </aside>
        </div>
      </section>
    </>
  );
}