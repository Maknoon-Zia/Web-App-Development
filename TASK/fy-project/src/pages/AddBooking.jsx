import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function AddBooking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "bookings"), {
      userId: auth.currentUser.uid,
      pickup,
      dropoff,
      date,
      status: "Pending",
      createdAt: serverTimestamp(),
    });

    navigate("/dashboard");
  };

  return (
    <div className="booking-container">
      <div className="booking-card">
        <h2>Create Booking</h2>
        <p>Fill the details below</p>

        <form onSubmit={handleSubmit} className="booking-form">
          <label>Pickup Location</label>
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            required
          />

          <label>Dropoff Location</label>
          <input
            type="text"
            placeholder="Enter dropoff location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Create Booking
          </button>
        </form>

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
