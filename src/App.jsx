import React, { useState, useCallback } from 'react';
import { getTheme } from './theme.js';
import { TabBar, Fab } from './components/ui.jsx';
import Onboarding from './screens/Onboarding.jsx';
import Home from './screens/Home.jsx';
import Capture from './screens/Capture.jsx';
import Analyzing from './screens/Analyzing.jsx';
import Result from './screens/Result.jsx';
import Detail from './screens/Detail.jsx';
import History from './screens/History.jsx';
import Goals from './screens/Goals.jsx';
import Profile from './screens/Profile.jsx';
import {
  getMeals, saveMeal, getTodayMeals, getGoals, saveGoals,
  getSettings, saveSettings, isOnboarded, setOnboarded,
} from './storage.js';
import { analyzeFood } from './api.js';

const FALLBACK_MEAL = (image) => ({
  name: 'Bowl mediterráneo',
  short: 'BOWL',
  portion: '1 bowl',
  servingGrams: 380,
  portionFactor: 1,
  healthScore: 82,
  totals: { kcal: 540, protein: 28, carbs: 58, fat: 22 },
  ingredients: [
    { name: 'Quinoa cocida', grams: 120, kcal: 144, confidence: 94 },
    { name: 'Salmón a la plancha', grams: 90, kcal: 187, confidence: 92 },
    { name: 'Aguacate', grams: 60, kcal: 96, confidence: 96 },
    { name: 'Tomate cherry', grams: 70, kcal: 18, confidence: 90 },
    { name: 'Aceite de oliva', grams: 10, kcal: 90, confidence: 85 },
  ],
  note: 'Buen aporte de omega-3 y proteína magra. Considera añadir legumbres mañana para variar.',
  image,
});

export default function App() {
  const settings = getSettings();
  const [dark, setDark] = useState(settings.dark || false);
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [screen, setScreen] = useState(isOnboarded() ? 'home' : 'onboarding');
  const [tab, setTab] = useState('home');
  const [meals, setMeals] = useState(getMeals);
  const [goals, setGoals] = useState(getGoals);
  const [pendingImage, setPendingImage] = useState(null);
  const [currentMeal, setCurrentMeal] = useState(null);
  const [currentPortionFactor, setCurrentPortionFactor] = useState(1);
  const [error, setError] = useState(null);

  const t = getTheme(dark);

  const todayMeals = meals.filter(m => new Date(m.savedAt).toDateString() === new Date().toDateString());

  const todayTotals = todayMeals.reduce(
    (a, m) => ({
      kcal: a.kcal + Math.round((m.totals?.kcal || 0) * (m.portionFactor || 1)),
      protein: a.protein + Math.round((m.totals?.protein || 0) * (m.portionFactor || 1)),
      carbs: a.carbs + Math.round((m.totals?.carbs || 0) * (m.portionFactor || 1)),
      fat: a.fat + Math.round((m.totals?.fat || 0) * (m.portionFactor || 1)),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const go = useCallback((s) => {
    if (['home', 'history', 'goals', 'profile'].includes(s)) setTab(s);
    setScreen(s);
  }, []);

  const toggleDark = useCallback(() => {
    setDark(d => {
      const next = !d;
      saveSettings({ ...getSettings(), dark: next });
      return next;
    });
  }, []);

  const handleSaveApiKey = useCallback((key) => {
    setApiKey(key);
    saveSettings({ ...getSettings(), apiKey: key });
  }, []);

  const handleAnalyze = useCallback(async (image) => {
    if (!apiKey) {
      setError('Configura tu API key de Anthropic en Perfil → API Key');
      go('profile');
      return;
    }
    setPendingImage(image);
    setScreen('analyzing');
    setError(null);

    const start = Date.now();
    let result = null;
    try {
      result = await analyzeFood(image, apiKey);
    } catch (e) {
      console.warn('Analysis failed:', e.message);
      setError(e.message);
    }

    const elapsed = Date.now() - start;
    if (elapsed < 2400) await new Promise(r => setTimeout(r, 2400 - elapsed));

    const meal = result ? { ...result, image, portionFactor: 1 } : FALLBACK_MEAL(image);
    setCurrentMeal(meal);
    setCurrentPortionFactor(1);
    setScreen('result');
  }, [apiKey, go]);

  const handleSaveMeal = useCallback((portionFactor) => {
    if (!currentMeal) return;
    const mealToSave = {
      ...currentMeal,
      portionFactor,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      savedAt: new Date().toISOString(),
    };
    saveMeal(mealToSave);
    setMeals(getMeals());
    setCurrentMeal(null);
    go('home');
  }, [currentMeal, go]);

  const handleSaveGoals = useCallback((newGoals) => {
    saveGoals(newGoals);
    setGoals(newGoals);
  }, []);

  const handleOnboardingDone = useCallback(() => {
    setOnboarded();
    go('home');
  }, [go]);

  const showTabBar = ['home', 'history', 'goals', 'profile'].includes(screen);

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <Onboarding t={t} onDone={handleOnboardingDone} />;
      case 'home':
        return <Home t={t} todayMeals={todayMeals} goals={goals}
          onOpenCapture={() => go('capture')}
          onOpenMeal={(m) => { setCurrentMeal(m); setCurrentPortionFactor(m.portionFactor || 1); go('result'); }}
          onGoProfile={() => go('profile')}
        />;
      case 'capture':
        return <Capture t={t} onBack={() => go('home')} onAnalyze={handleAnalyze} />;
      case 'analyzing':
        return <Analyzing t={t} pendingImage={pendingImage} />;
      case 'result':
        return <Result t={t} meal={currentMeal} goals={goals}
          onBack={() => go('home')}
          onReanalyze={() => { if (currentMeal?.image) handleAnalyze(currentMeal.image); }}
          onGoDetail={(pf) => { setCurrentPortionFactor(pf); go('detail'); }}
          onSave={handleSaveMeal}
        />;
      case 'detail':
        return <Detail t={t} meal={currentMeal} portionFactor={currentPortionFactor}
          onBack={() => go('result')}
          onSave={(ings) => { setCurrentMeal(m => ({ ...m, ingredients: ings })); go('result'); }}
        />;
      case 'history':
        return <History t={t} meals={meals} goals={goals} />;
      case 'goals':
        return <Goals t={t} goals={goals} todayTotals={todayTotals} onSaveGoals={handleSaveGoals} />;
      case 'profile':
        return <Profile t={t} dark={dark} onToggleDark={toggleDark}
          apiKey={apiKey} onSaveApiKey={handleSaveApiKey}
          onGoGoals={() => go('goals')} meals={meals}
        />;
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', background: t.bg, color: t.ink,
      fontFamily: t.font, position: 'relative', overflow: 'hidden',
    }}>
      {/* Error toast */}
      {error && screen !== 'analyzing' && (
        <div style={{
          position: 'fixed', top: 'calc(env(safe-area-inset-top, 44px) + 8px)',
          left: 16, right: 16, zIndex: 100,
          background: t.bad, color: '#fff', borderRadius: t.radiusSm,
          padding: '12px 16px', fontSize: 13, fontWeight: 500,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={{ background: 'transparent', border: 0, color: '#fff', cursor: 'pointer', padding: 4 }}>✕</button>
        </div>
      )}

      <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }}>
        {renderScreen()}
      </div>

      {showTabBar && <Fab t={t} onClick={() => go('capture')} />}
      {showTabBar && <TabBar t={t} active={tab} onChange={(id) => { setTab(id); setScreen(id); }} />}
    </div>
  );
}
