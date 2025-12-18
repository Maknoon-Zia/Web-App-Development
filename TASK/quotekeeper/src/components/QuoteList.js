import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
function QuoteList() {
    const { user } = useAuth();
    const [quotes, setQuotes] = useState([]);
    useEffect(() => {
        const q = collection(db, "users", user.uid, "quotes");
        return onSnapshot(q, (snapshot) => {
            setQuotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
    }, [user]);
    const deleteQuote = async (id) => {
        await deleteDoc(doc(db, "users", user.uid, "quotes", id));
    };
    return null;
}
export default QuoteList;