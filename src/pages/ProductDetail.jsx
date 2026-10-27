import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Check, ChevronRight, PackageSearch, ShoppingBag } from "lucide-react";
import ProductVisual from "../components/ProductVisual.jsx";
import ProductCard from "../components/ProductCard.jsx";
import QuantitySelector from "../components/QuantitySelector.jsx";
import { categories, products } from "../data/products.js";
import { availabilityLabels, formatPrice } from "../utils/format.js";
import { useCart } from "../hooks/useCart.js";

const tones = ["navy", "teal", "green", "soft"];

const stockMessages = {
  "in-stock": "Available for order requests.",
  "low-stock": "Only a few left (demo stock level).",
  "out-of-stock": "Currently unavailable.",
};

function ProductDetailView({ product }) {
  const { addItem } = useCart();
  const category = categories.find((c) => c.id === product.categoryId);
  const outOfStock = product.availability === "out-of-stock";
  const maxQty = Math.max(1, Math.min(product.stock, 10));

  const [viewIndex, setViewIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState(product.options ? product.options.values[0] : null);
  const [added, setAdded] = useState(false);

  // Three demo "views" using rotating colours
  const startTone = tones.indexOf(product.tone);
  const views = [0, 1, 2].map((i) => tones[(startTone + i) % tones.length]);

  const related = [
    ...products.filter((p) => p.id !== product.id && p.categoryId === product.categoryId),
    ...products.filter((p) => p.id !== product.id && p.categoryId !== product.categoryId),
  ].slice(0, 3);

  function handleAdd() {
    const variant = product.options ? `${product.options.label}: ${selected}` : null;
    addItem(product, qty, variant);
    setAdded(true);
  }

  return (
    <>
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <section className="detail">
        <div className="container detail-grid">
          {/* GALLERY */}
          <div className="gallery">
            <ProductVisual tone={views[viewIndex]} categoryId={product.categoryId} ratio="1 / 1" />
            <div className="thumbs">
              {views.map((tone, index) => (
                <button
                  key={index}
                  type="button"
                  className={`thumb ${viewIndex === index ? "thumb-active" : ""}`}
                  aria-label={`Show image ${index + 1} of ${views.length}`}
                  aria-pressed={viewIndex === index}
                  onClick={() => setViewIndex(index)}
                >
                  <ProductVisual tone={tone} categoryId={product.categoryId} ratio="1 / 1" />
                </button>
              ))}
            </div>
            <p className="provisional">Demo images. Real product photography replaces these.</p>
          </div>

          {/* INFO */}
          <div className="detail-info">
            <p className="eyebrow">{category ? category.name : ""}</p>
            <h1>{product.name}</h1>

            <p className="detail-price">
              {formatPrice(product.price)} <small>Demo price, not a confirmed price</small>
            </p>

            <p className="lead">{product.description}</p>

            <div className={`stock-panel stock-${product.availability}`}>
              <span className={`badge badge-${product.availability}`}>
                {availabilityLabels[product.availability]}
              </span>
              <span>{stockMessages[product.availability]}</span>
            </div>

            {product.options && (
              <fieldset className="option-group">
                <legend>
                  {product.options.label}: <strong>{selected}</strong>
                </legend>
                <div className="option-pills">
                  {product.options.values.map((value) => (
                    <label
                      key={value}
                      className={`pill ${selected === value ? "pill-active" : ""}`}
                    >
                      <input
                        type="radio"
                        name="product-option"
                        value={value}
                        checked={selected === value}
                        onChange={() => {
                          setSelected(value);
                          setAdded(false);
                        }}
                        className="visually-hidden"
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="buy-row">
              <QuantitySelector
                value={qty}
                onChange={(v) => {
                  setQty(v);
                  setAdded(false);
                }}
                max={maxQty}
              />
              <button
                type="button"
                className="btn btn-primary buy-btn"
                onClick={handleAdd}
                disabled={outOfStock}
              >
                {added ? (
                  <>
                    <Check size={18} aria-hidden="true" /> Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} aria-hidden="true" />{" "}
                    {outOfStock ? "Unavailable" : "Add to cart"}
                  </>
                )}
              </button>
            </div>

            {added && (
              <p className="added-note" role="status">
                Item added. <Link to="/cart">View cart</Link> or keep browsing.
              </p>
            )}

            {product.details && (
              <div className="detail-list">
                <h2>Product details (demo)</h2>
                <ul className="tick-list">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">You may also like</p>
              <h2>Related products</h2>
            </div>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <PackageSearch size={44} strokeWidth={1.4} aria-hidden="true" />
            <h1>Product not found</h1>
            <p>This product does not exist in the demo catalogue.</p>
            <Link to="/products" className="btn btn-primary">
              Back to Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // key resets the selected option, quantity and gallery when moving to another product
  return <ProductDetailView key={product.id} product={product} />;
}