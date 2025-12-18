import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    const { user } = useAuth();
    return (
        <nav>
            {user ? (
                <>
                    <span>{user.email}</span>
                    <button onClick={() => signOut(auth)}>Logout</button>
                </>
            ) : null}
        </nav>
    );
}
export default Navbar;