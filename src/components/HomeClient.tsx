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
import type { Artwork } from '@/lib/airtable';

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
