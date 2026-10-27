import { Link } from "react-router-dom";
import Logo from "./Logo.jsx";
import { brand, contactInfo, navLinks } from "../data/siteContent.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-tagline">{brand.tagline}</p>
        </div>

        <div>
          <h3 className="footer-heading">Explore</h3>
          <ul className="footer-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Shop</h3>
          <ul className="footer-list">
            <li>
              <Link to="/products">All products</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/account">My account</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="footer-heading">Contact (demo details)</h3>
          <ul className="footer-list">
            <li>{contactInfo.email}</li>
            <li>{contactInfo.phone}</li>
            <li>{contactInfo.address}</li>
            <li>
              <a href={contactInfo.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          Demo website for client presentation. Contact details above are placeholders.
        </div>
      </div>
    </footer>
  );
}