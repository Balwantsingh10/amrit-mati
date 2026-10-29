import React from 'react';
import { Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar = () => {
  const { FREE_SHIPPING_THRESHOLD } = useCart();

  return (
    <aside
      className="announcement-bar"
      aria-label="Shipping and harvest announcement"
    >
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Truck size={14} style={{ color: 'var(--color-gold-light)' }} />
          <span>Complimentary delivery across India on orders above ₹{FREE_SHIPPING_THRESHOLD}</span>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
          <Sparkles size={13} style={{ color: 'var(--color-gold-light)' }} />
          <span>Fresh Rabi 2026 stone-ground batches dispatched within 48h of milling</span>
        </span>
        <span style={{ opacity: 0.4 }}>•</span>
        <span className="announcement-highlight" style={{ fontSize: '0.78rem' }}>
          Use code <strong>AMRIT10</strong> for 10% off your first pantry order
        </span>
      </div>
    </aside>
  );
};
