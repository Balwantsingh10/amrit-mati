import React from 'react';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowRight } from 'lucide-react';

const CATEGORY_IMAGES = {
  flours: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  dals: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
  oils: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
  millets: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=80'
};

export const CategoryNav = () => {
  const { navigateTo } = useCart();
  const validCategories = CATEGORIES.filter(c => c.id !== 'all');

  const handleSelect = (catId) => {
    navigateTo('shop');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('amrit_filter_category', { detail: catId }));
    }, 50);
  };

  return (
    <section style={{ padding: '3.75rem 0', backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
              Pantry Taxonomy
            </div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.4rem)', color: 'var(--color-forest)' }}>
              Shop by Essential Category
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-forest)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.4rem 0'
            }}
          >
            <span>View All Staples (12)</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {validCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(cat.id)}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all var(--transition-smooth)',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="category-tile"
            >
              <div style={{ width: '100%', height: '140px', overflow: 'hidden', backgroundColor: '#EBE2D0', position: 'relative' }}>
                <img
                  src={CATEGORY_IMAGES[cat.id]}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="cat-img"
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.65rem',
                    right: '0.65rem',
                    backgroundColor: 'rgba(23, 63, 44, 0.85)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.15rem 0.5rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  {cat.count} staples
                </span>
              </div>

              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '0.35rem' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.45, margin: 0 }}>
                    {cat.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight size={13} style={{ color: 'var(--color-gold)' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-tile:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: var(--color-forest);
        }
        .category-tile:hover .cat-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
};
