import React, { useState } from 'react';
import * as I from '../icons.jsx';
import { Btn } from '../components/ui.jsx';

const slides = [
  {
    eyebrow: 'KCAL · IA',
    title: 'Comer con\nconciencia.',
    body: 'Fotografía tu plato y obtén el desglose nutricional en segundos. Sin pesar, sin buscar.',
    icon: <I.Bowl size={56} stroke={1.2} />,
  },
  {
    eyebrow: 'CÓMO FUNCIONA',
    title: 'IA que entiende\ningredientes.',
    body: 'Detectamos cada ingrediente, su porción y su valor nutricional. Tú revisas y ajustas.',
    icon: <I.Sparkle size={56} stroke={1.2} />,
  },
  {
    eyebrow: 'TU PROGRESO',
    title: 'Un diario sin\nculpa.',
    body: 'Define metas realistas, ve tu progreso diario y descubre patrones sin obsesionarte con números.',
    icon: <I.Target size={56} stroke={1.2} />,
  },
];

export default function Onboarding({ t, onDone }) {
  const [step, setStep] = useState(0);
  const s = slides[step];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <div style={{
        padding: `calc(env(safe-area-inset-top, 44px) + 14px) 22px 0`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.ink }}>
          <I.Logo size={22} />
          <span style={{ fontFamily: t.display, fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em' }}>verdor</span>
        </div>
        <button onClick={onDone} style={{
          background: 'transparent', border: 0, color: t.muted, fontSize: 14, cursor: 'pointer', fontWeight: 500,
        }}>Saltar</button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <div style={{
          width: 100, height: 100, borderRadius: 50,
          background: t.surfaceAlt, color: t.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32,
        }}>{s.icon}</div>
        <div style={{ fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>{s.eyebrow}</div>
        <h1 style={{
          fontFamily: t.display, fontWeight: t.heroWeight, color: t.ink,
          fontSize: 44, lineHeight: 1.0, letterSpacing: '-0.03em',
          margin: 0, whiteSpace: 'pre-line',
        }}>{s.title}</h1>
        <p style={{ color: t.muted, fontSize: 16, lineHeight: 1.45, marginTop: 18, maxWidth: 320 }}>{s.body}</p>
      </div>

      <div style={{ padding: `20px 22px calc(env(safe-area-inset-bottom, 20px) + 20px)` }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 22 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 24 : 6, height: 6, borderRadius: 3,
              background: i === step ? t.primary : t.surfaceAlt, transition: 'width .3s',
            }} />
          ))}
        </div>
        <Btn t={t} full variant="primary" onClick={() => step < slides.length - 1 ? setStep(step + 1) : onDone()}>
          {step < slides.length - 1 ? 'Siguiente' : 'Empezar'}
          <I.Forward size={16} stroke={2} />
        </Btn>
      </div>
    </div>
  );
}
