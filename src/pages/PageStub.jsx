import { Link } from "react-router-dom";

export default function PageStub({ title }) {
  return (
    <section className="stub">
      <div className="container">
        <p className="eyebrow">Coming in a later step</p>
        <h1>{title}</h1>
        <p className="lead">This page is built in an upcoming step of the demo.</p>
        <Link to="/" className="btn btn-outline">
          Back to Home
        </Link>
      </div>
    </section>
  );
}