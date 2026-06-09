import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants/products';
import { ProductCard } from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import './ShopPage.css';

export const ShopPage: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const categories = ['All', 'Serums', 'Moisturizers', 'Cleansers', 'Toners', 'Eye Care', 'Masks & Peels'];

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Price Filter
    if (minPrice !== '') {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, minPrice, maxPrice, sortBy]);

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('popularity');
  };

  return (
    <div className="shop-page container">
      {/* Title Banner */}
      <div className="shop-page-title-banner reveal">
        <h1>The Collections</h1>
        <p>A fine collection of luxury garments, signature scents, and handcrafted statements.</p>
      </div>

      {/* Main Layout */}
      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside className="shop-sidebar reveal-left">
          {/* Category Filter */}
          <div className="filter-group">
            <h3 className="filter-title">Collections</h3>
            <ul className="category-filter-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <h3 className="filter-title">Price Range</h3>
            <div className="price-range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <span className="price-range-separator">&mdash;</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Sort Selector */}
          <div className="filter-group">
            <h3 className="filter-title">Sort By</h3>
            <select
              className="sort-selector-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Featured Favorites</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Patron Rating</option>
            </select>
          </div>

          {/* Clear Actions */}
          {(selectedCategory !== 'All' || searchQuery !== '' || minPrice !== '' || maxPrice !== '') && (
            <button className="btn-underline" onClick={handleClearFilters} style={{ alignSelf: 'flex-start' }}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* Results Panel */}
        <main className="shop-results">
          {/* Info Header */}
          <div className="shop-results-header reveal">
            <span>
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>

          {/* Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="shop-no-results">
              <h3>No items match your criteria</h3>
              <p>Try clearing your active filters or searching for different keywords.</p>
              <button className="btn-primary" onClick={handleClearFilters}>
                View All Collections
              </button>
            </div>
          ) : (
            <div className="shop-products-grid">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className={`reveal reveal-delay-${(index % 5) + 1}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
export default ShopPage;
