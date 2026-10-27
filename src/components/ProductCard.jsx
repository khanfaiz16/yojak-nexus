import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ShoppingBag } from "lucide-react";
import ProductVisual from "./ProductVisual.jsx";
import { categories } from "../data/products.js";
import { availabilityLabels, formatPrice } from "../utils/format.js";
import { useCart } from "../hooks/useCart.js";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const category = categories.find((c) => c.id === product.categoryId);
  const outOfStock = product.availability === "out-of-stock";

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <ProductVisual tone={product.tone} categoryId={product.categoryId} />
      </Link>
      <div className="product-card-body">
        <p className="product-category">{category ? category.name : ""}</p>
        <h3 className="product-name">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="product-meta">
          <span className="product-price">
            {formatPrice(product.price)}
            <small> demo price</small>
          </span>
          <span className={`badge badge-${product.availability}`}>
            {availabilityLabels[product.availability]}
          </span>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm product-add"
          onClick={handleAdd}
          disabled={outOfStock}
        >
          {added ? (
            <>
              <Check size={16} aria-hidden="true" /> Added
            </>
          ) : (
            <>
              <ShoppingBag size={16} aria-hidden="true" />{" "}
              {outOfStock ? "Unavailable" : "Add to cart"}
            </>
          )}
        </button>
      </div>
    </article>
  );
}