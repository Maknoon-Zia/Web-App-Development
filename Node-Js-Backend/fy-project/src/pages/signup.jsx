import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // redirect after successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-bg" />

      <div className="login-card">
        <h1>Create Account</h1>
        <p>Sign up to get started</p>

        {error && <div className="login-footer" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="login-or"><span>OR</span></div>

        <div className="login-social">
          <button className="btn-social">Google</button>
          <button className="btn-social">Apple</button>
        </div>

        <p className="login-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
