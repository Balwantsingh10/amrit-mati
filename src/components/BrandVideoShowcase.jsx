import React, { useRef, useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

export const BrandVideoShowcase = () => {
  const { navigateTo } = useCart();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-ivory)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.35rem' }}>
            <Sparkles size={14} />
            <span>Cinematic Harvest Film</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.4vw, 3rem)', color: 'var(--color-forest)', marginBottom: '0.85rem' }}>
            From Field to Pantry: The Amrit Mati Story
          </h2>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.98rem', lineHeight: 1.65 }}>
            Witness our low-temperature emery stone chakki milling and direct farmgate procurement across India’s traditional farming clusters.
          </p>
        </div>

        {/* Video Player Card with Editorial Framing */}
        <div className="video-frame-container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
          {/* Native HTML5 Video Player */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', backgroundColor: '#0E291C' }}>
            <video
              ref={videoRef}
              src="/brand-video.mp4"
              playsInline
              autoPlay
              loop
              muted={isMuted}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              onClick={togglePlay}
            />

            {/* Subtle Gradient Overlays for Readability */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(14, 41, 28, 0.75) 0%, rgba(14, 41, 28, 0.1) 40%, rgba(14, 41, 28, 0.35) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Top Left Floating Tag Pill */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(14, 41, 28, 0.85)',
                backdropFilter: 'blur(8px)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(184, 148, 78, 0.4)',
                color: '#FAF7F2',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#EF4444',
                  boxShadow: '0 0 8px #EF4444'
                }}
                className="animate-pulse-soft"
              />
              <span>Authentic Farm & Milling Footage</span>
            </div>

            {/* Bottom Controls Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                zIndex: 10
              }}
            >
              {/* Play/Pause & Audio Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={togglePlay}
                  style={{
                    backgroundColor: 'rgba(250, 247, 242, 0.9)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    width: '42px',
                    height: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'var(--color-forest)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label={isPlaying ? 'Pause film' : 'Play film'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    backgroundColor: 'rgba(14, 41, 28, 0.75)',
                    border: '1px solid rgba(250, 247, 242, 0.3)',
                    borderRadius: 'var(--radius-full)',
                    width: '38px',
                    height: '38px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#FAF7F2',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
                >
                  {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>

                <span style={{ color: '#FAF7F2', fontSize: '0.8rem', fontWeight: 600, display: 'none' }} className="video-caption-label">
                  Heritage Processing in Action
                </span>
              </div>

              {/* Progress Bar & Fullscreen */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '340px' }}>
                <div style={{ flex: 1, height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-gold-light)', transition: 'width 0.2s linear' }} />
                </div>

                <button
                  onClick={toggleFullscreen}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FAF7F2',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  aria-label="Fullscreen"
                >
                  <Maximize size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Under-Video 4 Pillar Metrics Strip */}
          <div
            style={{
              backgroundColor: 'var(--color-forest-deep)',
              borderTop: '1px solid rgba(184, 148, 78, 0.3)',
              padding: '1.5rem 2rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                Milling Speed & Heat
              </div>
              <div style={{ fontSize: '1.15rem', color: '#FAF7F2', fontWeight: 700, marginTop: '0.15rem' }}>
                &lt; 40°C Chakki Exit
              </div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>
                Protects natural grain vitamins & oils
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                Basmati Granary Curing
              </div>
              <div style={{ fontSize: '1.15rem', color: '#FAF7F2', fontWeight: 700, marginTop: '0.15rem' }}>
                24 Months Naturally Aged
              </div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>
                In ventilated Shivalik granaries
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold-light)', fontWeight: 700 }}>
                Purity & Adulteration
              </div>
              <div style={{ fontSize: '1.15rem', color: '#FAF7F2', fontWeight: 700, marginTop: '0.15rem' }}>
                Zero Chemical Buffing
              </div>
              <div style={{ fontSize: '0.76rem', color: '#B5C4BC' }}>
                No marble powder, oils, or bleaching
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => navigateTo('shop')}
                className="btn-gold"
                style={{ padding: '0.75rem 1.45rem', fontSize: '0.86rem', whiteSpace: 'nowrap' }}
              >
                <span>Shop Fresh Harvest</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .video-caption-label {
            display: inline-block !important;
          }
        }
      `}</style>
    </section>
  );
};
