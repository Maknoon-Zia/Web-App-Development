import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import '../index.css';
import loginBg from '../images/login-bg.jpg';  // import image

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Email and password are required");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
  className="login-container"
  style={{ backgroundImage: `url(${loginBg})` }}
>

      <div className="login-card">
        <h1>Welcome Back</h1>
        <p>Login to your account</p>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="social-buttons">
          <button className="btn-social"><FaGoogle /> Google</button>
          <button className="btn-social"><FaApple /> Apple</button>
        </div>

        <p className="signup-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
