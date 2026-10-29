import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Film, 
  Image as ImageIcon 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Hero = () => {
  const { navigateTo } = useCart();
  const [heroMediaType, setHeroMediaType] = useState('video'); // 'video' or 'photo'
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef(null);

  const toggleHeroPlay = () => {
    if (!heroVideoRef.current) return;
    if (isHeroPlaying) {
      heroVideoRef.current.pause();
      setIsHeroPlaying(false);
    } else {
      heroVideoRef.current.play();
      setIsHeroPlaying(true);
    }
  };

  const toggleHeroMute = () => {
    if (!heroVideoRef.current) return;
    heroVideoRef.current.muted = !isHeroMuted;
    setIsHeroMuted(!isHeroMuted);
  };

  return (
    <section
      className="hero-section bg-grain"
      style={{
        position: 'relative',
        paddingTop: '3.25rem',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Editorial Headline & Purpose */}
          <div
            style={{
              gridColumn: 'span 7'
            }}
            className="hero-text-col"
          >
            {/* Tagline / Subtitle Pill with subtle floating motion */}
            <div
              className="animate-float"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(184, 148, 78, 0.12)',
                border: '1px solid rgba(184, 148, 78, 0.35)',
                padding: '0.35rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                marginBottom: '1.25rem'
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
              <span
                style={{
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--color-forest)'
                }}
              >
                Modern Heirloom • Authentic Indian Pantry
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                lineHeight: 1.08,
                color: 'var(--color-forest)',
                marginBottom: '1.2rem',
                fontWeight: 600,
                letterSpacing: '-0.02em'
              }}
            >
              Everyday staples.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400, color: '#325845' }}>
                Thoughtfully sourced.
              </span>
            </h1>

            {/* Short Supporting Paragraph */}
            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                lineHeight: 1.65,
                color: 'var(--color-charcoal)',
                maxWidth: '560px',
                marginBottom: '2rem'
              }}
            >
              Fresh stone-ground Sharbati atta, 2-year aged Taraori basmati, unpolished heirloom dals, and wood-churned oils. Direct from single-origin regional farming clusters across India, batch-tested for purity.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem'
              }}
            >
              <button
                onClick={() => navigateTo('shop')}
                className="btn-primary"
                style={{
                  fontSize: '0.98rem',
                  padding: '0.95rem 1.95rem'
                }}
              >
                <span>Shop the Pantry</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => navigateTo('sourcing')}
                className="btn-secondary"
                style={{
                  fontSize: '0.98rem',
                  padding: '0.95rem 1.75rem'
                }}
              >
                <Compass size={17} style={{ color: 'var(--color-gold)' }} />
                <span>Explore Our Sourcing</span>
              </button>
            </div>

            {/* 3 Quick Factual Trust Points */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--color-border)'
              }}
              className="hero-badges-row"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Twice-Weekly Chakki
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                  Milled below 40°C on emery stone
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  Zero Chemical Polishing
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                  100% natural, unbuffed pulses
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                  NABL Tested Batches
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-muted)', lineHeight: 1.4 }}>
                  Reports viewable before buying
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition with Video Showcase & Photo Toggle */}
          <div
            style={{
              gridColumn: 'span 5',
              position: 'relative'
            }}
            className="hero-image-col"
          >
            {/* Main Visual Container */}
            <div
              className="video-frame-container"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: '#0E291C',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {heroMediaType === 'video' ? (
                /* Native Video Player in Hero */
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 4.4', backgroundColor: '#0E291C' }}>
                  <video
                    ref={heroVideoRef}
                    src="/brand-video.mp4"
                    autoPlay
                    loop
                    muted={isHeroMuted}
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onClick={toggleHeroPlay}
                  />

                  {/* Gradient Overlay for controls visibility */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 41, 28, 0.8) 0%, rgba(14, 41, 28, 0.05) 50%, rgba(14, 41, 28, 0.3) 100%)',
                      pointerEvents: 'none'
                    }}
                  />

                  {/* Live Video Control Pill Overlays */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      zIndex: 10
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        onClick={toggleHeroPlay}
                        style={{
                          backgroundColor: 'rgba(250, 247, 242, 0.95)',
                          border: 'none',
                          borderRadius: 'var(--radius-full)',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--color-forest)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        aria-label={isHeroPlaying ? 'Pause video' : 'Play video'}
                      >
                        {isHeroPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: '1px' }} />}
                      </button>

                      <button
                        onClick={toggleHeroMute}
                        style={{
                          backgroundColor: 'rgba(14, 41, 28, 0.75)',
                          border: '1px solid rgba(250, 247, 242, 0.25)',
                          borderRadius: 'var(--radius-full)',
                          width: '36px',
                          height: '36px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: '#FAF7F2'
                        }}
                        aria-label={isHeroMuted ? 'Unmute video audio' : 'Mute video audio'}
                      >
                        {isHeroMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      </button>
                    </div>

                    <span
                      style={{
                        backgroundColor: 'rgba(14, 41, 28, 0.85)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.3rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.72rem',
                        color: 'var(--color-gold-light)',
                        fontWeight: 600,
                        border: '1px solid rgba(184, 148, 78, 0.3)'
                      }}
                    >
                      Pantry Film
                    </span>
                  </div>
                </div>
              ) : (
                /* Static Editorial Food & Packaging Photo */
                <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 4.4' }}>
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=85"
                    alt="Aromatic 24-month aged Taraori Basmati rice grains in clay bowl with brass spoon"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(250, 247, 242, 0.94)',
                      backdropFilter: 'blur(10px)',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-forest)' }}>
                      Taraori Aged Basmati
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--color-muted)' }}>
                      Aged 24 months in Shivalik granaries for long elongation.
                    </div>
                  </div>
                </div>
              )}

              {/* Top View Switcher (Film vs Photo) */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  right: '0.85rem',
                  display: 'flex',
                  backgroundColor: 'rgba(14, 41, 28, 0.85)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.2rem',
                  border: '1px solid rgba(184, 148, 78, 0.4)',
                  zIndex: 15
                }}
              >
                <button
                  onClick={() => setHeroMediaType('video')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: heroMediaType === 'video' ? 'var(--color-gold)' : 'transparent',
                    color: heroMediaType === 'video' ? '#fff' : '#FAF7F2',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Film size={12} />
                  <span>Harvest Film</span>
                </button>

                <button
                  onClick={() => setHeroMediaType('photo')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-full)',
                    border: 'none',
                    backgroundColor: heroMediaType === 'photo' ? 'var(--color-gold)' : 'transparent',
                    color: heroMediaType === 'photo' ? '#fff' : '#FAF7F2',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <ImageIcon size={12} />
                  <span>Photo</span>
                </button>
              </div>

              {/* Floating Live Tag Pill Top Left */}
              <div
                style={{
                  position: 'absolute',
                  top: '0.85rem',
                  left: '0.85rem',
                  backgroundColor: 'rgba(14, 41, 28, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FAF7F2',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(184, 148, 78, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  zIndex: 15
                }}
              >
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
                <span>Rabi 2026 Batch</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-text-col, .hero-image-col {
            grid-column: span 12 !important;
          }
          .hero-badges-row {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
};
