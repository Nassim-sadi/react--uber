import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import "@/assets/styles/MobileMenu.css";
import { useNavigate } from "react-router-dom";
import { useNavigation } from "@/hooks/useNavigation";
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { navItems, authBtns, authNavItems } = useNavigation();

  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useAuth();

  // Define auth buttons based on authentication state
  const authButtons = isAuthenticated ? authNavItems : authBtns;

  const navigateTo = (path: string) => {
    if (path === "/logout") {
      logout();
    } else {
      navigate(path);
    }
    onClose(); // Close the dialog after navigation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mobile-menu-dialog">
        <DialogHeader>
          <DialogTitle>Navigation</DialogTitle>
          <DialogDescription>
            Navigate to different sections of the app
          </DialogDescription>
        </DialogHeader>

        <div className="mobile-menu-content">
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
              <div className="profile-placeholder mobile">
                <span>Welcome, {user?.name}</span>
              </div>
            )}
            {authButtons.map((item) => (
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
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
