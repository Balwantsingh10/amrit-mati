import React, { useState, useEffect, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, getUnitPriceDisplay } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { 
  Filter, 
  ArrowUpDown, 
  X, 
  Search, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CollectionPage = () => {
  const { navigateTo } = useCart();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackSize, setSelectedPackSize] = useState('all'); // 'all', '1kg', '2kg-3kg', '5kg-plus'
  const [priceRange, setPriceRange] = useState(2000);
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'
  const [searchFilter, setSearchFilter] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Listen for custom category filter events from header or category tiles
  useEffect(() => {
    const handleCategoryEvent = (e) => {
      if (e.detail) {
        setSelectedCategory(e.detail);
      }
    };
    window.addEventListener('amrit_filter_category', handleCategoryEvent);
    return () => window.removeEventListener('amrit_filter_category', handleCategoryEvent);
  }, []);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search term
      if (searchFilter.trim()) {
        const query = searchFilter.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesOrigin = product.origin.region.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesOrigin) return false;
      }

      // Pack size filter
      if (selectedPackSize !== 'all') {
        const hasMatchingVariant = product.variants.some((v) => {
          if (selectedPackSize === '1kg') return v.weightKg <= 1;
          if (selectedPackSize === '2kg-3kg') return v.weightKg > 1 && v.weightKg <= 3;
          if (selectedPackSize === '5kg-plus') return v.weightKg >= 5;
          return true;
        });
        if (!hasMatchingVariant) return false;
      }

      // Price filter (based on minimum variant price)
      const minPrice = Math.min(...product.variants.map((v) => v.price));
      if (minPrice > priceRange) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        const minA = Math.min(...a.variants.map((v) => v.price));
        const minB = Math.min(...b.variants.map((v) => v.price));
        return minA - minB;
      }
      if (sortBy === 'price-desc') {
        const maxA = Math.max(...a.variants.map((v) => v.price));
        const maxB = Math.max(...b.variants.map((v) => v.price));
        return maxB - maxA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // default: featured / bestsellers first
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [selectedCategory, selectedPackSize, priceRange, sortBy, searchFilter]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPackSize('all');
    setPriceRange(2000);
    setSearchFilter('');
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedPackSize !== 'all' || priceRange < 2000 || searchFilter.trim() !== '';

  return (
    <div style={{ padding: '3.5rem 0 6rem', backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
            <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: 0 }}>
              Home
            </button>
            <span>/</span>
            <span style={{ color: 'var(--color-forest)', fontWeight: 600 }}>The Pantry Collection</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
            Pantry Staples Collection
          </h1>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem', maxWidth: '640px' }}>
            Explore single-origin stone-ground flours, aged basmati varieties, naturally unpolished dals, and wood-churned oils.
          </p>
        </div>

        {/* Search & Active Controls Bar */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Search bar inside collection */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '420px' }}>
            <Search size={17} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)' }} />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search staples by name, grain, or state..."
              style={{
                width: '100%',
                padding: '0.6rem 0.85rem 0.6rem 2.4rem',
                fontSize: '0.86rem',
                fontFamily: 'var(--font-sans)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: '#fff'
              }}
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                style={{ position: 'absolute', right: '0.65rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Right: Sort Dropdown & Mobile Filter Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn-secondary"
              style={{ padding: '0.6rem 1rem', fontSize: '0.84rem' }}
            >
              <SlidersHorizontal size={15} />
              <span>Filters {hasActiveFilters && '• Active'}</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem' }}>
              <span style={{ color: 'var(--color-muted)', whiteSpace: 'nowrap' }}>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.55rem 0.85rem',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-sans)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#fff',
                  color: 'var(--color-forest)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <option value="featured">Featured / Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', fontWeight: 600 }}>Active Filters:</span>

            {selectedCategory !== 'all' && (
              <span className="badge-pill badge-forest" style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')}>
                <span>Category: {CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
                <X size={12} />
              </span>
            )}

            {selectedPackSize !== 'all' && (
              <span className="badge-pill badge-forest" style={{ cursor: 'pointer' }} onClick={() => setSelectedPackSize('all')}>
                <span>Pack: {selectedPackSize}</span>
                <X size={12} />
              </span>
            )}

            {searchFilter && (
              <span className="badge-pill badge-forest" style={{ cursor: 'pointer' }} onClick={() => setSearchFilter('')}>
                <span>Search: "{searchFilter}"</span>
                <X size={12} />
              </span>
            )}

            {priceRange < 2000 && (
              <span className="badge-pill badge-forest" style={{ cursor: 'pointer' }} onClick={() => setPriceRange(2000)}>
                <span>Max Price: ₹{priceRange}</span>
                <X size={12} />
              </span>
            )}

            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-burgundy)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                marginLeft: '0.5rem'
              }}
            >
              <RotateCcw size={13} />
              <span>Reset All</span>
            </button>
          </div>
        )}

        {/* Layout: Sidebar Filter + Product Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          {/* Desktop Filter Sidebar / Toggleable */}
          {(mobileFilterOpen || window.innerWidth > 960) && (
            <aside
              style={{
                gridColumn: mobileFilterOpen ? 'span 12' : 'span 3',
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                padding: '1.5rem',
                height: 'fit-content',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--color-forest)' }}>Filters</h3>
                {hasActiveFilters && (
                  <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', fontSize: '0.76rem', fontWeight: 600, cursor: 'pointer' }}>
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  Staple Category
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.85rem',
                        color: selectedCategory === cat.id ? 'var(--color-forest)' : 'var(--color-charcoal)',
                        fontWeight: selectedCategory === cat.id ? 700 : 400,
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.id}
                          onChange={() => setSelectedCategory(cat.id)}
                          style={{ accentColor: 'var(--color-forest)' }}
                        />
                        <span>{cat.name}</span>
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pack Size Filter */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                  Pack Size Preference
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {[
                    { id: 'all', label: 'All Pack Sizes' },
                    { id: '1kg', label: '1 kg / 1 Litre (Trial)' },
                    { id: '2kg-3kg', label: '2 kg – 3 kg (Regular)' },
                    { id: '5kg-plus', label: '5 kg – 10 kg (Pantry Value)' }
                  ].map((p) => (
                    <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="packSize"
                        checked={selectedPackSize === p.id}
                        onChange={() => setSelectedPackSize(p.id)}
                        style={{ accentColor: 'var(--color-forest)' }}
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
                  <span>Max Price</span>
                  <span style={{ color: 'var(--color-gold)' }}>₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  style={{ width: '100%', accentColor: 'var(--color-forest)', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                  <span>₹100</span>
                  <span>₹2,000</span>
                </div>
              </div>
            </aside>
          )}

          {/* Product Cards Grid Area */}
          <main style={{ gridColumn: (mobileFilterOpen || window.innerWidth > 960) ? 'span 9' : 'span 12' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.84rem', color: 'var(--color-muted)' }}>
              <span>Showing <strong>{filteredProducts.length}</strong> pantry staples</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px dashed var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '4rem 2rem',
                  textAlign: 'center'
                }}
              >
                <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                  No staples found matching your filters
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '1.5rem', maxWidth: '380px', margin: '0 auto 1.5rem' }}>
                  Try resetting your price range or search terms to browse the full Amrit Mati catalogue.
                </p>
                <button onClick={resetFilters} className="btn-primary" style={{ padding: '0.65rem 1.35rem' }}>
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '1.75rem'
                }}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
