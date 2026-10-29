import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getUnitPriceDisplay, PRODUCTS } from '../data/products';
import { 
  X, 
  Check, 
  Plus, 
  Minus, 
  Truck, 
  ShieldCheck, 
  FileText, 
  Clock, 
  MapPin, 
  AlertCircle,
  Share2,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProductForModal, 
    setSelectedProductForModal, 
    addToCart, 
    setSelectedLabReportProduct,
    FREE_SHIPPING_THRESHOLD 
  } = useCart();

  if (!selectedProductForModal) return null;
  const product = selectedProductForModal;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find(v => v.isDefault) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);
  const [activeTab, setActiveTab] = useState('sourcing'); // 'sourcing', 'nutrition', 'storage'

  const closeModal = () => setSelectedProductForModal(null);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity, true);
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setDeliveryStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.'
      });
      return;
    }

    // Realistic delivery estimation based on PIN code prefix
    const firstDigit = cleanPin[0];
    const isMetro = ['1', '4', '5', '6', '7'].includes(firstDigit);
    const days = isMetro ? '2–3 business days' : '4–5 business days';
    
    setDeliveryStatus({
      valid: true,
      message: `Delivery available in ${days} to PIN ${cleanPin}. Free Delivery on orders ₹${FREE_SHIPPING_THRESHOLD}+. COD eligible.`
    });
  };

  const unitPrice = getUnitPriceDisplay(selectedVariant);
  const relatedProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 2);

  return (
    <div className="drawer-backdrop" onClick={closeModal} style={{ zIndex: 120 }}>
      <div
        className="product-modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '94%',
          maxWidth: '1060px',
          maxHeight: '92vh',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 25px 50px -12px rgba(14, 41, 28, 0.35)',
          overflowY: 'auto',
          zIndex: 121,
          padding: 'clamp(1.25rem, 3vw, 2.5rem)'
        }}
      >
        {/* Close Button Top Right */}
        <button
          onClick={closeModal}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--color-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-full)',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-forest)',
            zIndex: 10
          }}
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        {/* Main Grid: Gallery Beside Purchase Panel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem'
          }}
          className="pdp-grid"
        >
          {/* Left: Desktop Image Gallery */}
          <div style={{ gridColumn: 'span 6' }} className="pdp-gallery-col">
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#EBE2D0',
                border: '1px solid var(--color-border)',
                aspectRatio: '4 / 3.8',
                marginBottom: '1rem',
                position: 'relative'
              }}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {product.badge && (
                <span className="badge-pill badge-gold" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                      padding: 0,
                      cursor: 'pointer',
                      backgroundColor: '#EBE2D0'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Batch Testing / Sourcing Badge Callout */}
            <div
              style={{
                marginTop: '1.5rem',
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <ShieldCheck size={22} style={{ color: 'var(--color-forest)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                    Batch Lab Tested: {product.labReport?.reportNo || 'AM-LAB-2026'}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
                    NABL accredited 52-pesticide & heavy metal screen
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedLabReportProduct(product)}
                style={{
                  background: 'none',
                  border: '1px solid var(--color-forest)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                View COA
              </button>
            </div>
          </div>

          {/* Right: Purchase Panel */}
          <div style={{ gridColumn: 'span 6' }} className="pdp-purchase-col">
            {/* Category & Terroir */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.76rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700 }}>
                {product.categoryName}
              </span>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                {product.origin.region}, {product.origin.state}
              </span>
            </div>

            {/* Product Title */}
            <h2 style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.2rem)', color: 'var(--color-forest)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
              {product.name}
            </h2>

            {/* Price & Unit Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                ₹{selectedVariant.price}
              </span>
              {selectedVariant.mrp && selectedVariant.mrp > selectedVariant.price && (
                <span style={{ fontSize: '1.05rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                  ₹{selectedVariant.mrp}
                </span>
              )}
              <span style={{ backgroundColor: '#FAF4E5', color: '#8C6A24', border: '1px solid rgba(184, 148, 78, 0.3)', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-sm)', fontSize: '0.76rem', fontWeight: 700 }}>
                {unitPrice}
              </span>
              {selectedVariant.discountPercent && (
                <span style={{ fontSize: '0.78rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                  Save {selectedVariant.discountPercent}%
                </span>
              )}
            </div>

            <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
              Inclusive of all taxes. Free shipping on orders above ₹{FREE_SHIPPING_THRESHOLD}.
            </div>

            {/* Factual Short Description */}
            <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              {product.shortDescription}
            </p>

            {/* Pack Size Variants Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Pack Size:
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                  Selected: {selectedVariant.label}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`pack-selector-pill ${selectedVariant.id === v.id ? 'active' : ''}`}
                    style={{ padding: '0.55rem 0.95rem', fontSize: '0.86rem' }}
                  >
                    <span>{v.label}</span>
                    <span style={{ display: 'block', fontSize: '0.72rem', opacity: 0.85, marginTop: '0.1rem' }}>
                      ₹{v.price} ({getUnitPriceDisplay(v)})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector + Add to Cart Button */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#fff',
                  height: '46px'
                }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ background: 'none', border: 'none', padding: '0 0.85rem', cursor: 'pointer', color: 'var(--color-forest)' }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span style={{ fontSize: '0.94rem', fontWeight: 700, minWidth: '28px', textAlign: 'center' }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ background: 'none', border: 'none', padding: '0 0.85rem', cursor: 'pointer', color: 'var(--color-forest)' }}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, height: '46px', fontSize: '0.94rem' }}
              >
                <span>Add to Cart • ₹{selectedVariant.price * quantity}</span>
              </button>
            </div>

            {/* PIN Code Delivery Checker */}
            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                marginBottom: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.45rem' }}>
                <MapPin size={15} style={{ color: 'var(--color-gold)' }} />
                <span>Check Delivery Date & COD Availability</span>
              </div>

              <form onSubmit={handleCheckPincode} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit PIN code (e.g. 110001, 560001)"
                  style={{
                    flex: 1,
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.84rem',
                    fontFamily: 'var(--font-sans)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                />
                <button
                  type="submit"
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}
                >
                  Check PIN
                </button>
              </form>

              {deliveryStatus && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: deliveryStatus.valid ? '#166534' : 'var(--color-burgundy)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {deliveryStatus.valid ? <Check size={14} /> : <AlertCircle size={14} />}
                  <span>{deliveryStatus.message}</span>
                </div>
              )}
            </div>

            {/* Tabbed Specifications (Sourcing, Nutrition, Storage) */}
            <div>
              <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)', marginBottom: '1rem', gap: '1.5rem' }}>
                <button
                  onClick={() => setActiveTab('sourcing')}
                  style={{
                    background: 'none',
                    border: 'none',
                    paddingBottom: '0.65rem',
                    fontSize: '0.86rem',
                    fontWeight: activeTab === 'sourcing' ? 700 : 500,
                    color: activeTab === 'sourcing' ? 'var(--color-forest)' : 'var(--color-muted)',
                    borderBottom: activeTab === 'sourcing' ? '2px solid var(--color-gold)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Sourcing & Milling
                </button>
                <button
                  onClick={() => setActiveTab('nutrition')}
                  style={{
                    background: 'none',
                    border: 'none',
                    paddingBottom: '0.65rem',
                    fontSize: '0.86rem',
                    fontWeight: activeTab === 'nutrition' ? 700 : 500,
                    color: activeTab === 'nutrition' ? 'var(--color-forest)' : 'var(--color-muted)',
                    borderBottom: activeTab === 'nutrition' ? '2px solid var(--color-gold)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Nutritional Table
                </button>
                <button
                  onClick={() => setActiveTab('storage')}
                  style={{
                    background: 'none',
                    border: 'none',
                    paddingBottom: '0.65rem',
                    fontSize: '0.86rem',
                    fontWeight: activeTab === 'storage' ? 700 : 500,
                    color: activeTab === 'storage' ? 'var(--color-forest)' : 'var(--color-muted)',
                    borderBottom: activeTab === 'storage' ? '2px solid var(--color-gold)' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                >
                  Storage & Shelf Life
                </button>
              </div>

              {activeTab === 'sourcing' && (
                <div style={{ fontSize: '0.84rem', color: 'var(--color-charcoal)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><strong>Farmer Collective:</strong> {product.origin.farmerCollective}</div>
                  <div><strong>Soil Terroir:</strong> {product.origin.soil}</div>
                  <div><strong>Milling Method:</strong> {product.millingType}</div>
                  <div><strong>Harvest Season:</strong> {product.harvestSeason}</div>
                  <div><strong>Ingredients:</strong> {product.ingredients}</div>
                  <div><strong>Allergens:</strong> {product.allergens}</div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginBottom: '0.5rem' }}>
                    Serving Basis: {product.nutrition.servingBasis} (Laboratory Analyzed)
                  </div>
                  <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.4rem 0', color: 'var(--color-muted)' }}>Energy (Calories)</td>
                        <td style={{ padding: '0.4rem 0', fontWeight: 600, textAlign: 'right' }}>{product.nutrition.calories}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.4rem 0', color: 'var(--color-muted)' }}>Protein</td>
                        <td style={{ padding: '0.4rem 0', fontWeight: 600, textAlign: 'right' }}>{product.nutrition.protein}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.4rem 0', color: 'var(--color-muted)' }}>Dietary Fibre</td>
                        <td style={{ padding: '0.4rem 0', fontWeight: 600, textAlign: 'right' }}>{product.nutrition.dietaryFiber || 'N/A'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.4rem 0', color: 'var(--color-muted)' }}>Carbohydrates</td>
                        <td style={{ padding: '0.4rem 0', fontWeight: 600, textAlign: 'right' }}>{product.nutrition.carbohydrates}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                        <td style={{ padding: '0.4rem 0', color: 'var(--color-muted)' }}>Fats</td>
                        <td style={{ padding: '0.4rem 0', fontWeight: 600, textAlign: 'right' }}>{product.nutrition.fats}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'storage' && (
                <div style={{ fontSize: '0.84rem', color: 'var(--color-charcoal)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div><strong>Shelf Life:</strong> {product.shelfLife}</div>
                  <div><strong>Home Storage:</strong> {product.storageInstructions}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Sticky Purchase Bar (Always visible on mobile view) */}
        <div className="mobile-sticky-bar">
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-forest)' }}>
              ₹{selectedVariant.price}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)' }}>
              {selectedVariant.label}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.84rem' }}
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .pdp-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .pdp-gallery-col, .pdp-purchase-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};
