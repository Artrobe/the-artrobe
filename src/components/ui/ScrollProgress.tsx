'use client';
import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed', top: 'var(--nav-h)', left: 0,
        height: 2, width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--green-lt), var(--green-dk))',
        zIndex: 199, transition: 'width 0.08s linear',
        pointerEvents: 'none',
      }}
    />
  );
}
