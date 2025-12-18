import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        eventId: event?.id || null,
        eventTitle: event?.title || "Unknown Event",
        timestamp: serverTimestamp(),
      });
      setFormData({ name: "", email: "", phone: "" });
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.error("Error saving registration:", error);
      setLoading(false);
      alert("Failed to register. Please try again.");
    }
  };

  const closePopup = () => {
    setSuccess(false);
    navigate("/events");
  };

  return (
    <div
      className="max-w-md mx-auto p-6 rounded-lg mt-6 shadow-md"
      style={{ backgroundColor: "rgb(249,243,239)" }}
    >
      <h1 className="text-xl font-bold mb-2" style={{ color: "rgb(33,53,85)" }}>
        {event?.title || "Event"}
      </h1>
      <p className="mb-4" style={{ color: "rgb(62,88,121)" }}>
        {event?.location || "Location not specified"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rgb(62,88,121)"
          style={{
            border: "1px solid rgb(62,88,121)",
            backgroundColor: "rgb(245,239,231)",
            color: "rgb(33,53,85)",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rgb(62,88,121)"
          style={{
            border: "1px solid rgb(62,88,121)",
            backgroundColor: "rgb(245,239,231)",
            color: "rgb(33,53,85)",
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rgb(62,88,121)"
          style={{
            border: "1px solid rgb(62,88,121)",
            backgroundColor: "rgb(245,239,231)",
            color: "rgb(33,53,85)",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-md flex justify-center items-center font-semibold transition hover:bg-navy"
          style={{ backgroundColor: "rgb(62,88,121)", color: "rgb(245,239,231)" }}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Success Popup */}
      {success && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="p-6 rounded-lg shadow-lg max-w-sm text-center space-y-4"
            style={{ backgroundColor: "rgb(249,243,239)" }}
          >
            <h2 className="text-xl font-bold" style={{ color: "rgb(33,53,85)" }}>
              Registration Successful 🎉
            </h2>
            <p style={{ color: "rgb(62,88,121)" }}>
              Thank you for registering for {event?.title}!
            </p>
            <button
              onClick={closePopup}
              className="py-2 px-4 rounded-md font-semibold transition hover:bg-navy"
              style={{ backgroundColor: "rgb(62,88,121)", color: "rgb(245,239,231)" }}
            >
              Back to Events
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
