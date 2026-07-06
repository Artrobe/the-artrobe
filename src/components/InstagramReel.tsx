'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Loads the Instagram embed script once, then renders reels by permalink.
export default function InstagramReel({ permalinks }: { permalinks: string[] }) {
  useEffect(() => {
    const SRC = 'https://www.instagram.com/embed.js';
    const existing = document.querySelector(`script[src="${SRC}"]`);
    if (existing) {
      window.instgrm?.Embeds.process();
      return;
    }
    const s = document.createElement('script');
    s.src = SRC;
    s.async = true;
    s.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(s);
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', justifyContent: 'center' }}>
      {permalinks.map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#FFF', border: 0, borderRadius: 3,
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: 1, maxWidth: 400, minWidth: 300, padding: 0, width: '100%',
          }}
        />
      ))}
    </div>
  );
}
