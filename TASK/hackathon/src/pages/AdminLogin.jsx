import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/admin"); // redirect to admin dashboard
    } catch (error) {
      setLoading(false);
      alert("Invalid credentials");
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "rgb(249,243,239)" }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 rounded-lg shadow-md space-y-4"
        style={{ backgroundColor: "rgb(245,239,231)" }}
      >
        <h1
          className="text-2xl font-bold text-center"
          style={{ color: "rgb(33,53,85)" }}
        >
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rgb(62,88,121)"
          style={{
            border: "1px solid rgb(62,88,121)",
            backgroundColor: "rgb(245,239,231)",
            color: "rgb(33,53,85)"
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-rgb(62,88,121)"
          style={{
            border: "1px solid rgb(62,88,121)",
            backgroundColor: "rgb(245,239,231)",
            color: "rgb(33,53,85)"
          }}
        />

        <button
          type="submit"
          className="w-full py-2 rounded-md font-semibold transition hover:bg-navy"
          style={{
            backgroundColor: "rgb(62,88,121)",
            color: "rgb(245,239,231)"
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
