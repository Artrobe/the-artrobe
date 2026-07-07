'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Artwork } from '@/lib/airtable';

interface Props {
  artworks: Artwork[];
}

const gradients = [
  'linear-gradient(135deg, #d4e8d0 0%, #e8ddd0 50%, #c8dac4 100%)',
  'linear-gradient(135deg, #c8dac4 0%, #e8d5c4 50%, #d4cbb8 100%)',
  'linear-gradient(135deg, #e0d8c8 0%, #c8d8c0 50%, #d8ccc0 100%)',
];

export default function GalleryGrid({ artworks }: Props) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [medium, setMedium] = useState('all');
  const [tag, setTag] = useState('all');
  const [style, setStyle] = useState('all');

  const mediums = useMemo(() => {
    const m = new Set<string>();
    artworks.forEach(a => a.medium && m.add(a.medium));
    return ['all', ...Array.from(m)];
  }, [artworks]);

  const tags = useMemo(() => {
    const t = new Set<string>();
    artworks.forEach(a => a.tag && t.add(a.tag));
    return ['all', ...Array.from(t)];
  }, [artworks]);

  const styles = useMemo(() => {
    const s = new Set<string>();
    artworks.forEach(a => a.style && s.add(a.style));
    return ['all', ...Array.from(s)];
  }, [artworks]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return artworks.filter(a => {
      if (medium !== 'all' && a.medium !== medium) return false;
      if (tag !== 'all' && a.tag !== tag) return false;
      if (style !== 'all' && a.style !== style) return false;
      if (ql) {
        const hay = `${a.title} ${a.medium} ${a.tag} ${a.style} ${a.story1} ${a.story2} ${a.story3}`.toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [artworks, q, medium, tag, style]);

  return (
    <>
      <div style={{ padding: '1rem 1.25rem 0.5rem', display: 'grid', gap: '0.85rem' }}>
        <SearchBox value={q} onChange={setQ} />

        <ChipRow label="Medium" value={medium} options={mediums.map(m => ({ id: m, label: m === 'all' ? 'All' : m }))} onChange={setMedium} />
        <ChipRow label="Style"  value={style}  options={styles.map(s => ({ id: s, label: s === 'all' ? 'All' : s }))} onChange={setStyle} />
        <ChipRow label="Tag"    value={tag}    options={tags.map(t => ({ id: t, label: t === 'all' ? 'All' : t }))} onChange={setTag} />

        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.08em' }}>
          {filtered.length} of {artworks.length} works
        </p>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ padding: '3rem 1.25rem', textAlign: 'center' }}
        >
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 300, color: 'var(--text)', marginBottom: '0.5rem' }}>
            Nothing matches.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--muted)' }}>
            Try a wider filter — or clear the search.
          </p>
        </motion.div>
      ) : (
        <div style={{ padding: '1rem 1rem 2rem', columns: 2, columnGap: '0.75rem' }}>
          <AnimatePresence>
            {filtered.map((art, i) => (
              <motion.div
                key={art.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], layout: { duration: 0.4 } }}
                whileHover={{ y: -4 }}
                onClick={() => router.push(`/gallery/${art.id}`)}
                style={{ breakInside: 'avoid', marginBottom: '0.85rem', cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  background: gradients[i % 3],
                  boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                }}>
                  <motion.img
                    src={art.thumb || art.img} alt={art.title}
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '100%',
                      aspectRatio: art.imgAspect || '2/3',
                      objectFit: 'cover', display: 'block',
                      background: gradients[i % 3],
                    }}
                  />
                </div>
                <div style={{ padding: '0.55rem 0.2rem' }}>
                  {art.tag && (
                    <p style={{
                      fontFamily: 'var(--sans)', fontSize: '0.52rem',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: art.tag === 'Sold' ? 'var(--muted)' : 'var(--green-dk)',
                      marginBottom: 3,
                    }}>{art.tag}</p>
                  )}
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '0.95rem', color: 'var(--text)', marginBottom: 1, lineHeight: 1.2 }}>{art.title}</p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.62rem', color: 'var(--muted)' }}>
                    {art.medium}{art.dimensions ? ` · ${art.dimensions}` : ''}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      background: 'var(--cream)', border: '1px solid var(--border)',
      borderRadius: 999, padding: '0.6rem 1rem',
    }}>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="7" cy="7" r="5" stroke="#7A7A6E" strokeWidth="1.4" />
        <path d="M11 11l3 3" stroke="#7A7A6E" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search title, medium, story…"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          flex: 1, border: 'none', background: 'transparent', outline: 'none',
          fontFamily: 'var(--sans)', fontSize: '16px', color: 'var(--text)',
        }}
      />
      {value && (
        <button
          aria-label="Clear search"
          onClick={() => onChange('')}
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: 'var(--muted)', fontSize: '0.85rem', padding: 4,
          }}
        >✕</button>
      )}
    </div>
  );
}

function ChipRow({
  label, value, options, onChange,
}: {
  label: string;
  value: string;
  options: { id: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--sans)', fontSize: '0.55rem',
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'var(--muted)', marginBottom: '0.4rem',
      }}>{label}</p>
      <div className="chip-scroll">
        {options.map(opt => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              onClick={() => onChange(opt.id)}
              style={{
                position: 'relative', flexShrink: 0, padding: '0.45rem 0.85rem',
                fontFamily: 'var(--sans)', fontSize: '0.72rem',
                letterSpacing: '0.06em',
                border: '1px solid ' + (active ? 'var(--green-dk)' : 'var(--border)'),
                borderRadius: 999,
                background: active ? 'var(--green-lt)' : 'transparent',
                color: active ? 'var(--green-dk)' : 'var(--text)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >{opt.label}</button>
          );
        })}
      </div>
    </div>
  );
}
