'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturedWorks from '@/components/FeaturedWorks';
import StoryPanel from '@/components/StoryPanel';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import InstagramReel from '@/components/InstagramReel';
import type { Artwork } from '@/lib/airtable';

// Confirmed @the.artrobe reels only. DaSL3yNO4Lz is by amiable_artist__ — omitted pending confirmation.
const HOME_REELS = [
  'https://www.instagram.com/reel/DTdOquZDKgN/',
  'https://www.instagram.com/reel/DaK8WoHs329/',
];

export default function HomeClient({ artworks }: { artworks: Artwork[] }) {
  const [storyId, setStoryId] = useState<string | null>(null);
  const router = useRouter();
  const featured = artworks.filter(a => a.tag === 'Featured' || a.tag === 'New').slice(0, 4);
  const featuredOrAll = featured.length ? featured : artworks.slice(0, 4);

  return (
    <>
      <PageShell>
        <HeroSection
          onViewCollection={() => router.push('/gallery')}
          heroImages={artworks.map(a => ({ img: a.img, title: a.title }))}
        />
        <StatsBar />
        <FeaturedWorks artworks={featuredOrAll} onOpenStory={setStoryId} />

        {/* ── Workshop promo banner ── */}
        <section
          style={{
            position: 'relative',
            padding: 'clamp(3rem, 9vw, 5rem) 1.25rem',
            borderTop: '1px solid var(--border)',
            background: 'linear-gradient(150deg, #1e2e1c 0%, #2e3e2a 55%, #3d4e38 100%)',
            overflow: 'hidden',
          }}
        >
          <div style={{
            maxWidth: '1000px', margin: '0 auto',
            display: 'grid', gap: 'clamp(1.5rem, 4vw, 3rem)',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
            alignItems: 'center',
          }} className="workshop-banner-grid">
            <Reveal>
              <div>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.6rem',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--green)', marginBottom: '0.9rem',
                }}>✦ Hands-on Workshop · Indore</p>
                <h2 style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 3rem)',
                  fontWeight: 300, color: '#F7F5EF', lineHeight: 1.1,
                  letterSpacing: '-0.01em', marginBottom: '1rem',
                }}>
                  Paint your own <em style={{ color: 'var(--green)' }}>masterpiece</em>
                </h2>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.92rem',
                  color: 'rgba(247,245,239,0.7)', lineHeight: 1.8,
                  maxWidth: '40ch', marginBottom: '1.6rem',
                }}>
                  An immersive afternoon with Jahnvi — build an original canvas layer by layer and carry it home the same day. Next session 19th July — venue &amp; theme announced soon.
                </p>
                <MagneticButton
                  onClick={() => router.push('/workshop')}
                  style={{
                    background: 'var(--green)', color: '#1a2e18', border: 'none',
                    borderRadius: '6px', padding: '0.9rem 1.8rem',
                    fontFamily: 'var(--sans)', fontSize: '0.82rem',
                    fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >🎨 Join the Waitlist →</MagneticButton>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <img
                src="/workshops/teaching-01.webp"
                alt="Jahnvi guiding a participant at a workshop"
                loading="lazy"
                style={{
                  width: '100%', display: 'block', borderRadius: '12px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                  aspectRatio: '4 / 5', objectFit: 'cover',
                }}
              />
            </Reveal>
          </div>
        </section>

        {/* ── In Motion (Instagram reels) ── */}
        <section style={{ padding: 'clamp(3rem, 8vw, 4.5rem) 1.25rem', background: 'var(--off-white)', borderTop: '1px solid var(--border)' }}>
          <Reveal>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', marginBottom: '0.4rem', textAlign: 'center',
            }}>
              <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
              From the Studio
              <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginLeft: 8 }} />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 6vw, 2.6rem)',
              fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
              letterSpacing: '-0.01em', marginBottom: '2rem', textAlign: 'center',
            }}>
              In <em style={{ color: 'var(--green-dk)' }}>Motion</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <InstagramReel permalinks={HOME_REELS} />
          </Reveal>
        </section>

        <section
          id="about-teaser"
          style={{
            position: 'relative',
            padding: 'clamp(3rem, 9vw, 5rem) 1.25rem',
            borderTop: '1px solid var(--border)',
            background: 'var(--off-white)',
          }}
        >
          <Reveal>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.6rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--muted)', marginBottom: '0.8rem',
            }}>
              <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
              About The Artrobe
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 style={{
              fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6.5vw, 2.8rem)',
              fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
              marginBottom: '1.2rem', letterSpacing: '-0.01em', maxWidth: '20ch',
            }}>
              Art that feels like a <em style={{ color: 'var(--green-dk)' }}>second skin</em>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p style={{
              fontFamily: 'var(--sans)', fontSize: '0.92rem',
              color: 'var(--muted)', lineHeight: 1.85, maxWidth: '44ch', marginBottom: '1.5rem',
            }}>
              A creative studio exploring form, stillness, and the quiet language of colour. Each piece begins with observation — the way morning light changes the colour of a wall, the stillness between two breaths.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <MagneticButton
              onClick={() => router.push('/about')}
              style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--text)', borderRadius: '2rem',
                padding: '0.8rem 1.6rem',
                fontFamily: 'var(--sans)', fontSize: '0.74rem',
                fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >Read the Studio Story →</MagneticButton>
          </Reveal>
        </section>

        <JournalTeaser onClick={() => router.push('/journal')} />
      </PageShell>

      <StoryPanel artworkId={storyId} artworks={artworks} onClose={() => setStoryId(null)} />
    </>
  );
}

function JournalTeaser({ onClick }: { onClick: () => void }) {
  return (
    <section style={{
      padding: 'clamp(3rem, 9vw, 5rem) 1.25rem',
      background: 'var(--cream)',
      borderTop: '1px solid var(--border)',
    }}>
      <Reveal>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.6rem',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--green-dk)', marginBottom: '0.8rem',
        }}>The Journal</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(1.7rem, 6vw, 2.4rem)',
          fontWeight: 300, color: 'var(--text)', lineHeight: 1.2,
          marginBottom: '0.9rem', letterSpacing: '-0.01em', maxWidth: '22ch',
        }}>
          Notes from the studio.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.88rem',
          color: 'var(--muted)', lineHeight: 1.8, maxWidth: '44ch', marginBottom: '1.4rem',
        }}>
          On colour, slowness, mistakes, and what it means to live with a painting.
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <motion.button
          onClick={onClick}
          whileHover={{ x: 4 }}
          style={{
            background: 'transparent', border: 'none',
            fontFamily: 'var(--sans)', fontSize: '0.78rem',
            color: 'var(--green-dk)', letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: 'pointer',
            padding: 0, fontWeight: 500,
          }}
        >Read the journal →</motion.button>
      </Reveal>
    </section>
  );
}
