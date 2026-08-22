'use client';

const PHRASES = [
  'Handcrafted in Indore',
  'Texture & relief',
  'Commissions open',
  'Pichwai · Shringar · Wearable art',
  'Workshops for groups',
  'Original work only',
];

export default function Marquee() {
  // duplicated once so the -50% translate loops seamlessly
  const run = [...PHRASES, ...PHRASES];
  return (
    <div className="mq" aria-hidden>
      <div className="mq-track">
        {run.map((p, i) => (
          <span className="mq-item" key={i}>
            {p}
            <span className="mq-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
