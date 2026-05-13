// Theme tokens — palette × direction × mode.
// Direction (A/B) controls structure (radius, fonts, weights).
// Palette controls color identity. They merge at render time.

// ── Palettes ────────────────────────────────────────────────────────
const PALETTES = {
  // 1 · Cítrico — mango, lima eléctrica, papaya. Tropical alegre.
  citrico: {
    name: 'Cítrico',
    swatch: ['#F26B1F', '#C4F542', '#FFB02E'],
    light: {
      bg: '#FFF8EE',
      surface: '#FFFFFF',
      surfaceAlt: '#FBEED8',
      ink: '#2A1A0E',
      muted: '#7A6A52',
      faint: '#B8A992',
      border: 'rgba(42,26,14,0.10)',
      primary: '#F26B1F',
      primaryInk: '#FFFFFF',
      accent: '#C4F542',
      good: '#4DA64C',
      warn: '#FFB02E',
      bad: '#E03E3E',
      proteins: '#F26B1F',
      carbs: '#FFB02E',
      fats: '#D24A6E',
      shadow: '0 12px 30px -16px rgba(242,107,31,0.35)',
    },
    dark: {
      bg: '#1A0F08',
      surface: '#241710',
      surfaceAlt: '#2E1F16',
      ink: '#FFF1DA',
      muted: '#B89C7F',
      faint: '#6E5A48',
      border: 'rgba(255,241,218,0.08)',
      primary: '#FF8A3D',
      primaryInk: '#1A0F08',
      accent: '#D4FF5C',
      good: '#7AE070',
      warn: '#FFC560',
      bad: '#FF6B6B',
      proteins: '#FF8A3D',
      carbs: '#FFC560',
      fats: '#FF7DA0',
      shadow: '0 12px 30px -16px rgba(0,0,0,0.6)',
    },
  },

  // 2 · Bayas — magenta, violeta vibrante, rosa eléctrico. Atrevida.
  bayas: {
    name: 'Bayas',
    swatch: ['#D8326D', '#7A3FE0', '#FF4F8B'],
    light: {
      bg: '#FCF4F7',
      surface: '#FFFFFF',
      surfaceAlt: '#F5E4EC',
      ink: '#2D0A1F',
      muted: '#7A5267',
      faint: '#B89AAA',
      border: 'rgba(45,10,31,0.10)',
      primary: '#D8326D',
      primaryInk: '#FFFFFF',
      accent: '#7A3FE0',
      good: '#3FBF7E',
      warn: '#FF8C42',
      bad: '#D8326D',
      proteins: '#D8326D',
      carbs: '#FF4F8B',
      fats: '#7A3FE0',
      shadow: '0 12px 30px -16px rgba(216,50,109,0.30)',
    },
    dark: {
      bg: '#160810',
      surface: '#1F1019',
      surfaceAlt: '#2A1722',
      ink: '#FFE6F0',
      muted: '#B895A5',
      faint: '#6E5060',
      border: 'rgba(255,230,240,0.08)',
      primary: '#FF5A8D',
      primaryInk: '#160810',
      accent: '#A875FF',
      good: '#5FE0A0',
      warn: '#FFA570',
      bad: '#FF6B96',
      proteins: '#FF5A8D',
      carbs: '#FF85B0',
      fats: '#A875FF',
      shadow: '0 12px 30px -16px rgba(0,0,0,0.6)',
    },
  },

  // 3 · Océano — turquesa eléctrico, coral, índigo. Fresca, marina.
  oceano: {
    name: 'Océano',
    swatch: ['#0DBFB0', '#FF6B5A', '#3D5AFE'],
    light: {
      bg: '#F0FAFB',
      surface: '#FFFFFF',
      surfaceAlt: '#DCF1F3',
      ink: '#0A2226',
      muted: '#52727A',
      faint: '#9DB6BB',
      border: 'rgba(10,34,38,0.10)',
      primary: '#0DBFB0',
      primaryInk: '#FFFFFF',
      accent: '#FF6B5A',
      good: '#0DBFB0',
      warn: '#FFB400',
      bad: '#FF6B5A',
      proteins: '#0DBFB0',
      carbs: '#FFB400',
      fats: '#FF6B5A',
      shadow: '0 12px 30px -16px rgba(13,191,176,0.30)',
    },
    dark: {
      bg: '#06181A',
      surface: '#0E2326',
      surfaceAlt: '#163034',
      ink: '#E0F5F4',
      muted: '#7AA0A4',
      faint: '#456063',
      border: 'rgba(224,245,244,0.08)',
      primary: '#2FE0CC',
      primaryInk: '#06181A',
      accent: '#FF8A7A',
      good: '#2FE0CC',
      warn: '#FFC850',
      bad: '#FF8A7A',
      proteins: '#2FE0CC',
      carbs: '#FFC850',
      fats: '#FF8A7A',
      shadow: '0 12px 30px -16px rgba(0,0,0,0.6)',
    },
  },

  // 4 · Solar — naranja brillante, amarillo dorado, fucsia. Cálida intensa.
  solar: {
    name: 'Solar',
    swatch: ['#FF5E1A', '#FFD23F', '#E63E62'],
    light: {
      bg: '#FFF5EC',
      surface: '#FFFFFF',
      surfaceAlt: '#FCE6D2',
      ink: '#2A1208',
      muted: '#7A5840',
      faint: '#BFA589',
      border: 'rgba(42,18,8,0.10)',
      primary: '#FF5E1A',
      primaryInk: '#FFFFFF',
      accent: '#FFD23F',
      good: '#3FB85E',
      warn: '#FFD23F',
      bad: '#E63E62',
      proteins: '#FF5E1A',
      carbs: '#FFD23F',
      fats: '#E63E62',
      shadow: '0 12px 30px -16px rgba(255,94,26,0.30)',
    },
    dark: {
      bg: '#1A0A04',
      surface: '#241108',
      surfaceAlt: '#301810',
      ink: '#FFEDD6',
      muted: '#B8957A',
      faint: '#6E5040',
      border: 'rgba(255,237,214,0.08)',
      primary: '#FF7A40',
      primaryInk: '#1A0A04',
      accent: '#FFDE5F',
      good: '#65E07C',
      warn: '#FFDE5F',
      bad: '#FF6B82',
      proteins: '#FF7A40',
      carbs: '#FFDE5F',
      fats: '#FF6B82',
      shadow: '0 12px 30px -16px rgba(0,0,0,0.6)',
    },
  },

  // 5 · Neón — lima neón, cyan eléctrico, magenta. Energía pura.
  neon: {
    name: 'Neón',
    swatch: ['#B5F900', '#00E5FF', '#FF2D87'],
    light: {
      bg: '#F4F8E8',
      surface: '#FFFFFF',
      surfaceAlt: '#E5EFCF',
      ink: '#0F1A02',
      muted: '#5A6948',
      faint: '#9DAA80',
      border: 'rgba(15,26,2,0.10)',
      primary: '#5A8B00',
      primaryInk: '#F4F8E8',
      accent: '#B5F900',
      good: '#5A8B00',
      warn: '#FF8A1F',
      bad: '#FF2D87',
      proteins: '#5A8B00',
      carbs: '#00B4D8',
      fats: '#FF2D87',
      shadow: '0 12px 30px -16px rgba(90,139,0,0.30)',
    },
    dark: {
      bg: '#080A04',
      surface: '#101306',
      surfaceAlt: '#181D0A',
      ink: '#E8F5C8',
      muted: '#94A574',
      faint: '#5A6845',
      border: 'rgba(232,245,200,0.08)',
      primary: '#B5F900',
      primaryInk: '#080A04',
      accent: '#00E5FF',
      good: '#B5F900',
      warn: '#FFB000',
      bad: '#FF2D87',
      proteins: '#B5F900',
      carbs: '#00E5FF',
      fats: '#FF2D87',
      shadow: '0 12px 30px -16px rgba(0,0,0,0.7)',
    },
  },
};

