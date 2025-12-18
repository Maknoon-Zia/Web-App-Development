import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // go to Dashboard
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
          Login to access your private quotes
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-primary text-light py-3 rounded-lg font-semibold hover:bg-secondary transition"
        >
          Login
        </button>

        {/* Register link */}
        <p className="text-center text-sm mt-6 text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
