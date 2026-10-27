import { Link } from "react-router-dom";
import { ArrowRight, Eye, Target } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { aboutContent, brand } from "../data/siteContent.js";
import logoImage from "../assets/yojak-nexus-logo.jpg";

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title={aboutContent.intro.title}
        text={aboutContent.intro.text}
      />

      {/* BRAND STORY */}
      <section className="section">
        <div className="container split">
          <div className="story-media">
            <img src={logoImage} alt={`${brand.name} logo with tagline`} />
          </div>
          <div>
            <p className="eyebrow">Brand story</p>
            <h2>{aboutContent.story.title}</h2>
            <p className="lead">{aboutContent.story.text}</p>
            <p className="provisional">
              Provisional copy for demonstration. The real brand story will replace this.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="container">
        <div className="mv-grid">
          <div className="mv-panel mv-navy">
            <Target size={28} aria-hidden="true" />
            <h2>Our mission</h2>
            <p>{aboutContent.mission}</p>
          </div>
          <div className="mv-panel mv-soft">
            <Eye size={28} aria-hidden="true" />
            <h2>Our vision</h2>
            <p>{aboutContent.vision}</p>
          </div>
        </div>
        <p className="provisional mv-note">
          Mission and vision are proposed statements for the demo, to be confirmed by the client.
        </p>
      </section>

      {/* PHILOSOPHY */}
      <section className="section">
        <div className="container split split-top">
          <div>
            <p className="eyebrow">Brand philosophy</p>
            <h2>What guides the brand</h2>
            <p className="provisional">Provisional copy for demonstration.</p>
          </div>
          <ol className="numbered-list">
            {aboutContent.philosophy.map((item, index) => (
              <li key={item.title}>
                <span className="numbered-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRODUCT APPROACH */}
      <section className="section section-tint">
        <div className="container split split-top">
          <div>
            <p className="eyebrow">Product approach</p>
            <h2>How products are presented</h2>
            <p className="provisional">
              Describes the proposed website experience, not verified product facts.
            </p>
          </div>
          <ol className="numbered-list">
            {aboutContent.approach.map((item, index) => (
              <li key={item.title}>
                <span className="numbered-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-cta cta-spaced">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>Ready to look at the range?</h2>
              <p>Browse the demo catalogue and try the ordering experience.</p>
            </div>
            <Link to="/products" className="btn btn-primary">
              Explore Products <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}