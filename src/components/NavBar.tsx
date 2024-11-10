// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';
import compassIcon from '/compass.svg'; // Adjust path as necessary
import gamesIcon from '/target.svg'; // Adjust path as necessary
import searchIcon from '/search.svg'; // Adjust path as necessary
import userIcon from '/user icon.svg'; // Adjust path as necessary

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
      <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <img src={compassIcon} style={{color: "red"}} alt="Home" className="nav-icon" />
        </Link>
      <Link 
          to="/profile" 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <img src={userIcon} alt="Profile" className="nav-icon" />
        </Link>
      <Link 
          to="/search" 
          className={`nav-item ${location.pathname === '/#' ? 'active' : ''}`}
        >
          <img src={searchIcon} alt="Search" className="nav-icon" />
        </Link>
      <Link 
          to="/games" 
          className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}
        >
          <img src={gamesIcon} alt="Games" className="nav-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;