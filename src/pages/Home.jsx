import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  HeartHandshake,
  Mail,
  Sparkles,
} from "lucide-react";
import ProductVisual from "../components/ProductVisual.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { categories, products } from "../data/products.js";
import { leaders } from "../data/leadership.js";
import { brand, brandStory, hero, whyChoose } from "../data/siteContent.js";
import logoImage from "../assets/yojak-nexus-logo.jpg";

const whyIcons = {
  presentation: Sparkles,
  support: HeartHandshake,
  ordering: ClipboardList,
};

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="lead">{hero.text}</p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">
                Explore Products <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/about" className="btn btn-outline">
                About Us
              </Link>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="false">
            <ProductVisual tone="navy" categoryId="essentials" ratio="3 / 4" />
            <ProductVisual tone="teal" categoryId="gifting" ratio="3 / 4" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Shop by category</p>
              <h2>Find your way around the range</h2>
            </div>
          </div>
          <div className="category-list">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="category-row"
              >
                <span className="category-num">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="category-name">{cat.name}</span>
                  <span className="category-blurb">{cat.blurb}</span>
                </span>
                <ArrowRight size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section section-tint">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured</p>
              <h2>Selected products</h2>
            </div>
            <Link to="/products" className="text-link">
              View all products <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY PREVIEW */}
      <section className="section">
        <div className="container split">
          <div className="story-media">
            <img src={logoImage} alt={`${brand.name} logo with tagline`} />
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2>{brandStory.title}</h2>
            <p className="lead">{brandStory.text}</p>
            <p className="provisional">Provisional copy for demonstration.</p>
            <Link to="/about" className="btn btn-outline">
              Read more about us
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US PREVIEW */}
      <section className="band-navy">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow eyebrow-light">Why choose us</p>
              <h2>The proposed brand experience</h2>
            </div>
            <Link to="/why-choose-us" className="text-link text-link-light">
              See more <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="why-grid">
            {whyChoose.map((item) => {
              const Icon = whyIcons[item.key];
              return (
                <div key={item.key} className="why-item">
                  <span className="why-icon">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
          <p className="provisional provisional-light">
            Proposed experience. Final points will be confirmed with the client.
          </p>
        </div>
      </section>

      {/* LEADERSHIP PREVIEW */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Leadership</p>
              <h2>The people behind the brand</h2>
            </div>
            <Link to="/leadership" className="text-link">
              Meet the team <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="leaders">
            {leaders.map((l) => (
              <div key={l.id} className="leader">
                <span className="avatar" aria-hidden="true">
                  {l.initials}
                </span>
                <div>
                  <h3>{l.name}</h3>
                  <p className="leader-role">{l.role}</p>
                  <span className="demo-pill">Demo placeholder</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section-cta">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Have a question or an order in mind?</h2>
              <p>Send an enquiry and the team can get back to you.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">
              <Mail size={18} aria-hidden="true" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}