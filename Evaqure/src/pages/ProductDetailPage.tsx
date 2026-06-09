import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useApp();

  // Find targeted product, fallback to first product if none selected
  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  // Re-sync states when target product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
  }, [product]);

  const isWishlisted = isInWishlist(product.id);

  // Recommendations: products in same category, excluding active product
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  // Fallback if no matching categories
  const fallbackProducts = relatedProducts.length > 0
    ? relatedProducts
    : PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, selectedSize || undefined);
  };

  return (
    <div className="product-detail-page container">
      {/* Product Information Main Grid */}
      <div className="product-detail-layout">
        {/* Left Column: Interactive Gallery */}
        <div className="product-gallery reveal-left">
          {/* Thumbnails */}
          <div className="gallery-thumbnails">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail-btn ${activeImageIndex === index ? 'active' : ''}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={img} alt={`${product.name} preview`} />
              </button>
            ))}
          </div>

          {/* Main Large Image */}
          <div className="gallery-main-image-container">
            <img src={product.images[activeImageIndex]} alt={product.name} />
          </div>
        </div>

        {/* Right Column: Meta details and actions */}
        <div className="product-info-panel reveal-right">
          <div className="product-category-row">
            <span className="product-category-text">{product.category}</span>
            <div className="product-rating-stars">
              <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span className="product-rating-count">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-price">₹{product.price.toLocaleString('en-IN')}</div>
          
          <p className="product-detail-desc">{product.description}</p>

          <div className="product-actions-panel">


            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="quick-view-selector-group">
                <span className="selector-label">Size: {selectedSize}</span>
                <div className="sizes-grid">
                  {product.sizes.map((size) => (
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

            {/* Quantity and CTA row */}
            <div className="quick-view-actions-row">
              <div className="quick-view-qty">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              
              <button className="btn-primary quick-view-add-btn" onClick={handleAdd}>
                Add to Bag
              </button>

              <button
                className={`wishlist-detail-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.8 4.6a5.5 5.5 0 00-7.7 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.7 7.7l1.1 1.1L12 21l7.7-7.7 1.1-1.1a5.5 5.5 0 000-7.6z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Accordion Detail list */}
          <div className="accordion-wrapper">
            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('specs')}>
                Specifications & Details
                <span>{openAccordion === 'specs' ? '−' : '+'}</span>
              </button>
              <div className={`accordion-content ${openAccordion === 'specs' ? 'open' : ''}`}>
                <ul>
                  {product.details.map((detail, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('shipping')}>
                Shipping & Returns
                <span>{openAccordion === 'shipping' ? '−' : '+'}</span>
              </button>
              <div className={`accordion-content ${openAccordion === 'shipping' ? 'open' : ''}`}>
                <p>
                  We offer complimentary global white-glove delivery on all orders. Each item is individually wrapped in our signature leather-grain keeper boxes.
                </p>
                <p style={{ marginTop: '8px' }}>
                  Returns are accepted on all unused items within 30 days of delivery.
                </p>
              </div>
            </div>

            <div className="accordion-item">
              <button className="accordion-header" onClick={() => toggleAccordion('care')}>
                Artisanal Care Guide
                <span>{openAccordion === 'care' ? '−' : '+'}</span>
              </button>
              <div className={`accordion-content ${openAccordion === 'care' ? 'open' : ''}`}>
                <p>
                  To preserve the lifespan and appearance of your Evaqure piece, avoid direct contact with solvents, liquids, extreme heat, and sharp surfaces. Store in the provided custom dust bag when not in use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Block */}
      <section className="reviews-section reveal">
        <div className="reviews-header-block">
          <div>
            <h2 className="section-title" style={{ fontSize: '1.8rem', textAlign: 'left' }}>Patron Reviews</h2>
            <div className="product-rating-stars" style={{ marginTop: 'var(--space-xs)' }}>
              <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span>{product.rating} average based on {product.reviewsCount} reviews</span>
            </div>
          </div>
        </div>

        <div className="reviews-grid">
          <div className="review-item">
            <div className="review-author-row">
              <span className="review-author">Priya Sharma</span>
              <span className="review-date">May 14, 2026</span>
            </div>
            <div className="review-rating">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <p className="review-content">
              Absolutely outstanding quality. The texture and presentation exceeded my expectations. Delivery was prompt and wrapped beautifully.
            </p>
          </div>

          <div className="review-item">
            <div className="review-author-row">
              <span className="review-author">Aditi Rao</span>
              <span className="review-date">April 28, 2026</span>
            </div>
            <div className="review-rating">&#9733;&#9733;&#9733;&#9733;&#9734;</div>
            <p className="review-content">
              A solid purchase. Exceptional craft. The weight of the item feels substantial and premium. Highly recommended.
            </p>
          </div>
        </div>
      </section>

      {/* Related Products Grid */}
      <section className="related-section reveal" style={{ marginTop: 'var(--space-xxl)' }}>
        <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: 'var(--space-xl)', textAlign: 'center' }}>
          Complementary Curation
        </h2>
        <div className="products-grid-3">
          {fallbackProducts.map((p, index) => (
            <div key={p.id} className={`reveal reveal-delay-${index + 1}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default ProductDetailPage;