// ── Direction structure (radius, fonts, weights) ────────────────────
const DIRECTIONS = {
  A: {
    radius: 22, radiusSm: 14,
    font: '"Inter", -apple-system, system-ui, sans-serif',
    display: '"Fraunces", "Times New Roman", serif',
    heroWeight: 500,
  },
  B: {
    radius: 18, radiusSm: 12,
    font: '"Inter", -apple-system, system-ui, sans-serif',
    display: '"Inter Tight", "Inter", sans-serif',
    heroWeight: 700,
  },
};

// Merge palette + direction for the active mode.
function buildTheme(paletteKey, dir, dark) {
  const p = PALETTES[paletteKey] || PALETTES.citrico;
  const colors = dark ? p.dark : p.light;
  return { ...colors, ...DIRECTIONS[dir] };
}

window.PALETTES = PALETTES;
window.DIRECTIONS = DIRECTIONS;
window.buildTheme = buildTheme;

// ── Expressive tweak helpers ────────────────────────────────────────

// Vibe: modulates saturation, shadow strength, ring weight, motion intensity.
function applyVibe(theme, vibe) {
  if (vibe === 'sereno') {
    return { ...theme,
      ringStroke: 10,
      shadow: theme.shadow.replace(/0\.\d+/, m => (parseFloat(m) * 0.5).toFixed(2)),
      saturation: 0.85,
      glow: 0,
      scanSpeed: 3.4,
      motionScale: 0.6,
    };
  }
  if (vibe === 'intenso') {
    return { ...theme,
      ringStroke: 18,
      shadow: theme.shadow.replace(/0\.\d+/, m => Math.min(0.95, parseFloat(m) * 1.8).toFixed(2)),
      saturation: 1.15,
      glow: 1,
      scanSpeed: 1.2,
      motionScale: 1.4,
    };
  }
  return { ...theme, ringStroke: 13, saturation: 1, glow: 0.4, scanSpeed: 2, motionScale: 1 };
}

