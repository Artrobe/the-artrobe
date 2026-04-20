'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturedWorks from '@/components/FeaturedWorks';
import Footer from '@/components/Footer';
import StoryPanel from '@/components/StoryPanel';
import type { Artwork } from '@/lib/airtable';

export default function HomeClient({ artworks }: { artworks: Artwork[] }) {
  const [storyId, setStoryId] = useState<string | null>(null);
  const router = useRouter();
  const featured = artworks.slice(0, 3);

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)' }}>
        <HeroSection onViewCollection={() => router.push('/gallery')} />
        <StatsBar />
        <FeaturedWorks artworks={featured} onOpenStory={setStoryId} />
        <section style={{ padding: '2.5rem 1.25rem', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.6rem' }}>About The Artrobe</p>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 300, color: 'var(--text)', lineHeight: 1.2, marginBottom: '1rem' }}>
            Art that feels like a <em>second skin</em>
          </h2>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: '40ch' }}>
            A creative studio exploring form, stillness, and the quiet language of colour. Each piece begins with observation — the way morning light changes the colour of a wall, the stillness between two breaths.
          </p>
        </section>
        <Footer />
      </main>
      <BottomNav />
      <StoryPanel artworkId={storyId} artworks={artworks} onClose={() => setStoryId(null)} />
    </>
  );
}
