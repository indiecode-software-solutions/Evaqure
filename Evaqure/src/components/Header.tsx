import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './Header.css';

export const Header: React.FC = () => {
  const {
    activePage,
    navigateTo,
    cartCount,
    wishlist,
    setCartOpen,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'shop' | 'about' | 'contact') => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery('');
    }
  };

  // Determine header layout mode (overlay transparent on home hero vs solid white)
  const isHome = activePage === 'home';
  const headerClass = `header ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'solid' : ''}`;

  return (
    <header className={headerClass}>
      <div className="container header-container">
        {/* Hamburger Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle action-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 8h16M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Brand Logo */}
        <button onClick={() => navigateTo('home')} className="logo">
          Evaqure<span>.</span>
        </button>

        {/* Desktop Main Navigation */}
        <nav className="nav-menu">
          <button
            onClick={() => handleNavClick('home')}
            className={`nav-item ${activePage === 'home' ? 'active' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className={`nav-item ${activePage === 'shop' ? 'active' : ''}`}
          >
            Shop
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`nav-item ${activePage === 'about' ? 'active' : ''}`}
          >
            Our Story
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`nav-item ${activePage === 'contact' ? 'active' : ''}`}
          >
            Contact
          </button>
        </nav>

        {/* Header Action Icons */}
        <div className="header-actions">
          {/* Search Action */}
          <button
            className="action-btn"
            onClick={handleSearchToggle}
            aria-label="Search Catalog"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Wishlist Link */}
          <button
            className="action-btn"
            onClick={() => navigateTo('wishlist')}
            aria-label="View Wishlist"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.7 7.7l1.1 1.1L12 21l7.7-7.7 1.1-1.1a5.5 5.5 0 000-7.6z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="badge-count">{wishlist.length}</span>
            )}
          </button>

          {/* Cart Bag Icon */}
          <button
            className="action-btn"
            onClick={() => setCartOpen(true)}
            aria-label="Open Shopping Bag"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="badge-count">{cartCount}</span>
            )}
          </button>
        </div>

        {/* Dropdown Search Bar */}
        <div className={`search-bar-overlay ${isSearchOpen ? 'open' : ''}`}>
          <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search Evaqure collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigateTo('shop');
                    setIsSearchOpen(false);
                  }
                }}
                autoFocus={isSearchOpen}
              />
              <button className="search-close-btn" onClick={handleSearchToggle}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Overlay */}
      <div className={`mobile-nav-panel ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-menu">
          <button onClick={() => handleNavClick('home')} className="mobile-nav-item">
            Home
          </button>
          <button onClick={() => handleNavClick('shop')} className="mobile-nav-item">
            Shop Collections
          </button>
          <button onClick={() => handleNavClick('about')} className="mobile-nav-item">
            Our Story
          </button>
          <button onClick={() => handleNavClick('contact')} className="mobile-nav-item">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
