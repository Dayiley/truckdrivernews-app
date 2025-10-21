import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem("tdn:theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
      return;
    }
    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    )?.matches;
    const initial = prefersDark ? "dark" : "light";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("tdn:theme", next);
  }

  return (
    <button
      onClick={toggle}
      style={{
        background: "none",
        color: "var(--btn-muted-text)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
        marginRight: "0.8rem",
      }}
      aria-label="Toggle theme"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <i
        className={
          theme === "light" ? "fa-regular fa-moon" : "fa-regular fa-sun"
        }
      />
    </button>
  );
}
