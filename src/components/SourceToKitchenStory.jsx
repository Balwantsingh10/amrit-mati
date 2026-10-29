import React, { useState } from 'react';
import { FOUR_STEP_JOURNEY, SOURCING_CLUSTERS } from '../data/sourcing';
import { useCart } from '../context/CartContext';
import { Sprout, Cpu, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from 'lucide-react';

const STEP_ICONS = {
  Sprout: Sprout,
  Cpu: Cpu,
  ShieldCheck: ShieldCheck,
  Truck: Truck
};

export const SourceToKitchenStory = () => {
  const { navigateTo } = useCart();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            Traceability & Craft
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            The Source-to-Kitchen Journey
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem', lineHeight: 1.6 }}>
            How we bring unadulterated grains from regional soil into your family’s meals with complete transparency at every milestone.
          </p>
        </div>

        {/* 4-Step Interactive Timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {FOUR_STEP_JOURNEY.map((item, index) => {
            const IconComponent = STEP_ICONS[item.icon] || Sprout;
            const isCurrent = activeStep === index;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                style={{
                  backgroundColor: isCurrent ? 'var(--color-card-bg)' : 'var(--color-ivory-light)',
                  border: isCurrent ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  boxShadow: isCurrent ? 'var(--shadow-md)' : 'none'
                }}
              >
                {/* Step Number Top */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: isCurrent ? 'var(--color-gold)' : 'var(--color-border)'
                    }}
                  >
                    {item.step}
                  </span>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isCurrent ? 'var(--color-forest)' : 'rgba(23, 63, 44, 0.08)',
                      color: isCurrent ? 'var(--color-ivory)' : 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <IconComponent size={20} />
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {item.subtitle}
                </div>

                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest)', marginBottom: '0.65rem' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.84rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner on Sourcing */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '2rem 2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 700 }}>
              Single-Origin Terroirs
            </span>
            <h4 style={{ fontSize: '1.45rem', color: 'var(--color-forest)', marginTop: '0.2rem', marginBottom: '0.4rem' }}>
              We source only from 5 dedicated agro-climatic farming clusters.
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', margin: 0 }}>
              Each crop is grown where geography naturally provides optimal soil minerals, rainfall, and sunshine. Zero artificial canal forced-yields.
            </p>
          </div>

          <button
            onClick={() => navigateTo('sourcing')}
            className="btn-secondary"
            style={{ padding: '0.75rem 1.5rem' }}
          >
            <span>View All 5 Clusters & Farmers</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
