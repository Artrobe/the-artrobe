'use client';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)' }}>
        <div style={{ padding: '2.5rem 1.25rem 1.5rem' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem' }}>Get in Touch</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '0.6rem' }}>Contact</h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>
            Enquiries about commissions, availability, or exhibitions welcome.
          </p>
        </div>

        <form style={{ padding: '0 1.25rem 2rem', display: 'grid', gap: '1rem' }}
          onSubmit={e => e.preventDefault()}>
          {[
            { label: 'Name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', type: 'email', placeholder: 'your@email.com' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} style={{
                width: '100%', padding: '0.75rem 1rem',
                fontFamily: 'var(--sans)', fontSize: '16px',
                background: 'var(--cream)', border: '1px solid var(--border)',
                borderRadius: '8px', color: 'var(--text)', outline: 'none',
              }} />
            </div>
          ))}
          <div>
            <label style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>Message</label>
            <textarea placeholder="Tell me about your interest..." rows={5} style={{
              width: '100%', padding: '0.75rem 1rem',
              fontFamily: 'var(--sans)', fontSize: '16px',
              background: 'var(--cream)', border: '1px solid var(--border)',
              borderRadius: '8px', color: 'var(--text)', outline: 'none', resize: 'none',
            }} />
          </div>
          <button type="submit" style={{
            background: 'var(--green)', color: 'var(--text)', border: 'none',
            borderRadius: '2rem', padding: '0.85rem',
            fontFamily: 'var(--sans)', fontSize: '0.78rem',
            fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
          }}>Send Message</button>
        </form>

        <div style={{ margin: '0 1.25rem 2rem', padding: '1.5rem', background: 'var(--cream)', borderRadius: '12px', border: '1px solid var(--border)', display: 'grid', gap: '0.8rem' }}>
          {[
            { label: 'Email', value: 'hello@theartrobe.com' },
            { label: 'Instagram', value: '@theartrobe' },
            { label: 'Location', value: 'India' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>{item.label}</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '0.82rem', color: 'var(--text)' }}>{item.value}</span>
            </div>
          ))}
        </div>
        <Footer />
      </main>
      <BottomNav />
    </>
  );
}
