import React, { useRef, useState } from 'react';
import * as I from '../icons.jsx';
import { Btn, Card, Pill, TopBar } from '../components/ui.jsx';

async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const MAX = 1024;
  const scale = Math.min(1, MAX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.85);
}

export default function Capture({ t, onBack, onAnalyze }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const cameraRef = useRef();

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreviewUrl(URL.createObjectURL(f));
    e.target.value = '';
  };

  const handleAnalyze = async () => {
    const compressed = await compressImage(file);
    onAnalyze(compressed);
  };

  if (previewUrl) {
    return (
      <div style={{ height: '100%', background: '#000', position: 'relative' }}>
        <img src={previewUrl} style={{ width: '100%', height: '100%', objectFit: 'contain', imageOrientation: 'from-image' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)' }} />
        <button onClick={() => { setPreviewUrl(null); setFile(null); }} style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 44px) + 14px)',
          left: 18, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(0,0,0,0.5)', border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}>
          <I.Close size={18} />
        </button>
        <div style={{ position: 'absolute', bottom: 'calc(env(safe-area-inset-bottom, 24px) + 24px)', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <button onClick={handleAnalyze} style={{
            padding: '16px 48px', borderRadius: 50, background: t.primary,
            color: '#fff', fontSize: 17, fontWeight: 700, border: 0, cursor: 'pointer',
            boxShadow: '0 4px 24px rgba(0,0,0,0.35)', WebkitTapHighlightColor: 'transparent',
          }}>
            Analizar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: t.bg, display: 'flex', flexDirection: 'column' }}>
      <TopBar t={t} title="Nueva foto" left={<button onClick={onBack} style={{ background: 'none', border: 0, color: t.primary, fontSize: 15, cursor: 'pointer', padding: '4px 0' }}><I.Back size={22} /></button>} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 32 }}>
        <div style={{ width: 120, height: 120, borderRadius: 30, background: t.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <I.Camera size={52} style={{ color: t.faint }} />
        </div>
        <p style={{ color: t.muted, fontSize: 15, textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
          Haz una foto al plato o<br />selecciona una de tu galería
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 280 }}>
          <button onClick={() => cameraRef.current?.click()} style={{
            padding: '16px', borderRadius: t.radiusSm, background: t.primary,
            color: '#fff', fontSize: 16, fontWeight: 600, border: 0, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <I.Camera size={20} /> Hacer foto
          </button>
          <button onClick={() => fileRef.current?.click()} style={{
            padding: '16px', borderRadius: t.radiusSm, background: t.surfaceAlt,
            color: t.ink, fontSize: 16, fontWeight: 600, border: `1px solid ${t.border}`, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <I.Gallery size={20} /> Galería
          </button>
        </div>
      </div>
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{ display: 'none' }} />
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
    </div>
  );
}
