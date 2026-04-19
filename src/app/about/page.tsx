import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <TopBar />
      <main style={{ paddingTop: 'var(--nav-h)', paddingBottom: 'var(--bottom-nav-h)' }}>
        <div style={{ height: '45vw', maxHeight: '280px', background: 'linear-gradient(135deg, #c5d8c2 0%, #d8ccbc 60%, #a8c5a0 100%)' }} />
        <div style={{ padding: '2rem 1.25rem' }}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem' }}>The Artist</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem, 6vw, 2.8rem)', fontWeight: 300, color: 'var(--text)', marginBottom: '1.5rem' }}>
            About <em>The Artrobe</em>
          </h1>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            The Artrobe is a creative studio rooted in observation. Each painting begins not with a brush but with a long, quiet look — at light, at texture, at the unremarkable moments that carry the most weight.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            Working primarily in acrylic, oil, and mixed media, the studio produces original works that explore the intersection of stillness and colour — paintings that ask to be lived with, not just seen.
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.8 }}>
            Based in India. Available for commissions, exhibitions, and collaborations.
          </p>
        </div>
        <div style={{ margin: '0 1.25rem 2rem', padding: '1.5rem', background: 'var(--cream)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--text)', lineHeight: 1.5 }}>
            &ldquo;Every piece begins with observation — the way morning light changes the colour of a wall.&rdquo;
          </p>
        </div>
        <Footer />
      </main>
      <BottomNav />
    </>
  );
}
