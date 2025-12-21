import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing" style={{ backgroundImage: "url(/landing-bg.jpg)" }}>
      <div className="landing-overlay" />

      <div className="landing-card">
        <span className="badge">Premium Car Rental</span>

        <h1>
          Book <span>Luxury Cars</span><br />With Confidence
        </h1>

        <p>
          A modern car booking platform designed for comfort,
          speed, and reliability.
        </p>

        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-secondary">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
