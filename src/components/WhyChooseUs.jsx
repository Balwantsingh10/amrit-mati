import React from 'react';
import { useCart } from '../context/CartContext';
import { Award, Compass, FileCheck, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

export const WhyChooseUs = () => {
  const { navigateTo, setSelectedLabReportProduct } = useCart();

  return (
    <section style={{ padding: '5rem 0', backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            Evidence-Backed Sourcing
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Why Indian Households Trust Amrit Mati
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            We reject the industrial shortcuts common in commercial staples — no chemical bleaching, zero artificial water polishing, and published laboratory certificates.
          </p>
        </div>

        {/* 3 Evidence-Backed Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {/* Pillar 1 */}
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(23, 63, 44, 0.08)',
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <Award size={24} />
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
              Pillar 01 • Low-Heat Processing
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-forest)', marginBottom: '0.85rem' }}>
              Slow Stone-Milling & Wood Churning
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
              High-speed industrial steel roller mills generate friction heat above 80°C, scorching natural wheat oils and vital B-vitamins. Our flour is ground on traditional emery stone chakkis below 40°C, and oils are extracted in slow wood-mortar kolhus without hexane solvents.
            </p>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => navigateTo('sourcing')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-forest)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Read our stone-milling audit</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(184, 148, 78, 0.12)',
                color: 'var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <Compass size={24} />
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
              Pillar 02 • Verifiable Terroirs
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-forest)', marginBottom: '0.85rem' }}>
              Direct Regional Farmgate Sourcing
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
              We partner directly with registered Farmer Producer Companies across 5 dedicated agro-climatic zones: Sehore black soil for Sharbati, Shivalik foothills for 24-month aged Basmati, Bundelkhand for unpolished toor, and Saurashtra for peanuts. Zero middleman mixing.
            </p>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => navigateTo('sourcing')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-forest)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>Explore the 5 farming clusters</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            style={{
              backgroundColor: 'var(--color-card-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem 1.75rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-sm)',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(23, 63, 44, 0.08)',
                color: 'var(--color-forest)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <FileCheck size={24} />
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '0.35rem' }}>
              Pillar 03 • Batch Verification
            </div>

            <h3 style={{ fontSize: '1.4rem', color: 'var(--color-forest)', marginBottom: '0.85rem' }}>
              Published NABL Lab Reports
            </h3>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
              We don’t rely on unverified claims. Every seasonal crop lot is tested by NABL-accredited ISO/IEC 17025 laboratories for 52 synthetic pesticide residues, heavy metals (lead, arsenic, cadmium), and aflatoxins. Reports are accessible to all customers.
            </p>

            <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
              <button
                onClick={() => navigateTo('quality')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-forest)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}
              >
                <span>View current batch COA reports</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
