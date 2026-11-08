import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCartStore } from "../store/cartStore.js";

function linkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

export default function NavBar({ theme, onToggleTheme }) {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  function handleLogout() {
    dispatch({ type: "LOGGED_OUT" });
    navigate("/");
  }

  return (
    <nav className="navbar">
      <NavLink to="/" end className={linkClass}>Home</NavLink>
      <NavLink to="/products" className={linkClass}>Products</NavLink>
      <NavLink to="/cart" className={linkClass}>Cart ({itemCount})</NavLink>

      <div className="nav-right">
        <button type="button" onClick={onToggleTheme}>
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
        {user ? (
          <>
            <span>{user.username}</span>
            <button type="button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>Login</NavLink>
        )}
      </div>
    </nav>
  );
}