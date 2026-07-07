'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PageShell from '@/components/ui/PageShell';
import Reveal from '@/components/ui/Reveal';
import MagneticButton from '@/components/ui/MagneticButton';
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/data/social';

const SUBJECTS = [
  'Purchase an artwork',
  'Commission a piece',
  'Collaboration',
  'Exhibition / Press',
  'General enquiry',
];

const DETAILS = [
  { label: 'Email',         value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Response time', value: 'Within 48 hours' },
  { label: 'Location',      value: 'Indore, India' },
];

const SOCIALS = SOCIAL_LINKS;

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <div style={{ padding: 'clamp(2.5rem, 7vw, 3.2rem) 1.25rem 0.6rem' }}>
        <Reveal>
          <p style={{
            fontFamily: 'var(--sans)', fontSize: '0.6rem',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'var(--muted)', marginBottom: '0.4rem',
          }}>
            <span style={{ display: 'inline-block', width: 22, height: 1, background: 'var(--muted)', verticalAlign: 'middle', marginRight: 8 }} />
            Get in touch
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 7vw, 2.8rem)',
            fontWeight: 300, color: 'var(--text)',
            letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: '0.7rem',
          }}>
            Commission or <em style={{ color: 'var(--green-dk)' }}>enquire</em>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.92rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '46ch' }}>
            Interested in a piece? Commissions, collaborations, exhibitions and purchases all welcome.
          </p>
        </Reveal>
      </div>

      <section style={{ padding: '1.25rem', display: 'grid', gap: '0.6rem' }}>
        {DETAILS.map((d, i) => {
          const Inner = (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.9rem',
              padding: '0.95rem 1.1rem',
              background: 'var(--cream)', border: '1px solid var(--border)',
              borderRadius: 12,
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: 'var(--green-dk)', flexShrink: 0,
              }} />
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>{d.label}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--text)', fontWeight: 500 }}>{d.value}</p>
              </div>
            </div>
          );
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {d.href
                ? <a href={d.href} style={{ textDecoration: 'none', color: 'inherit' }}>{Inner}</a>
                : Inner}
            </motion.div>
          );
        })}
      </section>

      <section style={{ padding: '0 1.25rem 1.25rem' }}>
        <Reveal>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.7rem' }}>Follow</p>
        </Reveal>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.id}
              href={s.href}
              target="_blank" rel="noreferrer"
              aria-label={s.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -3, backgroundColor: 'var(--green-lt)' }}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                border: '1px solid var(--border)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--sans)', fontSize: '0.65rem', fontWeight: 500,
                color: 'var(--text)', textDecoration: 'none', textTransform: 'lowercase',
                background: 'var(--off-white)',
              }}
            >{s.id}</motion.a>
          ))}
        </div>
      </section>

      <form action="https://formsubmit.co/theartrobe12@gmail.com" method="POST" style={{ padding: '0 1.25rem 2.5rem', display: 'grid', gap: '1rem' }}>
        <FieldRow>
          <Field label="Name">
            <input
              type="text" required name="name"
              placeholder="Your name"
              style={inputStyle}
            />
          </Field>
          <Field label="Email">
            <input
              type="email" required name="email"
              placeholder="your@email.com"
              style={inputStyle}
            />
          </Field>
        </FieldRow>

        <Field label="Subject">
          <select
            name="subject"
            style={{ ...inputStyle, appearance: 'none', backgroundImage: 'linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%)', backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 13px) 50%', backgroundSize: '5px 5px', backgroundRepeat: 'no-repeat' }}
          >
            <option value="">Select a topic</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <Field label="Message">
          <textarea
            required name="message"
            placeholder="Tell me about your space, the feeling you're looking for…"
            rows={5}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </Field>

        <MagneticButton
          type="submit"
          style={{
            background: 'var(--green)', color: 'var(--text)',
            border: 'none', borderRadius: '2rem',
            padding: '0.95rem 1rem',
            fontFamily: 'var(--sans)', fontSize: '0.78rem',
            fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', boxShadow: '0 8px 22px rgba(110,158,102,0.25)',
          }}
        >Send Message →</MagneticButton>

        <p style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center', marginTop: '-0.4rem' }}>
          Your message will be delivered to theartrobe12@gmail.com
        </p>
      </form>
    </PageShell>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.85rem 1rem',
  fontFamily: 'var(--sans)', fontSize: '16px',
  background: 'var(--cream)', border: '1px solid var(--border)',
  borderRadius: 10, color: 'var(--text)', outline: 'none',
  transition: 'border-color 0.2s, background 0.2s',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        fontFamily: 'var(--sans)', fontSize: '0.6rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--muted)', display: 'block', marginBottom: '0.45rem',
      }}>{label}</label>
      {children}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div className="field-row">{children}</div>;
}
