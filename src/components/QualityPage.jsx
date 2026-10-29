import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShieldCheck, FileCheck, CheckCircle2, AlertTriangle, Download, ArrowRight } from 'lucide-react';

export const QualityPage = () => {
  const { navigateTo, setSelectedLabReportProduct } = useCart();
  const [selectedCrop, setSelectedCrop] = useState(PRODUCTS[0]);

  return (
    <div style={{ padding: '3.5rem 0 6rem', backgroundColor: 'var(--color-ivory)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '780px', marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-muted)', marginBottom: '0.75rem' }}>
            <button onClick={() => navigateTo('home')} style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', padding: 0 }}>
              Home
            </button>
            <span>/</span>
            <span style={{ color: 'var(--color-forest)', fontWeight: 600 }}>Quality & Testing</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            <ShieldCheck size={15} />
            <span>Verifiable Food Safety</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', color: 'var(--color-forest)', marginBottom: '1rem' }}>
            Every Seasonal Harvest Tested.<br />Results Publicly Accessible.
          </h1>

          <p style={{ color: 'var(--color-charcoal)', fontSize: '1.05rem', lineHeight: 1.65 }}>
            Rather than relying on generic, unverified wellness slogans, Amrit Mati subjects every seasonal harvest lot to third-party testing at NABL-accredited laboratories complying with ISO/IEC 17025. Here is our exact test regime and current batch Certificates of Analysis (COA).
          </p>
        </div>

        {/* 3 Core Testing Categories */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4rem'
          }}
        >
          <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(23, 63, 44, 0.08)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
              52 Pesticide Screen
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
              Multiresidue LC-MS/MS & GC-MS screening for organophosphates, synthetic pyrethroids, and chlorinated hydrocarbons. Target: Below Limit of Quantification (&lt;0.01 mg/kg).
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(23, 63, 44, 0.08)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
              Heavy Metals ICP-MS
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
              Quantitative atomic screening for Lead (Pb), Cadmium (Cd), and Arsenic (As) to guarantee crops absorbed zero industrial groundwater contamination.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-card-bg)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '2rem 1.5rem', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(23, 63, 44, 0.08)', color: 'var(--color-forest)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <CheckCircle2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
              Adulteration & Whitening
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
              Testing for chemical bleaching agents (Benzoyl Peroxide in wheat), mineral oil glaze on pulses, and chemical solvents (hexane) in cold-pressed oils.
            </p>
          </div>
        </div>

        {/* Interactive Batch Report Explorer */}
        <div
          style={{
            backgroundColor: 'var(--color-card-bg)',
            border: '2px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(1.5rem, 3.5vw, 2.75rem)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '4rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', fontWeight: 700 }}>
                Interactive Lab Certificate Explorer
              </div>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--color-forest)', marginTop: '0.2rem' }}>
                Select a Staple to Inspect Its Certificate of Analysis (COA)
              </h2>
            </div>
          </div>

          {/* Product selector buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem' }}>
            {PRODUCTS.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedCrop(p)}
                style={{
                  padding: '0.65rem 1rem',
                  fontSize: '0.84rem',
                  borderRadius: 'var(--radius-sm)',
                  border: selectedCrop.id === p.id ? '2px solid var(--color-forest)' : '1px solid var(--color-border)',
                  backgroundColor: selectedCrop.id === p.id ? 'var(--color-forest)' : '#fff',
                  color: selectedCrop.id === p.id ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                  fontWeight: selectedCrop.id === p.id ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {p.name.split(' ')[0]} {p.name.split(' ')[1]}
              </button>
            ))}
          </div>

          {/* Certificate of Analysis Document Preview */}
          <div
            style={{
              backgroundColor: '#fff',
              border: '1px solid #D1D5DB',
              borderRadius: 'var(--radius-sm)',
              padding: '2rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            {/* Header of Report */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--color-forest)', paddingBottom: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-muted)', fontWeight: 700 }}>
                  Official Certificate of Analysis
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-forest)', marginTop: '0.2rem' }}>
                  {selectedCrop.name}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-muted)' }}>
                  Origin: {selectedCrop.origin.region}, {selectedCrop.origin.state} • Harvest: {selectedCrop.harvestSeason}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Report No: {selectedCrop.labReport.reportNo}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                  Date: {selectedCrop.labReport.date}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#166534', fontWeight: 600, marginTop: '0.2rem' }}>
                  ✓ {selectedCrop.labReport.accreditation}
                </div>
              </div>
            </div>

            {/* Test Results Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', marginBottom: '1.5rem' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)' }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--color-forest)' }}>Parameter Tested</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: 'var(--color-forest)' }}>Observed Value</th>
                  <th style={{ textAlign: 'right', padding: '0.75rem 1rem', color: 'var(--color-forest)' }}>Compliance Status</th>
                </tr>
              </thead>
              <tbody>
                {selectedCrop.labReport.results.map((res, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{res.parameter}</td>
                    <td style={{ padding: '0.75rem 1rem', color: 'var(--color-charcoal)' }}>{res.found}</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700 }}>
                        {res.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Actions for this report */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-muted)' }}>
                Certified genuine harvest batch test. Samples retained for 180 days in moisture-sealed control lockers.
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => alert(`Downloaded Official Lab Report PDF for ${selectedCrop.name} (${selectedCrop.labReport.reportNo})`)}
                  className="btn-secondary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                >
                  <Download size={15} />
                  <span>Download Lab PDF</span>
                </button>

                <button
                  onClick={() => navigateTo('shop', selectedCrop.category)}
                  className="btn-primary"
                  style={{ padding: '0.55rem 1rem', fontSize: '0.8rem' }}
                >
                  <span>Order This Tested Batch</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
