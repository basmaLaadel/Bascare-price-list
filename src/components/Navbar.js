import React from 'react';
import logo from '../logo.jpeg';

const Navbar = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', label: 'All Products', icon: 'fas fa-home' },
    { id: 'skincare', label: 'Skincare', icon: 'fas fa-spa' },
    { id: 'makeup', label: 'Makeup', icon: 'fas fa-wand-magic-sparkles' },
    { id: 'perfumes', label: 'Perfumes', icon: 'fas fa-spray-can' },
    { id: 'other cosmetics', label: 'Cosmetics', icon: 'fas fa-star' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Navbar Brand */}
        <div className="navbar-brand">
          <img src={logo} alt="Bascare Logo" className="navbar-logo" />
          <div className="navbar-text">
            <h2 className="navbar-title">Bascareе</h2>
            <p className="navbar-subtitle">Beauty & Care</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              title={category.label}
            >
              <i className={category.icon}></i>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Social Icons */}
        <div className="social-icons">
          <a
            href="https://wa.me/201055001378"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon whatsapp"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="https://www.instagram.com/skincarebybasbosa?igsh=MXN6YjkyNzEwaHMzbA%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon instagram"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.tiktok.com/@bascare02?_t=ZS-8ziu7nAzPsu&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon tiktok"
            title="TikTok"
          >
            <i className="fab fa-tiktok"></i>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
