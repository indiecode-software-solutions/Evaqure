import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import './QuickViewModal.css';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigateTo } = useApp();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Sync state when product shifts
  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setQuickViewProduct(null);
    }
  };

  const handleAdd = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize || undefined);
    setQuickViewProduct(null);
  };

  const handleViewFullDetails = () => {
    navigateTo('product-detail', quickViewProduct.id);
    setQuickViewProduct(null);
  };

  return (
    <div className="quick-view-overlay open" onClick={handleOverlayClick}>
      <div className="quick-view-modal">
        {/* Close Button */}
        <button
          className="quick-view-close"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Media Block */}
        <div className="quick-view-media">
          <img src={quickViewProduct.images[0]} alt={quickViewProduct.name} />
        </div>

        {/* Details Block */}
        <div className="quick-view-details">
          <div>
            <span className="quick-view-category">{quickViewProduct.category}</span>
            <h2 className="quick-view-name">{quickViewProduct.name}</h2>
          </div>

          <div className="quick-view-price">₹{quickViewProduct.price.toLocaleString('en-IN')}</div>

          <p className="quick-view-description">{quickViewProduct.description}</p>

          {/* Color Selector */}
          <div className="quick-view-selector-group">
            <span className="selector-label">Color: {selectedColor}</span>
            <div className="colors-grid">
              {quickViewProduct.colors.map((color) => (
                <button
                  key={color.name}
                  className={`color-option-btn ${selectedColor === color.name ? 'active' : ''}`}
                  style={{ '--color-option': color.value } as React.CSSProperties}
                  onClick={() => setSelectedColor(color.name)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Size Selector */}
          {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
            <div className="quick-view-selector-group">
              <span className="selector-label">Size: {selectedSize}</span>
              <div className="sizes-grid">
                {quickViewProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="quick-view-actions-row">
            <div className="quick-view-qty">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn-primary quick-view-add-btn" onClick={handleAdd}>
              Add to Bag
            </button>
          </div>

          <button className="quick-view-more-details" onClick={handleViewFullDetails}>
            View Full Editorial Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuickViewModal;
