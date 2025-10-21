import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import Logo from '../assets/Logo.png';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className={styles.hLeft}>
        <img src={Logo} alt="Truck Driver News Logo" className={styles.logo} />
        <h1 className={styles.TDN}>Truck Driver News</h1>
      </div>

      <div className={styles.hRight}>
        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav
          aria-label="Main Navigation"
          className={`${styles.nav} ${open ? styles.show : ''}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>{' '}
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={() => setOpen(false)}
          >
            About
          </NavLink>{' '}
          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
            onClick={() => setOpen(false)}
          >
            Feedback
          </NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
