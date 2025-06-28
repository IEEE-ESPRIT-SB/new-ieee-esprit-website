import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar({ active = "" }) {
  return (
    <nav className="main-nav">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', height: '60px', marginTop: '12px' }}>
        <Image src="/images/ieee-logo-removebg-preview.png" alt="IEEE Logo" height={60} width={120} style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }} />
      </div>
      <ul className="nav-links">
        <li><Link href="/" className={active === 'home' ? 'active' : ''}>Home</Link></li>
        <li><a href="/about_us" className={active === 'about' ? 'active' : ''}>About Us</a></li>
        <li><a href="/events" className={active === 'events' ? 'active' : ''}>Events</a></li>
        <li><a href="/units" className={active === 'units' ? 'active' : ''}>Units</a></li>
      </ul>
      <a
        href="*"
        style={{
          marginLeft: '1.5rem',
          padding: '0.55rem 2.2rem',
          background: 'linear-gradient(90deg, #0a0b30 0%, #1e1c7c 60%, #2c1a5a 100%)',
          color: '#fff',
          borderRadius: '999px',
          fontWeight: 700,
          fontSize: '1.08rem',
          textDecoration: 'none',
          boxShadow: '0 0 16px 2px #1e1c7c88, 0 2px 16px 0 #2c1a5a88',
          transition: 'box-shadow 0.2s, transform 0.2s',
          display: 'inline-block',
          border: 'none',
          outline: 'none',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseOver={e => {
          e.currentTarget.style.boxShadow = '0 0 32px 6px #1e1c7ccc, 0 2px 24px 0 #2c1a5acc';
          e.currentTarget.style.transform = 'scale(1.04)';
        }}
        onMouseOut={e => {
          e.currentTarget.style.boxShadow = '0 0 16px 2px #1e1c7c88, 0 2px 16px 0 #2c1a5a88';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Register now
      </a>
    </nav>
  );
}
