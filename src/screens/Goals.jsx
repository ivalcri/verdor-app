import React, { useState } from 'react';
import * as I from '../icons.jsx';
import { Card, TripleRing, TopBar, Btn } from '../components/ui.jsx';

export default function Goals({ t, goals, todayTotals, onSaveGoals }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...goals });

  const today = todayTotals;

  const rows = [
    { k: 'kcal', label: 'Calorías', u: 'kcal', icon: <I.Flame size={18}/>, c: t.primary },
    { k: 'protein', label: 'Proteína', u: 'g', icon: <I.Leaf size={18}/>, c: t.proteins },
    { k: 'carbs', label: 'Carbohidratos', u: 'g', icon: <I.Wheat size={18}/>, c: t.carbs },
    { k: 'fat', label: 'Grasas', u: 'g', icon: <I.Drop size={18}/>, c: t.fats },
  ];

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 120px)' }}>
      <TopBar t={t} eyebrow="Objetivos" title="Tu balance" />

      <div style={{ padding: '0 22px' }}>
        <Card t={t} raised pad={20} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            <TripleRing t={t} size={200}
              p={today.protein / goals.protein}
              c={today.carbs / goals.carbs}
              f={today.fat / goals.fat}
            />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: t.display, fontSize: 40, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {Math.round((today.kcal / goals.kcal) * 100)}%
              </div>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>
                de tu día
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
            {[
              { k: 'Proteína', v: today.protein, g: goals.protein, c: t.proteins },
              { k: 'Carbos', v: today.carbs, g: goals.carbs, c: t.carbs },
              { k: 'Grasas', v: today.fat, g: goals.fat, c: t.fats },
            ].map(m => (
              <div key={m.k} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: m.c }}/>
                  <span style={{ fontSize: 10, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.k}</span>
                </div>
                <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em', marginTop: 4 }}>
                  {m.v}<span style={{ color: t.faint, fontSize: 12 }}>/{m.g}g</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: t.display, fontSize: 17, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
              Metas diarias
            </h3>
            <button onClick={() => setEditing(!editing)} style={{
              background: 'transparent', border: 0, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}>{editing ? 'Cancelar' : 'Editar'}</button>
          </div>

          <Card t={t} pad={4}>
            {rows.map((row, i) => (
              <div key={row.k} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderBottom: i < rows.length - 1 ? `1px solid ${t.border}` : 'none',
              }}>
                <div style={{ color: row.c, width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.icon}</div>
                <div style={{ flex: 1, fontSize: 14, color: t.ink, fontWeight: 500 }}>{row.label}</div>
                {editing ? (
                  <input
                    type="number"
                    value={draft[row.k]}
                    onChange={e => setDraft(d => ({ ...d, [row.k]: +e.target.value }))}
                    style={{
                      width: 80, padding: '4px 8px', borderRadius: 8, border: `1px solid ${t.border}`,
                      background: t.surfaceAlt, color: t.ink, fontSize: 14, fontWeight: 600,
                      textAlign: 'right', fontFamily: t.font,
                    }}
                  />
                ) : (
                  <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
                    {goals[row.k]}<span style={{ color: t.faint, fontSize: 11, marginLeft: 2 }}>{row.u}</span>
                  </div>
                )}
                {!editing && <I.Chevron size={16} style={{ color: t.faint }} />}
              </div>
            ))}
          </Card>

          {editing && (
            <Btn t={t} variant="primary" full style={{ marginTop: 12 }} onClick={() => { onSaveGoals(draft); setEditing(false); }}>
              <I.Check size={16} stroke={2} /> Guardar metas
            </Btn>
          )}
        </div>

        <Card t={t} pad={16} style={{ marginTop: 14, background: t.primary + '12', border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 21,
              background: t.primary, color: t.primaryInk,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I.Target size={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>Plan: Mantener peso</div>
              <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>Ajusta las metas para personalizar tu objetivo</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
