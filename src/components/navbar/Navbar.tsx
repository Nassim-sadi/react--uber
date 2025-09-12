import { useState } from "react";
import { Menu, X } from "lucide-react";
import "@/assets/styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ProfileButton from "../ui/ProfileNavBtn";
import MobileMenu from "@/components/MobileMenu";
import { useNavigation } from "@/hooks/useNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
const Navbar = () => {
  const { navItems, authBtns } = useNavigation();
  const { isAuthenticated, logout, user } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
          {isAuthenticated && <ProfileButton />}

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
        {isMobile && (
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </>
  );
};

export default Navbar;
