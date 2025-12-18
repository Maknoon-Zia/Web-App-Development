import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import AdminAuth from "./components/AdminAuth";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-navy shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-offwhite text-lg font-bold">Event System</h1>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-offwhite hover:bg-blue px-3 py-2 rounded-md transition">
                Home
              </Link>
              <Link to="/events" className="text-offwhite hover:bg-blue px-3 py-2 rounded-md transition">
                Events
              </Link>
              <Link to="/admin-login" className="text-offwhite hover:bg-blue px-3 py-2 rounded-md transition">
                Admin
              </Link>
            </div>

            {/* Mobile Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-offwhite focus:outline-none">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link to="/" className="block text-offwhite hover:bg-blue px-3 py-2 rounded-md transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/events" className="block text-offwhite hover:bg-blue px-3 py-2 rounded-md transition" onClick={() => setIsOpen(false)}>Events</Link>
            <Link to="/admin-login" className="block text-offwhite hover:bg-blue px-3 py-2 rounded-md transition" onClick={() => setIsOpen(false)}>Admin</Link>
          </div>
        )}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <AdminAuth>
              <Admin />
            </AdminAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
