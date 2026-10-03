import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from "../../../../context/ThemeContext";

import ThemeToggle from "../../../../components/common/ThemeToggle";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="NEXORA home">
          <span className="brand-mark">N</span>NEXORA
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#platform">Platform</a>
          <a href="#students">For Students</a>
          <a href="#institutions">For Colleges</a>
          <a href="#companies">For Companies</a>
          <a href="#about">About</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title="Toggle theme">
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          </button>
          
          <Link className="button button-secondary compact" to="/auth/role-selection?mode=login">Login</Link>
          <Link className="button button-primary compact" to="/auth/role-selection?mode=register">Register</Link>
        </div>
      </div>
    </header>
  );
}
