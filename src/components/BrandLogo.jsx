import React from 'react';

export const BrandLogo = ({ variant = 'dark', size = 'default', showTagline = true, onClick }) => {
  const isDark = variant === 'dark'; // dark logo on light ivory bg
  const isLight = variant === 'light'; // gold/ivory logo on deep forest bg

  const strokeColor = isLight ? '#D8B975' : '#173F2C';
  const textColor = isLight ? '#FAF7F2' : '#173F2C';
  const goldColor = isLight ? '#D8B975' : '#B8944E';

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: size === 'large' ? '1rem' : '0.75rem',
        cursor: onClick ? 'pointer' : 'default',
        textDecoration: 'none',
        userSelect: 'none'
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label="Amrit Mati — Everyday staples. Thoughtfully sourced."
    >
      {/* Handcrafted Golden Paddy & Soil Crest */}
      <svg
        width={size === 'large' ? '54' : size === 'small' ? '32' : '42'}
        height={size === 'large' ? '54' : size === 'small' ? '32' : '42'}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, transition: 'transform 0.3s ease' }}
      >
        {/* Outer Oval Cartouche */}
        <ellipse cx="50" cy="50" rx="46" ry="46" stroke={goldColor} strokeWidth="2.5" strokeDasharray="3 2" />
        <ellipse cx="50" cy="50" rx="41" ry="41" stroke={strokeColor} strokeWidth="1.8" />
        
        {/* Radiating Sun / Harvest Dawn */}
        <circle cx="50" cy="38" r="7" fill={goldColor} opacity="0.85" />
        <path d="M50 25 V21 M50 51 V55 M37 38 H33 M63 38 H67 M41 29 L38 26 M59 29 L62 26" stroke={goldColor} strokeWidth="1.5" strokeLinecap="round" />

        {/* Terraced Furrows / Soil Waves */}
        <path d="M22 66 C32 60, 42 63, 50 67 C58 71, 68 70, 78 64" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 76 C30 70, 44 73, 52 78 C62 82, 72 80, 82 74" stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" />

        {/* Arching Golden Paddy Stalks Left & Right */}
        <path d="M50 82 C38 68, 30 52, 34 34" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M34 34 C36 30, 40 33, 38 37 C34 44, 30 50, 40 60" fill={goldColor} opacity="0.6" />
        <path d="M50 82 C62 68, 70 52, 66 34" stroke={goldColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M66 34 C64 30, 60 33, 62 37 C66 44, 70 50, 60 60" fill={goldColor} opacity="0.6" />
      </svg>

      {/* Brand Name & Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-serif), 'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontSize: size === 'large' ? '1.85rem' : size === 'small' ? '1.2rem' : '1.45rem',
            letterSpacing: '0.04em',
            color: textColor,
            textTransform: 'uppercase'
          }}
        >
          Amrit Mati
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: size === 'large' ? '0.78rem' : '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: goldColor,
              fontWeight: 600,
              marginTop: '0.2rem'
            }}
          >
            Heritage Indian Pantry
          </span>
        )}
      </div>
    </div>
  );
};
