import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function Dashboard() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [editingQuote, setEditingQuote] = useState(null);

  const user = auth.currentUser;
  const quotesRef = collection(db, "users", user.uid, "quotes");

  useEffect(() => {
    const q = query(quotesRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setQuotes(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const addQuote = async () => {
    if (!text.trim()) return;
    await addDoc(quotesRef, {
      text,
      author,
      liked: false,
      createdAt: serverTimestamp(),
    });
    setText("");
    setAuthor("");
  };

  const deleteQuote = async (id) => {
    await deleteDoc(doc(db, "users", user.uid, "quotes", id));
  };

  const updateQuote = async () => {
    await updateDoc(doc(db, "users", user.uid, "quotes", editingQuote.id), {
      text: editingQuote.text,
      author: editingQuote.author,
    });
    setEditingQuote(null);
  };

  const toggleLike = async (quote) => {
    await updateDoc(doc(db, "users", user.uid, "quotes", quote.id), {
      liked: !quote.liked,
    });
  };

  const shareQuote = (quote) => {
    const textToShare = `"${quote.text}"${quote.author ? " — " + quote.author : ""}`;
    if (navigator.share) {
      navigator.share({ text: textToShare });
    } else {
      navigator.clipboard.writeText(textToShare);
      alert("Quote copied to clipboard!");
    }
  };

  const exportQuotes = () => {
    const data = JSON.stringify(quotes, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  };

  const importQuotes = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    try {
      const imported = JSON.parse(text);
      for (const q of imported) {
        await addDoc(quotesRef, {
          text: q.text || "",
          author: q.author || "",
          liked: q.liked || false,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      alert("Invalid JSON file!");
    }
  };

  const logout = async () => {
    await auth.signOut();
  };

  const filteredQuotes = quotes.filter(
    (q) =>
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      (q.author || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-light p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-primary text-center sm:text-left">
          QuoteKeeper
        </h1>
        <button
          onClick={logout}
          className="bg-secondary text-primary px-5 py-2 rounded-lg font-semibold hover:bg-accent transition self-center sm:self-auto"
        >
          Logout
        </button>
      </div>

      {/* Add Quote */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
        <textarea
          className="w-full border rounded-lg p-3 mb-4 focus:ring-2 focus:ring-secondary resize-none"
          rows="4"
          placeholder="Write your quote..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-secondary"
            placeholder="Author (optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            onClick={addQuote}
            className="bg-primary text-light px-6 py-3 rounded-lg hover:bg-secondary transition"
          >
            Add Quote
          </button>
        </div>
      </div>

      {/* Import/Export */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <button
          onClick={exportQuotes}
          className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-accent transition"
        >
          Export Quotes
        </button>

        <label className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-accent cursor-pointer transition flex justify-center items-center">
          Import Quotes
          <input
            type="file"
            accept=".json"
            onChange={importQuotes}
            className="hidden"
          />
        </label>
      </div>


      {/* Search */}
      <input
        className="w-full mb-6 border rounded-lg p-3 focus:ring-2 focus:ring-secondary"
        placeholder="Search quotes or authors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Quotes List */}
      {loading ? (
        <p className="text-center text-primary">Loading quotes...</p>
      ) : filteredQuotes.length === 0 ? (
        <p className="text-center text-gray-500">No quotes found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuotes.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-t-4 border-secondary hover:shadow-2xl transition break-words"
            >
              <p className="text-lg text-primary mb-2">“{q.text}”</p>
              {q.author && (
                <p className="text-sm text-accent font-medium mb-2">— {q.author}</p>
              )}
              <p className="text-xs text-gray-500 mb-4">
                {q.createdAt?.toDate().toLocaleDateString()}
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setEditingQuote(q)}
                  className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-accent transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuote(q.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => toggleLike(q)}
                  className={`px-4 py-2 rounded-lg transition ${q.liked
                      ? "bg-pink-500 text-white"
                      : "bg-gray-200 text-gray-600 hover:bg-pink-400"
                    }`}
                >
                  {q.liked ? "❤️ Liked" : "♡ Like"}
                </button>

                <button
                  onClick={() => shareQuote(q)}
                  className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-accent transition"
                >
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-primary mb-4">Edit Quote</h2>
            <textarea
              className="w-full border rounded-lg p-3 mb-3 resize-none"
              rows="3"
              value={editingQuote.text}
              onChange={(e) =>
                setEditingQuote({ ...editingQuote, text: e.target.value })
              }
            />
            <input
              className="w-full border rounded-lg p-3 mb-4"
              value={editingQuote.author}
              onChange={(e) =>
                setEditingQuote({ ...editingQuote, author: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingQuote(null)}
                className="px-4 py-2 rounded-lg bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={updateQuote}
                className="px-4 py-2 rounded-lg bg-primary text-light hover:bg-secondary transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
