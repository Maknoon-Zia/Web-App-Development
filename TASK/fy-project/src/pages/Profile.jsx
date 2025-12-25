import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // phone field
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const fetchProfile = async () => {
        setLoading(true);
        try {
          const snap = await getDoc(doc(db, "users", user.uid));
          if (snap.exists()) {
            setName(snap.data().name || "");
            setEmail(snap.data().email || user.email);
            setPhone(snap.data().phone || "");
          }
        } catch (err) {
          console.error("Profile fetch error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    });

    return () => unsubscribe();
  }, []);

  const updateProfile = async () => {
    if (!name.trim()) {
      alert("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        phone,
      });
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>My Profile</h2>
        <p className="profile-sub">Manage your account details</p>

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />

        <label>Email</label>
        <input type="email" value={email} disabled />

        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
        />

        <button onClick={updateProfile} disabled={saving}>
          {saving ? "Saving..." : "Update Profile"}
        </button>

        <button
          className="btn-back"
          onClick={() => navigate("/dashboard")}
          style={{ marginTop: "10px" }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
