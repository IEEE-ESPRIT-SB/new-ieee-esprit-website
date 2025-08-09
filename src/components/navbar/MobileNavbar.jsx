import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileNavbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, active = "" }) => {
  
  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-nav-open');
    } else {
      document.body.classList.remove('mobile-nav-open');
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove('mobile-nav-open');
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Burger Menu Button */}
      <button 
        className={`burger-menu ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        <span className="burger-line" aria-hidden="true"></span>
        <span className="burger-line" aria-hidden="true"></span>
        <span className="burger-line" aria-hidden="true"></span>
      </button>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation Menu */}      
      <nav 
        className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}
        id="mobile-navigation"
        role="navigation"
        aria-label="Mobile navigation"
        onKeyDown={handleKeyDown}
      >
        <div className="mobile-nav-content">
          {/* Mobile Navigation Header */}
          <div className="mobile-nav-header">
            <div className="mobile-nav-logo">
              <Image 
                src="/images/ieee-logo-removebg-preview.png" 
                alt="IEEE ESPRIT Logo" 
                width={120} 
                height={60} 
                style={{ height: 'auto', width: 'auto', maxHeight: '40px' }}
                priority
              />
            </div>
          </div>

          {/* Main Navigation Content - Centered */}
          <div className="mobile-nav-main">
            <ul className="mobile-nav-links" role="list">
              <li role="listitem">
                <Link 
                  href="/" 
                  className={active === "home" ? "active" : ""}
                  onClick={handleLinkClick}
                  aria-current={active === "home" ? "page" : undefined}
                >
                  <i className="fas fa-home" aria-hidden="true"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li role="listitem">
                <Link 
                  href="/about_us" 
                  className={active === "about" ? "active" : ""}
                  onClick={handleLinkClick}
                  aria-current={active === "about" ? "page" : undefined}
                >
                  <i className="fas fa-users" aria-hidden="true"></i>
                  <span>About Us</span>
                </Link>
              </li>
              <li role="listitem">
                <Link 
                  href="/events" 
                  className={active === "events" ? "active" : ""}
                  onClick={handleLinkClick}
                  aria-current={active === "events" ? "page" : undefined}
                >
                  <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                  <span>Events</span>
                </Link>
              </li>
              <li role="listitem">
                <Link 
                  href="/units" 
                  className={active === "units" ? "active" : ""}
                  onClick={handleLinkClick}
                  aria-current={active === "units" ? "page" : undefined}
                >
                  <i className="fas fa-sitemap" aria-hidden="true"></i>
                  <span>Units</span>
                </Link>
              </li>
            </ul>

            {/* Mobile Register Button */}
            <div className="mobile-register-container">
              <Link 
                href="#" 
                className="mobile-register-btn"
                onClick={handleLinkClick}
                role="button"
                aria-label="Register for IEEE ESPRIT membership"
              >
                <i className="fas fa-user-plus" aria-hidden="true"></i>
                <span>Register now</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileNavbar;
