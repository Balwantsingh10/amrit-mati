import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Tag, 
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    rawSubtotal,
    discountAmount,
    subtotalAfterDiscount,
    isFreeShipping,
    shippingFee,
    grandTotal,
    amountToFreeShipping,
    freeShippingProgress,
    totalSavings,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totalItemsCount,
    setIsCheckoutModalOpen,
    navigateTo
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    setIsCheckoutModalOpen(true);
  };

  if (!isCartOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={closeCart}>
      <aside
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
        aria-label="Your Shopping Cart"
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-card-bg)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--color-forest)' }} />
            <h2 style={{ fontSize: '1.25rem', color: 'var(--color-forest)', margin: 0 }}>
              Your Pantry Basket
            </h2>
            <span
              style={{
                backgroundColor: 'rgba(23, 63, 44, 0.1)',
                color: 'var(--color-forest)',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-full)'
              }}
            >
              {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-forest)',
              padding: '0.35rem',
              borderRadius: 'var(--radius-full)'
            }}
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Meter (Better Nutrition Reference) */}
        <div
          style={{
            padding: '0.85rem 1.5rem',
            backgroundColor: isFreeShipping ? '#EDF7EE' : '#FFF9EC',
            borderBottom: '1px solid var(--color-border)',
            fontSize: '0.82rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: isFreeShipping ? '#166534' : '#854D0E' }}>
              <Truck size={15} />
              {isFreeShipping ? (
                <span>You have unlocked <strong>Free Standard Delivery</strong>!</span>
              ) : (
                <span>Add <strong>₹{amountToFreeShipping}</strong> more for Free Delivery</span>
              )}
            </span>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-muted)' }}>
              {freeShippingProgress}%
            </span>
          </div>

          <div className="free-delivery-bar">
            <div
              className="free-delivery-fill"
              style={{
                width: `${freeShippingProgress}%`,
                background: isFreeShipping ? '#16A34A' : 'linear-gradient(90deg, var(--color-gold) 0%, #173F2C 100%)'
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(23, 63, 44, 0.08)',
                  color: 'var(--color-forest)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.25rem'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
                Your pantry basket is empty
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', marginBottom: '1.75rem', maxWidth: '280px', margin: '0 auto 1.5rem' }}>
                Stock your kitchen with fresh stone-ground flour, aged heritage basmati, and cold-pressed oils.
              </p>
              <button
                onClick={() => {
                  closeCart();
                  navigateTo('shop');
                }}
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem' }}
              >
                <span>Browse Staples</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId}`}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '0.85rem',
                    backgroundColor: 'var(--color-card-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '72px',
                      height: '72px',
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-sm)',
                      flexShrink: 0,
                      backgroundColor: '#EBE2D0'
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <div>
                        <h4 style={{ fontSize: '0.94rem', color: 'var(--color-forest)', lineHeight: 1.25, fontWeight: 700 }}>
                          {item.name}
                        </h4>
                        <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginTop: '0.15rem' }}>
                          {item.packLabel}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId, item.variantId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#9CA3AF',
                          cursor: 'pointer',
                          padding: '0.2rem'
                        }}
                        aria-label={`Remove ${item.name} from basket`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                      {/* Quantity Selector */}
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#fff'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.55rem',
                            cursor: 'pointer',
                            color: 'var(--color-forest)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, padding: '0 0.45rem', minWidth: '22px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '0.25rem 0.55rem',
                            cursor: 'pointer',
                            color: 'var(--color-forest)',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price calculation */}
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                          ₹{item.price * item.quantity}
                        </span>
                        {item.mrp && item.mrp > item.price && (
                          <div style={{ fontSize: '0.72rem', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                            ₹{item.mrp * item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Calculations */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              backgroundColor: 'var(--color-card-bg)',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            {/* Coupon Code Section */}
            <div style={{ marginBottom: '1.25rem' }}>
              {appliedCoupon ? (
                <div
                  style={{
                    backgroundColor: '#FAF5EA',
                    border: '1px dashed var(--color-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.65rem 0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Tag size={15} style={{ color: 'var(--color-gold)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--color-forest)' }}>
                      Coupon <strong>{appliedCoupon.code}</strong> Applied (-₹{discountAmount})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    style={{ background: 'none', border: 'none', color: 'var(--color-burgundy)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Discount code (try AMRIT10)"
                    style={{
                      flex: 1,
                      padding: '0.55rem 0.75rem',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-sans)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-secondary"
                    style={{ padding: '0.55rem 0.95rem', fontSize: '0.8rem' }}
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-burgundy)', marginTop: '0.35rem' }}>
                  {couponError}
                </div>
              )}
            </div>

            {/* Price Line Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>Items Subtotal</span>
                <span>₹{rawSubtotal}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                <span>Delivery across India</span>
                <span>{isFreeShipping ? <strong style={{ color: '#166534' }}>FREE</strong> : `₹${shippingFee}`}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.18rem',
                  fontWeight: 700,
                  color: 'var(--color-forest)',
                  paddingTop: '0.65rem',
                  borderTop: '1px solid var(--color-border)'
                }}
              >
                <span>Estimated Total (INR)</span>
                <span>₹{grandTotal}</span>
              </div>

              {totalSavings > 0 && (
                <div style={{ fontSize: '0.75rem', color: 'var(--color-forest)', fontWeight: 600, textAlign: 'right' }}>
                  You are saving ₹{totalSavings} on this staple batch
                </div>
              )}
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedCheckout}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '0.96rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>Instant Guest Checkout</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>₹{grandTotal}</span>
                <ArrowRight size={17} />
              </span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginTop: '0.85rem', fontSize: '0.72rem', color: 'var(--color-muted)' }}>
              <span>UPI / Cards / NetBanking / COD</span>
              <span>•</span>
              <span>Dispatched within 24–48h</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};
