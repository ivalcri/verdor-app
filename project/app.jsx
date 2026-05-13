// Top-level App component: state machine, navigation, AI integration.
// Renders the active screen + tab bar + camera FAB.

const { Btn: AB, TabBar: ATabBar, Fab: AFab } = window.UI;
const { Onboarding, Home, Capture } = window.Screens1;
const { Analyzing, Result, Detail } = window.Screens2;
const { History, Goals, Profile } = window.Screens3;

// Demo seed: 2 meals already logged today.
const seedMeal = (name, short, kcal, p, c, f, time, score) => ({
  name, short, time, image: null,
  servingGrams: 320, portion: '1 plato', portionFactor: 1, healthScore: score,
  totals: { kcal, protein: p, carbs: c, fat: f },
  ingredients: [
    { name: 'Ingrediente principal', grams: 120, kcal: Math.round(kcal * 0.45), confidence: 96 },
    { name: 'Vegetales mixtos', grams: 100, kcal: Math.round(kcal * 0.18), confidence: 89 },
    { name: 'Aceite de oliva', grams: 12, kcal: Math.round(kcal * 0.20), confidence: 92 },
    { name: 'Especias', grams: 4, kcal: Math.round(kcal * 0.04), confidence: 78 },
  ],
  note: null,
});

// Fallback meal if AI call fails or returns unparseable data.
const fallbackMeal = (image) => ({
  name: 'Bowl mediterráneo',
  short: 'BOWL',
  time: 'Ahora',
  image,
  servingGrams: 380,
  portion: '1 bowl',
  portionFactor: 1,
  healthScore: 82,
  totals: { kcal: 540, protein: 28, carbs: 58, fat: 22 },
  ingredients: [
    { name: 'Quinoa cocida', grams: 120, kcal: 144, confidence: 94 },
    { name: 'Salmón a la plancha', grams: 90, kcal: 187, confidence: 92 },
    { name: 'Aguacate', grams: 60, kcal: 96, confidence: 96 },
    { name: 'Tomate cherry', grams: 70, kcal: 18, confidence: 90 },
    { name: 'Pepino', grams: 50, kcal: 8, confidence: 88 },
    { name: 'Aceite de oliva', grams: 10, kcal: 90, confidence: 85 },
  ],
  note: 'Buen aporte de omega-3 y proteína magra. Considera añadir una porción de legumbres mañana para variar.',
});

const callClaude = async (imageDataUrl) => {
  // Extract base64 from data URL
  const match = imageDataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) return null;
  const mediaType = match[1];
  const data = match[2];

  const prompt = `Analiza esta foto de un plato de comida. Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin texto antes o después, sin markdown) con esta estructura exacta:

{
  "name": "nombre corto del plato en español",
  "short": "ETIQUETA_CORTA_MAYUS",
  "portion": "descripción de la porción",
  "servingGrams": número,
  "totals": { "kcal": número, "protein": número, "carbs": número, "fat": número },
  "healthScore": número del 0 al 100,
  "ingredients": [{ "name": "ingrediente", "grams": número, "kcal": número, "confidence": número 50-99 }],
  "note": "consejo nutricional breve en español"
}

Sé realista con las estimaciones. Incluye 3-7 ingredientes principales.`;

  try {
    const result = await window.claude.complete({
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
          { type: 'text', text: prompt },
        ],
      }],
    });
    // Try to extract JSON from response
    const jsonMatch = result.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;
    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.totals || !parsed.ingredients) return null;
    return parsed;
  } catch (e) {
    console.warn('Claude analysis failed, using fallback:', e);
    return null;
  }
};

