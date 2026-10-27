import { Link } from "react-router-dom";
import {
  ArrowRight,
  ClipboardList,
  HeartHandshake,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { whyChooseDetails } from "../data/siteContent.js";

const icons = {
  presentation: Sparkles,
  attention: PackageCheck,
  support: HeartHandshake,
  ordering: ClipboardList,
};

export default function WhyChooseUs() {
  return (
    <>
      <PageHeader
        eyebrow="Why choose us"
        title="The proposed brand experience"
        text="This page shows how the website is designed to feel for customers. Points are proposals for the demo and will be confirmed with the client."
      />

      <section className="section">
        <div className="container">
          {whyChooseDetails.map((item, index) => {
            const Icon = icons[item.key];
            return (
              <div
                key={item.key}
                className={`why-row ${index % 2 === 1 ? "why-row-reverse" : ""}`}
              >
                <div className="why-row-visual">
                  <span className="why-row-icon">
                    <Icon size={40} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="why-row-index">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <p className="lead">{item.text}</p>
                  <ul className="tick-list">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <p className="provisional">
            No awards, certifications, or statistics are shown, because none have been
            supplied by the client.
          </p>
        </div>
      </section>

      <section className="section-cta cta-spaced">
        <div className="container">
          <div className="cta-panel">
            <div>
              <h2>See it in action</h2>
              <p>Browse the demo products and build a sample order request.</p>
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