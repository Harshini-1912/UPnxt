import { BriefcaseBusiness, Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="/" className="brand">
          <span className="brand-mark">
            <BriefcaseBusiness size={19} />
          </span>

          <span>
            UP<span>nxt</span>
          </span>
        </a>

        <nav className={menuOpen ? 'nav-links active' : 'nav-links'}>
          <a href="#jobs">Find Jobs</a>
          <a href="#how-it-works">How it Works</a>
          <a href="#companies">For Companies</a>
          <a href="#resources">Career Resources</a>
        </nav>

        <div className="nav-actions">
          <button className="login-link">Sign in</button>

          <button className="btn btn-primary">
            Get started
          </button>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;