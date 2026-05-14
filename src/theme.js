export const PALETTE = {
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
  radius: 22,
  radiusSm: 14,
  font: '"Inter", -apple-system, system-ui, sans-serif',
  display: '"Fraunces", "Georgia", serif',
  heroWeight: 500,
};

export const PALETTE_DARK = {
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
  radius: 22,
  radiusSm: 14,
  font: '"Inter", -apple-system, system-ui, sans-serif',
  display: '"Fraunces", "Georgia", serif',
  heroWeight: 500,
};

export function getTheme(dark) {
  return dark ? PALETTE_DARK : PALETTE;
}

export const VOICE = {
  appName: 'verdor',
  remain: 'Quedan',
  suggestion: 'Te faltan {p}g de proteína. Un yogur griego con frutos secos sería ideal.',
  suggestionLabel: 'Sugerencia para esta tarde',
  captureTitle: 'Captura tu plato',
  captureSubtitle: 'Encuadra el plato de frente',
  captureCta: 'Toma una foto',
  analyzing: ['Detectando ingredientes…', 'Estimando porciones…', 'Calculando macros…', 'Casi listo…'],
};
