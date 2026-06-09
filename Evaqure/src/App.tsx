import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import Homepage from './pages/Homepage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  // Premium Scroll-Reveal IntersectionObserver
  useEffect(() => {
    let observer: IntersectionObserver;

    const setupObserver = () => {
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px', // Trigger just before elements fully enter
        threshold: 0.05
      };

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
      );
      elements.forEach((el) => {
        observer.observe(el);
      });
    };

    // Stagger slightly to allow conditional component mounting and layout stabilization
    const timer = setTimeout(setupObserver, 100);

    // Scroll back to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [activePage]);


  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Homepage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return <CheckoutPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <Header />

      {/* Main Page Content */}
      <main style={{ flex: '1 0 auto' }}>
        {renderActivePage()}
      </main>

      {/* Shared Overlays */}
      <CartDrawer />
      <QuickViewModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
