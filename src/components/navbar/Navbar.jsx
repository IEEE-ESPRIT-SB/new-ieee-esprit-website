import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Navbar.scss';

export default function Navbar({ active = "" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent body scroll when menu is open
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="main-nav">
      <div className="logo">
        <Image 
          src="/images/ieee-logo-removebg-preview.png" 
          alt="IEEE Logo" 
          height={60} 
          width={120} 
          style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }} 
        />
      </div>

      {/* Desktop Navigation */}
      <ul className="nav-links desktop-nav">
        <li>
          <Link href="/" className={active === 'home' ? 'active' : ''}>
            <i className="fas fa-home"></i>
            Home
          </Link>
        </li>
        <li>
          <a href="/about_us" className={active === 'about' ? 'active' : ''}>
            <i className="fas fa-users"></i>
            About Us
          </a>
        </li>
        <li>
          <a href="/events" className={active === 'events' ? 'active' : ''}>
            <i className="fas fa-calendar-alt"></i>
            Events
          </a>
        </li>
        <li>
          <a href="/units" className={active === 'units' ? 'active' : ''}>
            <i className="fas fa-sitemap"></i>
            Units
          </a>
        </li>
      </ul>

      {/* Burger Menu Button */}
      <button 
        className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-nav-menu"
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Mobile Navigation Menu */}
      <div 
        className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}
        id="mobile-nav-menu"
        role="navigation"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-nav-content">
          <ul className="mobile-nav-links">
            <li>
              <Link 
                href="/" 
                className={active === 'home' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <a 
                href="/about_us" 
                className={active === 'about' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <i className="fas fa-users"></i>
                <span>About Us</span>
              </a>
            </li>
            <li>
              <a 
                href="/events" 
                className={active === 'events' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <i className="fas fa-calendar-alt"></i>
                <span>Events</span>
              </a>
            </li>
            <li>
              <a 
                href="/units" 
                className={active === 'units' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <i className="fas fa-sitemap"></i>
                <span>Units</span>
              </a>
            </li>
          </ul>

          {/* Mobile Register Button */}
          <div className="mobile-register-container">
            <a 
              href="*" 
              className="mobile-register-btn"
              onClick={() => setIsMobileMenuOpen(false)}
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <i className="fas fa-user-plus"></i>
              <span>Register now</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Register Button */}
      <a href="*" className="register-btn desktop-register">
        <i className="fas fa-user-plus"></i>
        Register now
      </a>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
