// All 8 screens. Each receives { t, dir, app } where app has navigation +
// state mutators. Screens are pure UI; state lives in the App component.

const { Btn, Card, Pill, Ring, TripleRing, MacroBar, TabBar, Fab, TopBar, FoodPlaceholder } = window.UI;

// ── Onboarding ────────────────────────────────────────────────────
const Onboarding = ({ t, dir, app }) => {
  const [step, setStep] = React.useState(0);
  const v = app.voice;
  const slides = [
    { eyebrow: v.onb1Eyebrow, title: v.onb1Title, body: v.onb1Body, icon: <I.Bowl size={56} stroke={1.2} /> },
    { eyebrow: 'CÓMO FUNCIONA', title: v.onb2Title, body: v.onb2Body, icon: <I.Sparkle size={56} stroke={1.2} /> },
    { eyebrow: 'TU PROGRESO', title: v.onb3Title, body: v.onb3Body, icon: <I.Target size={56} stroke={1.2} /> },
  ];
  const s = slides[step];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <div style={{ padding: '52px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.ink }}>
          <I.Logo size={22} />
          <span style={{ fontFamily: t.display, fontWeight: 600, fontSize: 17, letterSpacing: '-0.02em' }}>{app.voice.appName}</span>
        </div>
        <button onClick={() => app.go('home')} style={{
          background: 'transparent', border: 0, color: t.muted, fontSize: 14, cursor: 'pointer', fontWeight: 500,
        }}>Saltar</button>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px' }}>
        <div style={{
          width: 100, height: 100, borderRadius: dir === 'A' ? 50 : 22,
          background: dir === 'A' ? t.surfaceAlt : t.primary + '20',
          color: t.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32,
        }}>{s.icon}</div>
        <div style={{ fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 12 }}>{s.eyebrow}</div>
        <h1 style={{
          fontFamily: t.display, fontWeight: t.heroWeight, color: t.ink,
          fontSize: dir === 'A' ? 44 : 40, lineHeight: 1.0, letterSpacing: dir === 'A' ? '-0.03em' : '-0.04em',
          margin: 0, whiteSpace: 'pre-line',
        }}>{s.title}</h1>
        <p style={{ color: t.muted, fontSize: 16, lineHeight: 1.45, marginTop: 18, maxWidth: 320 }}>{s.body}</p>
      </div>
      <div style={{ padding: '20px 22px 44px' }}>
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 22 }}>
          {slides.map((_, i) => (
            <div key={i} style={{
              width: i === step ? 24 : 6, height: 6, borderRadius: 3,
              background: i === step ? t.primary : t.surfaceAlt, transition: 'width .3s',
            }} />
          ))}
        </div>
        <Btn t={t} full variant="primary" onClick={() => step < slides.length - 1 ? setStep(step + 1) : app.go('home')}>
          {step < slides.length - 1 ? 'Siguiente' : 'Empezar'}
          <I.Forward size={16} stroke={2} />
        </Btn>
      </div>
    </div>
  );
};

