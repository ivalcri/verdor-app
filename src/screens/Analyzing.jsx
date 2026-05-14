import React, { useState, useEffect } from 'react';
import * as I from '../icons.jsx';

const messages = ['Detectando ingredientes…', 'Estimando porciones…', 'Calculando macros…', 'Casi listo…'];

export default function Analyzing({ t, pendingImage }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % messages.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ height: '100%', position: 'relative', background: '#000', overflow: 'hidden' }}>
      {pendingImage && (
        <img src={pendingImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} alt="" />
      )}

      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
        boxShadow: `0 0 24px 4px ${t.accent}80`,
        animation: 'scan 2s ease-in-out infinite',
      }} />

      {[[0,0],[1,0],[0,1],[1,1]].map(([x, y], ki) => (
        <div key={ki} style={{
          position: 'absolute', width: 32, height: 32,
          [x ? 'right' : 'left']: 32,
          [y ? 'bottom' : 'top']: 'calc(env(safe-area-inset-top, 44px) + 80px)',
          borderTop: !y ? `2px solid ${t.accent}` : 'none',
          borderBottom: y ? `2px solid ${t.accent}` : 'none',
          borderLeft: !x ? `2px solid ${t.accent}` : 'none',
          borderRight: x ? `2px solid ${t.accent}` : 'none',
        }} />
      ))}

      <div style={{ position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', width: 64, height: 64, borderRadius: 32, left: -32, top: -32,
            border: `2px solid ${t.accent}`,
            animation: `ripple 2s ease-out ${i * 0.6}s infinite`,
          }} />
        ))}
        <div style={{
          width: 48, height: 48, borderRadius: 24, marginLeft: -24, marginTop: -24,
          background: t.accent, color: '#0F1A0E',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pulse 1.4s ease-in-out infinite',
        }}>
          <I.Sparkle size={22} stroke={2.2} />
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 50%, transparent)',
        padding: `40px 22px calc(env(safe-area-inset-bottom, 20px) + 40px)`,
        color: '#fff',
      }}>
        <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
          Analizando
        </div>
        <div style={{ fontFamily: t.display, fontSize: 28, fontWeight: t.heroWeight, letterSpacing: '-0.03em', minHeight: 38, transition: 'opacity .3s' }}>
          {messages[phase]}
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 4 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= phase ? t.accent : 'rgba(255,255,255,0.2)',
              transition: 'background .4s',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
