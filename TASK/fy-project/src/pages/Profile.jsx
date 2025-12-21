import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";


export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", auth.currentUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setName(snap.data().name || "");
          setEmail(snap.data().email || auth.currentUser.email);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
    return <p style={{ color: "#fff", textAlign: "center" }}>Loading profile...</p>;
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

        <button onClick={updateProfile} disabled={saving}>
          {saving ? "Saving..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
