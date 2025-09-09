import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo, // Import useMemo
  type ReactNode,
} from "react";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

// Create the context with a default value.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication state and functions to its children.
 * It manages the user's token, synchronizes it with localStorage,
 * and shares it across browser tabs.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    // Initialize state from localStorage to persist login.
    return localStorage.getItem("token");
  });

  // Memoize the login function so it has a stable reference.
  const login = useCallback((accessToken: string) => {
    setToken(accessToken);
    localStorage.setItem("token", accessToken);
  }, []);

  // Memoize the logout function so it has a stable reference.
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  // Effect to synchronize auth state across browser tabs.
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Memoize the context value to prevent unnecessary re-renders of consumers.
  // The value object is only recreated when the `token` changes.
  const value = useMemo(
    () => ({
      token,
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token, login, logout]
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
