import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { navLinks } from "../data/siteContent.js";
import { useCart } from "../hooks/useCart.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus when the page changes
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Close menus with the Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const term = query.trim();
    navigate(term ? `/products?q=${encodeURIComponent(term)}` : "/products");
    setQuery("");
    setSearchOpen(false);
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />

        <nav
          id="main-nav"
          className={`main-nav ${menuOpen ? "open" : ""}`}
          aria-label="Main navigation"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Search products"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
          >
            <Search size={20} aria-hidden="true" />
          </button>
          <Link to="/account" className="icon-btn" aria-label="My account">
            <User size={20} aria-hidden="true" />
          </Link>
          <Link
            to="/cart"
            className="icon-btn"
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
          >
            <ShoppingBag size={20} aria-hidden="true" />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
          <Link to="/products" className="btn btn-primary btn-sm header-cta">
            Shop Now
          </Link>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <form className="container search-form" onSubmit={handleSearch} role="search">
            <label htmlFor="site-search" className="visually-hidden">
              Search products
            </label>
            <input
              id="site-search"
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
}