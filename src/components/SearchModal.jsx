import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS, getUnitPriceDisplay } from '../data/products';
import { useCart } from '../context/CartContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, setSelectedProductForModal, navigateTo } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const matches = query.trim() === ''
    ? PRODUCTS.slice(0, 4) // popular staples when empty
    : PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.region.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setSelectedProductForModal(product);
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsSearchOpen(false)} style={{ zIndex: 135 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: '640px',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 25px 50px -12px rgba(14, 41, 28, 0.4)',
          overflow: 'hidden',
          zIndex: 136
        }}
      >
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)', backgroundColor: '#fff' }}>
          <Search size={20} style={{ color: 'var(--color-forest)', marginRight: '0.75rem' }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search whole wheat atta, aged basmati, unpolished toor dal, mustard oil..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--color-forest)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', marginRight: '0.5rem' }}
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-forest)', fontSize: '0.84rem', fontWeight: 600 }}
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '1rem' }}>
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.75rem', paddingLeft: '0.5rem' }}>
            {query.trim() === '' ? 'Popular Kitchen Staples' : `Results (${matches.length})`}
          </div>

          {matches.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-muted)', fontSize: '0.88rem' }}>
              No pantry staples found for "{query}". Try searching for <em>atta</em>, <em>rice</em>, <em>dal</em>, or <em>oil</em>.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {matches.map((item) => {
                const defaultVariant = item.variants[0];
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ivory)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={item.images[0]}
                        alt=""
                        style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                          {item.categoryName} • From {item.origin.region}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                        From ₹{defaultVariant.price}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                        {getUnitPriceDisplay(defaultVariant)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'var(--color-ivory)', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--color-muted)' }}>
          <span>Search verified staples with single-origin traceability</span>
          <button
            onClick={() => {
              setIsSearchOpen(false);
              navigateTo('shop');
            }}
            style={{ background: 'none', border: 'none', color: 'var(--color-forest)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            <span>View All Staples</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
