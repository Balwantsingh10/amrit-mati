import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
        zIndex: 200,
        maxWidth: '380px',
        width: 'calc(100% - 3rem)'
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        return (
          <div
            key={toast.id}
            style={{
              backgroundColor: isSuccess ? 'var(--color-forest-deep)' : '#1F2937',
              color: '#fff',
              border: isSuccess ? '1px solid var(--color-gold)' : '1px solid #4B5563',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem 1rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem',
              animation: 'slideUp 0.25s ease-out'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem' }}>
              {isSuccess ? (
                <CheckCircle2 size={17} style={{ color: 'var(--color-gold-light)', flexShrink: 0 }} />
              ) : (
                <Info size={17} style={{ color: '#60A5FA', flexShrink: 0 }} />
              )}
              <span>{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '0.2rem' }}
              aria-label="Dismiss alert"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
