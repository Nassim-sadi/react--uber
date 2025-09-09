import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "@/assets/styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const authBtns = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const appName = import.meta.env.VITE_APP_NAME;

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <div className="logo-placeholder"></div>
          <span className="nav-title">{appName}</span>
        </div>

        <div className="nav-items">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.path)}
              className="nav-item"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="auth">
          {isAuthenticated && <div className="profile-placeholder"></div>}
          {!isAuthenticated &&
            authBtns.map((item) => (
              <button
                key={item.name}
                onClick={() => navigateTo(item.path)}
                className="auth-btn"
              >
                {item.name}
              </button>
            ))}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
              }}
              className="auth-btn"
            >
              Logout
            </button>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-items">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.path)}
              className="mobile-nav-item"
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mobile-auth">
          {isAuthenticated && (
            <div className="profile-placeholder mobile"></div>
          )}
          {authBtns.map((item) => (
            <button
              key={item.name}
              onClick={() => navigateTo(item.path)}
              className="mobile-auth-btn"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
