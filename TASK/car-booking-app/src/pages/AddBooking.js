import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function AddBooking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "bookings"), {
        userId: auth.currentUser.uid,
        pickup,
        dropoff,
        date,
        status: "Pending",
        createdAt: serverTimestamp()
      });
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleAdd} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">Add Booking</h2>
        <input type="text" placeholder="Pickup Location" value={pickup} onChange={(e) => setPickup(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="text" placeholder="Dropoff Location" value={dropoff} onChange={(e) => setDropoff(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Create Booking</button>
      </form>
    </div>
  );
}
