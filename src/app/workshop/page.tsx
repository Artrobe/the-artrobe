'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import InstagramReel from '@/components/InstagramReel';
import { WORKSHOP_REELS, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/data/social';

const WORKSHOP_DETAILS: {
  icon: string; label: string; value: string; sub: string; link?: string;
}[] = [
  { icon: '📅', label: 'Date', value: '19th July', sub: 'Sunday · 4 PM onwards' },
  { icon: '🌊', label: 'Theme', value: 'Coastal Texture Art', sub: 'Sea-wave designs' },
  { icon: '📍', label: 'Venue', value: 'NBC, New Palasia', sub: 'Indore' },
  { icon: '💵', label: 'Price', value: '₹599', sub: 'All materials + coffee' },
];

// The three exclusive coastal sea-wave designs — pick one on the day.
const DESIGNS = [
  { name: 'Blush Shore', desc: 'Soft pink sands meeting a gentle tide', img: '/artworks/soft-power.webp' },
  { name: 'Turquoise Tides', desc: 'Bright aqua waves rolling over warm sand', img: '/artworks/earths-whisper.webp' },
  { name: 'Midnight Shore', desc: 'Dramatic monochrome surf in black & white', img: '/artworks/echoes-in-texture.webp' },
];

const WHAT_YOU_LEARN = [
  { icon: '🌊', text: 'How to build realistic sea-wave texture with a palette knife' },
  { icon: '🖼', text: 'Composition & placement for a balanced coastal artwork' },
  { icon: '🎨', text: 'Color coordination — sand, surf and foam blending' },
  { icon: '💡', text: 'Creating depth and dimension in textured canvas art' },
  { icon: '🏆', text: 'Finishing touches for a display-worthy masterpiece' },
];

const INCLUDES = [
  { icon: '🌊', text: 'Choice of 1 of 3 exclusive coastal sea-wave designs' },
  { icon: '🎨', text: 'All premium paints, palette knives, brushes & tools' },
  { icon: '☕', text: 'Complimentary coffee — on us' },
  { icon: '🖼', text: 'Take-home original canvas (yours to keep)' },
];

const ART_TOOLS = ['🎨', '🖌️', '✂️', '🖼', '✨', '🪡', '🖍️', '🎭'];

// Curated workshop photos — proud results, Jahnvi teaching, candid moments
const MOMENTS = [
  { src: '/workshops/display-artworks.webp', alt: 'Sample textured artworks on display — the 3D Art Workshop by Jahnvi' },
  { src: '/workshops/result-01.webp', alt: 'Two participants with their finished textured beach canvas' },
  { src: '/workshops/candid-05.webp', alt: 'The workshop table under the leafy canopy' },
  { src: '/workshops/teaching-01.webp', alt: 'Jahnvi guiding a participant with a palette knife' },
  { src: '/workshops/result-04.webp', alt: 'A couple holding their floral and beach canvases' },
  { src: '/workshops/candid-02.webp', alt: 'Participants painting together at the long table' },
  { src: '/workshops/result-03.webp', alt: 'Two participants with their textured floral pieces' },
  { src: '/workshops/teaching-03.webp', alt: 'Jahnvi with participants and their finished canvases' },
  { src: '/workshops/candid-01.webp', alt: 'The group at work in the outdoor studio' },
  { src: '/workshops/result-05.webp', alt: 'Three participants holding their beach canvases' },
  { src: '/workshops/teaching-04.webp', alt: 'Jahnvi helping a young participant paint' },
  { src: '/workshops/result-02.webp', alt: 'Jahnvi with a participant and her wave canvas' },
  { src: '/workshops/candid-06.webp', alt: 'A relaxed afternoon of painting together' },
];

const FORM_URL = 'https://forms.gle/8ojrtC6Ls9YQNPqDA';

// Venue & theme confirmed — registration is open.
const REGISTRATION_OPEN = true;
const WAITLIST_MAILTO =
  'mailto:theartrobe12@gmail.com?subject=Workshop%20Waitlist%20%E2%80%94%2019th%20July&body=Hi%20Jahnvi%2C%20I%27d%20like%20to%20join%20the%20waitlist%20for%20the%2019th%20July%20workshop.';

export default function WorkshopPage() {
  const [showSticky, setShowSticky] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setShowSticky(y > 400);
  });

  const scrollToForm = () => {
    if (!REGISTRATION_OPEN) {
      window.location.href = WAITLIST_MAILTO;
      return;
    }
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const ctaLabel = REGISTRATION_OPEN ? 'Reserve My Spot' : 'Join the Waitlist';

  return (
    <PageShell>

      {/* ── Sticky CTA bar ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: showSticky ? 0 : -80, opacity: showSticky ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 100,
          background: 'rgba(46,62,44,0.97)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.75rem 1.5rem', gap: '1rem',
          boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        }}
      >
        <div>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', color: '#fff', fontStyle: 'italic' }}>
            Texture Art Workshop
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginLeft: '0.75rem' }}>
            19 Jul · NBC, New Palasia · ₹599
          </span>
        </div>
        <button
          onClick={scrollToForm}
          style={{
            background: 'var(--green)', color: '#1a2e18', border: 'none',
            padding: '0.55rem 1.2rem', borderRadius: '4px',
            fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 700,
            cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {ctaLabel}
        </button>
      </motion.div>

      {/* ── Hero ── */}
      <section style={{
        background: 'linear-gradient(160deg, #1e2e1c 0%, #2e3e2a 40%, #3d4e38 100%)',
        padding: 'clamp(4rem, 10vw, 6rem) 1.25rem clamp(3rem, 8vw, 5rem)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* floating art tool emojis */}
        {ART_TOOLS.map((emoji, i) => (
          <motion.span
            key={i}
            aria-hidden
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.18, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 1 }}
            style={{
              position: 'absolute', fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              top: `${10 + (i * 11) % 70}%`,
              left: `${5 + (i * 13) % 90}%`,
              pointerEvents: 'none', userSelect: 'none',
              filter: 'grayscale(0.3)',
            }}
          >
            {emoji}
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.62rem',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: '1rem',
          }}>
            ✦ Coffee, Conversations &amp; Coastal Art · Indore ✦
          </p>

          {/* Pulsating heading */}
          <motion.h1
            animate={{
              textShadow: [
                '0 0 20px rgba(168,197,160,0)',
                '0 0 40px rgba(168,197,160,0.55)',
                '0 0 20px rgba(168,197,160,0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(2.8rem, 10vw, 5rem)',
              fontWeight: 300, color: '#F7F5EF',
              lineHeight: 1.05, letterSpacing: '-0.02em',
              marginBottom: '0.2rem',
            }}
          >
            Texture Art Workshop
          </motion.h1>

          <motion.p
            animate={{
              textShadow: [
                '0 0 20px rgba(168,197,160,0)',
                '0 0 50px rgba(168,197,160,0.7)',
                '0 0 20px rgba(168,197,160,0)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(1rem, 3.5vw, 1.5rem)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--green)',
              lineHeight: 1.4, letterSpacing: '0em',
              marginBottom: '1.8rem',
            }}
          >
            Coffee, conversations &amp; coastal art
          </motion.p>

          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
            fontStyle: 'italic', color: 'rgba(247,245,239,0.7)',
            lineHeight: 1.6, maxWidth: '44ch', margin: '0 auto 0.6rem',
          }}>
            A relaxed Sunday evening of creativity, coffee &amp; coastal vibes with Jahnvi
          </p>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'rgba(247,245,239,0.55)', lineHeight: 1.8,
            maxWidth: '40ch', margin: '0 auto 2.5rem',
          }}>
            Paint your own coastal sea-wave canvas — no experience needed. Beginner friendly.
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--green)', color: '#1a2e18', border: 'none',
                padding: '0.9rem 2rem', borderRadius: '6px',
                fontFamily: 'var(--sans)', fontSize: '0.9rem', fontWeight: 700,
                cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
                boxShadow: '0 8px 28px rgba(168,197,160,0.35)',
              }}
            >
              🎨 {ctaLabel}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Details grid ── */}
      <section style={{ padding: '3rem 1.25rem', background: 'var(--off-white)' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem', maxWidth: '700px', margin: '0 auto',
        }}>
          {WORKSHOP_DETAILS.map((d, i) => {
            const Card = d.link ? motion.a : motion.div;
            return (
              <Card
                key={d.label}
                {...(d.link ? { href: d.link, target: '_blank', rel: 'noreferrer' } : {})}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={d.link ? { scale: 1.03 } : undefined}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: 'var(--cream)', borderRadius: '10px', padding: '1.2rem 1rem',
                  borderTop: '3px solid var(--green)',
                  textAlign: 'center',
                  textDecoration: 'none',
                  cursor: d.link ? 'pointer' : 'default',
                  display: 'block',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{d.icon}</div>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.58rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--muted)', marginBottom: '0.35rem',
                }}>{d.label}</p>
                <p style={{
                  fontFamily: 'var(--serif)', fontSize: '1.25rem', fontWeight: 400,
                  color: 'var(--text)', marginBottom: '0.2rem',
                }}>{d.value}</p>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.72rem',
                  color: d.link ? 'var(--green-dk)' : 'var(--muted)',
                }}>{d.sub}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── Choose your design ── */}
      <section style={{ padding: '3.5rem 1.25rem', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.5rem', textAlign: 'center',
          }}>✦ Choose Your Artwork</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '0.7rem', textAlign: 'center',
          }}>
            Three Coastal <em style={{ color: 'var(--green-dk)' }}>Designs</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'var(--muted)', lineHeight: 1.7,
            maxWidth: '46ch', margin: '0 auto 2.2rem', textAlign: 'center',
          }}>
            Pick one of three exclusive sea-wave designs on the day and bring it to life with premium texture techniques.
          </p>
        </Reveal>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.2rem', maxWidth: '760px', margin: '0 auto',
        }}>
          {DESIGNS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              style={{
                background: 'var(--off-white)', borderRadius: '10px', overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
              }}
            >
              <img
                src={d.img}
                alt={`${d.name} — coastal texture design`}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                <h3 style={{
                  fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 400,
                  color: 'var(--text)', marginBottom: '0.3rem',
                }}>{d.name}</h3>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.82rem',
                  color: 'var(--muted)', lineHeight: 1.55,
                }}>{d.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Artwork strip ── */}
      <section style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Reveal>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
            fontWeight: 300, color: 'var(--text)', textAlign: 'center',
            letterSpacing: '-0.01em', padding: '2rem 1.25rem 1.5rem',
          }}>
            My Art <em style={{ color: 'var(--green-dk)' }}>Collection</em>
          </h2>
        </Reveal>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '0', width: 'max-content' }}
        >
          {[
            '/artworks/echoes-in-texture.webp',
            '/artworks/soft-power.webp',
            '/artworks/earths-whisper.webp',
            '/artworks/muted-grace.webp',
            '/artworks/hold.webp',
            '/artworks/crimson-whispers.webp',
            '/artworks/echoes-in-texture.webp',
            '/artworks/soft-power.webp',
            '/artworks/earths-whisper.webp',
            '/artworks/muted-grace.webp',
            '/artworks/hold.webp',
            '/artworks/crimson-whispers.webp',
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              style={{
                height: '200px', width: 'auto', objectFit: 'cover',
                display: 'block', flexShrink: 0,
              }}
            />
          ))}
        </motion.div>
      </section>

      {/* ── What's included ── */}
      <section style={{ padding: '3.5rem 1.25rem', background: '#2e3e2a' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green)', marginBottom: '0.5rem', textAlign: 'center',
          }}>✦ Everything Included</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: '#F7F5EF', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '2rem', textAlign: 'center',
          }}>
            What You <em style={{ color: 'var(--green)' }}>Get</em>
          </h2>
        </Reveal>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem', maxWidth: '700px', margin: '0 auto',
        }}>
          {INCLUDES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                background: 'rgba(168,197,160,0.1)', border: '1px solid rgba(168,197,160,0.2)',
                borderRadius: '8px', padding: '1rem 1.1rem',
                display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
              }}
            >
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'rgba(247,245,239,0.85)', lineHeight: 1.5 }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What you'll learn ── */}
      <section style={{ padding: '3.5rem 1.25rem', borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            Skills &amp; Techniques
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '1.8rem', maxWidth: '30ch',
          }}>
            What You&apos;ll <em style={{ color: 'var(--green-dk)' }}>Learn</em>
          </h2>
        </Reveal>
        <ul style={{ listStyle: 'none', display: 'grid', gap: '0.9rem', maxWidth: '54ch' }}>
          {WHAT_YOU_LEARN.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ display: 'flex', gap: '0.9rem', alignItems: 'flex-start' }}
            >
              <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
              <span style={{
                fontFamily: 'var(--sans)', fontSize: '0.95rem',
                color: 'var(--text)', lineHeight: 1.65,
              }}>{item.text}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* ── Mid-page CTA ── */}
      <section style={{
        padding: '3rem 1.25rem',
        background: 'linear-gradient(135deg, var(--green-lt) 0%, var(--cream) 100%)',
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            fontStyle: 'italic', color: 'var(--text)', marginBottom: '0.5rem',
          }}>
            {REGISTRATION_OPEN ? 'Reserve your spot.' : 'Be the first to know.'}
          </p>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.88rem',
            color: 'var(--muted)', marginBottom: '1.5rem',
          }}>
            {REGISTRATION_OPEN
              ? 'Register now to confirm your place.'
              : 'Join the waitlist and we’ll reach out once the 19th July details are confirmed.'}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                '0 4px 16px rgba(110,158,102,0.2)',
                '0 8px 32px rgba(110,158,102,0.5)',
                '0 4px 16px rgba(110,158,102,0.2)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'var(--green-dk)', color: '#fff', border: 'none',
              padding: '1rem 2.4rem', borderRadius: '6px',
              fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase',
            }}
          >
            🎨 {REGISTRATION_OPEN ? 'Join the Workshop' : 'Join the Waitlist'}
          </motion.button>
        </Reveal>
      </section>

      {/* ── Moments / photo wall ── */}
      <section style={{ padding: '3.5rem 1.25rem', background: 'var(--off-white)', borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.5rem', textAlign: 'center',
          }}>✦ From Our Last Workshop</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '0.7rem', textAlign: 'center',
          }}>
            Moments &amp; <em style={{ color: 'var(--green-dk)' }}>Masterpieces</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'var(--muted)', lineHeight: 1.7,
            maxWidth: '46ch', margin: '0 auto 2.2rem', textAlign: 'center',
          }}>
            Real people, real canvases — every piece built by hand, layer by layer, and carried home the same afternoon.
          </p>
        </Reveal>

        <div style={{
          columns: '3 200px', columnGap: '0.6rem',
          maxWidth: '840px', margin: '0 auto',
        }}>
          {MOMENTS.map((m, i) => (
            <motion.div
              key={m.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ breakInside: 'avoid', marginBottom: '0.6rem' }}
            >
              <img
                src={m.src}
                alt={m.alt}
                loading="lazy"
                style={{
                  width: '100%', display: 'block', borderRadius: '8px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Watch the workshop (Instagram reels) ── */}
      <section style={{ padding: '3.5rem 1.25rem', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.5rem', textAlign: 'center',
          }}>✦ Watch the Experience</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '0.7rem', textAlign: 'center',
          }}>
            Moments in <em style={{ color: 'var(--green-dk)' }}>Motion</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'var(--muted)', lineHeight: 1.7,
            maxWidth: '44ch', margin: '0 auto 2rem', textAlign: 'center',
          }}>
            A glimpse of the studio in full swing — straight from our Instagram.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <InstagramReel permalinks={WORKSHOP_REELS} />
        </Reveal>
      </section>

      {/* ── Register form ── */}
      <section
        id="register"
        style={{
          padding: '4rem 1.25rem',
          background: 'var(--off-white)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '0.6rem' }}>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--green-dk)', marginBottom: '0.8rem',
            }}>{REGISTRATION_OPEN ? '✦ Reserve Your Spot' : '✦ Registrations Opening Soon'}</p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.6rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '0.8rem', textAlign: 'center',
          }}>
            {REGISTRATION_OPEN
              ? <>Join the <em style={{ color: 'var(--green-dk)' }}>Workshop</em></>
              : <>Join the <em style={{ color: 'var(--green-dk)' }}>Waitlist</em></>}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.9rem',
            color: 'var(--muted)', lineHeight: 1.7,
            maxWidth: '44ch', margin: '0 auto 2rem', textAlign: 'center',
          }}>
            {REGISTRATION_OPEN
              ? 'Fill in your details below. We will confirm your spot within 24 hours.'
              : 'The 19th July venue and theme are being finalised. Join the waitlist and we’ll email you the moment registration opens.'}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div style={{ textAlign: 'center' }}>
            <motion.a
              href={REGISTRATION_OPEN ? FORM_URL : WAITLIST_MAILTO}
              {...(REGISTRATION_OPEN ? { target: '_blank', rel: 'noreferrer' } : {})}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: [
                  '0 4px 16px rgba(110,158,102,0.25)',
                  '0 10px 36px rgba(110,158,102,0.5)',
                  '0 4px 16px rgba(110,158,102,0.25)',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'inline-block',
                background: 'var(--green-dk)', color: '#fff',
                padding: '1.1rem 3rem', borderRadius: '8px',
                fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700,
                letterSpacing: '0.05em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {REGISTRATION_OPEN ? '🎨 Open Registration Form →' : '🎨 Join the Waitlist →'}
            </motion.a>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.78rem',
              color: 'var(--muted)', marginTop: '1rem',
            }}>
              {REGISTRATION_OPEN
                ? 'Opens a short Google Form · takes under 2 minutes'
                : 'Opens your email · we’ll reply with full details soon'}
            </p>
          </div>
        </Reveal>

        <p style={{
          textAlign: 'center', fontFamily: 'var(--sans)', fontSize: '0.78rem',
          color: 'var(--muted)', marginTop: '2rem',
        }}>
          Questions? Email{' '}
          <a href="mailto:theartrobe12@gmail.com" style={{ color: 'var(--green-dk)', textDecoration: 'none' }}>
            theartrobe12@gmail.com
          </a>
        </p>
      </section>

      {/* ── About Jahnvi ── */}
      <section style={{
        padding: '3.5rem 1.25rem',
        background: 'var(--cream)',
        borderTop: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'grid', gap: '1.5rem', gridTemplateColumns: '90px 1fr', alignItems: 'start' }}>
          <Reveal>
            <img
              src="/jahnvi.webp"
              alt="Jahnvi"
              style={{
                width: '90px', height: '90px', borderRadius: '50%',
                objectFit: 'cover', border: '3px solid var(--green)',
              }}
            />
          </Reveal>
          <div>
            <Reveal>
              <h2 style={{
                fontFamily: 'var(--serif)', fontSize: '1.7rem', fontWeight: 400,
                color: 'var(--text)', marginBottom: '0.8rem',
              }}>About Jahnvi</h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p style={{
                fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--muted)',
                lineHeight: 1.85, marginBottom: '0.9rem',
              }}>
                MFA artist with 10+ years of practice and 70+ original paintings sold. Jahnvi&apos;s work
                explores texture, stillness, and the quiet language of colour. She teaches with the same
                attention she brings to her own canvas — patient, specific, and unhurried.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: 'var(--sans)', fontSize: '0.85rem',
                  color: 'var(--green-dk)', textDecoration: 'none', fontWeight: 600,
                }}
              >
                Follow @{INSTAGRAM_HANDLE} →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        padding: '3.5rem 1.25rem',
        background: 'linear-gradient(160deg, #1e2e1c 0%, #2e3e2a 100%)',
        textAlign: 'center',
        borderTop: '1px solid rgba(168,197,160,0.15)',
      }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            fontStyle: 'italic', color: '#F7F5EF', marginBottom: '0.5rem',
          }}>
            Your canvas is waiting.
          </p>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.88rem',
            color: 'rgba(247,245,239,0.5)', marginBottom: '2rem',
          }}>
            Sunday, 19th July · 4 PM onwards · NBC, New Palasia, Indore · ₹599
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'var(--green)', color: '#1a2e18', border: 'none',
              padding: '1rem 2.5rem', borderRadius: '6px',
              fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 700,
              cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase',
              boxShadow: '0 8px 32px rgba(168,197,160,0.3)',
            }}
          >
            🎨 {REGISTRATION_OPEN ? 'Register Now' : 'Join the Waitlist'}
          </motion.button>
        </Reveal>
      </section>

    </PageShell>
  );
}
