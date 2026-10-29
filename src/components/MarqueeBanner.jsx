import React from 'react';
import { Sparkles } from 'lucide-react';

export const MarqueeBanner = () => {
  const items = [
    'STONE-GROUND BELOW 40°C',
    '24-MONTH AGED TARAORI BASMATI',
    '100% UNPOLISHED DESI DALS',
    'WOOD-CHURNED KACHI GHANI OILS',
    'NABL ISO/IEC 17025 TESTED BATCHES',
    'ZERO ARTIFICIAL POLISH OR CHEMICALS',
    'DIRECT FARMGATE CLUSTER PROCUREMENT',
    'FREE COMPLIMENTARY SHIPPING ABOVE ₹999'
  ];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-forest-deep)',
        color: 'var(--color-ivory)',
        padding: '0.85rem 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(184, 148, 78, 0.3)',
        borderBottom: '1px solid rgba(184, 148, 78, 0.3)',
        userSelect: 'none'
      }}
      aria-label="Pantry brand qualities marquee"
    >
      <div className="marquee-track">
        {/* Double list for seamless infinite loop */}
        {[...items, ...items].map((text, idx) => (
          <div
            key={idx}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.25rem',
              paddingRight: '2rem',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F5F0E3',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{text}</span>
            <Sparkles size={12} style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};
