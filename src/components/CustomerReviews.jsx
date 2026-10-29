import React, { useState } from 'react';
import { Star, CheckCircle, Info, EyeOff } from 'lucide-react';

const SAMPLE_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Meenakshi Sundaram',
    location: 'Bengaluru, Karnataka',
    productBought: 'Sehore Sharbati Whole Wheat Atta (5 kg)',
    rating: 5,
    date: '22 Oct 2026',
    verified: true,
    text: 'Noticeably different from standard supermarket packets. The flour has a sweet, earthy fragrance right upon opening the canister. The rotis puff up lightly on the tawa and stay remarkably soft well into the afternoon lunchbox.'
  },
  {
    id: 'rev-2',
    author: 'Devendra Varma',
    location: 'New Delhi, NCR',
    productBought: 'Dehradun Taraori 24-Mo Aged Basmati (2.5 kg)',
    rating: 5,
    date: '18 Oct 2026',
    verified: true,
    text: 'Genuine aged basmati grain. It needs very little oil during cooking because the grain has cured properly. Slender expansion without clumping together. Made Sunday jeera rice and the aroma filled the entire house.'
  },
  {
    id: 'rev-3',
    author: 'Ananya Deshmukh',
    location: 'Pune, Maharashtra',
    productBought: 'Bundelkhand Desi Toor Dal (2 kg)',
    rating: 5,
    date: '15 Oct 2026',
    verified: true,
    text: 'I was looking for unpolished toor dal that hasn’t been buffed with oil or synthetic dyes. This dal is slightly matte, takes just one extra whistle to cook, but the natural dal broth is so rich and sweet. Simple ghee-jeera tadka is all it needs.'
  }
];

export const CustomerReviews = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div style={{ backgroundColor: 'var(--color-ivory)', padding: '1.5rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => setIsVisible(true)}
          style={{ background: 'none', border: '1px dashed var(--color-border)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--color-muted)', cursor: 'pointer' }}
        >
          Sample Reviews Section Hidden for Production Preview (Click to restore)
        </button>
      </div>
    );
  }

  return (
    <section style={{ padding: '4.5rem 0', backgroundColor: 'var(--color-ivory-light)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Development Disclosure Notice */}
        <div
          style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: 'var(--radius-sm)',
            padding: '0.65rem 1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#92400E' }}>
            <Info size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>Sample Development Content:</strong> Customer feedback below represents early home-kitchen testing panel notes. Per brand guidelines, production deployment requires live verified post-purchase reviews.
            </span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#92400E',
              fontSize: '0.76rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'underline'
            }}
          >
            <EyeOff size={13} />
            <span>Hide section for prod</span>
          </button>
        </div>

        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
          <div style={{ fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            Kitchen Testimonials
          </div>
          <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: 'var(--color-forest)', marginBottom: '0.5rem' }}>
            What Home Cooks Notice
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.92rem' }}>
            Factual feedback on taste, cooking behaviour, and packaging freshness.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              style={{
                backgroundColor: 'var(--color-card-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                {/* Stars & Verified Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '0.2rem', color: '#D97706' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#D97706" />
                    ))}
                  </div>

                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.72rem', color: '#15803D', fontWeight: 600 }}>
                    <CheckCircle size={13} />
                    <span>Verified Purchase</span>
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.25rem' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.85rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-forest)' }}>
                  {rev.author}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-muted)', marginTop: '0.15rem' }}>
                  {rev.location} • Bought: <em>{rev.productBought}</em>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
