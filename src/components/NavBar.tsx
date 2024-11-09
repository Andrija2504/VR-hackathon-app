// src/components/NavBar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          to="/" 
          className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </Link>
        <Link 
          to='/games'
          className={`nav-item ${location.pathname === '/games' ? 'active' : ''}`}
          >
            <span className="nav-icon">🎮</span>
            <span className="nav-text">Games</span>
          </Link>
        <Link 
          to="/profile" 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;