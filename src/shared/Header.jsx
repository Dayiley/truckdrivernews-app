import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = {
    fontWeight: "bold",
    color: "#0a66c2",
  };

  return (
    <header
      style={{ padding: "1rem", background: "#f4f4f4", marginBottom: "1rem" }}
    >
      <nav>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          About
        </NavLink>{" "}
        |{" "}
        <NavLink
          to="/feedback"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Feedback
        </NavLink>
      </nav>
    </header>
  );
}
