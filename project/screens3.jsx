// History, Goals, Profile screens

const { Btn: B3, Card: C3, Pill: P3, Ring: R3, TripleRing: TR3, MacroBar: M3, FoodPlaceholder: FP3, TopBar: TB3 } = window.UI;

// ── History ───────────────────────────────────────────────────────
const History = ({ t, dir, app }) => {
  const [dayOffset, setDayOffset] = React.useState(0);
  const days = ['L','M','X','J','V','S','D'];
  const today = new Date().getDay();
  // pseudo-data for week
  const week = [1850, 2240, 1980, 0, 2120, 1640, app.todayTotals().kcal];

  const swipe = React.useRef({ x: 0 });

  return (
    <div style={{ paddingBottom: 120 }}>
      <TB3 t={t} dir={dir} eyebrow="Historial" title={dir === 'A' ? 'Tu semana' : 'Semana'} />

      <div style={{ padding: '0 22px' }}>
        {/* Week strip */}
        <C3 t={t} raised pad={16}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: t.muted, fontWeight: 500 }}>Esta semana</span>
            <div style={{ display: 'flex', gap: 4 }}>
              <button onClick={() => setDayOffset(o => Math.max(o - 1, -3))} style={{ background: t.surfaceAlt, border: 0, width: 28, height: 28, borderRadius: 14, color: t.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.Back size={14}/></button>
              <button onClick={() => setDayOffset(o => Math.min(o + 1, 0))} style={{ background: t.surfaceAlt, border: 0, width: 28, height: 28, borderRadius: 14, color: t.ink, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><I.Forward size={14}/></button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}
            onTouchStart={e => swipe.current.x = e.touches[0].clientX}
            onTouchEnd={e => {
              const dx = e.changedTouches[0].clientX - swipe.current.x;
              if (Math.abs(dx) > 40) setDayOffset(o => Math.max(-3, Math.min(0, o + (dx > 0 ? -1 : 1))));
            }}>
            {days.map((d, i) => {
              const kcal = week[i];
              const pct = Math.min(1, kcal / app.goals.kcal);
              const isToday = i === today - 1 || (today === 0 && i === 6);
              return (
                <div key={d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>{d}</div>
                  <div style={{ position: 'relative', width: '100%', height: 72, background: t.surfaceAlt, borderRadius: 6, overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      height: pct * 100 + '%',
                      background: kcal === 0 ? 'transparent' : (isToday ? t.accent : t.primary),
                      borderRadius: 6,
                      transition: 'height 1s cubic-bezier(.22,1,.36,1)',
                    }} />
                  </div>
                  <div style={{ fontSize: 9, color: kcal === 0 ? t.faint : t.ink, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                    {kcal === 0 ? '—' : kcal}
                  </div>
                </div>
              );
            })}
          </div>
        </C3>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          {[
            { k: 'Media', v: '1,978', u: 'kcal/día', icon: <I.Flame size={14}/>, c: t.primary },
            { k: 'Racha', v: '12', u: 'días', icon: <I.TrendUp size={14}/>, c: t.accent },
            { k: 'Salud', v: '78', u: '/100', icon: <I.Heart size={14}/>, c: t.good },
          ].map(s => (
            <C3 key={s.k} t={t} pad={12} style={{ flex: 1 }}>
              <div style={{ color: s.c, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: t.display, fontSize: 22, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 9, color: t.muted, marginTop: 2 }}>{s.u}</div>
              <div style={{ fontSize: 10, color: t.muted, fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.k}</div>
            </C3>
          ))}
        </div>

        {/* Recent meals list */}
        <div style={{ marginTop: 22 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: t.display, fontSize: 17, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
            Comidas recientes
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { name: 'Ensalada de quinoa con feta', time: 'Ayer · 14:20', kcal: 480, score: 86, short: 'QUINOA' },
              { name: 'Tostada de aguacate y huevo', time: 'Ayer · 09:15', kcal: 360, score: 74, short: 'TOSTADA' },
              { name: 'Pollo al horno con vegetales', time: 'Lun · 20:45', kcal: 620, score: 82, short: 'POLLO' },
              { name: 'Yogur griego con frutos rojos', time: 'Lun · 16:30', kcal: 220, score: 91, short: 'YOGUR' },
            ].map((meal, i) => (
              <C3 key={i} t={t} pad={10} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <FP3 t={t} label={meal.short} height={48} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{meal.name}</div>
                  <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>{meal.time} · {meal.kcal} kcal</div>
                </div>
                <div style={{
                  width: 34, height: 34, borderRadius: 17,
                  background: t.primary + '15', color: t.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: t.display, fontSize: 12, fontWeight: 700,
                }}>{meal.score}</div>
              </C3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Goals ─────────────────────────────────────────────────────────
const Goals = ({ t, dir, app }) => {
  const g = app.goals;
  const today = app.todayTotals();

  return (
    <div style={{ paddingBottom: 120 }}>
      <TB3 t={t} dir={dir} eyebrow="Objetivos" title={dir === 'A' ? 'Tu balance' : 'Metas'} />

      <div style={{ padding: '0 22px' }}>
        {/* Big triple ring */}
        <C3 t={t} raised pad={20} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            <TR3 t={t} size={200}
              p={today.protein / g.protein}
              c={today.carbs / g.carbs}
              f={today.fat / g.fat} />
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: t.display, fontSize: 40, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.04em', lineHeight: 1 }}>
                {Math.round((today.kcal / g.kcal) * 100)}%
              </div>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>de tu día</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
            {[
              { k: 'Proteína', v: today.protein, g: g.protein, c: t.proteins },
              { k: 'Carbos', v: today.carbs, g: g.carbs, c: t.carbs },
              { k: 'Grasas', v: today.fat, g: g.fat, c: t.fats },
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
        </C3>

        {/* Daily target setting */}
        <div style={{ marginTop: 22 }}>
          <h3 style={{ margin: '0 0 12px', fontFamily: t.display, fontSize: 17, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
            Tus metas diarias
          </h3>
          <C3 t={t} pad={4}>
            {[
              { k: 'Calorías', v: g.kcal, u: 'kcal', icon: <I.Flame size={18}/>, c: t.primary },
              { k: 'Proteína', v: g.protein, u: 'g', icon: <I.Leaf size={18}/>, c: t.proteins },
              { k: 'Carbohidratos', v: g.carbs, u: 'g', icon: <I.Wheat size={18}/>, c: t.carbs },
              { k: 'Grasas', v: g.fat, u: 'g', icon: <I.Drop size={18}/>, c: t.fats },
            ].map((row, i, arr) => (
              <div key={row.k} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : 'none',
              }}>
                <div style={{ color: row.c, width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{row.icon}</div>
                <div style={{ flex: 1, fontSize: 14, color: t.ink, fontWeight: 500 }}>{row.k}</div>
                <div style={{ fontFamily: t.display, fontSize: 18, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>
                  {row.v}<span style={{ color: t.faint, fontSize: 11, marginLeft: 2 }}>{row.u}</span>
                </div>
                <I.Chevron size={16} style={{ color: t.faint }} />
              </div>
            ))}
          </C3>
        </div>

        {/* Plan */}
        <C3 t={t} pad={16} style={{ marginTop: 14, background: dir === 'A' ? t.primary + '12' : t.surfaceAlt, border: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 21,
              background: t.primary, color: t.primaryInk,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <I.Target size={20}/>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>Plan: Mantener</div>
              <div style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>72 kg · 1.74 m · Activo</div>
            </div>
            <button style={{ background: 'transparent', border: 0, color: t.primary, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Cambiar</button>
          </div>
        </C3>
      </div>
    </div>
  );
};

// ── Profile ───────────────────────────────────────────────────────
const Profile = ({ t, dir, app }) => {
  const Row = ({ icon, title, sub, right, onClick }) => (
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
      {right || <I.Chevron size={16} style={{ color: t.faint }} />}
    </div>
  );

  const Toggle = ({ on, onChange }) => (
    <button onClick={onChange} style={{
      width: 44, height: 26, borderRadius: 13, border: 0, cursor: 'pointer',
      background: on ? t.primary : t.surfaceAlt, position: 'relative',
      transition: 'background .2s',
    }}>
      <div style={{
        position: 'absolute', top: 2, left: on ? 20 : 2, width: 22, height: 22, borderRadius: 11,
        background: '#fff', transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  );

  return (
    <div style={{ paddingBottom: 120 }}>
      <TB3 t={t} dir={dir} eyebrow="Perfil" title="Tú" />

      <div style={{ padding: '0 22px' }}>
        {/* User card */}
        <C3 t={t} raised pad={18} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: `linear-gradient(135deg, ${t.primary}, ${t.accent})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: t.display, fontSize: 22, fontWeight: 700,
          }}>AM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: t.display, fontSize: 19, fontWeight: t.heroWeight, color: t.ink, letterSpacing: '-0.02em' }}>Ana Martín</div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>ana@verdor.app · Plan gratuito</div>
            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
              <P3 t={t} color={t.primary}><I.Flame size={10}/> 12 días</P3>
              <P3 t={t} color={t.accent}><I.Star size={10}/> 87 comidas</P3>
            </div>
          </div>
        </C3>

        {/* Settings */}
        <h3 style={{ margin: '22px 0 10px', fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Preferencias</h3>
        <C3 t={t} pad={0}>
          <Row icon={<I.Target size={16}/>} title="Objetivos nutricionales" sub="Personaliza tus metas" onClick={() => app.go('goals')} />
          <Row icon={<I.Bell size={16}/>} title="Recordatorios" sub="3 al día" />
          <Row icon={dir === 'A' ? <I.Leaf size={16}/> : <I.Sparkle size={16}/>}
               title="Modo oscuro"
               right={<Toggle on={app.dark} onChange={app.toggleDark} />} />
          <Row icon={<I.Lock size={16}/>} title="Privacidad" sub="Tus fotos no se comparten" />
        </C3>

        <h3 style={{ margin: '22px 0 10px', fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Cuenta</h3>
        <C3 t={t} pad={0}>
          <Row icon={<I.Heart size={16}/>} title="Verdor Premium" sub="Análisis ilimitado · 4€/mes" />
          <Row icon={<I.Save size={16}/>} title="Exportar datos" />
          <Row icon={<I.Info size={16}/>} title="Ayuda y soporte" />
        </C3>

        <div style={{ textAlign: 'center', marginTop: 22, color: t.faint, fontSize: 10 }}>
          verdor · v1.0 · {dir === 'A' ? 'Dirección A' : 'Dirección B'}
        </div>
      </div>
    </div>
  );
};

window.Screens3 = { History, Goals, Profile };
