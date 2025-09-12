import React, { useState } from "react";
import "@/assets/styles/login.css";
import { useNavigate } from "react-router-dom";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import { useAuth } from "@/hooks/useAuth";
import { adminRouteNames } from "@/router/AdminRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, error, loading, mutate } = useAxiosMutation(
    "/auth/register",
    "post"
  );

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await mutate({ name, email, password });
      if (res?.accessToken && res?.user) {
        login(res.accessToken, res.user);
        navigate(adminRouteNames.dashboard.url);
      }
    } catch (err) {
      console.error("❌ Registration failed", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Register</h1>

        {error && <p className="error">{String(error)}</p>}

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
