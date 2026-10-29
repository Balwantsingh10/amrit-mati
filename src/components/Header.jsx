import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2,
  Package
} from 'lucide-react';

export const Header = () => {
  const { 
    totalItemsCount, 
    subtotalAfterDiscount, 
    openCart, 
    activePage, 
    navigateTo, 
    setIsSearchOpen,
    setIsOrderTrackingOpen
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCategoriesExpanded, setMobileCategoriesExpanded] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, categoryId = null) => {
    setIsMobileMenuOpen(false);
    setShopDropdownOpen(false);
    navigateTo(page);
    if (categoryId && categoryId !== 'all') {
      window.dispatchEvent(new CustomEvent('amrit_filter_category', { detail: categoryId }));
    }
  };

  return (
    <>
      <header className={`sticky-header ${isScrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '66px' : '76px',
              transition: 'height 0.2s ease'
            }}
          >
            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                style={{
                  display: 'none',
                  background: 'none',
                  border: 'none',
                  padding: '0.4rem',
                  color: 'var(--color-forest)',
                  cursor: 'pointer'
                }}
              >
                <Menu size={24} />
              </button>

              <BrandLogo
                size={isScrolled ? 'default' : 'default'}
                showTagline={!isScrolled}
                onClick={() => handleNavClick('home')}
              />
            </div>

            {/* Middle: Desktop Navigation Links */}
            <nav
              className="desktop-nav"
              aria-label="Main Navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem'
              }}
            >
              {/* Shop with subtle dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('shop')}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    fontWeight: activePage === 'shop' ? '700' : '500',
                    color: activePage === 'shop' ? 'var(--color-forest)' : 'var(--color-charcoal)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0',
                    borderBottom: activePage === 'shop' ? '2px solid var(--color-gold)' : '2px solid transparent'
                  }}
                >
                  <span>Shop</span>
                  <ChevronDown size={14} style={{ opacity: 0.6 }} />
                </button>

                {shopDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-1rem',
                      width: '260px',
                      backgroundColor: 'var(--color-card-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '0.75rem 0',
                      zIndex: 60,
                      animation: 'fadeIn 0.2s ease-out'
                    }}
                  >
                    <div style={{ padding: '0.4rem 1.25rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-muted)', fontWeight: 600 }}>
                      Browse By Category
                    </div>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('shop', cat.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.55rem 1.25rem',
                          background: 'none',
                          border: 'none',
                          fontSize: '0.88rem',
                          color: 'var(--color-charcoal)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'background-color 0.15s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-ivory-warm)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <span>{cat.name}</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>({cat.count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('bundles')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: activePage === 'bundles' ? '700' : '500',
                  color: activePage === 'bundles' ? 'var(--color-forest)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: activePage === 'bundles' ? '2px solid var(--color-gold)' : '2px solid transparent'
                }}
              >
                Bundles & Kits
              </button>

              <button
                onClick={() => handleNavClick('sourcing')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: activePage === 'sourcing' ? '700' : '500',
                  color: activePage === 'sourcing' ? 'var(--color-forest)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: activePage === 'sourcing' ? '2px solid var(--color-gold)' : '2px solid transparent'
                }}
              >
                Our Sourcing
              </button>

              <button
                onClick={() => handleNavClick('quality')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: activePage === 'quality' ? '700' : '500',
                  color: activePage === 'quality' ? 'var(--color-forest)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: activePage === 'quality' ? '2px solid var(--color-gold)' : '2px solid transparent'
                }}
              >
                Quality & Testing
              </button>

              <button
                onClick={() => handleNavClick('recipes')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  fontWeight: activePage === 'recipes' ? '700' : '500',
                  color: activePage === 'recipes' ? 'var(--color-forest)' : 'var(--color-charcoal)',
                  cursor: 'pointer',
                  padding: '0.5rem 0',
                  borderBottom: activePage === 'recipes' ? '2px solid var(--color-gold)' : '2px solid transparent'
                }}
              >
                Recipes
              </button>
            </nav>

            {/* Right: Actions (Search, Order Track / Account, Cart) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search pantry staples"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.55rem',
                  color: 'var(--color-forest)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(23, 63, 44, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Search size={20} />
              </button>

              {/* Order Tracking / Account */}
              <button
                onClick={() => setIsAccountModalOpen(true)}
                aria-label="Account and orders"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.55rem',
                  color: 'var(--color-forest)',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(23, 63, 44, 0.08)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                title="Account & Orders"
              >
                <User size={20} />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={openCart}
                aria-label={`Open shopping cart with ${totalItemsCount} items`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--color-forest)',
                  color: 'var(--color-ivory)',
                  border: 'none',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.95rem',
                  cursor: 'pointer',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-forest-deep)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-forest)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <ShoppingBag size={18} />
                <span className="cart-badge-count" style={{
                  backgroundColor: 'var(--color-gold)',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '0.1rem 0.45rem',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {totalItemsCount}
                </span>
                <span className="cart-badge-total" style={{ display: 'none', opacity: 0.9, marginLeft: '0.2rem' }}>
                  ₹{subtotalAfterDiscount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Account / Repeat Purchase Helper Modal */}
      {isAccountModalOpen && (
        <div className="drawer-backdrop" onClick={() => setIsAccountModalOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '420px',
              backgroundColor: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-lg)',
              padding: '1.75rem',
              zIndex: 110
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={20} style={{ color: 'var(--color-forest)' }} />
                <h3 style={{ fontSize: '1.25rem' }}>Customer Account</h3>
              </div>
              <button
                onClick={() => setIsAccountModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted)', marginBottom: '1.25rem' }}>
              Track past deliveries or reorder your regular kitchen staples with 1-click.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => {
                  setIsAccountModalOpen(false);
                  setIsOrderTrackingOpen(true);
                }}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '0.75rem 1rem' }}
              >
                <Package size={18} style={{ color: 'var(--color-gold)' }} />
                <span>Track an Existing Order</span>
              </button>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-forest)' }}>
                  Enter Mobile Number for OTP Login
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    style={{
                      flex: 1,
                      padding: '0.65rem 0.85rem',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button
                    onClick={() => {
                      alert('Demo Mode: OTP sent to test number. You can complete orders seamlessly using Guest Checkout without signing in.');
                      setIsAccountModalOpen(false);
                    }}
                    className="btn-primary"
                    style={{ padding: '0.65rem 1rem', fontSize: '0.84rem' }}
                  >
                    Send OTP
                  </button>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              <strong>Note:</strong> We support Instant Guest Checkout. No mandatory password creation required to complete your staple purchases.
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '84%',
              maxWidth: '340px',
              backgroundColor: 'var(--color-ivory-light)',
              zIndex: 105,
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '8px 0 32px rgba(14, 41, 28, 0.25)',
              overflowY: 'auto'
            }}
          >
            {/* Header in Drawer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
              <BrandLogo size="small" showTagline={false} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-forest)', padding: '0.25rem' }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Navigation List */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1.25rem' }}>
              <div>
                <button
                  onClick={() => setMobileCategoriesExpanded(!mobileCategoriesExpanded)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>Shop Products</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileCategoriesExpanded ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </button>

                {mobileCategoriesExpanded && (
                  <div style={{ paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingBottom: '0.5rem' }}>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleNavClick('shop', cat.id)}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '0.45rem 0',
                          background: 'none',
                          border: 'none',
                          fontSize: '0.92rem',
                          color: 'var(--color-charcoal)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <ChevronRight size={14} style={{ color: 'var(--color-gold)' }} />
                        <span>{cat.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavClick('bundles')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.8rem 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  cursor: 'pointer'
                }}
              >
                Bundles & Kits
              </button>

              <button
                onClick={() => handleNavClick('sourcing')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.8rem 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  cursor: 'pointer'
                }}
              >
                Our Sourcing
              </button>

              <button
                onClick={() => handleNavClick('quality')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.8rem 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  cursor: 'pointer'
                }}
              >
                Quality & Testing
              </button>

              <button
                onClick={() => handleNavClick('recipes')}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.8rem 0',
                  background: 'none',
                  border: 'none',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--color-forest)',
                  cursor: 'pointer'
                }}
              >
                Recipes
              </button>

              <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '1rem', paddingTop: '1rem' }}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsOrderTrackingOpen(true);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.6rem 0',
                    background: 'none',
                    border: 'none',
                    fontSize: '0.92rem',
                    color: 'var(--color-charcoal)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Package size={16} style={{ color: 'var(--color-forest)' }} />
                  <span>Track Order Status</span>
                </button>
              </div>
            </nav>

            {/* Bottom contact info */}
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', fontSize: '0.78rem', color: 'var(--color-muted)' }}>
              <div>Care: support@amritmati.in</div>
              <div style={{ marginTop: '0.2rem' }}>Mon–Sat: 9:00 AM – 7:00 PM IST</div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Header CSS Rules */}
      <style>{`
        @media (max-width: 960px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
        @media (min-width: 640px) {
          .cart-badge-total {
            display: inline-block !important;
          }
        }
      `}</style>
    </>
  );
};
