import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "bookings"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [user]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">Welcome, {user?.email}</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl">Total Bookings: {bookings.length}</h2>
        <Link to="/add-booking" className="bg-blue-500 text-white px-4 py-2 rounded">Add Booking</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map(b => (
          <div key={b.id} className="border p-4 rounded shadow">
            <p><strong>Pickup:</strong> {b.pickup}</p>
            <p><strong>Dropoff:</strong> {b.dropoff}</p>
            <p><strong>Date:</strong> {b.date}</p>
            <p><strong>Status:</strong> {b.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
