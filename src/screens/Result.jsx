import React from 'react';
import * as I from '../icons.jsx';
import { Btn, Card, Pill, Ring } from '../components/ui.jsx';

export default function Result({ t, meal, goals, onBack, onReanalyze, onGoDetail, onSave }) {
  const [portionFactor, setPortionFactor] = React.useState(meal?.portionFactor || 1);

  if (!meal) return null;

  const tot = {
    kcal: Math.round(meal.totals.kcal * portionFactor),
    protein: Math.round(meal.totals.protein * portionFactor),
    carbs: Math.round(meal.totals.carbs * portionFactor),
    fat: Math.round(meal.totals.fat * portionFactor),
  };

  const scoreColor = meal.healthScore >= 75 ? t.good : meal.healthScore >= 50 ? t.warn : t.bad;
  const scoreLabel = meal.healthScore >= 75 ? 'Excelente' : meal.healthScore >= 50 ? 'Equilibrado' : 'Mejorable';

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)' }}>
      {/* Photo banner */}
      <div style={{ position: 'relative', height: 280 }}>
        {meal.image ? (
          <img src={meal.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        ) : (
          <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, ${t.primary}40, ${t.accent}20)` }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 55%, ${t.bg} 100%)` }} />

        <button onClick={onBack} style={{
          position: 'absolute', top: 'calc(env(safe-area-inset-top, 44px) + 14px)', left: 18,
          width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.4)',
          border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}><I.Back size={18} /></button>

        <button onClick={onReanalyze} style={{
          position: 'absolute', top: 'calc(env(safe-area-inset-top, 44px) + 14px)', right: 18,
          width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.4)',
          border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}><I.Refresh size={18} /></button>

        <div style={{ position: 'absolute', bottom: 36, left: 22, right: 22 }}>
          <Pill t={t} style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(20px)' }}>
            <I.Sparkle size={10} /> Detectado con IA
          </Pill>
          <h1 style={{
            margin: '8px 0 0', color: '#fff', fontFamily: t.display, fontSize: 28,
            fontWeight: t.heroWeight, letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>{meal.name}</h1>
        </div>
      </div>

      <div style={{ padding: '0 22px', marginTop: -16, position: 'relative', zIndex: 2 }}>
        {/* Kcal + score */}
        <Card t={t} raised pad={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ fontFamily: t.display, fontSize: 42, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {tot.kcal}
                </span>
                <span style={{ color: t.muted, fontSize: 14, fontWeight: 500 }}>kcal</span>
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>{meal.portion} · {Math.round((meal.servingGrams || 300) * portionFactor)}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Ring t={t} size={76} stroke={7} value={meal.healthScore} max={100} color={scoreColor} track={t.surfaceAlt}>
                <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight, color: scoreColor, letterSpacing: '-0.03em' }}>{meal.healthScore}</div>
                <div style={{ fontSize: 9, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>salud</div>
              </Ring>
              <div style={{ fontSize: 10, color: scoreColor, fontWeight: 700, marginTop: 4 }}>{scoreLabel}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            {[
              { label: 'Proteína', v: tot.protein, c: t.proteins, ic: <I.Leaf size={11}/> },
              { label: 'Carbos', v: tot.carbs, c: t.carbs, ic: <I.Wheat size={11}/> },
              { label: 'Grasas', v: tot.fat, c: t.fats, ic: <I.Drop size={11}/> },
            ].map(macro => (
              <div key={macro.label} style={{
                flex: 1, padding: 12, borderRadius: t.radiusSm, background: t.surfaceAlt, textAlign: 'center',
              }}>
                <div style={{ color: macro.c, marginBottom: 4, display: 'flex', justifyContent: 'center' }}>{macro.ic}</div>
                <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>{macro.v}g</div>
                <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{macro.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Portion slider */}
        <Card t={t} pad={16} style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>Tamaño de porción</div>
              <div style={{ fontSize: 11, color: t.muted }}>Ajusta y recalcularemos</div>
            </div>
            <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight, color: t.primary, letterSpacing: '-0.02em' }}>
              {Math.round(portionFactor * 100)}%
            </div>
          </div>
          <input
            type="range" min="50" max="200" value={Math.round(portionFactor * 100)}
            onChange={e => setPortionFactor(+e.target.value / 100)}
            style={{ width: '100%', accentColor: t.primary, height: 32 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.faint, marginTop: -4 }}>
            <span>½</span><span>1</span><span>1½</span><span>2</span>
          </div>
        </Card>

        {/* Ingredients */}
        <Card t={t} pad={16} style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: t.display, fontSize: 16, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
              Ingredientes detectados
            </h3>
            <button onClick={() => onGoDetail(portionFactor)} style={{
              background: 'transparent', border: 0, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 2, WebkitTapHighlightColor: 'transparent',
            }}>
              Editar <I.Chevron size={12} stroke={2} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {meal.ingredients.slice(0, 4).map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: [t.proteins, t.carbs, t.fats, t.accent][i % 4],
                }} />
                <div style={{ flex: 1, fontSize: 13, color: t.ink, fontWeight: 500 }}>{ing.name}</div>
                <div style={{ fontSize: 12, color: t.muted }}>{Math.round(ing.grams * portionFactor)}g</div>
                <div style={{ fontSize: 12, color: t.ink, fontWeight: 600, minWidth: 50, textAlign: 'right' }}>{Math.round(ing.kcal * portionFactor)} kcal</div>
              </div>
            ))}
            {meal.ingredients.length > 4 && (
              <div style={{ fontSize: 11, color: t.muted, fontStyle: 'italic' }}>+ {meal.ingredients.length - 4} más</div>
            )}
          </div>
        </Card>

        {/* Note */}
        {meal.note && (
          <Card t={t} pad={14} style={{ marginTop: 12, background: t.accent + '15', border: 'none' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <I.Info size={16} style={{ color: t.ink, flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: t.ink, lineHeight: 1.5 }}>{meal.note}</div>
            </div>
          </Card>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Btn t={t} variant="ghost" onClick={() => onGoDetail(portionFactor)}>
            <I.Edit size={16} /> Detalle
          </Btn>
          <Btn t={t} variant="primary" full onClick={() => onSave(portionFactor)}>
            <I.Save size={16} /> Guardar en diario
          </Btn>
        </div>
      </div>
    </div>
  );
}
