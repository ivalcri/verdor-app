import React from 'react';
import * as I from '../icons.jsx';
import { Card, Pill, Ring, MacroBar, FoodPlaceholder } from '../components/ui.jsx';

export default function Home({ t, todayMeals, goals, onOpenCapture, onOpenMeal, onGoProfile }) {
  const today = todayMeals.reduce(
    (a, m) => ({
      kcal: a.kcal + Math.round((m.totals.kcal || 0) * (m.portionFactor || 1)),
      protein: a.protein + Math.round((m.totals.protein || 0) * (m.portionFactor || 1)),
      carbs: a.carbs + Math.round((m.totals.carbs || 0) * (m.portionFactor || 1)),
      fat: a.fat + Math.round((m.totals.fat || 0) * (m.portionFactor || 1)),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const remain = Math.max(0, goals.kcal - today.kcal);
  const todayLabel = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
  const proteinGap = Math.max(0, goals.protein - today.protein);

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 130px)' }}>
      {/* Top bar */}
      <div style={{
        padding: `calc(env(safe-area-inset-top, 44px) + 14px) 22px 12px`,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
            {todayLabel}
          </div>
          <h1 style={{ margin: 0, fontFamily: t.display, fontWeight: t.heroWeight, fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.02em', color: t.ink }}>
            Tu día
          </h1>
        </div>
        <button onClick={onGoProfile} style={{
          width: 38, height: 38, borderRadius: 19, border: `1px solid ${t.border}`,
          background: t.surface, color: t.ink, marginTop: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}>
          <I.User size={18} />
        </button>
      </div>

      {/* Hero ring */}
      <div style={{ padding: '8px 22px 0' }}>
        <Card t={t} raised pad={22}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <Ring t={t} size={130} stroke={11} value={today.kcal} max={goals.kcal} color={t.primary} track={t.surfaceAlt}
              label={today.kcal} sub="kcal hoy" />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Quedan</div>
                <div style={{ fontFamily: t.display, fontSize: 30, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {remain}
                </div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>de {goals.kcal} kcal</div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, paddingTop: 18, borderTop: `1px solid ${t.border}` }}>
            <MacroBar t={t} label="Proteína" value={today.protein} goal={goals.protein} color={t.proteins} icon={<I.Leaf size={12} />} />
            <MacroBar t={t} label="Carbohidratos" value={today.carbs} goal={goals.carbs} color={t.carbs} icon={<I.Wheat size={12} />} />
            <MacroBar t={t} label="Grasas" value={today.fat} goal={goals.fat} color={t.fats} icon={<I.Drop size={12} />} />
          </div>
        </Card>
      </div>

      {/* Meals */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontFamily: t.display, fontSize: 19, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
            Comidas de hoy
          </h2>
          <span style={{ fontSize: 12, color: t.muted }}>{todayMeals.length} registradas</span>
        </div>

        {todayMeals.length === 0 ? (
          <Card t={t} pad={22} style={{ textAlign: 'center', borderStyle: 'dashed', borderColor: t.border, borderWidth: 1, background: 'transparent' }}>
            <div style={{ color: t.muted, fontSize: 13, lineHeight: 1.5 }}>
              Aún no has registrado ninguna comida.<br />Toca la cámara para empezar.
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayMeals.map((m, i) => (
              <Card key={i} t={t} pad={12} onClick={() => onOpenMeal(m)}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FoodPlaceholder t={t} label={m.short || '?'} height={56} src={m.image} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.ink, marginBottom: 2 }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: t.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <I.Clock size={11} /> {m.time}
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span>{m.totals.kcal} kcal</span>
                  </div>
                </div>
                <div style={{
                  width: 42, height: 42, borderRadius: 21,
                  background: t.primary + '15', color: t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.display, fontSize: 14, fontWeight: 700,
                }}>{m.healthScore || '—'}</div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Suggestion */}
      {proteinGap > 0 && (
        <div style={{ padding: '22px 22px 0' }}>
          <Card t={t} pad={16} style={{ background: t.accent + '18', border: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: t.accent + '30', color: t.ink,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <I.Sparkle size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.ink, marginBottom: 2 }}>Sugerencia para esta tarde</div>
                <div style={{ fontSize: 12, color: t.muted, lineHeight: 1.4 }}>
                  Te faltan {proteinGap}g de proteína. Un yogur griego con frutos secos sería ideal.
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
