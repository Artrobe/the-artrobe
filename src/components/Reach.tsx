'use client';
import Reveal from '@/components/ui/Reveal';

// Cities where The Artrobe has run workshops or delivered commissions.
// TODO(jahnvi): confirm this list — only cities with actual work done belong here.
const CITIES = ['Indore', 'Bangalore', 'Pune', 'Mumbai'];

export default function Reach() {
  return (
    <section className="reach-sec">
      <div className="reach-wrap">
        <Reveal>
          <p className="reach-eyebrow">Where we work</p>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="reach-title">
            Based in Indore.<br />
            <em>Shipping everywhere.</em>
          </h2>
        </Reveal>

        <div className="reach-cities">
          {CITIES.map((c, i) => (
            <Reveal key={c} delay={0.1 + i * 0.07}>
              <span className="reach-city">
                <span className="reach-pin" aria-hidden>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
                      stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                    <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.7" />
                  </svg>
                </span>
                {c}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="reach-note">
            Workshops and commissions across India — and original work shipped worldwide,
            packed flat and insured.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
