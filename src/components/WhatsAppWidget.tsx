'use client';
import { useEffect, useRef, useState } from 'react';
import { waEnquiry } from '@/data/social';
import { track } from '@/lib/analytics';

const TOPICS = [
  { label: 'Buy an artwork', msg: 'Hi! I saw a piece on theartrobe.in and would like to know if it is available.' },
  { label: 'Commission a piece', msg: 'Hi! I would like to commission a custom artwork. Could you share details and timelines?' },
  { label: 'DIY kit order', msg: 'Hi! I would like to order a DIY texture art kit. Please share the options.' },
  { label: 'Workshop booking', msg: 'Hi! I would like to know about upcoming texture art workshops.' },
  { label: 'Corporate / team event', msg: 'Hi! I am interested in a texture art workshop for a corporate group. Please share details.' },
  { label: 'Something else', msg: 'Hi! I have a question about The Artrobe.' },
];

const NUDGE_KEY = 'artrobe-wa-nudged';

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(NUDGE_KEY)) return;
    } catch { return; }
    const t = setTimeout(() => setNudge(true), 14000);
    return () => clearTimeout(t);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    try { sessionStorage.setItem(NUDGE_KEY, '1'); } catch { /* private mode */ }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !btnRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <>

      <div className="wa-root">
        {nudge && !open && (
          <div className="wa-nudge">
            <span onClick={() => { setOpen(true); dismissNudge(); }} style={{ cursor: 'pointer' }}>
              Questions? Chat with us
            </span>
            <button
              onClick={dismissNudge}
              aria-label="Dismiss"
              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--muted)', padding: 0 }}
            >×</button>
          </div>
        )}

        {open && (
          <div ref={panelRef} className="wa-panel" role="dialog" aria-label="WhatsApp enquiry">
            <div className="wa-head">
              <p style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '1rem' }}>Chat with The Artrobe</p>
              <p style={{ margin: '.15rem 0 0', fontSize: '.72rem', opacity: .85 }}>
                Pick a topic — it opens WhatsApp.
              </p>
            </div>
            {TOPICS.map(t => (
              <a
                key={t.label}
                className="wa-topic"
                href={waEnquiry(t.msg)}
                target="_blank"
                rel="noreferrer"
                onClick={() => { track('whatsapp_click', { topic: t.label, source: 'float_widget' }); setOpen(false); }}
              >
                {t.label}
              </a>
            ))}
          </div>
        )}

        <button
          ref={btnRef}
          className="wa-btn"
          onClick={() => { setOpen(o => !o); dismissNudge(); }}
          aria-label="Chat on WhatsApp"
          aria-expanded={open}
        >
          <span className="wa-tag" aria-hidden>WhatsApp me</span>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17-.35.22-.65.07a8.13 8.13 0 0 1-2.39-1.47 9 9 0 0 1-1.66-2.06c-.17-.3 0-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53s-.67-1.62-.92-2.22c-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35Z"/>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.96L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 0 16.46Z"/>
          </svg>
        </button>
      </div>
    </>
  );
}