// Voice: copy variants. Keys map to short copy fragments.
const VOICE = {
  clinico: {
    appName: 'kcal',
    onb1Eyebrow: 'ANÁLISIS · IA',
    onb1Title: 'Datos\nprecisos.',
    onb1Body: 'Captura tu plato. Recibe el análisis nutricional en segundos. Sin pesar, sin búsquedas.',
    onb2Title: 'Detección por\ncomputador visión.',
    onb2Body: 'Identificamos ingredientes y porciones. Tú revisas antes de guardar.',
    onb3Title: 'Registro\nclínico.',
    onb3Body: 'Define metas. Observa tendencias. Datos exportables.',
    homeEyebrow: 'REGISTRO DEL DÍA',
    homeTitle: { A: 'Resumen', B: 'Hoy' },
    remain: 'Restante',
    suggestion: 'Déficit de {p}g de proteína. Considera una fuente proteica magra esta tarde.',
    suggestionLabel: 'Recomendación',
    captureTitle: 'Capturar plato',
    captureSubtitle: 'Encuadre cenital recomendado',
    captureCta: 'Toma una foto',
    analyzing: ['Detectando ingredientes…', 'Estimando masa…', 'Calculando macros…', 'Validando…'],
    resultNote: 'Aporte adecuado de proteína magra y omega-3. Considera variar fuentes proteicas en próximas comidas.',
  },
  calido: {
    appName: 'verdor',
    onb1Eyebrow: 'KCAL · IA',
    onb1Title: 'Comer con\nconciencia.',
    onb1Body: 'Fotografía tu plato y obtén el desglose nutricional en segundos. Sin pesar, sin buscar.',
    onb2Title: 'IA que entiende\ningredientes.',
    onb2Body: 'Detectamos cada ingrediente, su porción y su valor nutricional. Tú revisas y ajustas.',
    onb3Title: 'Un diario sin\nculpa.',
    onb3Body: 'Define metas realistas, ve tu progreso diario y descubre patrones sin obsesionarte con números.',
    homeEyebrow: null, // uses dynamic date
    homeTitle: { A: 'Tu día', B: 'Hoy' },
    remain: 'Quedan',
    suggestion: 'Te faltan {p}g de proteína. Un yogur griego con frutos secos sería ideal.',
    suggestionLabel: 'Sugerencia para esta tarde',
    captureTitle: 'Captura tu plato',
    captureSubtitle: 'Encuadra el plato de frente',
    captureCta: 'Toma una foto',
    analyzing: ['Detectando ingredientes…', 'Estimando porciones…', 'Calculando macros…', 'Casi listo…'],
    resultNote: 'Buen aporte de omega-3 y proteína magra. Considera añadir una porción de legumbres mañana para variar.',
  },
  ludico: {
    appName: 'munchy',
    onb1Eyebrow: '¡A COMER!',
    onb1Title: 'Snap.\nYum.\nDone.',
    onb1Body: 'Una foto. Cero culpa. Saca el móvil, dispara y nosotros hacemos las cuentas mientras tú disfrutas.',
    onb2Title: '¿Qué llevas\nen el plato?',
    onb2Body: 'Lo descubrimos por ti — ingredientes, porciones y todo lo que importa. Spoiler: pinta delicioso.',
    onb3Title: 'Tu progreso,\nsin dramas.',
    onb3Body: 'Marca tus metas, celebra rachas y descubre qué te sienta mejor. Sin culpas, prometido.',
    homeEyebrow: null,
    homeTitle: { A: 'Bon appétit', B: 'A tope hoy' },
    remain: 'Te quedan',
    suggestion: '¡{p}g de proteína por delante! Un yogur con granola te subiría el día.',
    suggestionLabel: 'Idea sabrosa',
    captureTitle: '¡Saca esa foto!',
    captureSubtitle: 'Encuadra y dispara, sin postureo',
    captureCta: 'Disparar',
    analyzing: ['Espiando tu plato…', 'Contando ingredientes…', 'Haciendo magia…', '¡Casi!'],
    resultNote: '¡Plato de notable! Proteína buena, grasas sanas. Mañana metemos algo de legumbre y nivelazo.',
  },
};

// Density rules: which secondary content shows.
const DENSITY = {
  minimal: { showSuggestion: false, showTips: false, showStats: false, showQuickIngredients: false },
  estandar: { showSuggestion: true, showTips: true, showStats: false, showQuickIngredients: true },
  densa: { showSuggestion: true, showTips: true, showStats: true, showQuickIngredients: true },
};

window.applyVibe = applyVibe;
window.VOICE = VOICE;
window.DENSITY = DENSITY;
// Legacy compat for any code still referencing THEMES
window.THEMES = {
  A: { light: buildTheme('citrico', 'A', false), dark: buildTheme('citrico', 'A', true) },
  B: { light: buildTheme('citrico', 'B', false), dark: buildTheme('citrico', 'B', true) },
};
