import React, { useState } from 'react';
import { PRESET_BUNDLES, PANTRY_BUILDER_ITEMS } from '../data/bundles';
import { useCart } from '../context/CartContext';
import { Package, Check, Plus, Minus, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const StarterBundles = () => {
  const { addToCart, addCustomBundleToCart, navigateTo } = useCart();

  // State for "Build Your Pantry" custom builder
  const [selectedBuilderItems, setSelectedBuilderItems] = useState([
    PANTRY_BUILDER_ITEMS[0], // Sharbati Atta 5kg
    PANTRY_BUILDER_ITEMS[1], // Taraori Basmati 2.5kg
    PANTRY_BUILDER_ITEMS[2]  // Desi Toor 2kg
  ]);

  const toggleBuilderItem = (item) => {
    const exists = selectedBuilderItems.find(i => i.id === item.id);
    if (exists) {
      if (selectedBuilderItems.length <= 1) {
        alert('Please keep at least 1 item in your pantry box.');
        return;
      }
      setSelectedBuilderItems(selectedBuilderItems.filter(i => i.id !== item.id));
    } else {
      setSelectedBuilderItems([...selectedBuilderItems, item]);
    }
  };

  // Custom box math: 15% discount for 3+ items, 10% for 2 items
  const customBoxOriginalTotal = selectedBuilderItems.reduce((sum, item) => sum + item.price, 0);
  const discountTier = selectedBuilderItems.length >= 3 ? 15 : selectedBuilderItems.length === 2 ? 10 : 5;
  const customBoxDiscount = Math.round((customBoxOriginalTotal * discountTier) / 100);
  const customBoxFinalPrice = customBoxOriginalTotal - customBoxDiscount;

  const handleAddPresetBundle = (bundle) => {
    // Add preset bundle as a package
    const fakeProduct = {
      id: bundle.id,
      name: bundle.name,
      images: [bundle.image],
      origin: { region: 'Multi-Cluster Regional Heritage', state: 'India' }
    };
    const fakeVariant = {
      id: 'full-box',
      label: bundle.totalWeight,
      price: bundle.bundlePrice,
      mrp: bundle.originalPrice,
      weightKg: parseFloat(bundle.totalWeight) || 5
    };
    addToCart(fakeProduct, fakeVariant, 1, true);
  };

  const handleAddCustomBox = () => {
    addCustomBundleToCart(
      'Custom Pantry Box',
      selectedBuilderItems,
      customBoxFinalPrice,
      customBoxOriginalTotal
    );
  };

  return (
    <section id="bundles-section" style={{ padding: '5rem 0', backgroundColor: 'var(--color-ivory-warm)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            <Sparkles size={14} />
            <span>Pantry Discovery Boxes</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Starter Bundles & Custom Pantry Box
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            A curated way to transition your kitchen staples to single-origin grains. Real bundle savings with guaranteed zero quality compromises.
          </p>
        </div>

        {/* 2 Pre-Curated Bundles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem'
          }}
        >
          {PRESET_BUNDLES.slice(0, 2).map((bundle) => (
            <div
              key={bundle.id}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                <img
                  src={bundle.image}
                  alt={bundle.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  className="badge-pill badge-gold"
                  style={{ position: 'absolute', top: '1rem', left: '1rem' }}
                >
                  {bundle.badge}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(23, 63, 44, 0.9)',
                    color: '#fff',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                >
                  {bundle.totalWeight}
                </span>
              </div>

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '1.45rem', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                  {bundle.name}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {bundle.description}
                </p>

                {/* Bundle Items Checklist */}
                <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--color-ivory)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                    What’s inside this box:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {bundle.items.map((item, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                          <Check size={14} style={{ color: 'var(--color-forest)' }} />
                          <span>{item.name}</span>
                        </span>
                        <span style={{ color: 'var(--color-muted)', fontWeight: 600, fontSize: '0.78rem' }}>{item.pack}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Action */}
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                        ₹{bundle.bundlePrice}
                      </span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                        ₹{bundle.originalPrice}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-burgundy)', fontWeight: 700 }}>
                      Instant Savings: ₹{bundle.savings} (Save {Math.round((bundle.savings / bundle.originalPrice) * 100)}%)
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddPresetBundle(bundle)}
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.35rem' }}
                  >
                    <span>Add Bundle</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =================================================================
            INTERACTIVE "BUILD YOUR PANTRY" BUNDLE BUILDER
           ================================================================= */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '2px solid var(--color-gold)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
            <div>
              <span className="badge-pill badge-forest" style={{ marginBottom: '0.5rem' }}>
                Interactive Custom Pantry Box
              </span>
              <h3 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)', color: 'var(--color-forest)' }}>
                Build Your Own Pantry Box
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Pick 3 or more staples to unlock an automatic <strong>15% bundle discount</strong> + Free Shipping.
              </p>
            </div>

            {/* Savings Counter Pill */}
            <div
              style={{
                backgroundColor: 'rgba(184, 148, 78, 0.15)',
                border: '1px solid var(--color-gold)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1.25rem',
                textAlign: 'right'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-forest)', fontWeight: 600 }}>
                Selected Staples: {selectedBuilderItems.length}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-burgundy)' }}>
                {discountTier}% Bundle Discount Unlocked
              </div>
            </div>
          </div>

          {/* Builder Items Grid Selection */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem'
            }}
          >
            {PANTRY_BUILDER_ITEMS.map((item) => {
              const isSelected = selectedBuilderItems.some(i => i.id === item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleBuilderItem(item)}
                  style={{
                    backgroundColor: isSelected ? '#F4EFE3' : 'var(--color-ivory)',
                    border: isSelected ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Selection Checkbox Pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.65rem',
                      right: '0.65rem',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      backgroundColor: isSelected ? 'var(--color-forest)' : '#fff',
                      border: isSelected ? 'none' : '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff'
                    }}
                  >
                    {isSelected && <Check size={14} />}
                  </div>

                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', marginBottom: '0.65rem' }}
                  />

                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {item.category}
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.25rem', lineHeight: 1.25 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)', marginBottom: '0.45rem' }}>
                    Pack: {item.pack}
                  </div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-charcoal)' }}>
                    ₹{item.price}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Builder Summary & Add to Cart Footer */}
          <div
            style={{
              backgroundColor: 'var(--color-forest-deep)',
              color: 'var(--color-ivory)',
              padding: '1.25rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-ivory)' }}>
                  ₹{customBoxFinalPrice}
                </span>
                <span style={{ fontSize: '1rem', color: '#B5C4BC', textDecoration: 'line-through' }}>
                  ₹{customBoxOriginalTotal}
                </span>
                <span style={{ backgroundColor: 'var(--color-gold)', color: '#fff', padding: '0.15rem 0.55rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 700 }}>
                  You save ₹{customBoxDiscount} ({discountTier}% OFF)
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#D2DDD7', marginTop: '0.25rem' }}>
                Includes {selectedBuilderItems.length} pantry staples • Free Delivery across India
              </div>
            </div>

            <button
              onClick={handleAddCustomBox}
              className="btn-gold"
              style={{
                padding: '0.85rem 1.85rem',
                fontSize: '0.94rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Package size={18} />
              <span>Add Custom Box to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
