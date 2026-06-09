import type { Product } from '../constants/products';
import { useApp } from '../context/AppContext';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, toggleWishlist, isInWishlist, setQuickViewProduct } = useApp();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      {/* Media container */}
      <div className={`product-card-media ${product.images.length > 1 ? 'has-hover' : ''}`}>
        {/* Main Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card-image primary-image"
          loading="lazy"
        />

        {/* Hover / Secondary Product Image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="product-card-image hover-image"
            loading="lazy"
          />
        )}

        {/* Wishlist Button */}
        <button
          className={`wishlist-card-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isWishlisted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.7 7.7l1.1 1.1L12 21l7.7-7.7 1.1-1.1a5.5 5.5 0 000-7.6z" />
            </svg>
          )}
        </button>

        {/* Quick View Button */}
        <button className="quick-view-overlay-btn" onClick={handleQuickViewClick}>
          Quick View
        </button>
      </div>

      {/* Info details */}
      <div className="product-card-info">
        <span className="product-card-category">{product.category}</span>
        <button className="product-card-name-btn" onClick={handleCardClick}>
          {product.name}
        </button>
        <span className="product-card-price">₹{product.price.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
};
export default ProductCard;
