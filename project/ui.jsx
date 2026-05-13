// Shared UI primitives — buttons, cards, rings, macro bars, tab bar, sheets.
// All consume the active theme `t` via props. Direction-aware via `dir` prop
// (A | B) when geometry/weights differ.

const Btn = ({ t, children, variant = 'primary', onClick, icon, full, style, disabled }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    border: 0, cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.5 : 1,
    padding: '14px 20px', borderRadius: 999, fontSize: 15, fontWeight: 600,
    fontFamily: t.font, letterSpacing: '-0.01em',
    width: full ? '100%' : 'auto', transition: 'transform .15s, background .2s',
    WebkitTapHighlightColor: 'transparent',
  };
  const variants = {
    primary: { background: t.primary, color: t.primaryInk },
    accent: { background: t.accent, color: t.primaryInk === '#FFFFFF' ? '#1F2A1E' : '#0F1A0E' },
    ghost: { background: t.surfaceAlt, color: t.ink },
    outline: { background: 'transparent', color: t.ink, boxShadow: `inset 0 0 0 1px ${t.border}` },
    dark: { background: t.ink, color: t.bg },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...base, ...variants[variant], ...style }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
      {icon}
      {children}
    </button>
  );
};

const Card = ({ t, children, style, pad = 18, onClick, raised = false }) => (
  <div onClick={onClick} style={{
    background: t.surface, borderRadius: t.radius, padding: pad,
    boxShadow: raised ? t.shadow : 'none',
    border: raised ? 'none' : `1px solid ${t.border}`,
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }}>{children}</div>
);

const Pill = ({ t, children, color, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '4px 10px', borderRadius: 999,
    background: color ? color + '20' : t.surfaceAlt,
    color: color || t.muted,
    fontSize: 11, fontWeight: 600, letterSpacing: '0.01em',
    ...style,
  }}>{children}</span>
);

// Circular progress ring. Renders 1 or N concentric rings.
const Ring = ({ t, size = 180, stroke = 14, value = 0, max = 100, color, track, label, sub, children }) => {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={track || t.surfaceAlt} strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color || t.primary} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        {children || (
          <>
            <div style={{ fontSize: size * 0.22, fontWeight: 600, color: t.ink, letterSpacing: '-0.04em', fontFamily: t.display }}>{label}</div>
            <div style={{ fontSize: 11, color: t.muted, marginTop: 2, fontWeight: 500 }}>{sub}</div>
          </>
        )}
      </div>
    </div>
  );
};

// Triple concentric macro rings (for direction B / Apple Health vibe).
const TripleRing = ({ t, size = 180, p, c, f }) => {
  const data = [
    { key: 'p', val: p, color: t.proteins, r: (size - 10) / 2 },
    { key: 'c', val: c, color: t.carbs, r: (size - 10) / 2 - 16 },
    { key: 'f', val: f, color: t.fats, r: (size - 10) / 2 - 32 },
  ];
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {data.map(d => {
        const C = 2 * Math.PI * d.r;
        const pct = Math.min(1, d.val);
        return (
          <g key={d.key}>
            <circle cx={size/2} cy={size/2} r={d.r} fill="none" stroke={d.color + '25'} strokeWidth={12} />
            <circle cx={size/2} cy={size/2} r={d.r} fill="none"
              stroke={d.color} strokeWidth={12} strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
              style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)' }}
            />
          </g>
        );
      })}
    </svg>
  );
};

const MacroBar = ({ t, label, value, goal, color, icon }) => {
  const pct = Math.min(100, (value / goal) * 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: t.ink, fontSize: 13, fontWeight: 500 }}>
          <span style={{ color }}>{icon}</span>
          {label}
        </div>
        <div style={{ fontSize: 12, color: t.muted, fontVariantNumeric: 'tabular-nums' }}>
          <span style={{ color: t.ink, fontWeight: 600 }}>{value}</span>
          <span> / {goal}g</span>
        </div>
      </div>
      <div style={{ height: 6, background: t.surfaceAlt, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: pct + '%', background: color,
          borderRadius: 99, transition: 'width 1s cubic-bezier(.22,1,.36,1)',
        }} />
      </div>
    </div>
  );
};