function App({ dir, dark, onToggleDark, palette = 'citrico', feel = { vibe: 'equilibrado', density: 'estandar', voice: 'calido' } }) {
  const base = window.buildTheme(palette, dir, dark);
  const t = window.applyVibe(base, feel.vibe);
  const voice = window.VOICE[feel.voice] || window.VOICE.calido;
  const density = window.DENSITY[feel.density] || window.DENSITY.estandar;
  const [screen, setScreen] = React.useState('onboarding');
  const [tab, setTab] = React.useState('home');
  const [pendingImage, setPendingImage] = React.useState(null);
  const [currentMeal, setCurrentMeal] = React.useState(null);
  const [todayMeals, setTodayMeals] = React.useState([
    { ...seedMeal('Tostada de aguacate', 'TOSTADA', 320, 10, 32, 18, '09:15', 78), image: null },
    { ...seedMeal('Ensalada de quinoa', 'QUINOA', 480, 22, 55, 16, '14:20', 86), image: null },
  ]);
  const goals = { kcal: 2100, protein: 130, carbs: 220, fat: 75 };

  const app = {
    goals,
    dark,
    voice, density, vibe: feel.vibe,
    copy: (k) => voice[k],
    toggleDark: onToggleDark,
    todayMeals,
    pendingImage,
    currentMeal,
    todayLabel: () => {
      const d = new Date();
      return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    },
    todayTotals: () => todayMeals.reduce((a, m) => ({
      kcal: a.kcal + Math.round(m.totals.kcal * m.portionFactor),
      protein: a.protein + Math.round(m.totals.protein * m.portionFactor),
      carbs: a.carbs + Math.round(m.totals.carbs * m.portionFactor),
      fat: a.fat + Math.round(m.totals.fat * m.portionFactor),
    }), { kcal: 0, protein: 0, carbs: 0, fat: 0 }),
    go: (s) => {
      if (['home', 'history', 'goals', 'profile'].includes(s)) setTab(s);
      setScreen(s);
    },
    openMeal: (m) => { setCurrentMeal(m); setScreen('result'); },
    startAnalysis: async (image) => {
      setPendingImage(image);
      setScreen('analyzing');
      const start = Date.now();
      const result = await callClaude(image);
      // Ensure animation runs at least 2.4s for feel.
      const elapsed = Date.now() - start;
      if (elapsed < 2400) await new Promise(r => setTimeout(r, 2400 - elapsed));
      const meal = result ? {
        ...result,
        image,
        portionFactor: 1,
        time: 'Ahora',
      } : fallbackMeal(image);
      setCurrentMeal(meal);
      setScreen('result');
    },
    setPortion: (f) => setCurrentMeal(m => ({ ...m, portionFactor: f })),
    adjustIngredient: (i, delta) => setCurrentMeal(m => {
      const ings = m.ingredients.map((ing, idx) => idx === i
        ? { ...ing, grams: Math.max(0, ing.grams + delta), kcal: Math.max(0, Math.round(ing.kcal * (1 + delta / ing.grams))) }
        : ing);
      const totals = ings.reduce((a, ing) => ({
        kcal: a.kcal + ing.kcal, protein: a.protein, carbs: a.carbs, fat: a.fat,
      }), { kcal: 0, protein: m.totals.protein, carbs: m.totals.carbs, fat: m.totals.fat });
      return { ...m, ingredients: ings, totals };
    }),
    addIngredient: () => setCurrentMeal(m => ({
      ...m,
      ingredients: [...m.ingredients, { name: 'Nuevo ingrediente', grams: 50, kcal: 80, confidence: 100 }],
    })),
    saveMeal: () => {
      const meal = {
        ...currentMeal,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      };
      setTodayMeals(prev => [...prev, meal]);
      setScreen('home'); setTab('home');
    },
  };

  // Tab change handler
  const onTabChange = (t) => { setTab(t); setScreen(t); };

  // Which screens show the tab bar
  const showTabBar = ['home', 'history', 'goals', 'profile'].includes(screen);
  const showFab = showTabBar;

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding': return <Onboarding t={t} dir={dir} app={app} />;
      case 'home': return <Home t={t} dir={dir} app={app} />;
      case 'capture': return <Capture t={t} dir={dir} app={app} />;
      case 'analyzing': return <Analyzing t={t} dir={dir} app={app} />;
      case 'result': return <Result t={t} dir={dir} app={app} />;
      case 'detail': return <Detail t={t} dir={dir} app={app} />;
      case 'history': return <History t={t} dir={dir} app={app} />;
      case 'goals': return <Goals t={t} dir={dir} app={app} />;
      case 'profile': return <Profile t={t} dir={dir} app={app} />;
      default: return null;
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', background: t.bg, color: t.ink,
      fontFamily: t.font, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
        {renderScreen()}
      </div>
      {showFab && <AFab t={t} onClick={() => setScreen('capture')} />}
      {showTabBar && <ATabBar t={t} active={tab} onChange={onTabChange} />}
    </div>
  );
}

window.App = App;
