import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname ?? "/menu";

  const handleLogin = () => {
    login({ name: "Demo User" });
    navigate(from, { replace: true });
  };

  return (
    <div className="login-page">
      <h2>Login Required</h2>
      <button onClick={handleLogin} className="btn-primary">
        Sign In to Continue
      </button>
    </div>
  );
}