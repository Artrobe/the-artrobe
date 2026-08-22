'use client';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import ShopifyBuyButton from '@/components/ShopifyBuyButton';
import { KITS, difficultyColor } from '@/data/kits';
import { shopifyConfigured } from '@/data/shopify';

export default function DIYKits() {
  const live = shopifyConfigured();

  return (
    <section style={{ padding: '3.5rem 1.25rem', background: 'var(--off-white)', borderTop: '1px solid var(--border)' }}>
      <Reveal>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.6rem',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--green-dk)', marginBottom: '0.5rem', textAlign: 'center',
        }}>✦ Paint at Home</p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(1.9rem, 6vw, 2.8rem)',
          fontWeight: 300, color: 'var(--text)', lineHeight: 1.15,
          letterSpacing: '-0.01em', marginBottom: '0.7rem', textAlign: 'center',
        }}>
          DIY Art <em style={{ color: 'var(--green-dk)' }}>Kits</em>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p style={{
          fontFamily: 'var(--sans)', fontSize: '0.9rem',
          color: 'var(--muted)', lineHeight: 1.7,
          maxWidth: '46ch', margin: '0 auto 2.4rem', textAlign: 'center',
        }}>
          Everything you need to paint a gallery-worthy canvas at home — pre-sketched canvas, premium paints, brushes &amp; a step-by-step guide.
        </p>
      </Reveal>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.4rem', maxWidth: '900px', margin: '0 auto',
      }}>
        {KITS.map((kit, i) => (
          <motion.div
            key={kit.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            style={{
              background: 'var(--cream)', borderRadius: '14px', overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column',
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={kit.img}
                alt={`${kit.name} DIY kit`}
                loading="lazy"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
              <span style={{
                position: 'absolute', top: '0.7rem', left: '0.7rem',
                background: difficultyColor(kit.difficulty), color: '#fff',
                fontFamily: 'var(--sans)', fontSize: '0.62rem', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                padding: '0.3rem 0.6rem', borderRadius: '6px',
              }}>
                {kit.difficulty}
              </span>
            </div>

            <div style={{ padding: '1.1rem 1.2rem 1.3rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontWeight: 400, color: 'var(--text)', marginBottom: '0.3rem' }}>
                {kit.name}
              </h3>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55, marginBottom: '0.9rem', flex: 1 }}>
                {kit.desc}
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--green-dk)', marginBottom: '0.9rem' }}>
                {kit.price}
              </p>

              {live && kit.shopifyProductId ? (
                <ShopifyBuyButton productId={kit.shopifyProductId} />
              ) : (
                <span
                  style={{
                    display: 'block', textAlign: 'center',
                    background: 'var(--cream)', color: 'var(--muted)',
                    border: '1px solid var(--border)',
                    padding: '0.8rem 1rem', borderRadius: '8px',
                    fontFamily: 'var(--sans)', fontSize: '0.82rem', fontWeight: 700,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                  }}
                >
                  Coming Soon
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
