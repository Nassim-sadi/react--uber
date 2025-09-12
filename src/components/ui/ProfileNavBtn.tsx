import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { routeNames } from "@/router/PublicRoutes"; // adjust to your actual import

const ProfileButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return null;

  const initial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <button
      onClick={() => navigate(routeNames.profile.url)}
      className="profile-btn"
    >
      {initial}
    </button>
  );
};

export default ProfileButton;
