'use client';
import { useState } from 'react';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import GalleryGrid from '@/components/GalleryGrid';
import Footer from '@/components/Footer';
import StoryPanel from '@/components/StoryPanel';

export default function GalleryPage() {
  const [storyId, setStoryId] = useState<string | null>(null);

  return (
    <>
      <TopBar />
      <main style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)' }}>
        <div style={{ padding: '2rem 1.25rem 0.5rem' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem' }}>Collection</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 300, color: 'var(--text)' }}>All Works</h1>
        </div>
        <GalleryGrid onOpenStory={setStoryId} />
        <Footer />
      </main>
      <BottomNav />
      <StoryPanel artworkId={storyId} onClose={() => setStoryId(null)} />
    </>
  );
}
