import React from 'react';
import { useCart } from '../context/CartContext';
import { X, ShieldCheck, Download, Check, AlertCircle } from 'lucide-react';

export const LabReportModal = () => {
  const { selectedLabReportProduct, setSelectedLabReportProduct } = useCart();

  if (!selectedLabReportProduct) return null;
  const product = selectedLabReportProduct;
  const report = product.labReport;

  return (
    <div className="drawer-backdrop" onClick={() => setSelectedLabReportProduct(null)} style={{ zIndex: 140 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#fff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-drawer)',
          padding: '2rem',
          zIndex: 141
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-forest)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 700 }}>
              <ShieldCheck size={16} />
              <span>NABL Food Safety Certificate (COA)</span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--color-forest)', marginTop: '0.25rem' }}>
              {product.name}
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
              Batch: {report?.reportNo || 'AM-LAB-2026'} • Date: {report?.date || 'October 2026'}
            </div>
          </div>

          <button
            onClick={() => setSelectedLabReportProduct(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ backgroundColor: 'var(--color-ivory)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--color-charcoal)', marginBottom: '1.25rem' }}>
          <strong>Accreditation:</strong> {report?.accreditation || 'NABL Accredited Testing Facility (ISO/IEC 17025)'}. Tests performed strictly per FSSAI / European Pharmacopoeia standards.
        </div>

        {/* Results table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', marginBottom: '1.5rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #D1D5DB' }}>
              <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem' }}>Parameter Tested</th>
              <th style={{ textAlign: 'left', padding: '0.65rem 0.85rem' }}>Result Observed</th>
              <th style={{ textAlign: 'right', padding: '0.65rem 0.85rem' }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {report?.results.map((res, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '0.65rem 0.85rem', fontWeight: 500 }}>{res.parameter}</td>
                <td style={{ padding: '0.65rem 0.85rem', color: '#374151' }}>{res.found}</td>
                <td style={{ padding: '0.65rem 0.85rem', textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#DCFCE7', color: '#166534', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: '0.74rem', fontWeight: 700 }}>
                    {res.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #E5E7EB', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)' }}>
            Digital Verification Hash: SHA256-AMRIT-2026-NABL
          </div>

          <button
            onClick={() => alert(`Certificate of Analysis ${report?.reportNo} downloaded.`)}
            className="btn-primary"
            style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
          >
            <Download size={14} />
            <span>Download Official PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
