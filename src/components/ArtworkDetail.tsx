'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Artwork } from '@/lib/airtable';
import { SCAN_ENABLED } from '@/data/features';
import { track } from '@/lib/analytics';
import MagneticButton from '@/components/ui/MagneticButton';
import ScrollProgress from '@/components/ui/ScrollProgress';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';

interface Props { art: Artwork }

const defaultHeadings = ['Origin', 'Form', 'Process', 'Colour', 'What Remains'];

export default function ArtworkDetail({ art }: Props) {
  // Which pieces actually get opened — the signal worth having.
  useEffect(() => {
    track('artwork_view', { artwork: art.title, style: art.style, medium: art.medium });
  }, [art.title, art.style, art.medium]);

  // Parallax: the artwork drifts slower than the story text beside it.
  const reduceMotion = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-3%', '6%']);

  const router = useRouter();

  // Share sheet
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    const url = window.location.href;
    try { await navigator.clipboard.writeText(url); } catch {}
    setCopied(true);
    setTimeout(() => { setCopied(false); setShareOpen(false); }, 1400);
  }

  function shareVia(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const priceText = art.price > 0 ? ` · ₹${art.price.toLocaleString('en-IN')}` : '';
    const text = encodeURIComponent(`${art.title} — ${art.medium}, ${art.year}${priceText}`);
    const links: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      telegram: `https://t.me/share/url?url=${url}&text=${text}`,
      twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      email:    `mailto:?subject=${encodeURIComponent(art.title)}&body=${text}%20${url}`,
    };
    window.open(links[platform], '_blank', 'noopener');
    setShareOpen(false);
  }

  async function nativeShare() {
    const url = window.location.href;
    const priceText = art.price > 0 ? ` · ₹${art.price.toLocaleString('en-IN')}` : '';
    try {
      await navigator.share({ title: art.title, text: `${art.title} — ${art.medium}, ${art.year}${priceText}`, url });
      setShareOpen(false);
    } catch {}
  }

  // Lightbox zoom
  const [lightbox, setLightbox] = useState(false);
  const [lbScale, setLbScale] = useState(1);
  const [lbPan, setLbPan] = useState({ x: 0, y: 0 });
  const pinchRef = useRef<{ dist: number; scale: number } | null>(null);
  const panRef = useRef<{ sx: number; sy: number; px: number; py: number } | null>(null);
  const lbScaleRef = useRef(1);
  const lbPanRef = useRef({ x: 0, y: 0 });

  function openLightbox() {
    setLightbox(true);
    setLbScale(1); lbScaleRef.current = 1;
    setLbPan({ x: 0, y: 0 }); lbPanRef.current = { x: 0, y: 0 };
  }

  function onLbTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY,
      );
      pinchRef.current = { dist, scale: lbScaleRef.current };
      panRef.current = null;
    } else if (e.touches.length === 1 && lbScaleRef.current > 1) {
      panRef.current = { sx: e.touches[0].clientX, sy: e.touches[0].clientY, px: lbPanRef.current.x, py: lbPanRef.current.y };
      pinchRef.current = null;
    }
  }

  function onLbTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY,
      );
      const newScale = Math.min(4, Math.max(1, pinchRef.current.scale * (dist / pinchRef.current.dist)));
      lbScaleRef.current = newScale;
      setLbScale(newScale);
      if (newScale <= 1) { lbPanRef.current = { x: 0, y: 0 }; setLbPan({ x: 0, y: 0 }); }
    } else if (e.touches.length === 1 && panRef.current && lbScaleRef.current > 1) {
      const next = {
        x: panRef.current.px + (e.touches[0].clientX - panRef.current.sx),
        y: panRef.current.py + (e.touches[0].clientY - panRef.current.sy),
      };
      lbPanRef.current = next;
      setLbPan(next);
    }
  }

  function onLbWheel(e: React.WheelEvent) {
    const factor = e.deltaY > 0 ? 0.85 : 1.18;
    setLbScale(s => {
      const next = Math.min(4, Math.max(1, s * factor));
      lbScaleRef.current = next;
      if (next <= 1) { lbPanRef.current = { x: 0, y: 0 }; setLbPan({ x: 0, y: 0 }); }
      return next;
    });
  }

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  const chapters = [
    { body: art.story1, heading: art.chapter1Heading || defaultHeadings[0] },
    { body: art.story2, heading: art.chapter2Heading || defaultHeadings[1] },
    { body: art.story3, heading: art.chapter3Heading || defaultHeadings[2] },
    { body: art.story4, heading: art.chapter4Heading || defaultHeadings[3] },
    { body: art.story5, heading: art.chapter5Heading || defaultHeadings[4] },
  ].filter(c => c.body);

  return (
    <>
      <ScrollProgress />
      <TopBar />

      {/* Back button */}
      <button
        onClick={() => router.back()}
        aria-label="Back to gallery"
        style={{
          position: 'fixed', top: 'calc(var(--nav-h) + 0.75rem)', left: '1rem',
          zIndex: 200,
          background: 'rgba(247,245,239,0.9)', border: '1px solid var(--border)',
          borderRadius: '2rem', padding: '0.4rem 0.9rem',
          fontFamily: 'var(--sans)', fontSize: '0.68rem',
          letterSpacing: '0.08em', color: 'var(--muted)',
          cursor: 'pointer', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        ← Gallery
      </button>

      {/* Share button + sheet */}
      <div style={{ position: 'fixed', top: 'calc(var(--nav-h) + 0.75rem)', right: '1rem', zIndex: 300 }}>
        <button
          onClick={() => setShareOpen(o => !o)}
          style={{
            background: 'rgba(247,245,239,0.9)', border: '1px solid var(--border)',
            borderRadius: '2rem', padding: '0.4rem 0.9rem',
            fontFamily: 'var(--sans)', fontSize: '0.68rem',
            letterSpacing: '0.08em', color: 'var(--muted)',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          ↗ Share
        </button>

        {shareOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setShareOpen(false)}
              style={{ position: 'fixed', inset: 0, zIndex: -1 }}
            />
            {/* Sheet */}
            <div style={{
              position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0,
              background: 'var(--off-white)', border: '1px solid var(--border)',
              borderRadius: 16, padding: '0.9rem',
              boxShadow: '0 12px 36px rgba(0,0,0,0.13)',
              minWidth: 200, display: 'grid', gap: '0.4rem',
            }}>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.55rem',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: '0.3rem', paddingLeft: '0.2rem',
              }}>Share</p>

              {[
                { label: 'WhatsApp',  icon: '💬', id: 'whatsapp' },
                { label: 'Telegram',  icon: '✈️',  id: 'telegram' },
                { label: 'Twitter / X', icon: '🐦', id: 'twitter' },
                { label: 'Email',     icon: '✉️',  id: 'email' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => shareVia(opt.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    background: 'transparent', border: 'none',
                    padding: '0.55rem 0.6rem', borderRadius: 10,
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}

              <div style={{ height: 1, background: 'var(--border)', margin: '0.2rem 0' }} />

              <button
                onClick={copyLink}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.65rem',
                  background: copied ? 'rgba(110,158,102,0.1)' : 'transparent',
                  border: 'none', padding: '0.55rem 0.6rem', borderRadius: 10,
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                  fontFamily: 'var(--sans)', fontSize: '0.82rem',
                  color: copied ? 'var(--green-dk)' : 'var(--text)',
                  transition: 'color 0.2s, background 0.2s',
                }}
              >
                <span style={{ fontSize: '1rem', lineHeight: 1 }}>{copied ? '✓' : '🔗'}</span>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  onClick={nativeShare}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                    background: 'transparent', border: 'none',
                    padding: '0.55rem 0.6rem', borderRadius: 10,
                    cursor: 'pointer', width: '100%', textAlign: 'left',
                    fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--cream)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>⋯</span>
                  More options
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Zoom lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 900,
            background: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: '1rem', right: '1rem', zIndex: 1,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff', fontSize: '1.1rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >×</button>

          {lbScale <= 1 && (
            <p style={{
              position: 'absolute', bottom: 'calc(var(--bottom-nav-h) + 1.2rem)',
              left: '50%', transform: 'translateX(-50%)',
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em',
              textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none',
            }}>
              Pinch to zoom · Drag to pan
            </p>
          )}

          {/* Image container */}
          <div
            onClick={e => e.stopPropagation()}
            onTouchStart={onLbTouchStart}
            onTouchMove={onLbTouchMove}
            onTouchEnd={() => { pinchRef.current = null; panRef.current = null; }}
            onWheel={onLbWheel}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '100%', height: '100%',
              cursor: lbScale > 1 ? 'grab' : 'zoom-out',
              userSelect: 'none', overflow: 'hidden',
            }}
          >
            <img
              src={art.img}
              alt={art.title}
              draggable={false}
              style={{
                maxWidth: '95vw',
                maxHeight: 'calc(100dvh - 4rem)',
                objectFit: 'contain',
                transform: `translate(${lbPan.x}px, ${lbPan.y}px) scale(${lbScale})`,
                transformOrigin: 'center center',
                userSelect: 'none',
                WebkitUserSelect: 'none',
              }}
            />
          </div>
        </div>
      )}

      <main style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)' }}>

        {/* Hero */}
        <section style={{
          width: '100vw',
          minHeight: '100dvh',
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, #c8dac4 0%, #e0d0bc 50%, #a8c5a0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '5rem',
          paddingBottom: '2rem',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          gap: '1.5rem',
          overflow: 'hidden',
        }}>
          <motion.div
            ref={parallaxRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={openLightbox}
            style={{
              y: artY,
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 18px 44px rgba(42,42,42,0.20)',
              cursor: 'zoom-in',
              position: 'relative',
            }}
          >
            <img
              src={art.img} alt={art.title}
              style={{
                display: 'block',
                // cap both axes so landscape and ultra-tall pieces both fit
                maxWidth: 'min(90vw, 900px)',
                maxHeight: 'calc(100dvh - 16rem)',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
            <div style={{
              position: 'absolute', bottom: '0.6rem', right: '0.6rem',
              background: 'rgba(0,0,0,0.42)', borderRadius: '1rem',
              padding: '0.28rem 0.6rem',
              fontFamily: 'var(--sans)', fontSize: '0.55rem',
              color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em',
              textTransform: 'uppercase', pointerEvents: 'none',
            }}>⊕ Zoom</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '100%',
              maxWidth: '100vw',
              boxSizing: 'border-box',
              padding: '0 1rem',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--muted)', marginBottom: '0.4rem',
            }}>
              {art.medium}{art.dimensions ? ` · ${art.dimensions}` : ''} · {art.year}{art.style ? ` · ${art.style}` : ''}
            </p>
            <h1 style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1.5rem, 5.5vw, 2.2rem)',
              fontWeight: 300, color: 'var(--text)',
              lineHeight: 1.15, letterSpacing: '-0.01em',
              margin: 0,
            }}>{art.title}</h1>
            <div style={{
              marginTop: '0.85rem',
              color: 'var(--muted)', fontSize: '0.56rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            }}>
              <span>Scroll the story</span>
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                style={{ fontSize: '0.85rem' }}
              >↓</motion.span>
            </div>
          </motion.div>
        </section>

        {/* Story chapters */}
        {chapters.map((c, i, all) => (
          <section
            key={i}
            style={{
              minHeight: '100dvh',
              width: '100vw',
              boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'center',
              paddingTop: '4.5rem',
              paddingBottom: '4.5rem',
              paddingLeft: '1.75rem',
              paddingRight: '1.75rem',
              background: i % 2 === 0 ? 'var(--off-white)' : 'var(--cream)',
              borderTop: '1px solid var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <span style={{
              position: 'absolute', top: '2rem', left: '1.75rem',
              fontFamily: 'var(--serif)', fontSize: '4rem', fontWeight: 300,
              color: 'rgba(110,158,102,0.18)', lineHeight: 1, letterSpacing: '-0.02em',
            }}>{String(i + 1).padStart(2, '0')}</span>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 540, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}
            >
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.6rem',
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'var(--green-dk)', marginBottom: '0.9rem',
              }}>
                Chapter {i + 1} of {all.length}
              </p>
              <h2 style={{
                fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2rem)',
                fontWeight: 300, color: 'var(--text)', marginBottom: '1.1rem',
                lineHeight: 1.2, letterSpacing: '-0.01em',
              }}>{c.heading}</h2>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.95rem',
                color: 'var(--muted)', lineHeight: 1.85, maxWidth: '42ch',
              }}>{c.body}</p>
            </motion.div>
          </section>
        ))}

        {/* Enquire + View on Wall CTA */}
        <section style={{
          width: '100vw', boxSizing: 'border-box',
          padding: '4rem 1.75rem', textAlign: 'center',
          background: 'var(--cream)', borderTop: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 5vw, 1.9rem)',
              fontWeight: 300, color: 'var(--text)', marginBottom: '1.6rem', lineHeight: 1.3,
            }}
          >
            Interested in <em>{art.title}</em>?
          </motion.p>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1rem' }}>
            <MagneticButton
              onClick={() => {
                const subject = encodeURIComponent(`Enquiry · ${art.title}`);
                const body = encodeURIComponent(`Hello,\n\nI'm interested in "${art.title}" (${art.medium}, ${art.year}). Please share details on availability and shipping.\n\nThanks.`);
                window.location.href = `mailto:theartrobe12@gmail.com?subject=${subject}&body=${body}`;
              }}
              style={{
                background: 'var(--green)', color: 'var(--text)', border: 'none',
                borderRadius: '2rem', padding: '0.95rem 2.2rem',
                fontFamily: 'var(--sans)', fontSize: '0.78rem',
                fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer', boxShadow: '0 8px 22px rgba(110,158,102,0.25)',
              }}
            >Enquire Now →</MagneticButton>

            {SCAN_ENABLED && <MagneticButton
              onClick={() => { window.location.href = `/scan?id=${art.id}`; }}
              style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--border)', borderRadius: '2rem', padding: '0.95rem 2rem',
                fontFamily: 'var(--sans)', fontSize: '0.78rem',
                fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >📷 View on Your Wall</MagneticButton>}
          </div>

          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'var(--muted)' }}>
            Reply within 48 hours · theartrobe12@gmail.com
          </p>
        </section>

      </main>

      <BottomNav />
    </>
  );
}
