import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, "bookings"),
      where("userId", "==", auth.currentUser.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setBookings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, []);

  return (
    <div className="dashboard">
      {/* NAVBAR */}
      <nav className="navbar">
        <h2>Dashboard</h2>
        <button className="btn-primary" onClick={() => signOut(auth)}>
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-booking">Create Booking</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <h3>Your Bookings</h3>

          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="booking-cards">
              {bookings.map((b) => (
                <div className="booking-card" key={b.id}>
                  <div className="booking-img-container">
                    <img
                      src={b.carImage || "/images/placeholder-car.png"}
                      alt="Car"
                      className="booking-car-img"
                    />
                  </div>
                  <h4>{b.carName || "Car Booking"}</h4>
                  <p>Pickup: {b.pickup}</p>
                  <p>Drop: {b.dropoff}</p>
                  <p>Date: {b.date}</p>
                  <p>Status: {b.status}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
