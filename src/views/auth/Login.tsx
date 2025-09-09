import React, { useState } from "react";
import "@/assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import { useAuth } from "@/hooks/useAuth";
import { adminRouteNames } from "@/router/AdminRoutes";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Use your mutation hook
  const { data, error, loading, mutate } = useAxiosMutation(
    "/auth/login",
    "post"
  );

  const { login } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await mutate({ email, password });
      if (res?.accessToken) {
        login(res.accessToken);
        navigate(adminRouteNames.dashboard);
      }
    } catch (err) {
      console.error("❌ Login failed", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        {error && <p className="error">{String(error)}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
