import { ExternalLink } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { leaders } from "../data/leadership.js";

export default function Leadership() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Founders and leadership"
        text="This section is designed to introduce the people behind the brand. The profiles below are placeholders, not real people."
      />

      <section className="section">
        <div className="container">
          <div className="leader-profiles">
            {leaders.map((leader) => (
              <article key={leader.id} className="leader-profile">
                <div className="portrait" role="img" aria-label="Portrait placeholder">
                  <span>{leader.initials}</span>
                  <small>Portrait placeholder</small>
                </div>
                <div className="leader-profile-body">
                  <span className="demo-pill">Demo placeholder</span>
                  <h2>{leader.name}</h2>
                  <p className="leader-role">{leader.role}</p>
                  <p>{leader.bio}</p>
                  <p className="leader-social">
                    {leader.social ? (
                      <a href={leader.social} target="_blank" rel="noreferrer">
                        Social profile <ExternalLink size={14} aria-hidden="true" />
                      </a>
                    ) : (
                      <span>Social link: not added yet</span>
                    )}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="provisional">
            To use real profiles, edit <code>src/data/leadership.js</code> (name, role, bio,
            social link).
          </p>
        </div>
      </section>
    </>
  );
}