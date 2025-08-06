import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MobileNavbar from './MobileNavbar';
import './Navbar.scss';

export default function Navbar({ active = "" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      {/* Mobile Navigation */}
      <MobileNavbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        active={active}
      />

      {/* Desktop Register Button */}
      <a href="*" className="register-btn desktop-register">
        <i className="fas fa-user-plus"></i>
        Register now
      </a>
    </nav>
  );
}
