import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";
import "./Navbar.css";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { path: "/", label: "Podcasts" },
    { path: "/webinars", label: "Upcoming Webinars" },
    { path: "/glimpses", label: "Webinar Glimpses" },
  ];

  // Close dropdown when clicking/tapping outside
  useEffect(() => {
    function handleOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner container">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png" alt="ADORE" className="navbar-logo" />
            <div className="navbar-divider" />
            <img src="/score.png" alt="SCORE" className="navbar-score" />
          </Link>

          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>

          <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`nav-link ${location.pathname === l.path ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className={`nav-link admin-link ${location.pathname === "/admin" ? "active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                ⚙ Admin
              </Link>
            )}
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="user-menu" ref={dropdownRef}>
                {/* Avatar — tap to toggle dropdown */}
                <button
                  className="user-avatar-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-label="User menu"
                >
                  {user.photoURL
                    ? <img src={user.photoURL} alt={user.displayName} className="user-avatar" />
                    : <div className="user-avatar-initials">
                        {(user.displayName || user.email || "U")[0].toUpperCase()}
                      </div>
                  }
                </button>

                {/* Dropdown — shown on click/tap, not hover */}
                {dropdownOpen && (
                  <div className="user-dropdown open">
                    <p className="user-name">{user.displayName || "User"}</p>
                    <p className="user-email">{user.email}</p>
                    {isAdmin && <span className="badge-admin">Admin</span>}
                    <button className="dropdown-btn" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="btn btn-primary btn-sm signin-btn" onClick={() => setShowAuth(true)}>
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
