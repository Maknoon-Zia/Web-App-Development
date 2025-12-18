import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "./config/firebase";
import { useState } from "react";

function Login() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        console.log("User Info:", result.user);
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        alert("Logged out");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {user ? (
        <>
          <p>Welcome {user.displayName || user.email}</p>
          <img src={user.photoURL} alt="profile" style={{ borderRadius: "50%", width: "100px" }} />
          <br />
          <button 
            onClick={handleLogout} 
            style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
          >
            Logout
          </button>
        </>
      ) : (
        <button 
          onClick={handleLogin} 
          style={{
            padding: "10px 20px",
            backgroundColor: "#24292f",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
}

export default Login;
