import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center"
        style={{ color: "rgb(33,53,85)" }}
      >
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center" style={{ color: "rgb(62,88,121)" }}>
          No events available
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 rounded-lg shadow-md border hover:shadow-xl transform hover:-translate-y-1 transition flex flex-col"
              style={{ backgroundColor: "rgb(249,243,239)" }}
            >
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: "rgb(33,53,85)" }}
              >
                {event.title}
              </h2>
              <p className="mb-1" style={{ color: "rgb(62,88,121)" }}>
                <span className="font-medium">Date:</span> {event.date}
              </p>
              <p className="mb-1" style={{ color: "rgb(62,88,121)" }}>
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <p className="mt-2 flex-1" style={{ color: "rgb(33,53,85)" }}>
                {event.description}
              </p>

              {/* Button pushed to bottom */}
              <button
                onClick={() => navigate("/register", { state: { event } })}
                className="mt-4 w-full py-2 rounded-md font-semibold transition duration-300"
                style={{
                  backgroundColor: "rgb(62,88,121)",
                  color: "rgb(245,239,231)",
                }}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
