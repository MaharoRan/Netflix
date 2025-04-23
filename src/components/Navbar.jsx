// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <h1>Netflix</h1>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link to="/add/category" className="nav-link">Ajouter Catégorie</Link>
      <Link to="/add/film" className="nav-link">Ajouter Film</Link>
      <Link to="/add/serie" className="nav-link">Ajouter Série</Link>
    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;