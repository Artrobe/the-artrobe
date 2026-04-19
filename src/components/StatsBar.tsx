const stats = [
  { value: '120+', label: 'Originals' },
  { value: '8',    label: 'Years' },
  { value: '340K', label: 'Followers' },
];

export default function StatsBar() {
  return (
    <section style={{
      display: 'flex', background: 'var(--cream)',
      borderBottom: '1px solid var(--border)',
    }}>
      {stats.map((s, i) => (
        <div key={i} style={{
          flex: 1, textAlign: 'center',
          padding: '1.2rem 0.5rem',
          borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--text)' }}>{s.value}</div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '2px' }}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}
