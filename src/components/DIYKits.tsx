'use client';
import { useState, useEffect } from 'react';
import Reveal from '@/components/ui/Reveal';
import ShopifyBuyButton from '@/components/ShopifyBuyButton';
import { KITS, difficultyColor } from '@/data/kits';
import { shopifyConfigured } from '@/data/shopify';
import { waEnquiry } from '@/data/social';
import { track } from '@/lib/analytics';

export default function DIYKits() {
  const live = shopifyConfigured();
  const [zoom, setZoom] = useState<{ img: string; name: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <section className="kit-sec">
      <div className="kit-wrap">
        <div className="kit-intro">
          <Reveal>
            <p className="kit-eyebrow">Paint at home</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="kit-title">
              Start anywhere on the<br />
              <em>texture ladder.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="kit-lede">
              Four kits, ordered by how much they ask of you. Each ships with the base,
              the paste, the pigments and the tools — plus a step-by-step guide filmed
              in the studio.
            </p>
          </Reveal>
        </div>

        <ul className="kit-list">
          {KITS.map((k, i) => (
            <Reveal as="li" key={k.id} delay={i * 0.07}>
              <article className="kit-row">
                <span className="kit-num">{String(i + 1).padStart(2, '0')}</span>

                <button
                  className="kit-thumb"
                  onClick={() => { track('kit_image_view', { kit: k.name }); setZoom({ img: k.img, name: k.name }); }}
                  aria-label={`View ${k.name} kit contents`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={k.img} alt={k.name} loading="lazy" />
                  <span className="kit-zoom" aria-hidden>⊕</span>
                </button>

                <div className="kit-body">
                  <div className="kit-head">
                    <h3 className="kit-name">{k.name}</h3>
                    <span
                      className="kit-diff"
                      style={{ color: difficultyColor(k.difficulty), borderColor: difficultyColor(k.difficulty) }}
                    >
                      {k.difficulty}
                    </span>
                  </div>
                  <p className="kit-desc">{k.desc}</p>
                </div>

                <div className="kit-buy">
                  <span className="kit-price">{k.price}</span>
                  {live && k.shopifyProductId ? (
                    <ShopifyBuyButton productId={k.shopifyProductId} />
                  ) : (
                    <a
                      className="kit-cta"
                      href={waEnquiry(`Hi! I'd like to order the "${k.name}" DIY kit (${k.price}). Is it available?`)}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => track('kit_enquiry', { kit: k.name, price: k.price, difficulty: k.difficulty })}
                    >
                      Enquire →
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      {zoom && (
        <div className="kit-lb" onClick={() => setZoom(null)} role="dialog" aria-label={zoom.name}>
          <figure className="kit-lb-inner" onClick={e => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={zoom.img} alt={zoom.name} />
            <figcaption>
              <span>{zoom.name}</span>
              <button onClick={() => setZoom(null)} aria-label="Close">×</button>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
