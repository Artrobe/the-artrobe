'use client';
import { useEffect, useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import { REVIEWS, GOOGLE_RATING, GOOGLE_REVIEW_COUNT, GOOGLE_PROFILE_URL } from '@/data/reviews';

// Google assigns each reviewer a flat colour avatar with their initial.
const AVATAR_COLORS = ['#7B5EA7', '#C0392B', '#2E7D68', '#B5533F', '#4A6FA5', '#8E6E3C'];
const avatarColor = (name: string) => {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
};

export default function Reviews() {
  const railRef = useRef<HTMLDivElement>(null);

  // Auto-advance the mobile rail. Pauses while the visitor is touching or
  // hovering it, and stops entirely on desktop (where it's a grid) or when
  // the OS asks for reduced motion.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const mq = window.matchMedia('(min-width: 700px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches || reduce.matches) return;

    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    rail.addEventListener('pointerdown', pause);
    rail.addEventListener('pointerup', resume);
    rail.addEventListener('mouseenter', pause);
    rail.addEventListener('mouseleave', resume);

    const id = setInterval(() => {
      if (paused) return;
      const card = rail.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.offsetWidth + 14;
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
      rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + step, behavior: 'smooth' });
    }, 3800);

    return () => {
      clearInterval(id);
      rail.removeEventListener('pointerdown', pause);
      rail.removeEventListener('pointerup', resume);
      rail.removeEventListener('mouseenter', pause);
      rail.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section className="rev-sec">
      <div className="rev-wrap">
        <Reveal>
          <p className="rev-eyebrow">What people say</p>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="rev-head">
            <h2 className="rev-title">
              {GOOGLE_RATING.toFixed(1)} on Google, across {GOOGLE_REVIEW_COUNT} reviews.
            </h2>
            <a className="rev-link" href={GOOGLE_PROFILE_URL} target="_blank" rel="noreferrer">
              Read them on Google →
            </a>
          </div>
        </Reveal>

        <div className="rev-grid" ref={railRef}>
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.07}>
              <figure className="rev-card" style={{ ['--rev-accent' as string]: avatarColor(r.name) }}>
                <div className="rev-top">
                  <span className="rev-avatar" style={{ background: avatarColor(r.name) }} aria-hidden>
                    {r.name.trim().charAt(0).toUpperCase()}
                  </span>
                  <span className="rev-who">
                    <span className="rev-name">{r.name}</span>
                    <span className="rev-when">{r.when}</span>
                  </span>
                  <svg className="rev-g" viewBox="0 0 24 24" aria-label="Google review" role="img">
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9Z"/>
                    <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24Z"/>
                    <path fill="#FBBC05" d="M5.3 14.3a7.1 7.1 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z"/>
                    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z"/>
                  </svg>
                </div>

                <div className="rev-stars" aria-label={`${r.stars} out of 5 stars`}>
                  {'★'.repeat(r.stars)}
                </div>

                <blockquote className="rev-text">
                  <span className="rev-quote" aria-hidden>&ldquo;</span>
                  {r.text}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
