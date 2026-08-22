'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import type { JournalSummary } from '@/lib/journal';

export default function Stories({ posts }: { posts: JournalSummary[] }) {
  if (!posts.length) return null;

  return (
    <section style={{ padding: '3.5rem 0', background: 'var(--cream)', borderTop: '1px solid var(--border)' }}>
      <div style={{ padding: '0 1.25rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--green-dk)', marginBottom: '0.5rem', textAlign: 'center',
          }}>✦ From the Studio</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
            letterSpacing: '-0.01em', marginBottom: '2rem', textAlign: 'center',
          }}>
            Stories of <em style={{ color: 'var(--green-dk)' }}>The Artrobe</em>
          </h2>
        </Reveal>
      </div>

      <div style={{
        display: 'flex', gap: '1rem', overflowX: 'auto',
        padding: '0 1.25rem 1rem', scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
      }}>
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            style={{ scrollSnapAlign: 'start', flex: '0 0 auto', width: 'min(78vw, 260px)' }}
          >
            <Link
              href={`/journal/${post.slug}`}
              style={{
                display: 'block', textDecoration: 'none',
                background: 'var(--off-white)', borderRadius: '12px', overflow: 'hidden',
                boxShadow: '0 4px 18px rgba(0,0,0,0.08)', height: '100%',
              }}
            >
              {post.cover && (
                <img
                  src={post.cover}
                  alt={post.title}
                  loading="lazy"
                  style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
                />
              )}
              <div style={{ padding: '1rem 1.1rem 1.2rem' }}>
                <h3 style={{
                  fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 400,
                  color: 'var(--text)', lineHeight: 1.3, marginBottom: '0.4rem',
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.78rem',
                  color: 'var(--muted)', lineHeight: 1.55, marginBottom: '0.7rem',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                }}>
                  {post.excerpt}
                </p>
                <span style={{
                  fontFamily: 'var(--sans)', fontSize: '0.75rem',
                  color: 'var(--green-dk)', fontWeight: 600,
                }}>
                  Read here →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link href="/journal" style={{
          fontFamily: 'var(--sans)', fontSize: '0.85rem',
          color: 'var(--green-dk)', textDecoration: 'none', fontWeight: 600,
        }}>
          Read all stories →
        </Link>
      </div>
    </section>
  );
}
