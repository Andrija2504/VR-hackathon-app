// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';
import compassIcon from '/compass.svg';
import gamesIcon from '/target.svg';
import searchIcon from '/search.svg';
import userIcon from '/user icon.svg';
import logoIcon from '/logo.svg'; // Add logo import

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="nav-section">
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
            <img src={compassIcon} alt="Home" className="nav-icon" />
          </Link>
          <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
            <img src={userIcon} alt="Profile" className="nav-icon" />
          </Link>
        </div>

        <div className="nav-logo">
          <img src={logoIcon} alt="Logo" className="logo-icon" />
        </div>

        <div className="nav-section">
          <Link to="/search" className={`nav-item ${location.pathname === '/#' ? 'active' : ''}`}>
            <img src={searchIcon} alt="Search" className="nav-icon" />
          </Link>
          <Link to="/games" className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}>
            <img src={gamesIcon} alt="Games" className="nav-icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;