// ── Home / Hoy ────────────────────────────────────────────────────
const Home = ({ t, dir, app }) => {
  const goals = app.goals;
  const today = app.todayTotals();
  const remain = Math.max(0, goals.kcal - today.kcal);
  const pct = today.kcal / goals.kcal;

  return (
    <div style={{ padding: '0 0 130px' }}>
      <TopBar t={t} dir={dir}
        eyebrow={app.voice.homeEyebrow || app.todayLabel()}
        title={app.voice.homeTitle[dir]}
        action={
          <button onClick={() => app.go('profile')} style={{
            width: 38, height: 38, borderRadius: 19, border: `1px solid ${t.border}`,
            background: t.surface, color: t.ink, marginTop: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <I.User size={18} />
          </button>
        }
      />

      {/* Hero ring */}
      <div style={{ padding: '8px 22px 0' }}>
        <Card t={t} raised pad={dir === 'A' ? 22 : 20}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {dir === 'A' ? (
              <Ring t={t} size={130} stroke={11} value={today.kcal} max={goals.kcal} color={t.primary} track={t.surfaceAlt}
                label={today.kcal} sub="kcal hoy" />
            ) : (
              <div style={{ position: 'relative', width: 130, height: 130 }}>
                <TripleRing t={t} size={130}
                  p={today.protein / goals.protein}
                  c={today.carbs / goals.carbs}
                  f={today.fat / goals.fat} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: t.ink, letterSpacing: '-0.04em', fontFamily: t.display }}>{today.kcal}</div>
                  <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>kcal</div>
                </div>
              </div>
            )}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div>
                <div style={{ fontSize: 11, color: t.muted, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>{app.voice.remain}</div>
                <div style={{ fontFamily: t.display, fontSize: 30, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {remain}
                </div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>de {goals.kcal} kcal</div>
              </div>
              {dir === 'B' && (
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Pill t={t} color={t.proteins}>P · {today.protein}g</Pill>
                  <Pill t={t} color={t.carbs}>C · {today.carbs}g</Pill>
                  <Pill t={t} color={t.fats}>G · {today.fat}g</Pill>
                </div>
              )}
            </div>
          </div>

          {dir === 'A' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20, paddingTop: 18, borderTop: `1px solid ${t.border}` }}>
              <MacroBar t={t} label="Proteína" value={today.protein} goal={goals.protein} color={t.proteins} icon={<I.Leaf size={12} />} />
              <MacroBar t={t} label="Carbohidratos" value={today.carbs} goal={goals.carbs} color={t.carbs} icon={<I.Wheat size={12} />} />
              <MacroBar t={t} label="Grasas" value={today.fat} goal={goals.fat} color={t.fats} icon={<I.Drop size={12} />} />
            </div>
          )}
        </Card>
      </div>

      {/* Comidas */}
      <div style={{ padding: '24px 22px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontFamily: t.display, fontSize: 19, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
            {dir === 'A' ? 'Comidas de hoy' : 'Comidas'}
          </h2>
          <span style={{ fontSize: 12, color: t.muted }}>{app.todayMeals.length} registradas</span>
        </div>

        {app.todayMeals.length === 0 ? (
          <Card t={t} pad={22} style={{ textAlign: 'center', borderStyle: 'dashed', borderColor: t.border, borderWidth: 1, background: 'transparent' }}>
            <div style={{ color: t.muted, fontSize: 13, lineHeight: 1.5 }}>
              Aún no has registrado ninguna comida.<br/>Toca la cámara para empezar.
            </div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {app.todayMeals.map((m, i) => (
              <Card key={i} t={t} pad={12} onClick={() => app.openMeal(m)}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FoodPlaceholder t={t} label={m.short} height={56} />
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
                }}>{m.healthScore}</div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Sugerencia */}
      {app.density.showSuggestion && <div style={{ padding: '22px 22px 0' }}>
        <Card t={t} pad={16} style={{
          background: dir === 'A' ? t.accent + '15' : t.primary,
          color: dir === 'A' ? t.ink : t.primaryInk,
          border: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: dir === 'A' ? t.accent + '30' : 'rgba(255,255,255,0.12)',
              color: dir === 'A' ? t.accent : t.primaryInk,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <I.Sparkle size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{app.voice.suggestionLabel}</div>
              <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.4 }}>
                {app.voice.suggestion.replace('{p}', Math.max(0, goals.protein - today.protein))}
              </div>
            </div>
          </div>
        </Card>
      </div>}
    </div>
  );
};

// ── Capture · launcher (cámara / galería) ─────────────────────────
const Capture = ({ t, dir, app }) => {
  const fileRef = React.useRef();
  const cameraRef = React.useRef();
  const [preview, setPreview] = React.useState(null);

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  if (preview) {
    return (
      <div style={{ height: '100%', background: '#000', position: 'relative' }}>
        <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)' }} />
        <button onClick={() => setPreview(null)} style={{
          position: 'absolute', top: 60, left: 18, width: 38, height: 38, borderRadius: 19,
          background: 'rgba(0,0,0,0.5)', border: 0, color: '#fff', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}><I.Close size={20} /></button>
        <div style={{ position: 'absolute', top: 60, right: 18 }}>
          <Pill t={{ surfaceAlt: 'rgba(255,255,255,0.18)', muted: '#fff' }} style={{ color: '#fff', backdropFilter: 'blur(20px)' }}>
            <I.Scan size={11} /> Listo para analizar
          </Pill>
        </div>
        <div style={{ position: 'absolute', bottom: 50, left: 22, right: 22, display: 'flex', gap: 10 }}>
          <Btn t={t} variant="ghost" onClick={() => setPreview(null)} style={{ background: 'rgba(255,255,255,0.16)', color: '#fff', backdropFilter: 'blur(20px)' }}>
            Reintentar
          </Btn>
          <Btn t={t} variant="primary" full onClick={() => app.startAnalysis(preview)}>
            Analizar plato
            <I.Sparkle size={16} stroke={2} />
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: t.bg }}>
      <TopBar t={t} dir={dir} back onBack={() => app.go('home')} eyebrow="Nueva comida" title={app.voice.captureTitle} />
      <div style={{ flex: 1, padding: '8px 22px 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={onFile} style={{ display: 'none' }} />
        <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />

        <Card t={t} pad={0} onClick={() => cameraRef.current?.click()} style={{ overflow: 'hidden' }}>
          <div style={{
            aspectRatio: '4 / 3',
            background: dir === 'A'
              ? `radial-gradient(circle at 30% 30%, ${t.primary}25, ${t.surfaceAlt} 70%)`
              : `linear-gradient(135deg, ${t.primary} 0%, ${t.accent}40 100%)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
            color: dir === 'A' ? t.primary : t.primaryInk, position: 'relative',
          }}>
            <div style={{
              width: 76, height: 76, borderRadius: 38,
              background: dir === 'A' ? t.surface : 'rgba(0,0,0,0.18)',
              color: dir === 'A' ? t.primary : t.primaryInk,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: dir === 'A' ? t.shadow : 'none',
            }}>
              <I.Camera size={36} stroke={1.6} />
            </div>
            <div style={{ textAlign: 'center', color: dir === 'A' ? t.ink : t.primaryInk }}>
              <div style={{ fontFamily: t.display, fontSize: 20, fontWeight: t.heroWeight, letterSpacing: '-0.02em' }}>{app.voice.captureCta}</div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{app.voice.captureSubtitle}</div>
            </div>
          </div>
        </Card>

        <Card t={t} pad={14} onClick={() => fileRef.current?.click()} style={{
          display: 'flex', alignItems: 'center', gap: 14,
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

        {app.density.showTips && <Card t={t} pad={14} style={{ background: 'transparent', border: `1px dashed ${t.border}` }}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Consejos</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['Luz natural', 'Mejora la precisión hasta un 30%'],
              ['Vista cenital', 'Cámara perpendicular al plato'],
              ['Sin obstáculos', 'Sin manos, cubiertos sobre la comida'],
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
        </Card>}
      </div>
    </div>
  );
};

window.Screens1 = { Onboarding, Home, Capture };
