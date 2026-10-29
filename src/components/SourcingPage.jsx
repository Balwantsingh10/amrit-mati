import React from 'react';
import { SOURCING_CLUSTERS } from '../data/sourcing';
import { useCart } from '../context/CartContext';
import { Compass, MapPin, Users, SunMedium, ArrowRight, ShieldCheck } from 'lucide-react';

export const SourcingPage = () => {
  const { navigateTo } = useCart();

  return (
    <div style={{ padding: '3.5rem 0 6rem', backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        {/* Breadcrumb & Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
            <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: 0 }}>
              Home
            </button>
            <span>/</span>
            <span style={{ color: 'var(--color-forest)', fontWeight: 600 }}>Our Sourcing</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            <Compass size={14} />
            <span>Farmgate Transparency</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: 'var(--color-forest)', marginBottom: '1rem' }}>
            Five Agro-Climatic Clusters.<br />Zero Middlemen Mixing.
          </h1>

          <p style={{ color: 'var(--color-charcoal)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Indian agriculture is inherently regional. True quality wheat requires the deep vertisols of Madhya Pradesh; authentic fragrant basmati requires Himalayan snowmelt canals; and resilient pulses flourish in the rainfed plateaus of Bundelkhand. Here is where and how we source our staples.
          </p>
        </div>

        {/* 5 Clusters Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '4rem' }}>
          {SOURCING_CLUSTERS.map((cluster, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '2rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              {/* Left Column: Region & Story */}
              <div style={{ gridColumn: 'span 7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <MapPin size={16} style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 700 }}>
                    Cluster 0{idx + 1} • {cluster.state}
                  </span>
                </div>

                <h2 style={{ fontSize: '1.85rem', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
                  {cluster.region}
                </h2>

                <p style={{ fontSize: '0.94rem', color: 'var(--color-charcoal)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  {cluster.story}
                </p>

                <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Users size={16} style={{ color: 'var(--color-forest)' }} />
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-forest)' }}>
                    Partner: {cluster.partners}
                  </span>
                </div>
              </div>

              {/* Right Column: Agronomic Data Card */}
              <div
                style={{
                  gridColumn: 'span 5',
                  backgroundColor: 'var(--color-ivory-light)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700 }}>
                    Core Crop Harvested
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                    {cluster.staple}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700 }}>
                    Soil Chemistry
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    {cluster.soilType}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--color-muted)', fontWeight: 700 }}>
                    Agro-Climate Profile
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
                    {cluster.climate}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', fontSize: '0.76rem', color: 'var(--color-forest)', fontWeight: 600 }}>
                  ✓ Direct fair procurement premium paid
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to Shop */}
        <div style={{ textAlign: 'center', backgroundColor: 'var(--color-forest-deep)', color: 'var(--color-ivory)', padding: '3.5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
          <h3 style={{ fontSize: '2.1rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
            Taste the Difference of Single-Origin Harvests
          </h3>
          <p style={{ color: '#C8D4CE', maxWidth: '520px', margin: '0 auto 1.75rem', fontSize: '0.95rem' }}>
            Order your freshly milled staples today and experience genuine regional cooking in your kitchen.
          </p>
          <button onClick={() => navigateTo('shop')} className="btn-gold" style={{ padding: '0.85rem 1.85rem', fontSize: '0.95rem' }}>
            <span>Shop All Staples</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
