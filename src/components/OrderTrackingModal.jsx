import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Search, Package, CheckCircle2, Clock, Truck, MapPin } from 'lucide-react';

export const OrderTrackingModal = () => {
  const { isOrderTrackingOpen, setIsOrderTrackingOpen } = useCart();
  const [orderIdInput, setOrderIdInput] = useState('AM-84920');
  const [phoneInput, setPhoneInput] = useState('9820123456');
  const [trackingResult, setTrackingResult] = useState({
    orderId: 'AM-84920',
    placedDate: '27 Oct 2026, 11:30 AM',
    status: 'In Transit with BlueDart Express',
    trackingNumber: 'BLR948291048',
    deliveryPincode: '560038 (Indiranagar, Bengaluru)',
    estimatedDelivery: 'Tomorrow by 4:00 PM',
    timeline: [
      { time: '27 Oct, 11:30 AM', title: 'Order Placed & Harvest Batch Assigned', done: true },
      { time: '28 Oct, 09:15 AM', title: 'Slow Stone-Milled & Nitrogen Flushed', done: true },
      { time: '28 Oct, 04:45 PM', title: 'Handed to Courier Partner (BlueDart Express)', done: true },
      { time: '29 Oct, 06:10 AM', title: 'Arrived at Bengaluru Central Sort Hub', done: true },
      { time: 'Expected 30 Oct', title: 'Out for Doorstep Delivery', done: false }
    ],
    items: [
      { name: 'Sehore Sharbati Whole Wheat Atta', pack: '5 kg Family Pack', qty: 1 },
      { name: 'Dehradun Taraori Aged Basmati Rice', pack: '2.5 kg Heritage Canister', qty: 1 }
    ]
  });

  if (!isOrderTrackingOpen) return null;

  const handleLookup = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) {
      alert('Please enter an Order ID');
      return;
    }
    // Set realistic tracking details
    setTrackingResult({
      orderId: orderIdInput.trim().toUpperCase(),
      placedDate: '28 Oct 2026, 02:15 PM',
      status: 'Batch Milling in Progress',
      trackingNumber: 'DEL993847291',
      deliveryPincode: 'Serviceable PIN Code',
      estimatedDelivery: '3–4 business days',
      timeline: [
        { time: '28 Oct, 02:15 PM', title: 'Order Received & Harvest Batch Assigned', done: true },
        { time: '29 Oct, 10:00 AM', title: 'Stone-Chakki Milling Underway', done: true },
        { time: 'Pending', title: 'Quality Sealed & Dispatched', done: false },
        { time: 'Pending', title: 'Out for Doorstep Delivery', done: false }
      ],
      items: [
        { name: 'Bundelkhand Desi Toor Dal', pack: '2 kg Value Pack', qty: 1 },
        { name: 'Saurashtra Wood-Pressed Groundnut Oil', pack: '1 Litre Glass Bottle', qty: 1 }
      ]
    });
  };

  return (
    <div className="drawer-backdrop" onClick={() => setIsOrderTrackingOpen(false)} style={{ zIndex: 125 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '580px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--color-card-bg)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          padding: '2rem',
          zIndex: 126
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={20} style={{ color: 'var(--color-forest)' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest)' }}>
              Track Your Delivery
            </h3>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleLookup} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          <input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter Order ID (e.g. AM-84920)"
            style={{
              flex: 1,
              padding: '0.65rem 0.85rem',
              fontSize: '0.86rem',
              fontFamily: 'var(--font-sans)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase'
            }}
          />
          <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.15rem', fontSize: '0.84rem' }}>
            <Search size={15} />
            <span>Track</span>
          </button>
        </form>

        {trackingResult && (
          <div>
            {/* Status Header */}
            <div
              style={{
                backgroundColor: 'var(--color-ivory)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Order {trackingResult.orderId}
                </span>
                <span className="badge-pill badge-gold" style={{ fontSize: '0.7rem' }}>
                  {trackingResult.status}
                </span>
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal)' }}>
                <strong>ETA:</strong> {trackingResult.estimatedDelivery} • <strong>AWB:</strong> {trackingResult.trackingNumber}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                Destined for: {trackingResult.deliveryPincode}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-gold)', marginBottom: '1rem' }}>
                Dispatch & Transit Milestones
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--color-border)', paddingLeft: '1.25rem', marginLeft: '0.5rem' }}>
                {trackingResult.timeline.map((step, idx) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    {/* Dot on line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: '-1.62rem',
                        top: '0.15rem',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: step.done ? 'var(--color-forest)' : '#D1D5DB',
                        border: '2px solid var(--color-card-bg)'
                      }}
                    />

                    <div style={{ fontSize: '0.85rem', fontWeight: step.done ? 700 : 500, color: step.done ? 'var(--color-forest)' : 'var(--color-muted)' }}>
                      {step.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                      {step.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items inside this shipment */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Staples in this parcel:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {trackingResult.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--color-forest)', fontWeight: 600 }}>{item.name}</span>
                    <span style={{ color: 'var(--color-muted)' }}>{item.qty} × {item.pack}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
