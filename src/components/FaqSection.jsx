import React, { useState } from 'react';
import { FAQS } from '../data/faqs';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0); // first open by default
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Freshness & Milling', 'Sourcing & Processing', 'Storage & Shelf Life', 'Delivery & Shipping', 'Returns & Damages'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-ivory-light)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            <HelpCircle size={14} />
            <span>Pantry Transparency</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.7rem)', color: 'var(--color-forest)', marginBottom: '0.75rem' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.94rem' }}>
            Practical answers on milling schedules, delivery timelines, storage tips, and refund integrity.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '1.75rem',
            scrollbarWidth: 'none'
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.45rem 0.95rem',
                fontSize: '0.8rem',
                fontWeight: activeCategory === cat ? 700 : 500,
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                backgroundColor: activeCategory === cat ? 'var(--color-forest)' : 'var(--color-card-bg)',
                color: activeCategory === cat ? 'var(--color-ivory)' : 'var(--color-charcoal)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease'
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer'
                  }}
                  aria-expanded={isOpen}
                >
                  <span style={{ fontSize: '1.02rem', fontWeight: 600, color: 'var(--color-forest)', lineHeight: 1.35 }}>
                    {faq.question}
                  </span>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isOpen ? 'var(--color-forest)' : 'rgba(23, 63, 44, 0.08)',
                      color: isOpen ? 'var(--color-ivory)' : 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 1.5rem 1.35rem',
                      fontSize: '0.88rem',
                      color: 'var(--color-charcoal)',
                      lineHeight: 1.65,
                      borderTop: '1px solid var(--color-border-subtle)',
                      paddingTop: '1rem',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Help Box */}
        <div
          style={{
            marginTop: '3rem',
            backgroundColor: 'var(--color-ivory)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <MessageCircle size={24} style={{ color: 'var(--color-gold)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-forest)' }}>
                Have a specific dietary or batch question?
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-muted)' }}>
                Our pantry care team is based in India and available Mon–Sat (9 AM – 7 PM IST).
              </div>
            </div>
          </div>

          <a
            href="mailto:support@amritmati.in"
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '0.55rem 1.15rem' }}
          >
            Email Care Team
          </a>
        </div>
      </div>
    </section>
  );
};