const TabBar = ({ t, active, onChange }) => {
  const tabs = [
    { id: 'home', label: 'Hoy', icon: I.Home },
    { id: 'history', label: 'Historial', icon: I.History },
    { id: 'goals', label: 'Objetivos', icon: I.Target },
    { id: 'profile', label: 'Perfil', icon: I.User },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 30,
      padding: '8px 10px 28px', background: t.bg,
      borderTop: `1px solid ${t.border}`,
      backdropFilter: 'blur(20px)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        {tabs.map(tab => {
          const on = active === tab.id;
          const Ico = tab.icon;
          return (
            <button key={tab.id} onClick={() => onChange(tab.id)} style={{
              background: 'transparent', border: 0, cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '6px 10px', color: on ? t.primary : t.faint,
              transition: 'color .2s', WebkitTapHighlightColor: 'transparent',
            }}>
              <Ico size={22} stroke={on ? 2 : 1.6} />
              <span style={{ fontSize: 10, fontWeight: on ? 600 : 500, letterSpacing: '0.01em' }}>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// FAB centered above the tab bar — used on Home for primary "Analizar".
const Fab = ({ t, onClick }) => (
  <button onClick={onClick} style={{
    position: 'absolute', bottom: 88, left: '50%', transform: 'translateX(-50%)',
    width: 64, height: 64, borderRadius: 32, border: 0, zIndex: 35,
    background: t.primary, color: t.primaryInk, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: `0 16px 32px -8px ${t.primary}66`,
    transition: 'transform .2s',
  }}
    onMouseDown={e => e.currentTarget.style.transform = 'translateX(-50%) scale(0.92)'}
    onMouseUp={e => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateX(-50%) scale(1)'}>
    <I.Camera size={28} stroke={2} />
  </button>
);

// Top bar with optional back / actions.
const TopBar = ({ t, title, eyebrow, back, onBack, action, dir }) => (
  <div style={{ padding: '52px 22px 12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      {back && (
        <button onClick={onBack} style={{
          background: t.surface, border: `1px solid ${t.border}`,
          width: 36, height: 36, borderRadius: 18, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: t.ink, marginBottom: 10,
        }}>
          <I.Back size={18} />
        </button>
      )}
      {eyebrow && <div style={{
        fontSize: 11, color: t.muted, fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4,
      }}>{eyebrow}</div>}
      {title && <h1 style={{
        margin: 0, fontFamily: t.display, fontWeight: t.heroWeight,
        fontSize: dir === 'A' ? 32 : 30, lineHeight: 1.05,
        letterSpacing: dir === 'A' ? '-0.02em' : '-0.03em', color: t.ink,
      }}>{title}</h1>}
    </div>
    {action}
  </div>
);

// Generic placeholder food image — striped gradient + label, no real image.
const FoodPlaceholder = ({ t, label, height = 200, src }) => (
  <div style={{
    height, borderRadius: t.radius, overflow: 'hidden', position: 'relative',
    background: src
      ? `center/cover no-repeat url("${src}")`
      : `linear-gradient(135deg, ${t.primary}28 0%, ${t.accent}20 100%)`,
    border: `1px solid ${t.border}`,
  }}>
    {!src && (
      <>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <defs>
            <pattern id={'stripes-' + label} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
              <rect width="14" height="14" fill="transparent" />
              <line x1="0" y1="0" x2="0" y2="14" stroke={t.primary} strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#stripes-${label})`} />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 11, color: t.muted,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>{label}</div>
      </>
    )}
  </div>
);

window.UI = { Btn, Card, Pill, Ring, TripleRing, MacroBar, TabBar, Fab, TopBar, FoodPlaceholder };
