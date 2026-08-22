'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SUBSCRIBE_FORM } from '@/data/social';

const SEEN_KEY = 'artrobe_subscribe_seen';
const SHOW_DELAY_MS = 6000;

export default function SubscribePopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return;
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    localStorage.setItem(SEEN_KEY, '1');
    setOpen(false);
  };

  const handleSubmit = () => {
    // Fire-and-forget: the hidden iframe swallows Google's cross-origin response.
    localStorage.setItem(SEEN_KEY, '1');
    setSubmitted(true);
    setTimeout(() => setOpen(false), 1800);
  };

  return (
    <>
      {/* hidden target so the Google Form POST doesn't navigate the page */}
      <iframe name="artrobe_subscribe_sink" title="subscribe" style={{ display: 'none' }} />
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            style={{
              position: 'fixed', inset: 0, zIndex: 1000,
              background: 'rgba(26,30,24,0.55)', backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '1.25rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 10, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative', width: '100%', maxWidth: '380px',
                background: 'var(--off-white)', borderRadius: '16px',
                padding: '2.2rem 1.6rem 1.8rem', textAlign: 'center',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
              }}
            >
              <button
                onClick={dismiss}
                aria-label="Close"
                style={{
                  position: 'absolute', top: '0.8rem', right: '0.9rem',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '1.3rem', color: 'var(--muted)', lineHeight: 1,
                }}
              >
                ×
              </button>

              {submitted ? (
                <div style={{ padding: '1.5rem 0' }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: '0.6rem' }}>✦</div>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: '1.5rem', color: 'var(--text)', marginBottom: '0.4rem' }}>
                    You&apos;re on the list
                  </p>
                  <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    We&apos;ll be in touch with updates soon.
                  </p>
                </div>
              ) : (
                <>
                  <p style={{
                    fontFamily: 'var(--sans)', fontSize: '0.6rem',
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'var(--green-dk)', marginBottom: '0.5rem',
                  }}>
                    ✦ The Artrobe
                  </p>
                  <h2 style={{
                    fontFamily: 'var(--serif)', fontSize: '1.8rem', fontWeight: 400,
                    color: 'var(--text)', lineHeight: 1.2, marginBottom: '0.4rem',
                  }}>
                    Subscribe to updates
                  </h2>
                  <p style={{
                    fontFamily: 'var(--sans)', fontSize: '0.82rem',
                    color: 'var(--muted)', lineHeight: 1.6, marginBottom: '1.4rem',
                  }}>
                    New drops, workshops &amp; DIY kits — straight to your inbox.
                  </p>

                  <form
                    ref={formRef}
                    action={SUBSCRIBE_FORM.action}
                    method="POST"
                    target="artrobe_subscribe_sink"
                    onSubmit={handleSubmit}
                    style={{ display: 'grid', gap: '0.7rem' }}
                  >
                    <input name={SUBSCRIBE_FORM.fields.name} required placeholder="Name" style={inputStyle} />
                    <input name={SUBSCRIBE_FORM.fields.email} type="email" required placeholder="Email address" style={inputStyle} />
                    <input name={SUBSCRIBE_FORM.fields.phone} type="tel" placeholder="Phone (optional)" style={inputStyle} />
                    <input name={SUBSCRIBE_FORM.fields.city} placeholder="City" style={inputStyle} />
                    <button type="submit" style={submitStyle}>Subscribe now</button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem',
  border: '1px solid var(--border)', borderRadius: '10px',
  fontFamily: 'var(--sans)', fontSize: '0.9rem', color: 'var(--text)',
  background: '#fff', outline: 'none',
};

const submitStyle: React.CSSProperties = {
  marginTop: '0.4rem', padding: '0.85rem 1rem',
  background: 'var(--green-dk)', color: '#fff', border: 'none',
  borderRadius: '10px', fontFamily: 'var(--sans)', fontSize: '0.9rem',
  fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
  cursor: 'pointer',
};
