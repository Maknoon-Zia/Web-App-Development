import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // go to dashboard
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        {/* Branding */}
        <h1 className="text-3xl font-bold text-primary text-center mb-2">
          QuoteKeeper
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create an account to save and manage your quotes privately
        </p>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Inputs */}
        <input
          className="border rounded-lg p-3 mb-4 w-full focus:ring-2 focus:ring-secondary"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border rounded-lg p-3 mb-6 w-full focus:ring-2 focus:ring-secondary"
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-primary text-light py-3 rounded-lg font-semibold hover:bg-secondary transition"
        >
          Create Account
        </button>

        {/* Login link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
