import React from 'react';
import './Navbar.css';

function Navbar({ onMenuClick, active }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">WAV to MP3 Converter</div>
      <ul className="navbar-menu">
        <li
          className={active === 'main' ? 'active' : ''}
          onClick={() => onMenuClick('main')}
        >
          Main
        </li>
        <li
          className={active === 'contact' ? 'active' : ''}
          onClick={() => onMenuClick('contact')}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;