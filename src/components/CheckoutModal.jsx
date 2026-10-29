import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote,
  ArrowRight,
  Package,
  AlertCircle
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutModalOpen, 
    setIsCheckoutModalOpen, 
    cart, 
    grandTotal, 
    subtotalAfterDiscount, 
    shippingFee, 
    isFreeShipping, 
    discountAmount, 
    appliedCoupon,
    clearCart,
    addToast
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: 'Aditi Sharma',
    phone: '9820123456',
    email: 'aditi.sharma@example.com',
    address: 'Flat 402, Nilgiri Heights, 14th Cross, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'netbanking', 'cod'
  const [upiId, setUpiId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCheckoutModalOpen) return null;

  const isCodEligible = grandTotal <= 3000;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill out all required shipping details.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      alert('Please enter a valid 6-digit Indian PIN code.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `AM-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderRecord = {
        orderId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...cart],
        grandTotal,
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: { ...formData },
        estimatedDelivery: '3–4 business days'
      };

      setConfirmedOrder(orderRecord);
      clearCart();
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#B8944E', '#173F2C', '#D8B975']
        });
      } catch (err) {}

      addToast(`Order ${orderId} confirmed successfully!`);
    }, 1200);
  };

  return (
    <div className="drawer-backdrop" onClick={() => !isSubmitting && setIsCheckoutModalOpen(false)} style={{ zIndex: 130 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '94%',
          maxWidth: '820px',
          maxHeight: '94vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-drawer)',
          padding: 'clamp(1.5rem, 3vw, 2.5rem)',
          zIndex: 131
        }}
      >
        {/* Close Button */}
        {!confirmedOrder && (
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
          >
            <X size={22} />
          </button>
        )}

        {confirmedOrder ? (
          /* ==============================================================
             ORDER CONFIRMATION STATE
             ============================================================== */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                backgroundColor: '#DCFCE7',
                color: '#166534',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}
            >
              <Check size={36} />
            </div>

            <span className="badge-pill badge-gold" style={{ marginBottom: '0.75rem' }}>
              Order Confirmed & Queued for Milling
            </span>

            <h2 style={{ fontSize: '2.2rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
              Thank You, {confirmedOrder.shippingAddress.fullName.split(' ')[0]}!
            </h2>

            <p style={{ color: 'var(--color-muted)', fontSize: '0.96rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
              We have received your order <strong>#{confirmedOrder.orderId}</strong>. Your harvest batch will be freshly packed and dispatched within 24–48 hours.
            </p>

            {/* Order Details Card */}
            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                textAlign: 'left',
                maxWidth: '560px',
                margin: '0 auto 2rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem', marginBottom: '1rem', fontSize: '0.84rem' }}>
                <div><strong>Order ID:</strong> {confirmedOrder.orderId}</div>
                <div><strong>Delivery ETA:</strong> {confirmedOrder.estimatedDelivery}</div>
              </div>

              <div style={{ fontSize: '0.84rem', color: 'var(--color-charcoal)', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 700, color: 'var(--color-forest)', marginBottom: '0.35rem' }}>Delivering to:</div>
                <div>{confirmedOrder.shippingAddress.fullName}</div>
                <div>{confirmedOrder.shippingAddress.address}</div>
                <div>{confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} — {confirmedOrder.shippingAddress.pincode}</div>
                <div>Phone: +91 {confirmedOrder.shippingAddress.phone}</div>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                <span>Paid via {confirmedOrder.paymentMethod}</span>
                <span>₹{confirmedOrder.grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setConfirmedOrder(null);
                setIsCheckoutModalOpen(false);
              }}
              className="btn-primary"
              style={{ padding: '0.85rem 2rem' }}
            >
              <span>Return to Pantry</span>
            </button>
          </div>
        ) : (
          /* ==============================================================
             GUEST CHECKOUT FORM
             ============================================================== */
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <span className="badge-pill badge-forest" style={{ marginBottom: '0.4rem' }}>
                Fast Guest Checkout
              </span>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--color-forest)' }}>
                Complete Your Pantry Order
              </h2>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)' }}>
                No password required. Enter your Indian delivery address and payment choice.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(12, 1fr)',
                  gap: '2rem'
                }}
                className="checkout-form-grid"
              >
                {/* Left 7 Cols: Address & Details */}
                <div style={{ gridColumn: 'span 7' }} className="checkout-col">
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Truck size={18} style={{ color: 'var(--color-gold)' }} />
                    <span>1. Delivery Address</span>
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginBottom: '0.85rem' }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Mobile Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit number"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={labelStyle}>Email Address (for invoice & tracking) *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={labelStyle}>House / Flat No, Street, Landmark *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.75rem' }}>
                    <div>
                      <label style={labelStyle}>PIN Code *</label>
                      <input
                        type="text"
                        maxLength={6}
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <CreditCard size={18} style={{ color: 'var(--color-gold)' }} />
                    <span>2. Select Payment Method</span>
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
                    {/* UPI Option */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        border: paymentMethod === 'upi' ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: paymentMethod === 'upi' ? 'var(--color-ivory)' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          style={{ accentColor: 'var(--color-forest)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-forest)' }}>
                            Instant UPI (Google Pay / PhonePe / Paytm / BHIM)
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
                            Fast zero-fee payment with instant confirmation
                          </div>
                        </div>
                      </div>
                      <QrCode size={20} style={{ color: 'var(--color-gold)' }} />
                    </label>

                    {/* Cards */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        border: paymentMethod === 'card' ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: paymentMethod === 'card' ? 'var(--color-ivory)' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          style={{ accentColor: 'var(--color-forest)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-forest)' }}>
                            Debit / Credit Card (RuPay, Visa, Mastercard)
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
                            Secured by 256-bit Indian Payment Gateway
                          </div>
                        </div>
                      </div>
                      <CreditCard size={20} style={{ color: 'var(--color-muted)' }} />
                    </label>

                    {/* Net Banking */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        border: paymentMethod === 'netbanking' ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: paymentMethod === 'netbanking' ? 'var(--color-ivory)' : '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'netbanking'}
                          onChange={() => setPaymentMethod('netbanking')}
                          style={{ accentColor: 'var(--color-forest)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-forest)' }}>
                            Net Banking (40+ Indian Banks)
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
                            HDFC, ICICI, SBI, Axis, Kotak, and all major banks
                          </div>
                        </div>
                      </div>
                      <Building2 size={20} style={{ color: 'var(--color-muted)' }} />
                    </label>

                    {/* Cash on Delivery (Eligibility condition check) */}
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.85rem 1rem',
                        border: paymentMethod === 'cod' ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: paymentMethod === 'cod' ? 'var(--color-ivory)' : '#fff',
                        cursor: isCodEligible ? 'pointer' : 'not-allowed',
                        opacity: isCodEligible ? 1 : 0.6
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <input
                          type="radio"
                          name="payment"
                          disabled={!isCodEligible}
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          style={{ accentColor: 'var(--color-forest)' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-forest)' }}>
                            Cash on Delivery (COD)
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
                            {isCodEligible ? 'Pay cash or UPI upon courier arrival at doorstep' : 'Available only for orders up to ₹3,000'}
                          </div>
                        </div>
                      </div>
                      <Banknote size={20} style={{ color: 'var(--color-muted)' }} />
                    </label>
                  </div>
                </div>

                {/* Right 5 Cols: Order Summary & Place Button */}
                <div style={{ gridColumn: 'span 5' }} className="checkout-col">
                  <div
                    style={{
                      backgroundColor: 'var(--color-ivory)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.5rem',
                      position: 'sticky',
                      top: '1rem'
                    }}
                  >
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest)', marginBottom: '1rem' }}>
                      Order Summary ({cart.length} items)
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '200px', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.5rem' }}>
                      {cart.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--color-forest)' }}>
                              {item.name}
                            </div>
                            <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                              {item.quantity} × {item.packLabel}
                            </div>
                          </div>
                          <div style={{ fontWeight: 700 }}>
                            ₹{item.price * item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.84rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                        <span>Subtotal</span>
                        <span>₹{subtotalAfterDiscount + discountAmount}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-burgundy)', fontWeight: 600 }}>
                          <span>Coupon Discount</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted)' }}>
                        <span>Standard Delivery</span>
                        <span>{isFreeShipping ? <strong style={{ color: '#166534' }}>FREE</strong> : `₹${shippingFee}`}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-forest)', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                        <span>Grand Total (INR)</span>
                        <span>₹{grandTotal}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{ width: '100%', padding: '0.95rem', fontSize: '0.98rem', fontWeight: 700, marginTop: '1.25rem' }}
                    >
                      {isSubmitting ? 'Placing Order...' : `Confirm Order • ₹${grandTotal}`}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                      <ShieldCheck size={16} style={{ color: 'var(--color-forest)', flexShrink: 0 }} />
                      <span>100% Transit Safe. Fresh harvest batches packed in food-grade tins & canisters.</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 800px) {
          .checkout-form-grid {
            grid-template-columns: 1fr !important;
          }
          .checkout-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: 'var(--color-forest)',
  marginBottom: '0.25rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  fontSize: '0.86rem',
  fontFamily: 'var(--font-sans)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: '#fff'
};
