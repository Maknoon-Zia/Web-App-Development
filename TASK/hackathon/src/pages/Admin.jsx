import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  // Fetch events & registrations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const eventsData = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);

        const regs = {};
        for (const event of eventsData) {
          const q = query(
            collection(db, "registrations"),
            where("eventId", "==", event.id)
          );
          const regSnapshot = await getDocs(q);
          regs[event.id] = regSnapshot.docs.map((doc) => doc.data());
        }
        setRegistrations(regs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle form changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), formData);
      setFormData({ title: "", date: "", location: "", description: "" });
      window.location.reload();
    } catch (error) {
      alert("Failed to add event.");
      console.error(error);
    }
  };

  // Delete event
  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await deleteDoc(doc(db, "events", id));
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      alert("Failed to delete event.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6" style={{ backgroundColor: "rgb(245,239,231)" }}>
      <h1 className="text-3xl font-bold text-center" style={{ color: "rgb(33,53,85)" }}>Admin Dashboard</h1>

      {/* Add Event Form */}
      <form onSubmit={handleAddEvent} className="p-4 rounded-md shadow-md space-y-3" style={{ backgroundColor: "rgb(249, 243, 239)" }}>
        <h2 className="text-xl font-semibold" style={{ color: "rgb(33,53,85)" }}>Add New Event</h2>

        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full px-3 py-2 rounded-md"
          style={{ border: "1px solid rgb(62,88,121)", backgroundColor: "rgb(245,239,231)", color: "rgb(33,53,85)" }}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md"
          style={{ border: "1px solid rgb(62,88,121)", backgroundColor: "rgb(245,239,231)", color: "rgb(33,53,85)" }}
          required
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-3 py-2 rounded-md"
          style={{ border: "1px solid rgb(62,88,121)", backgroundColor: "rgb(245,239,231)", color: "rgb(33,53,85)" }}
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full px-3 py-2 rounded-md"
          style={{ border: "1px solid rgb(62,88,121)", backgroundColor: "rgb(245,239,231)", color: "rgb(33,53,85)" }}
          required
        />
        <button
          type="submit"
          className="py-2 px-4 rounded-md"
          style={{ backgroundColor: "rgb(62,88,121)", color: "rgb(245,239,231)" }}
        >
          Add Event
        </button>
      </form>

      {/* Events List */}
      {events.length === 0 ? (
        <p className="text-center" style={{ color: "rgb(33,53,85)" }}>No events yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="p-4 rounded-lg shadow-md" style={{ backgroundColor: "rgb(249, 243, 239)" }}>
              <h2 className="text-2xl font-semibold" style={{ color: "rgb(33,53,85)" }}>{event.title}</h2>
              <p style={{ color: "rgb(62,88,121)" }}>{event.date} | {event.location}</p>
              <p className="mt-2" style={{ color: "rgb(33,53,85)" }}>{event.description}</p>
              <p className="mt-2 font-medium" style={{ color: "rgb(33,53,85)" }}>
                Registrations: {registrations[event.id]?.length || 0}
              </p>
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="mt-2 py-2 px-4 rounded-md"
                style={{ backgroundColor: "rgb(62,88,121)", color: "rgb(245,239,231)" }}
              >
                Delete Event
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admin;
