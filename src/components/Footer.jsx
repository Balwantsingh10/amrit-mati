import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Truck, RotateCcw, Heart, ArrowRight, Check } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setIsOrderTrackingOpen, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    setIsSubscribed(true);
    addToast('Thank you for subscribing to Amrit Mati Harvest Notes!');
  };

  return (
    <footer style={{ backgroundColor: 'var(--color-forest-deep)', color: 'var(--color-ivory)', paddingTop: '4.5rem', paddingBottom: '2.5rem', borderTop: '1px solid var(--color-gold)' }}>
      <div className="container">
        {/* Top 4 Pillars Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(234, 219, 190, 0.15)',
            marginBottom: '3.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(184, 148, 78, 0.15)', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FAF7F2' }}>Free Delivery Above ₹999</div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>To 19,000+ Indian PIN Codes</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(184, 148, 78, 0.15)', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FAF7F2' }}>NABL Batch Tested</div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>Pesticide & Heavy Metal COA</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(184, 148, 78, 0.15)', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FAF7F2' }}>Transit Damage Guarantee</div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>Free replacement on damaged packs</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(184, 148, 78, 0.15)', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#FAF7F2' }}>Fair Farmgate Pricing</div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>Direct cluster procurement</div>
            </div>
          </div>
        </div>

        {/* 4 Main Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            marginBottom: '3.5rem'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Philosophy */}
          <div style={{ gridColumn: 'span 4' }} className="footer-col">
            <BrandLogo variant="light" size="large" showTagline={true} />
            <p style={{ color: '#C8D4CE', fontSize: '0.86rem', lineHeight: 1.6, marginTop: '1.25rem', maxWidth: '340px' }}>
              “Everyday staples. Thoughtfully sourced.” Dedicated to reviving regional Indian kitchen cultivars with genuine stone milling, cold extraction, and published batch test certificates.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#A0B2A8' }}>
              <div>FSSAI Central Lic. No: <strong>10022022000000</strong> (Demo Placeholder)</div>
              <div>GSTIN: <strong>27AAAAA0000A1Z5</strong> (Registered Maharashtra)</div>
              <div>CIN: <strong>U01110MH2026PTC000000</strong></div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div style={{ gridColumn: 'span 2' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              The Pantry
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><button onClick={() => navigateTo('shop')} style={linkStyle}>Atta & Flours</button></li>
              <li><button onClick={() => navigateTo('shop')} style={linkStyle}>Heritage Rice</button></li>
              <li><button onClick={() => navigateTo('shop')} style={linkStyle}>Heirloom Dals</button></li>
              <li><button onClick={() => navigateTo('shop')} style={linkStyle}>Wood-Pressed Oils</button></li>
              <li><button onClick={() => navigateTo('shop')} style={linkStyle}>Native Millets</button></li>
              <li><button onClick={() => navigateTo('bundles')} style={linkStyle}>Build Your Pantry Box</button></li>
            </ul>
          </div>

          {/* Col 3: Sourcing & Integrity */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              Transparency & Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
              <li><button onClick={() => navigateTo('sourcing')} style={linkStyle}>Our 5 Farming Clusters</button></li>
              <li><button onClick={() => navigateTo('quality')} style={linkStyle}>NABL Lab Reports (COA)</button></li>
              <li><button onClick={() => navigateTo('recipes')} style={linkStyle}>Pantry Recipes & Guides</button></li>
              <li><button onClick={() => setIsOrderTrackingOpen(true)} style={linkStyle}>Track Your Delivery</button></li>
              <li><button onClick={() => alert('Shipping Policy: Orders dispatched Mon–Sat. Standard transit time 2–4 days for metros, 4–6 days rest of India. Free delivery on orders ₹999+.')} style={linkStyle}>Shipping & Delivery Policy</button></li>
              <li><button onClick={() => alert('Replacement Policy: For edible staples, open bags cannot be returned for food safety. Transit damages receive instant free replacement within 48h.')} style={linkStyle}>Damages & Replacement Policy</button></li>
            </ul>
          </div>

          {/* Col 4: Newsletter / Harvest Notes */}
          <div style={{ gridColumn: 'span 3' }} className="footer-col">
            <h4 style={{ color: 'var(--color-gold-light)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Harvest Notes
            </h4>
            <p style={{ color: '#C8D4CE', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Receive seasonal crop notices, fresh milling dates, and authentic heirloom grain recipes. No spam.
            </p>

            {isSubscribed ? (
              <div style={{ backgroundColor: 'rgba(184, 148, 78, 0.15)', border: '1px solid var(--color-gold)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} />
                <span>Subscribed! Check your inbox for your 10% welcome voucher.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(234, 219, 190, 0.25)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.7rem 0.9rem',
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontFamily: 'var(--font-sans)'
                  }}
                />
                <button
                  type="submit"
                  className="btn-gold"
                  style={{ padding: '0.7rem', fontSize: '0.84rem', fontWeight: 600 }}
                >
                  Join Harvest Notes
                </button>
              </form>
            )}

            <div style={{ marginTop: '1.25rem', fontSize: '0.76rem', color: '#90A398' }}>
              Pantry Care: support@amritmati.in<br />
              WhatsApp Help: +91 98201 00000 (Mon–Sat)
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(234, 219, 190, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: '#90A398'
          }}
        >
          <div>
            © {new Date().getFullYear()} Amrit Mati Foods Pvt. Ltd. All rights reserved. Made for Indian kitchens.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-gold-light)' }}>Secure Indian Commerce:</span>
            <span>UPI (GPay / PhonePe / Paytm)</span>
            <span>•</span>
            <span>RuPay</span>
            <span>•</span>
            <span>Visa / Mastercard</span>
            <span>•</span>
            <span>Net Banking</span>
            <span>•</span>
            <span>COD Available</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </footer>
  );
};

const linkStyle = {
  background: 'none',
  border: 'none',
  color: '#C8D4CE',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.86rem',
  cursor: 'pointer',
  padding: '0.1rem 0',
  textAlign: 'left',
  transition: 'color 0.15s ease'
};
