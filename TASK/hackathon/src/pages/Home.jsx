import React from "react";
import { useNavigate } from "react-router-dom";
import chairsImage from "../images/chairs.jpg"; // import your local image

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${chairsImage})`, // use the imported image
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-navy bg-opacity-70 flex flex-col items-center justify-center text-center px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-offwhite mb-6">
          Event Registration System
        </h1>

        {/* Subheading */}
        <p className="text-tan text-lg md:text-xl mb-8">
          Register for upcoming events and explore new opportunities.
        </p>

        {/* Call-to-action button */}
        <button
          onClick={() => navigate("/events")}
          className="px-6 py-3 rounded-md font-semibold transition duration-300"
          style={{
            backgroundColor: "rgb(62,88,121)", // palette 3 blue
            color: "rgb(245,239,231)",         // palette 3 light text
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(33,53,85)") // hover navy
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "rgb(62,88,121)") // default
          }
        >
          View Events
        </button>
      </div>
    </div>
  );
}

export default Home;
