import React from 'react';
import { useApp } from '../context/AppContext';
import './CartDrawer.css';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    navigateTo,
  } = useApp();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setCartOpen(false);
    }
  };

  const handleCheckout = () => {
    navigateTo('checkout');
  };

  return (
    <div
      className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="cart-drawer">
        {/* Header */}
        <div className="cart-drawer-header">
          <h3>Shopping Bag</h3>
          <button className="cart-drawer-close" onClick={() => setCartOpen(false)}>
            Close
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="cart-drawer-content">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
              <h4>Your bag is empty</h4>
              <p>Items you add to your shopping bag will appear here.</p>
              <button
                className="btn-primary"
                onClick={() => {
                  setCartOpen(false);
                  navigateTo('shop');
                }}
                style={{ marginTop: 'var(--space-md)' }}
              >
                Shop Collections
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div className="cart-item" key={`${item.product.id}-${item.selectedColor}-${item.selectedSize || ''}-${index}`}>
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <span className="cart-item-category">{item.product.category}</span>
                    <span className="cart-item-name">{item.product.name}</span>
                    <span className="cart-item-meta">
                      Color: {item.selectedColor}
                      {item.selectedSize && ` / Size: ${item.selectedSize}`}
                    </span>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-qty-selector">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedColor,
                            item.selectedSize,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() =>
                        removeFromCart(item.product.id, item.selectedColor, item.selectedSize)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-item-price-col">
                  <span className="cart-item-price">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span style={{ fontStyle: 'italic', color: 'var(--color-accent-dark)' }}>Complimentary</span>
            </div>
            <div className="cart-summary-row total">
              <span>Estimated Total</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary cart-checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <p className="cart-disclaimer">
              Duties and shipping are calculated at checkout. Enjoy complimentary global white-glove delivery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default CartDrawer;
