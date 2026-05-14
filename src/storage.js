const MEALS_KEY = 'verdor_meals';
const GOALS_KEY = 'verdor_goals';
const SETTINGS_KEY = 'verdor_settings';
const ONBOARDED_KEY = 'verdor_onboarded';

export function getMeals() {
  try {
    return JSON.parse(localStorage.getItem(MEALS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveMeal(meal) {
  const meals = getMeals();
  meals.push(meal);
  localStorage.setItem(MEALS_KEY, JSON.stringify(meals));
}

export function getTodayMeals() {
  const today = new Date().toDateString();
  return getMeals().filter(m => new Date(m.savedAt).toDateString() === today);
}

export function getRecentMeals(days = 7) {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return getMeals().filter(m => new Date(m.savedAt).getTime() > cutoff);
}

export function getGoals() {
  try {
    const g = JSON.parse(localStorage.getItem(GOALS_KEY));
    return g || { kcal: 2100, protein: 130, carbs: 220, fat: 75 };
  } catch {
    return { kcal: 2100, protein: 130, carbs: 220, fat: 75 };
  }
}

export function saveGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

export function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function isOnboarded() {
  return localStorage.getItem(ONBOARDED_KEY) === 'true';
}

export function setOnboarded() {
  localStorage.setItem(ONBOARDED_KEY, 'true');
}
