import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
function QuoteForm({ editQuote, setEditQuote }) {
    const { user } = useAuth();
    const handleSubmit = async (text, author) => {
        if (editQuote) {
            const ref = doc(db, "users", user.uid, "quotes", editQuote.id);
            await updateDoc(ref, { text, author });
            setEditQuote(null);
        } else {
            await addDoc(collection(db, "users", user.uid, "quotes"), {
                text,
                author,
                createdAt: serverTimestamp(),
            });
        }
    };
    return null;
}
export default QuoteForm;