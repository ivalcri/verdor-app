import React, { useState } from 'react';
import * as I from '../icons.jsx';
import { Card, FoodPlaceholder, TopBar } from '../components/ui.jsx';

function getWeekData(meals, goals) {
  const now = new Date();
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const ds = d.toDateString();
    const dayMeals = meals.filter(m => new Date(m.savedAt).toDateString() === ds);
    const kcal = dayMeals.reduce((s, m) => s + Math.round((m.totals?.kcal || 0) * (m.portionFactor || 1)), 0);
    week.push({ date: d, kcal, isToday: i === 0 });
  }
  return week;
}

const DAY_LABELS = ['D','L','M','X','J','V','S'];

export default function History({ t, meals, goals }) {
  const week = getWeekData(meals, goals);
  const recentMeals = [...meals].sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt)).slice(0, 8);

  const avgKcal = week.filter(d => d.kcal > 0).reduce((s, d, _, a) => s + d.kcal / a.length, 0);
  const streak = week.filter(d => d.kcal > 0).length;

  const avgScore = recentMeals.length > 0
    ? Math.round(recentMeals.reduce((s, m) => s + (m.healthScore || 75), 0) / recentMeals.length)
    : 0;

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 120px)' }}>
      <TopBar t={t} eyebrow="Historial" title="Tu semana" />

      <div style={{ padding: '0 22px' }}>
        <Card t={t} raised pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>Últimos 7 días</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
            {week.map((day, i) => {
              const pct = Math.min(1, day.kcal / goals.kcal);
              const label = DAY_LABELS[day.date.getDay()];
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>{label}</div>
                  <div style={{ position: 'relative', width: '100%', height: 72, background: t.surfaceAlt, borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: (pct * 100) + '%',
                      background: day.kcal === 0 ? 'transparent' : (day.isToday ? t.accent : t.primary),
                      borderRadius: 6, transition: 'height 1s cubic-bezier(.22,1,.36,1)',
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: day.kcal === 0 ? t.faint : t.ink, fontWeight: 600 }}>
                    {day.kcal === 0 ? '—' : day.kcal}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          {[
            { k: 'Media', v: avgKcal > 0 ? Math.round(avgKcal).toLocaleString('es-ES') : '—', u: 'kcal/día', icon: <I.Flame size={14}/>, c: t.primary },
            { k: 'Racha', v: streak, u: 'días', icon: <I.TrendUp size={14}/>, c: t.accent },
            { k: 'Salud', v: avgScore || '—', u: '/100', icon: <I.Heart size={14}/>, c: t.good },
          ].map(s => (
            <Card key={s.k} t={t} pad={12} style={{ flex: 1 }}>
              <div style={{ color: s.c, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>{s.u}</div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.k}</div>
            </Card>
          ))}
        </div>

        {/* Recent meals */}
        <div style={{ marginTop: 22 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: t.display, fontSize: 17, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
            Comidas recientes
          </h3>
          {recentMeals.length === 0 ? (
            <Card t={t} pad={22} style={{ textAlign: 'center', borderStyle: 'dashed', background: 'transparent' }}>
              <div style={{ color: t.muted, fontSize: 13 }}>Aún no hay comidas registradas</div>
            </Card>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentMeals.map((m, i) => {
                const saved = new Date(m.savedAt);
                const isToday = saved.toDateString() === new Date().toDateString();
                const isYesterday = saved.toDateString() === new Date(Date.now() - 86400000).toDateString();
                const dayStr = isToday ? 'Hoy' : isYesterday ? 'Ayer' : saved.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' });
                return (
                  <Card key={i} t={t} pad={10} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FoodPlaceholder t={t} label={m.short || '?'} height={48} src={m.image} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{dayStr} · {m.time} · {m.totals?.kcal || 0} kcal</div>
                    </div>
                    <div style={{
                      width: 34, height: 34, borderRadius: 17,
                      background: t.primary + '15', color: t.primary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: t.display, fontSize: 12, fontWeight: 700,
                    }}>{m.healthScore || '—'}</div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
