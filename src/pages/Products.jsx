import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { PackageSearch, Search } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.js";
import { filterProducts, sortOptions, sortProducts } from "../utils/catalogue.js";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const rawCategory = searchParams.get("category") || "all";
  const categoryId = categories.some((c) => c.id === rawCategory) ? rawCategory : "all";
  const rawSort = searchParams.get("sort");
  const sort = sortOptions.some((o) => o.value === rawSort) ? rawSort : "featured";
  const inStockOnly = searchParams.get("instock") === "1";

  const results = useMemo(
    () => sortProducts(filterProducts(products, { q, categoryId, inStockOnly }), sort),
    [q, categoryId, inStockOnly, sort]
  );

  const hasFilters = Boolean(q) || categoryId !== "all" || inStockOnly;

  // Keep the URL as the single source of truth for filters
  function updateParams(changes) {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === "all" || value === "featured") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next, { replace: true });
  }

  function clearFilters() {
    setSearchParams({}, { replace: true });
  }

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="The demo catalogue"
        text="Sample products with sample prices. The real range replaces these once the client supplies it."
      />

      <section className="section catalogue">
        <div className="container">
          <div className="toolbar">
            <form className="toolbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <Search size={18} aria-hidden="true" />
              <label htmlFor="catalogue-search" className="visually-hidden">
                Search products
              </label>
              <input
                id="catalogue-search"
                type="search"
                placeholder="Search products..."
                value={q}
                onChange={(e) => updateParams({ q: e.target.value })}
              />
            </form>

            <div className="toolbar-controls">
              <label className="check">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => updateParams({ instock: e.target.checked ? "1" : "" })}
                />
                In stock only
              </label>

              <div className="select-wrap">
                <label htmlFor="catalogue-sort">Sort by</label>
                <select
                  id="catalogue-sort"
                  value={sort}
                  onChange={(e) => updateParams({ sort: e.target.value })}
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="chips" role="group" aria-label="Filter by category">
            <button
              type="button"
              className={`chip ${categoryId === "all" ? "chip-active" : ""}`}
              aria-pressed={categoryId === "all"}
              onClick={() => updateParams({ category: "all" })}
            >
              All <span>{products.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${categoryId === c.id ? "chip-active" : ""}`}
                aria-pressed={categoryId === c.id}
                onClick={() => updateParams({ category: c.id })}
              >
                {c.name} <span>{products.filter((p) => p.categoryId === c.id).length}</span>
              </button>
            ))}
          </div>

          <p className="results-count" aria-live="polite">
            Showing {results.length} of {products.length} products
            {hasFilters && (
              <button type="button" className="link-btn" onClick={clearFilters}>
                Clear filters
              </button>
            )}
          </p>

          {results.length > 0 ? (
            <div className="product-grid">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <PackageSearch size={44} strokeWidth={1.4} aria-hidden="true" />
              <h2>No products match your search</h2>
              <p>Try a different word, another category, or clear the filters.</p>
              <button type="button" className="btn btn-outline" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}