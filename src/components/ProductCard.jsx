import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getUnitPriceDisplay } from '../data/products';
import { Plus, Check, Eye, Sparkles } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, setSelectedProductForModal, navigateTo } = useCart();

  // Find default variant or first variant
  const defaultVariant = product.variants.find(v => v.isDefault) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedVariant, 1, true);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const openDetails = () => {
    setSelectedProductForModal(product);
  };

  const unitPriceStr = getUnitPriceDisplay(selectedVariant);

  return (
    <article
      className="product-card"
      onClick={openDetails}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && openDetails()}
    >
      {/* Product Image Container */}
      <div className="product-image-container">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />

        {/* Badge: Bestseller / Aged / Unpolished */}
        {product.badge && (
          <span
            className="badge-pill badge-gold"
            style={{
              position: 'absolute',
              top: '0.75rem',
              left: '0.75rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            {product.badge}
          </span>
        )}

        {/* Origin / Terroir Tag Pill */}
        <span
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.75rem',
            backgroundColor: 'rgba(23, 63, 44, 0.88)',
            color: 'var(--color-ivory)',
            fontSize: '0.68rem',
            padding: '0.2rem 0.55rem',
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.04em'
          }}
        >
          {product.origin.region}, {product.origin.state}
        </span>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openDetails();
          }}
          className="quick-view-overlay-btn"
          aria-label="Quick View Details"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            backgroundColor: 'rgba(250, 247, 242, 0.95)',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-forest)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          <Eye size={16} />
        </button>
      </div>

      {/* Product Body Content */}
      <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Rating */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold)', fontWeight: 700 }}>
            {product.categoryName}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
            <span style={{ color: '#D97706' }}>★</span>
            <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>{product.rating}</span>
            <span>({product.reviewCount})</span>
          </span>
        </div>

        {/* Product Title */}
        <h3
          style={{
            fontSize: '1.22rem',
            color: 'var(--color-forest)',
            lineHeight: 1.25,
            marginBottom: '0.45rem',
            fontWeight: 700
          }}
        >
          {product.name}
        </h3>

        {/* Factual Short Description */}
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-muted)',
            lineHeight: 1.45,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.shortDescription}
        </p>

        {/* Pack Selector */}
        <div style={{ marginTop: 'auto', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--color-forest)' }}>
              Select Pack Size:
            </span>
            <span style={{ fontSize: '0.74rem', color: 'var(--color-gold)', fontWeight: 700 }}>
              Unit: {unitPriceStr}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.4rem',
              flexWrap: 'wrap'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {product.variants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`pack-selector-pill ${selectedVariant.id === v.id ? 'active' : ''}`}
                style={{ flex: 1, minWidth: '70px', textAlign: 'center' }}
              >
                {v.label.split(' ')[0]} {v.label.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Quick Add Button Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--color-border)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                <span style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                  ₹{selectedVariant.mrp}
                </span>
              )}
            </div>
            {selectedVariant.discountPercent && (
              <span style={{ fontSize: '0.7rem', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                Save {selectedVariant.discountPercent}%
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={justAdded ? 'btn-primary' : 'btn-primary'}
            style={{
              padding: '0.55rem 1rem',
              fontSize: '0.82rem',
              backgroundColor: justAdded ? '#15803D' : 'var(--color-forest)'
            }}
            aria-label={`Quick add ${product.name} ${selectedVariant.label} to cart`}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
