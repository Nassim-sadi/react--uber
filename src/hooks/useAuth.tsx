import { setLogoutHandler } from "@/axios/Index";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

type User = {
  name: string;
  email: string;
  isActive: boolean;
  role: {
    name: "admin" | "user" | "driver";
    permissions?: string[];
  };
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: User) => void;
};

// Create the context with a default value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state and functions to its children.
 * It manages the user's token and user data, synchronizes them with localStorage,
 * and shares them across browser tabs.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize state from localStorage to persist login.
    return localStorage.getItem("token");
  });

  const [user, setUser] = useState<User | null>(() => {
    // Initialize user state from localStorage
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Memoize the login function so it has a stable reference.
  const login = useCallback((accessToken: string, user: User) => {
    setToken(accessToken);
    setUser(user);
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  // Memoize the logout function so it has a stable reference.
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  // Register logout with axios interceptor
  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  // Memoize the updateUser function for updating user data without re-authentication
  const updateUser = useCallback((user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  // Effect to synchronize auth state across browser tabs.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        setToken(e.newValue);
      } else if (e.key === "user") {
        if (e.newValue) {
          try {
            const parsedUser = JSON.parse(e.newValue);
            // Convert date strings back to Date objects
            setUser({
              ...parsedUser,
              createdAt: new Date(parsedUser.createdAt),
              updatedAt: new Date(parsedUser.updatedAt),
            });
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Effect to handle logout when token is removed but user data remains
  useEffect(() => {
    if (!token && user) {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [token, user]);

  // Memoize the context value to prevent unnecessary re-renders of consumers.
  // The value object is only recreated when the token or user changes.
  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token && !!user,
      login,
      logout,
      updateUser,
    }),
    [token, user, login, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to consume the AuthContext.
 * Throws an error if used outside of an AuthProvider.
 * @returns {AuthContextType} The authentication context.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
