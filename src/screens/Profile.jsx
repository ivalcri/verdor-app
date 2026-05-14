import React, { useState } from 'react';
import * as I from '../icons.jsx';
import { Card, Pill, TopBar, Btn } from '../components/ui.jsx';

function Toggle({ t, on, onChange }) {
  return (
    <button onClick={onChange} style={{
      width: 44, height: 26, borderRadius: 13, border: 0, cursor: 'pointer',
      background: on ? t.primary : t.surfaceAlt, position: 'relative', transition: 'background .2s',
      WebkitTapHighlightColor: 'transparent',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 20 : 2, width: 22, height: 22, borderRadius: 11,
        background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

function Row({ t, icon, title, sub, right, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
      borderBottom: `1px solid ${t.border}`, cursor: onClick ? 'pointer' : 'default',
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: 8,
        background: t.surfaceAlt, color: t.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: t.ink, fontWeight: 500 }}>{title}</div>
        {sub && <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{sub}</div>}
      </div>
      {right !== undefined ? right : <I.Chevron size={16} style={{ color: t.faint }} />}
    </div>
  );
}

export default function Profile({ t, dark, onToggleDark, apiKey, onSaveApiKey, onGoGoals, meals }) {
  const [showApiInput, setShowApiInput] = useState(false);
  const [keyDraft, setKeyDraft] = useState(apiKey || '');
  const [keyVisible, setKeyVisible] = useState(false);

  const streak = (() => {
    const today = new Date();
    let count = 0;
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ds = d.toDateString();
      if (meals.some(m => new Date(m.savedAt).toDateString() === ds)) count++;
      else if (i > 0) break;
    }
    return count;
  })();

  const maskedKey = apiKey ? `${apiKey.slice(0, 8)}${'•'.repeat(20)}` : 'No configurada';

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 120px)' }}>
      <TopBar t={t} eyebrow="Perfil" title="Tú" />

      <div style={{ padding: '0 22px' }}>
        {/* User card */}
        <Card t={t} raised pad={18} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, fontFamily: t.display,
          }}>
            <I.User size={28} stroke={1.6} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: t.display, fontSize: 19, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
              Mi perfil
            </div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{meals.length} comidas registradas</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <Pill t={t} color={t.primary}><I.Flame size={10}/> {streak} días</Pill>
              <Pill t={t} color={t.accent}><I.Star size={10}/> {meals.length} comidas</Pill>
            </div>
          </div>
        </Card>

        {/* API Key section */}
        <h3 style={{ margin: '22px 0 10px', fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          API de Anthropic
        </h3>
        <Card t={t} pad={0} style={{ overflow: 'hidden' }}>
          <Row
            t={t}
            icon={<I.Key size={16}/>}
            title="API Key"
            sub={maskedKey}
            onClick={() => setShowApiInput(!showApiInput)}
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {apiKey && <div style={{ width: 8, height: 8, borderRadius: 4, background: t.good }} />}
                <I.Chevron size={16} style={{ color: t.faint }} />
              </div>
            }
          />
        </Card>

        {showApiInput && (
          <Card t={t} pad={16} style={{ marginTop: 8 }} className="fade-in">
            <div style={{ fontSize: 12, color: t.muted, marginBottom: 10, lineHeight: 1.5 }}>
              Obtén tu API key en{' '}
              <span style={{ color: t.primary, fontWeight: 500 }}>console.anthropic.com</span>.
              Se guarda solo en este dispositivo.
            </div>
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <input
                type={keyVisible ? 'text' : 'password'}
                value={keyDraft}
                onChange={e => setKeyDraft(e.target.value)}
                placeholder="sk-ant-api03-..."
                style={{
                  width: '100%', padding: '12px 44px 12px 14px', borderRadius: t.radiusSm,
                  border: `1px solid ${t.border}`, background: t.surfaceAlt,
                  color: t.ink, fontSize: 14, fontFamily: 'ui-monospace, monospace',
                }}
              />
              <button onClick={() => setKeyVisible(v => !v)} style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                background: 'transparent', border: 0, color: t.muted, cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
              }}>
                {keyVisible ? <I.Close size={16} /> : <I.Info size={16} />}
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn t={t} variant="ghost" onClick={() => { setShowApiInput(false); setKeyDraft(apiKey || ''); }}>
                Cancelar
              </Btn>
              <Btn t={t} variant="primary" full onClick={() => { onSaveApiKey(keyDraft.trim()); setShowApiInput(false); }}>
                <I.Check size={16} stroke={2} /> Guardar
              </Btn>
            </div>
          </Card>
        )}

        {/* Preferences */}
        <h3 style={{ margin: '22px 0 10px', fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Preferencias
        </h3>
        <Card t={t} pad={0}>
          <Row t={t} icon={<I.Target size={16}/>} title="Objetivos nutricionales" sub="Personaliza tus metas" onClick={onGoGoals} />
          <Row t={t} icon={<I.Leaf size={16}/>} title="Modo oscuro" right={<Toggle t={t} on={dark} onChange={onToggleDark} />} />
          <Row t={t} icon={<I.Lock size={16}/>} title="Privacidad" sub="Tus fotos no se comparten" right={null} />
        </Card>

        <h3 style={{ margin: '22px 0 10px', fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Datos
        </h3>
        <Card t={t} pad={0}>
          <Row
            t={t}
            icon={<I.Trash size={16}/>}
            title="Borrar historial"
            sub="Elimina todas las comidas guardadas"
            right={null}
          />
        </Card>

        <div style={{ textAlign: 'center', marginTop: 22, color: t.faint, fontSize: 11 }}>
          verdor · v1.0 · Calculadora de calorías con IA
        </div>
      </div>
    </div>
  );
}
