// Custom line-style icon set. No emojis. Every icon: 24×24 viewBox, stroke
// inherits currentColor. `solid` prop swaps to filled duotone variant for
// direction B. Spread `style`/`size` props onto svg.

function Icon({ children, size = 24, stroke = 1.6, style = {}, fill = 'none', viewBox = '0 0 24 24' }) {
  return (
    <svg width={size} height={size} viewBox={viewBox} fill={fill} stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}>
      {children}
    </svg>
  );
}

const I = {
  Camera: (p) => <Icon {...p}>
    <path d="M4 8.5C4 7.4 4.9 6.5 6 6.5h2.2l1.2-1.6c.3-.4.8-.7 1.4-.7h2.4c.6 0 1.1.3 1.4.7l1.2 1.6H18c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2v-9Z"/>
    <circle cx="12" cy="13" r="3.5"/>
  </Icon>,
  Gallery: (p) => <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5"/>
    <circle cx="9" cy="10" r="1.6"/>
    <path d="m3 17 4.5-4.5a2 2 0 0 1 2.8 0L15 17m-1-3 1.3-1.3a2 2 0 0 1 2.8 0L21 15"/>
  </Icon>,
  Sparkle: (p) => <Icon {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>
  </Icon>,
  Home: (p) => <Icon {...p}>
    <path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1v-8.5Z"/>
  </Icon>,
  History: (p) => <Icon {...p}>
    <circle cx="12" cy="12" r="8"/>
    <path d="M12 7.5V12l3 2"/>
    <path d="M4 6.5h3v3"/>
    <path d="M4.5 10.5A8 8 0 1 1 4 13.5"/>
  </Icon>,
  Target: (p) => <Icon {...p}>
    <circle cx="12" cy="12" r="8.5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
  </Icon>,
  User: (p) => <Icon {...p}>
    <circle cx="12" cy="8.5" r="3.6"/>
    <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5"/>
  </Icon>,
  Plus: (p) => <Icon {...p}>
    <path d="M12 5v14M5 12h14"/>
  </Icon>,
  Close: (p) => <Icon {...p}>
    <path d="m6 6 12 12M18 6 6 18"/>
  </Icon>,
  Back: (p) => <Icon {...p}>
    <path d="m14 5-7 7 7 7"/>
  </Icon>,
  Forward: (p) => <Icon {...p}>
    <path d="m10 5 7 7-7 7"/>
  </Icon>,
  Check: (p) => <Icon {...p}>
    <path d="m5 12 5 5 9-11"/>
  </Icon>,
  Edit: (p) => <Icon {...p}>
    <path d="M4 20h4l10-10-4-4L4 16v4Z"/>
    <path d="m13.5 6.5 4 4"/>
  </Icon>,
  Trash: (p) => <Icon {...p}>
    <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-12"/>
  </Icon>,
  Save: (p) => <Icon {...p}>
    <path d="M5 4h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/>
    <path d="M8 4v5h7V4M8 14h8"/>
  </Icon>,
  Flame: (p) => <Icon {...p}>
    <path d="M12 21c4 0 6.5-2.7 6.5-6.2 0-3-1.7-4.8-3-6-1.5-1.3-2.8-2.4-2.5-5.8C9 5 6 8.3 6 12.5 6 17.3 8.6 21 12 21Z"/>
    <path d="M12 17.5c1.6 0 2.7-1 2.7-2.5 0-1.2-.8-1.9-1.4-2.5-.7-.6-1.2-1.1-1-2.3-1.5.7-2.6 2-2.6 3.9 0 1.9 1 3.4 2.3 3.4Z"/>
  </Icon>,
  Leaf: (p) => <Icon {...p}>
    <path d="M4 20c0-8 5-15 16-16-1 11-7.5 16-16 16Z"/>
    <path d="M4 20c4-4 8-7 12-10"/>
  </Icon>,
  Drop: (p) => <Icon {...p}>
    <path d="M12 3c0 5.5 5 7.5 5 12a5 5 0 0 1-10 0c0-4.5 5-6.5 5-12Z"/>
  </Icon>,
  Wheat: (p) => <Icon {...p}>
    <path d="M12 21V9"/>
    <path d="M12 9c-2 0-3.5-1-3.5-3.5C10.5 5.5 12 6.5 12 9Z"/>
    <path d="M12 9c2 0 3.5-1 3.5-3.5C13.5 5.5 12 6.5 12 9Z"/>
    <path d="M12 13c-2 0-3.5-1-3.5-3.5C10.5 9.5 12 10.5 12 13Z"/>
    <path d="M12 13c2 0 3.5-1 3.5-3.5C13.5 9.5 12 10.5 12 13Z"/>
    <path d="M12 17c-2 0-3.5-1-3.5-3.5C10.5 13.5 12 14.5 12 17Z"/>
    <path d="M12 17c2 0 3.5-1 3.5-3.5C13.5 13.5 12 14.5 12 17Z"/>
  </Icon>,
  Heart: (p) => <Icon {...p}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/>
  </Icon>,
  Star: (p) => <Icon {...p}>
    <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9 6.8 19.7l1-5.9-4.3-4.1 5.9-.8L12 3.5Z"/>
  </Icon>,
  Settings: (p) => <Icon {...p}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l2-1.5-2-3.4-2.3.9a7.5 7.5 0 0 0-2.6-1.5L14 2h-4l-.5 2.5a7.5 7.5 0 0 0-2.6 1.5L4.6 5l-2 3.4 2 1.5a7.6 7.6 0 0 0 0 3l-2 1.5L4.6 19l2.3-.9a7.5 7.5 0 0 0 2.6 1.5L10 22h4l.5-2.4a7.5 7.5 0 0 0 2.6-1.5l2.3.9 2-3.4-2-1.6Z"/>
  </Icon>,
  Bell: (p) => <Icon {...p}>
    <path d="M5.5 16c1-1 1.5-2.5 1.5-4.5V10a5 5 0 0 1 10 0v1.5c0 2 .5 3.5 1.5 4.5H5.5Z"/>
    <path d="M10 19a2 2 0 0 0 4 0"/>
  </Icon>,
  Chevron: (p) => <Icon {...p}>
    <path d="m9 6 6 6-6 6"/>
  </Icon>,
  Down: (p) => <Icon {...p}>
    <path d="m6 9 6 6 6-6"/>
  </Icon>,
  Up: (p) => <Icon {...p}>
    <path d="m6 15 6-6 6 6"/>
  </Icon>,
  TrendUp: (p) => <Icon {...p}>
    <path d="m3 17 6-6 4 4 8-8"/>
    <path d="M14 7h7v7"/>
  </Icon>,
  Info: (p) => <Icon {...p}>
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 11v6M12 7.5v.5"/>
  </Icon>,
  Scan: (p) => <Icon {...p}>
    <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/>
    <path d="M4 12h16"/>
  </Icon>,
  Refresh: (p) => <Icon {...p}>
    <path d="M4 12a8 8 0 0 1 14-5.3"/>
    <path d="M18 3v4h-4"/>
    <path d="M20 12a8 8 0 0 1-14 5.3"/>
    <path d="M6 21v-4h4"/>
  </Icon>,
  Bowl: (p) => <Icon {...p}>
    <path d="M3 11h18a1 1 0 0 1 1 1c0 4-3.5 7.5-7.5 8h-5C5.5 19.5 2 16 2 12a1 1 0 0 1 1-1Z"/>
    <path d="M7 8c1-1.5 3-2.5 5-2.5s4 1 5 2.5"/>
    <path d="M2 20h20"/>
  </Icon>,
  Clock: (p) => <Icon {...p}>
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 7.5V12l3 2"/>
  </Icon>,
  Cal: (p) => <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2"/>
    <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3"/>
  </Icon>,
  Lock: (p) => <Icon {...p}>
    <rect x="4.5" y="11" width="15" height="9" rx="2"/>
    <path d="M8 11V8a4 4 0 1 1 8 0v3"/>
  </Icon>,
  Logo: (p) => <Icon {...p}>
    <path d="M3 13c0-6.5 4.5-10 9-10s9 3.5 9 10c0 4.5-3 8-9 8s-9-3.5-9-8Z"/>
    <path d="M7 13c0-3 2-5.5 5-5.5"/>
    <path d="M12 21V11"/>
  </Icon>,
};

window.I = I;
