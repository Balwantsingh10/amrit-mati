import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useCart } from '../context/CartContext';
import { ArrowRight, Flame } from 'lucide-react';

export const Bestsellers = () => {
  const { navigateTo } = useCart();
  
  // Show 4-6 bestsellers
  const bestsellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  return (
    <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--color-ivory-light)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
              <Flame size={14} style={{ color: 'var(--color-burgundy)' }} />
              <span>Kitchen Staples in High Demand</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: 'var(--color-forest)' }}>
              Pantry Bestsellers
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem', marginTop: '0.25rem', maxWidth: '520px' }}>
              Fresh stone-ground wheat, aged long-grain basmati, unpolished pulses, and cold-pressed oil trusted by quality-conscious Indian households.
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="btn-secondary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.86rem' }}
          >
            <span>View All Staples</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 4-Card Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
