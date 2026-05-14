import React, { useRef, useState } from 'react';
import * as I from '../icons.jsx';
import { Btn, Card, Pill, TopBar } from '../components/ui.jsx';

export default function Capture({ t, onBack, onAnalyze }) {
  const [preview, setPreview] = useState(null);
  const fileRef = useRef();
  const cameraRef = useRef();

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const MAX = 1024;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        setPreview(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  if (preview) {
    return (
      <div style={{ height: '100%', background: '#000', position: 'relative' }}>
        <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)' }} />
        <button onClick={() => setPreview(null)} style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 44px) + 14px)',
          left: 18, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(0,0,0,0.5)', border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}><I.Close size={20} /></button>
        <div style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 44px) + 14px)',
          right: 18,
        }}>
          <Pill t={t} style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(20px)' }}>
            <I.Scan size={11} /> Listo para analizar
          </Pill>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)',
          left: 22, right: 22, display: 'flex', gap: 10,
        }}>
          <Btn t={t} variant="ghost" onClick={() => setPreview(null)}
            style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', backdropFilter: 'blur(20px)' }}>
            Reintentar
          </Btn>
          <Btn t={t} variant="primary" full onClick={() => onAnalyze(preview)}>
            Analizar plato
            <I.Sparkle size={16} stroke={2} />
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <TopBar t={t} back onBack={onBack} eyebrow="Nueva comida" title="Captura tu plato" />
      <div style={{ flex: 1, padding: '8px 22px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{ display: 'none' }} />
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />

        <Card t={t} pad={0} onClick={() => cameraRef.current?.click()} style={{ overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{
            aspectRatio: '4 / 3',
            background: `radial-gradient(circle at 30% 30%, ${t.primary}25, ${t.surfaceAlt} 70%)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
            position: 'relative',
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: 38,
              background: t.surface, color: t.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: t.shadow,
            }}>
              <I.Camera size={36} stroke={1.6} />
            </div>
            <div style={{ textAlign: 'center', color: t.ink }}>
              <div style={{ fontFamily: t.display, fontSize: 20, fontWeight: t.heroWeight, letterSpacing: '-0.02em' }}>
                Toma una foto
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>Encuadra el plato de frente</div>
            </div>
          </div>
        </Card>

        <Card t={t} pad={14} onClick={() => fileRef.current?.click()} style={{
          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: t.surfaceAlt, color: t.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <I.Gallery size={22} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>Elegir de la galería</div>
            <div style={{ fontSize: 12, color: t.muted }}>Usa una foto que ya tienes</div>
          </div>
          <I.Chevron size={18} style={{ color: t.faint }} />
        </Card>

        <Card t={t} pad={14} style={{ background: 'transparent', border: `1px dashed ${t.border}` }}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Consejos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Luz natural', 'Mejora la precisión hasta un 30%'],
              ['Vista cenital', 'Cámara perpendicular al plato'],
              ['Sin obstáculos', 'Sin manos ni cubiertos sobre la comida'],
            ].map(([title, sub]) => (
              <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <I.Check size={14} style={{ color: t.primary, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 12, color: t.ink, fontWeight: 500 }}>{title}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
