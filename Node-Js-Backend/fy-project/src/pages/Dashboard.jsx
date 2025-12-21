import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig"; // assuming firebase is setup
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get current user
    setUser(auth.currentUser);

    // Fetch bookings from Firestore
    const fetchBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "bookings"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <h2>Car Booking Dashboard</h2>
        <div className="nav-right">
          {user && <span>Welcome, {user.email}</span>}
          <button className="btn-primary" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-booking">Add Booking</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </aside>

        <main className="main-content">
          <h3>Your Bookings</h3>
          {bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <div className="booking-cards">
              {bookings.map((b) => (
                <div className="booking-card" key={b.id}>
                  <h4>{b.carName}</h4>
                  <p>Pickup: {b.pickupLocation}</p>
                  <p>Drop: {b.dropLocation}</p>
                  <p>Date: {b.date}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
