import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import './WishlistPage.css';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo } = useApp();

  // Find all items currently listed in the user's wishlist
  const wishlistedItems = PRODUCTS.filter((product) => wishlist.includes(product.id));

  return (
    <div className="wishlist-page container">
      {/* Header Banner */}
      <div className="wishlist-header-banner">
        <h1>Saved Pieces</h1>
        <p>A private curation of your favored designs and signature fragrances.</p>
      </div>

      {/* Grid of items */}
      {wishlistedItems.length === 0 ? (
        <div className="wishlist-empty-banner">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.7 7.7l1.1 1.1L12 21l7.7-7.7 1.1-1.1a5.5 5.5 0 000-7.6z" />
          </svg>
          <h2>No pieces saved yet</h2>
          <p>As you explore our collections, save items to your wishlist to build your personal curation.</p>
          <button className="btn-primary" onClick={() => navigateTo('shop')} style={{ marginTop: 'var(--space-md)' }}>
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="wishlist-grid-layout">
          {wishlistedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
export default WishlistPage;
