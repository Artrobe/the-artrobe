'use client';
import GalleryGrid from '@/components/GalleryGrid';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import type { Artwork } from '@/lib/airtable';

export default function GalleryClient({ artworks }: { artworks: Artwork[] }) {
  return (
    <PageShell>
      <div style={{ padding: '2rem 1.25rem 0.5rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            The Collection
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2rem, 7vw, 3rem)',
            fontWeight: 300, color: 'var(--text)',
            letterSpacing: '-0.01em', lineHeight: 1.1,
          }}>
            All <em style={{ color: 'var(--green-dk)' }}>works</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            marginTop: '0.6rem',
            fontFamily: 'var(--sans)', fontSize: '0.85rem',
            color: 'var(--muted)', lineHeight: 1.6, maxWidth: '40ch',
          }}>
            Original paintings — search the catalogue or filter by medium, tag, or price.
          </p>
        </Reveal>
      </div>

      <GalleryGrid artworks={artworks} />
    </PageShell>
  );
}
