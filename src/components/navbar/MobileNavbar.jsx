import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/*
  Refonte mobile: barre de navigation inférieure persistante (bottom nav)
  - Plus ergonomique (reachable thumb zone)
  - Adaptée portrait & paysage via CSS (icônes seuls en paysage)
  - Utilise le logo IEEE
  Les props isMobileMenuOpen / setIsMobileMenuOpen sont conservées pour compat mais plus utilisées.
*/

const MobileNavbar = ({ active = "" }) => {
  const items = [
    { href: '/', key: 'home', label: 'Home', icon: 'fa-home' },
    { href: '/about_us', key: 'about', label: 'About', icon: 'fa-users' },
    { href: '/events', key: 'events', label: 'Events', icon: 'fa-calendar-alt' },
    { href: '/units', key: 'units', label: 'Units', icon: 'fa-sitemap' },
  ];

  return (
    <div className="mobile-bottom-nav-wrapper" role="none">
      <nav className="mobile-bottom-nav" aria-label="Navigation principale mobile">
        <div className="bottom-nav-logo" aria-hidden="true">
          <Image src="/images/ieee-logo-removebg-preview.png" alt="IEEE Logo" width={60} height={30} priority />
        </div>
        <ul className="bottom-nav-items" role="list">
          {items.map(item => (
            <li key={item.key} role="listitem" className={active === item.key ? 'active' : ''}>
              <Link href={item.href} aria-current={active === item.key ? 'page' : undefined}>
                <i className={`fas ${item.icon}`} aria-hidden="true" />
                <span className="label">{item.label}</span>
                <span className="active-indicator" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        {/* Floating Register (FAB) */}
        <Link href="#" className="mobile-fab" aria-label="Register now">
          <i className="fas fa-user-plus" aria-hidden="true" />
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavbar;
