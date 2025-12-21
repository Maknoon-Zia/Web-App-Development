import { Link } from "react-router-dom";
import bgImage from "../images/login-bg.jpg"; 

export default function Landing() {
  return (
    <div className="landing-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="landing-content">
        <h1>Car Booking App</h1>
        <p>Book luxury cars easily and manage your bookings.</p>
        <div className="landing-buttons">
          <Link to="/login" className="btn-primary">Login</Link>
          <Link to="/signup" className="btn-secondary">Signup</Link>
        </div>
      </div>
    </div>
  );
}
