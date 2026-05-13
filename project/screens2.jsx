// Analyzing screen + Result + Detail (edit ingredients, portion slider)

const { Btn: Btn2, Card: Card2, Pill: Pill2, Ring: Ring2, TripleRing: TripleRing2, MacroBar: MacroBar2, FoodPlaceholder: FP2, TopBar: TopBar2 } = window.UI;

// ── Analyzing ─────────────────────────────────────────────────────
const Analyzing = ({ t, dir, app }) => {
  const [phase, setPhase] = React.useState(0);
  const messages = app.voice.analyzing;
  const speed = 900 / (t.motionScale || 1);

  React.useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % messages.length), speed);
    return () => clearInterval(id);
  }, [speed]);

  return (
    <div style={{ height: '100%', position: 'relative', background: '#000', overflow: 'hidden' }}>
      <img src={app.pendingImage} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }} alt="" />

      {/* Scan line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
        boxShadow: `0 0 24px 4px ${t.accent}80`,
        animation: `scan ${t.scanSpeed || 2}s ease-in-out infinite`,
      }} />
      <style>{`
        @keyframes scan { 0%,100% { top: 12%; } 50% { top: 78%; } }
        @keyframes pulse { 0%,100% { opacity: 0.4; transform: scale(0.95);} 50% { opacity: 1; transform: scale(1.05);} }
        @keyframes ripple { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.4); opacity: 0; } }
      `}</style>

      {/* Corner brackets */}
      {[[0,0,'lt'],[1,0,'rt'],[0,1,'lb'],[1,1,'rb']].map(([x,y,k]) => (
        <div key={k} style={{
          position: 'absolute', width: 32, height: 32,
          [x ? 'right' : 'left']: 32, [y ? 'bottom' : 'top']: 120 + (y ? 0 : 0),
          borderTop: !y ? `2px solid ${t.accent}` : 'none',
          borderBottom: y ? `2px solid ${t.accent}` : 'none',
          borderLeft: !x ? `2px solid ${t.accent}` : 'none',
          borderRight: x ? `2px solid ${t.accent}` : 'none',
        }} />
      ))}

      {/* Pulse rings */}
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

      {/* Bottom panel */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 50%, transparent)',
        padding: '40px 22px 60px', color: '#fff',
      }}>
        <div style={{ fontSize: 11, color: t.accent, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Analizando</div>
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
};

// ── Result ────────────────────────────────────────────────────────
const Result = ({ t, dir, app }) => {
  const m = app.currentMeal;
  if (!m) return null;
  const tot = m.totals;
  const scoreColor = m.healthScore >= 75 ? t.good : m.healthScore >= 50 ? t.warn : t.bad;
  const scoreLabel = m.healthScore >= 75 ? 'Excelente' : m.healthScore >= 50 ? 'Equilibrado' : 'Mejorable';

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Photo banner */}
      <div style={{ position: 'relative', height: 260 }}>
        <img src={m.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 30%, transparent 60%, ${t.bg} 100%)` }} />
        <button onClick={() => app.go('home')} style={{
          position: 'absolute', top: 60, left: 18, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(0,0,0,0.4)', border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><I.Back size={18} /></button>
        <button onClick={() => app.startAnalysis(m.image)} style={{
          position: 'absolute', top: 60, right: 18, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(0,0,0,0.4)', border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><I.Refresh size={18} /></button>
        <div style={{ position: 'absolute', bottom: 36, left: 22, right: 22 }}>
          <Pill2 t={t} style={{ background: 'rgba(255,255,255,0.18)', color: '#fff', backdropFilter: 'blur(20px)' }}>
            <I.Sparkle size={10} /> Detectado con IA
          </Pill2>
          <h1 style={{
            margin: '8px 0 0', color: '#fff', fontFamily: t.display, fontSize: 28,
            fontWeight: t.heroWeight, letterSpacing: '-0.03em', textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}>{m.name}</h1>
        </div>
      </div>

      <div style={{ padding: '0 22px', marginTop: -16, position: 'relative', zIndex: 2 }}>
        {/* Kcal + score */}
        <Card2 t={t} raised pad={20}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 2 }}>
                <span style={{ fontFamily: t.display, fontSize: 42, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {tot.kcal}
                </span>
                <span style={{ color: t.muted, fontSize: 14, fontWeight: 500 }}>kcal</span>
              </div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>{m.portion} · {m.servingGrams}g</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Ring2 t={t} size={76} stroke={7} value={m.healthScore} max={100} color={scoreColor} track={t.surfaceAlt}>
                <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight, color: scoreColor, letterSpacing: '-0.03em' }}>{m.healthScore}</div>
                <div style={{ fontSize: 9, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>salud</div>
              </Ring2>
              <div style={{ fontSize: 10, color: scoreColor, fontWeight: 700, marginTop: 4 }}>{scoreLabel}</div>
            </div>
          </div>

          {/* Macro bars */}
          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            {[
              { k: 'P', label: 'Proteína', v: tot.protein, g: app.goals.protein, c: t.proteins, ic: <I.Leaf size={11}/> },
              { k: 'C', label: 'Carbos', v: tot.carbs, g: app.goals.carbs, c: t.carbs, ic: <I.Wheat size={11}/> },
              { k: 'G', label: 'Grasas', v: tot.fat, g: app.goals.fat, c: t.fats, ic: <I.Drop size={11}/> },
            ].map(macro => (
              <div key={macro.k} style={{
                flex: 1, padding: 12, borderRadius: t.radiusSm, background: t.surfaceAlt,
                textAlign: 'center',
              }}>
                <div style={{ color: macro.c, marginBottom: 4, display: 'flex', justifyContent: 'center' }}>{macro.ic}</div>
                <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>{macro.v}g</div>
                <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>{macro.label}</div>
              </div>
            ))}
          </div>
        </Card2>

        {/* Portion slider */}
        <Card2 t={t} pad={16} style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>Tamaño de porción</div>
              <div style={{ fontSize: 11, color: t.muted }}>Ajusta y recalcularemos</div>
            </div>
            <div style={{
              fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight,
              color: t.primary, letterSpacing: '-0.02em',
            }}>{Math.round(m.portionFactor * 100)}%</div>
          </div>
          <input type="range" min="50" max="200" value={Math.round(m.portionFactor * 100)}
            onChange={e => app.setPortion(+e.target.value / 100)}
            style={{
              width: '100%', accentColor: t.primary, height: 32,
            }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: t.faint, marginTop: -4 }}>
            <span>½</span><span>1</span><span>1½</span><span>2</span>
          </div>
        </Card2>

        {/* Ingredients quick view */}
        <Card2 t={t} pad={16} style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontFamily: t.display, fontSize: 16, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
              Ingredientes detectados
            </h3>
            <button onClick={() => app.go('detail')} style={{
              background: 'transparent', border: 0, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 2,
            }}>
              Editar <I.Chevron size={12} stroke={2} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {m.ingredients.slice(0, 4).map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: [t.proteins, t.carbs, t.fats, t.accent][i % 4],
                }} />
                <div style={{ flex: 1, fontSize: 13, color: t.ink, fontWeight: 500 }}>{ing.name}</div>
                <div style={{ fontSize: 12, color: t.muted, fontVariantNumeric: 'tabular-nums' }}>{Math.round(ing.grams * m.portionFactor)}g</div>
                <div style={{ fontSize: 12, color: t.ink, fontWeight: 600, minWidth: 50, textAlign: 'right' }}>{Math.round(ing.kcal * m.portionFactor)} kcal</div>
              </div>
            ))}
            {m.ingredients.length > 4 && (
              <div style={{ fontSize: 11, color: t.muted, fontStyle: 'italic' }}>+ {m.ingredients.length - 4} más</div>
            )}
          </div>
        </Card2>

        {/* Notes */}
        {m.note && (
          <Card2 t={t} pad={14} style={{ marginTop: 12, background: t.accent + '15', border: 'none' }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <I.Info size={16} style={{ color: t.accent, flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: t.ink, lineHeight: 1.5 }}>{m.note}</div>
            </div>
          </Card2>
        )}

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Btn2 t={t} variant="ghost" onClick={() => app.go('detail')}>
            <I.Edit size={16} /> Detalle
          </Btn2>
          <Btn2 t={t} variant="primary" full onClick={() => app.saveMeal()}>
            <I.Save size={16} /> Guardar en diario
          </Btn2>
        </div>
      </div>
    </div>
  );
};

// ── Detail (ingredientes editables) ───────────────────────────────
const Detail = ({ t, dir, app }) => {
  const m = app.currentMeal;
  if (!m) return null;
  return (
    <div style={{ paddingBottom: 100 }}>
      <TopBar2 t={t} dir={dir} back onBack={() => app.go('result')} eyebrow={m.name} title="Ingredientes" />

      <div style={{ padding: '0 22px' }}>
        <Card2 t={t} pad={16}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Total recalculado</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontFamily: t.display, fontSize: 32, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em' }}>
                {Math.round(m.totals.kcal * m.portionFactor)}
              </span>
              <span style={{ color: t.muted, fontSize: 13, marginLeft: 4 }}>kcal</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                ['P', Math.round(m.totals.protein * m.portionFactor), t.proteins],
                ['C', Math.round(m.totals.carbs * m.portionFactor), t.carbs],
                ['G', Math.round(m.totals.fat * m.portionFactor), t.fats],
              ].map(([k, v, c]) => (
                <div key={k} style={{ textAlign: 'center', minWidth: 38 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c, fontFamily: t.display }}>{v}g</div>
                  <div style={{ fontSize: 9, color: t.muted, fontWeight: 600, letterSpacing: '0.06em' }}>{k}</div>
                </div>
              ))}
            </div>
          </div>
        </Card2>

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {m.ingredients.map((ing, i) => (
            <Card2 key={i} t={t} pad={14}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 19,
                  background: [t.proteins, t.carbs, t.fats, t.accent][i % 4] + '20',
                  color: [t.proteins, t.carbs, t.fats, t.accent][i % 4],
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {[<I.Leaf size={18}/>, <I.Wheat size={18}/>, <I.Drop size={18}/>, <I.Bowl size={18}/>][i % 4]}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: t.ink }}>{ing.name}</div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>
                    {Math.round(ing.kcal * m.portionFactor)} kcal · {ing.confidence}% confianza
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button onClick={() => app.adjustIngredient(i, -10)} style={{
                    width: 28, height: 28, borderRadius: 14, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.ink, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>−</button>
                  <div style={{ minWidth: 44, textAlign: 'center', fontSize: 13, fontWeight: 600, color: t.ink, fontVariantNumeric: 'tabular-nums' }}>
                    {Math.round(ing.grams * m.portionFactor)}g
                  </div>
                  <button onClick={() => app.adjustIngredient(i, 10)} style={{
                    width: 28, height: 28, borderRadius: 14, border: `1px solid ${t.border}`,
                    background: t.surface, color: t.ink, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                  }}>+</button>
                </div>
              </div>
            </Card2>
          ))}

          <button onClick={() => app.addIngredient()} style={{
            border: `1px dashed ${t.border}`, background: 'transparent', borderRadius: t.radius,
            padding: 14, color: t.muted, cursor: 'pointer', fontSize: 13, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <I.Plus size={16} /> Añadir ingrediente
          </button>
        </div>

        <Btn2 t={t} variant="primary" full style={{ marginTop: 20 }} onClick={() => app.go('result')}>
          <I.Check size={16} stroke={2} /> Guardar cambios
        </Btn2>
      </div>
    </div>
  );
};

window.Screens2 = { Analyzing, Result, Detail };
