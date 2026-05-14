import React, { useState } from 'react';
import * as I from '../icons.jsx';
import { Btn, Card, TopBar } from '../components/ui.jsx';

export default function Detail({ t, meal, portionFactor: initFactor, onBack, onSave }) {
  const [ingredients, setIngredients] = useState(meal?.ingredients || []);
  const [portionFactor] = useState(initFactor || 1);

  if (!meal) return null;

  const adjust = (i, delta) => {
    setIngredients(prev => prev.map((ing, idx) => {
      if (idx !== i) return ing;
      const newGrams = Math.max(0, ing.grams + delta);
      const ratio = ing.grams > 0 ? newGrams / ing.grams : 1;
      return { ...ing, grams: newGrams, kcal: Math.round(ing.kcal * ratio) };
    }));
  };

  const addIngredient = () => setIngredients(prev => [
    ...prev, { name: 'Nuevo ingrediente', grams: 50, kcal: 80, confidence: 100 },
  ]);

  const totKcal = ingredients.reduce((s, ing) => s + Math.round(ing.kcal * portionFactor), 0);
  const icons = [<I.Leaf size={18}/>, <I.Wheat size={18}/>, <I.Drop size={18}/>, <I.Bowl size={18}/>];
  const colors = [t.proteins, t.carbs, t.fats, t.accent];

  return (
    <div style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)' }}>
      <TopBar t={t} back onBack={onBack} eyebrow={meal.name} title="Ingredientes" />

      <div style={{ padding: '0 22px' }}>
        <Card t={t} pad={16}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            Total recalculado
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontFamily: t.display, fontSize: 32, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em' }}>
                {totKcal}
              </span>
              <span style={{ color: t.muted, fontSize: 13, marginLeft: 4 }}>kcal</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[['P', Math.round(meal.totals.protein * portionFactor), t.proteins],
                ['C', Math.round(meal.totals.carbs * portionFactor), t.carbs],
                ['G', Math.round(meal.totals.fat * portionFactor), t.fats]].map(([k, v, c]) => (
                <div key={k} style={{ textAlign: 'center', minWidth: 38 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: t.display }}>{v}g</div>
                  <div style={{ fontSize: 9, color: t.muted, fontWeight: 600, letterSpacing: '0.06em' }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ingredients.map((ing, i) => (
            <Card key={i} t={t} pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 19,
                  background: colors[i % 4] + '20', color: colors[i % 4],
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {icons[i % 4]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>{ing.name}</div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>
                    {Math.round(ing.kcal * portionFactor)} kcal · {ing.confidence || 90}% confianza
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => adjust(i, -10)} style={{
                    width: 28, height: 28, borderRadius: 14, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.ink, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    WebkitTapHighlightColor: 'transparent',
                  }}>−</button>
                  <div style={{ minWidth: 44, textAlign: 'center', fontSize: 13, fontWeight: 600, color: t.ink }}>
                    {Math.round(ing.grams * portionFactor)}g
                  </div>
                  <button onClick={() => adjust(i, 10)} style={{
                    width: 28, height: 28, borderRadius: 14, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.ink, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                    WebkitTapHighlightColor: 'transparent',
                  }}>+</button>
                </div>
              </div>
            </Card>
          ))}

          <button onClick={addIngredient} style={{
            border: `1px dashed ${t.border}`, background: 'transparent', borderRadius: t.radius,
            padding: 14, color: t.muted, cursor: 'pointer', fontSize: 13, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <I.Plus size={16} /> Añadir ingrediente
          </button>
        </div>

        <Btn t={t} variant="primary" full style={{ marginTop: 20 }} onClick={() => onSave(ingredients)}>
          <I.Check size={16} stroke={2} /> Guardar cambios
        </Btn>
      </div>
    </div>
  );
}
