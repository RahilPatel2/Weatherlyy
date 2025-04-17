import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">WeatherLy</Link>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/weather"
            className={`nav-link ${location.pathname === "/weather" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Weather
          </Link>

          {user ? (
            <div className="user-info">
              <img src={user.photo} alt={user.username} className="user-photo" />
              <span>{user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className={`nav-link ${location.pathname === "/login" ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>

        <button className="nav-toggle" onClick={toggleMenu}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
