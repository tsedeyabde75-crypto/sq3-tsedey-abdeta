import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [phone, setPhone] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect back to the page the user tried to visit, or fallback to home
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone) return;
    login(phone);
    navigate(from, { replace: true });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Login to Addis Eats</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem" }}>
            Phone Number:
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0911223344"
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <button type="submit" style={{ padding: "0.5rem 1rem", cursor: "pointer" }}>
          Log In
        </button>
      </form>
    </div>
  );
}