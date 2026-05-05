'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import type { JournalPost } from '@/lib/journal';

function formatDate(s: string) {
  if (!s) return '';
  try {
    return new Date(s).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return s; }
}

export default function JournalPostClient({ post }: { post: JournalPost }) {
  return (
    <PageShell>
      {post.cover && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
          style={{
            aspectRatio: '16/9',
            maxHeight: '52vh',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #c8dac4 0%, #e0d0bc 50%, #a8c5a0 100%)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <motion.img
            src={post.cover} alt=""
            initial={{ scale: 1.03 }} animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </motion.div>
      )}

      <article style={{ padding: '2rem 1.5rem 1rem', maxWidth: 720, margin: '0 auto' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.6rem',
          }}>
            {formatDate(post.date)} · {post.readTime}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.7rem)',
            fontWeight: 400, color: 'var(--text)',
            letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: '1rem',
          }}>{post.title}</h1>
        </Reveal>
        {post.excerpt && (
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: 'var(--serif)', fontSize: '1.15rem',
              fontStyle: 'italic', color: 'var(--muted)',
              lineHeight: 1.6, marginBottom: '1.5rem',
            }}>{post.excerpt}</p>
          </Reveal>
        )}
        <Reveal delay={0.14}>
          <div
            className="journal-prose"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </Reveal>
      </article>

      <div style={{ padding: '2rem 1.5rem 3rem', textAlign: 'center', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
        <Link
          href="/journal"
          style={{
            fontFamily: 'var(--sans)', fontSize: '0.74rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--green-dk)', textDecoration: 'none', fontWeight: 500,
          }}
        >← All Journal Entries</Link>
      </div>
    </PageShell>
  );
}
