import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import { useLocalStorage } from "../hooks/useLocalStorage.js";

export default function Layout() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const safeTheme = theme === "dark" ? "dark" : "light";

  function toggleTheme() {
    setTheme(safeTheme === "light" ? "dark" : "light");
  }

  return (
    <div className={`app theme-${safeTheme}`}>
      <NavBar theme={safeTheme} onToggleTheme={toggleTheme} />
      <main className="content">
        {}
        <Outlet />
      </main>
      <footer className="footer">Assignment 7 - Small Online Shop</footer>
    </div>
  );
}