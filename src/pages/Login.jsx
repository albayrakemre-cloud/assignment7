import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from
    ? location.state.from.pathname + location.state.from.search
    : "/";

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(username, password);
      dispatch({ type: "LOGGED_IN", payload: user });
      // replace: true
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>Login</button>
      </form>

      {loading && <p>Signing in...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}