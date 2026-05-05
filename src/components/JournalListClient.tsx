'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import type { JournalSummary } from '@/lib/journal';

function formatDate(s: string) {
  if (!s) return '';
  try {
    return new Date(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return s; }
}

export default function JournalListClient({ posts }: { posts: JournalSummary[] }) {
  return (
    <PageShell>
      <div style={{ padding: '2.5rem 1.25rem 1.25rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            Notes from the Studio
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 7vw, 3rem)',
            fontWeight: 300, color: 'var(--text)',
            letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '0.6rem',
          }}>
            The <em style={{ color: 'var(--green-dk)' }}>Journal</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.92rem',
            color: 'var(--muted)', lineHeight: 1.7, maxWidth: '46ch',
          }}>
            On colour, slowness, mistakes, and what it means to live with a painting.
          </p>
        </Reveal>
      </div>

      {posts.length === 0 ? (
        <div style={{ padding: '3rem 1.25rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--muted)' }}>No posts yet.</p>
        </div>
      ) : (
        <div style={{ padding: '1rem 1.25rem 2rem', display: 'grid', gap: '1.5rem' }}>
          {posts.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '1.25rem',
                display: 'grid', gap: '0.85rem',
              }}
            >
              <Link href={`/journal/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gap: '0.85rem' }}>
                {p.cover && (
                  <div style={{
                    aspectRatio: '2/3', borderRadius: 12, overflow: 'hidden',
                    background: 'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)',
                    maxWidth: 280,
                  }}>
                    <motion.img
                      src={p.cover} alt=""
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                    />
                  </div>
                )}
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.6rem',
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--muted)',
                }}>
                  {formatDate(p.date)} · {p.readTime}
                </p>
                <h2 style={{
                  fontFamily: 'var(--serif)', fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                  fontWeight: 400, color: 'var(--text)',
                  lineHeight: 1.2, letterSpacing: '-0.01em',
                }}>{p.title}</h2>
                <p style={{
                  fontFamily: 'var(--sans)', fontSize: '0.88rem',
                  color: 'var(--muted)', lineHeight: 1.7, maxWidth: '52ch',
                }}>{p.excerpt}</p>
                <span style={{
                  fontFamily: 'var(--sans)', fontSize: '0.72rem',
                  color: 'var(--green-dk)', letterSpacing: '0.1em',
                  textTransform: 'uppercase', fontWeight: 500,
                }}>Read →</span>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </PageShell>
  );
}
