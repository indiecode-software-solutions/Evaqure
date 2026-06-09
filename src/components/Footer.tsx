import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Footer.css';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div className="footer-brand">
            <h3 className="footer-brand-title">Evaqure<span>.</span></h3>
            <p>
              A curation of modern luxury products designed to elevate daily life. Crafted with heritage techniques, sourced ethically, and delivered in sustainable keepsakes.
            </p>
          </div>

          {/* Boutique Col */}
          <div className="footer-links-col">
            <h4>Boutique</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('shop')}>All Collections</button></li>
              <li><button onClick={() => navigateTo('shop')}>Serums</button></li>
              <li><button onClick={() => navigateTo('shop')}>Moisturizers</button></li>
              <li><button onClick={() => navigateTo('shop')}>Cleansers</button></li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="footer-links-col">
            <h4>Our House</h4>
            <ul className="footer-links">
              <li><button onClick={() => navigateTo('about')}>Our Story</button></li>
              <li><button onClick={() => navigateTo('contact')}>Contact & FAQ</button></li>
              <li><a href="#careers" onClick={(e) => e.preventDefault()}>Careers</a></li>
              <li><a href="#sustainability" onClick={(e) => e.preventDefault()}>Sustainability</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="footer-newsletter">
            <h4>Private Newsletter</h4>
            <p>Subscribe to receive early access to new collection drops, private sales, and brand editorials.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form-footer">
              <input
                type="email"
                placeholder={subscribed ? "Thank you for joining" : "Enter your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                required
              />
              <button type="submit" disabled={subscribed}>
                {subscribed ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : "Join"}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Evaqure. All rights reserved. Designed for elite storefront presentations.</p>
          
          <div className="social-links">
            <a href="#instagram" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
              </svg>
            </a>
            <a href="#pinterest" aria-label="Pinterest" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 22a9 9 0 01-1.9-5.3c0-3.3 2-6.5 5.5-6.5.7 0 1.3.1 1.8.4.8.4 1.2 1.3 1.2 2.3 0 2.2-1.1 4.5-3.2 4.5-.7 0-1.4-.4-1.6-1l-1 3.7c-.5 1.7-1.7 3.5-1.8 3.7" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
            <a href="#facebook" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
