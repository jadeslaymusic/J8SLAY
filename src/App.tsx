import { useEffect, useRef, useState, type CSSProperties } from 'react';

const planets = [
  { name: 'Music', label: 'SOUND SIGNALS', color: '#e8bb76', glyph: '♫', title: 'Songs in orbit.', text: 'A home for J8SLAY recordings, demos, and late-night experiments.', note: 'No recordings have landed here yet. Come back for the next transmission.' },
  { name: 'Dreams', label: 'AFTER HOURS', color: '#a8b8e8', glyph: '☾', title: 'On the other side.', text: 'For the ideas that arrive somewhere between sleeping and waking.', note: 'The dream archive is quiet for now.' },
  { name: 'Archive', label: 'PAST TRANSMISSIONS', color: '#d4a3b8', glyph: '✧', title: 'Little time capsules.', text: 'A space for monthly zines, notes, and things worth keeping.', note: 'The first archive entry is still on its way.' },
  { name: 'Lore', label: 'THE INNER WORLD', color: '#bad28b', glyph: '⊹', title: 'Welcome to my orbit.', text: 'J8SLAY is a little universe for music, dreams, and the things in between. Follow a planet, take a chance on the wheel, and stay a while.', note: 'Every little universe starts somewhere. This one starts here.' },
  { name: 'Live', label: 'MEET ON EARTH', color: '#da936f', glyph: '☆', title: 'See you down here.', text: 'Live shows and dates, when the stars line up.', note: 'No upcoming shows announced. New dates will appear here when available.' },
  { name: 'About', label: 'THE HUMAN SIGNAL', color: '#b6c6cd', glyph: '◎', title: 'A little universe.', text: 'Welcome to J8SLAY. An independent corner of the internet with room for sound, curiosity, and a little cosmic chaos.', note: 'Choose your own orbit. There’s no wrong way to explore.' },
];

export default function App() {
  const [active, setActive] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { if (active !== null) dialog.current?.showModal(); }, [active]);
  useEffect(() => {
    if (!spinning) return;
    const timer = window.setTimeout(() => { setSpinning(false); setActive(Math.floor(Math.random() * planets.length)); }, 1300);
    return () => window.clearTimeout(timer);
  }, [spinning]);
  function spin() {
    if (spinning) return;
    setRotation(value => value + 720 + Math.random() * 360);
    setSpinning(true);
  }
  return <div className="site-shell">
    <a className="skip-link" href="#universe">Skip to universe</a>
    <header className="nav">
      <button className="wordmark" aria-label="J8SLAY home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>J8SLAY<span> ✳</span></button>
      <p className="nav-center">INDEPENDENT SIGNAL · PLANET EARTH</p>
      <button className="about-link" onClick={() => setActive(5)}>ABOUT THIS UNIVERSE ↗</button>
    </header>
    <main id="universe" className="home rebuilt-home">
      <div className="intro"><p className="eyebrow">YOU FOUND YOUR WAY HERE</p><h1>A little universe.</h1><p className="lede">Music, dreams & everything in orbit.</p></div>
      <div className={`wheel ${spinning ? 'is-spinning' : ''}`}>
        <div className="orbit-track" aria-hidden="true" />
        <div className="house-ring" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <span key={i} className="house-marker" style={{ '--house-angle': `${i * 30}deg`, '--house-upright': `${-i * 30}deg` } as CSSProperties}><b>{String(i + 1).padStart(2, '0')}</b></span>)}</div>
        <div className="celestial-layer" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <div key={i} className="ray" style={{ '--ray-angle': `${i * 30}deg` } as CSSProperties}><svg className="ray-line" viewBox="0 0 220 30" preserveAspectRatio="none"><path className="ray-wave ray-wave-core" d="M0 15 18 9 36 21 54 9 72 21 90 9 108 21 126 9 144 21 162 9 180 21 198 9 220 15" /></svg></div>)}</div>
        {planets.map((item, i) => {
          const angle = (i * 60 - 90) * Math.PI / 180;
          return <button key={item.name} className="destination" disabled={spinning} onClick={() => setActive(i)} style={{ left: `${50 + Math.cos(angle) * 44}%`, top: `${50 + Math.sin(angle) * 44}%`, '--planet-tint': item.color } as CSSProperties}><span className="destination-orb" aria-hidden="true">{item.glyph}</span><span className="destination-label"><small>{item.label}</small>{item.name}</span></button>;
        })}
        <button className="sun" onClick={spin} disabled={spinning} aria-label="Spin the wheel to explore a random planet"><span className="earth-globe" aria-hidden="true"><i className="earth-land earth-land-one" /><i className="earth-land earth-land-two" /><i className="earth-land earth-land-three" /></span><span className="spin-copy">{spinning ? 'IN ORBIT…' : 'TAKE A CHANCE ↗'}</span></button>
      </div>
      <p className="orbit-caption" role="status">{spinning ? 'Following a new orbit…' : 'Pick a planet. Or let the universe choose.'}</p>
      <nav className="mobile-destinations" aria-label="Explore the universe">{planets.map((item, i) => <button key={item.name} disabled={spinning} onClick={() => setActive(i)}>{item.name} ↗</button>)}</nav>
    </main>
    <footer className="universe-footer"><span>J8SLAY · A SMALL CORNER OF THE COSMOS</span><span>MADE OF SOUND & STARDUST <span className="footer-star">✳</span></span></footer>
    <dialog ref={dialog} className="signal-dialog" aria-labelledby="signal-title" onClose={() => setActive(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {active !== null && <><button autoFocus className="dialog-close" onClick={() => dialog.current?.close()} aria-label="Close and return to the universe">↙ BACK TO ORBIT <span>×</span></button><p className="eyebrow">{planets[active].label}</p><div className="panel-glyph" aria-hidden="true" style={{ color: planets[active].color }}>{planets[active].glyph}</div><h2 id="signal-title">{planets[active].title}</h2><p>{planets[active].text}</p><div className="transmission-note"><span className="signal-dot" />{planets[active].note}</div><button className="next-orbit" onClick={() => setActive((active + 1) % planets.length)}>EXPLORE {planets[(active + 1) % planets.length].name.toUpperCase()} ↗</button></>}
    </dialog>
  </div>;
}
