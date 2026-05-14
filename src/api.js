const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function analyzeFood(imageDataUrl, apiKey) {
  apiKey = (apiKey || '').trim();
  if (!apiKey) throw new Error('Falta la API key de Google Gemini');
  const match = imageDataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) throw new Error('Formato de imagen no válido');

  const mimeType = match[1];
  const data = match[2];

  const prompt = `Analiza esta foto de un plato de comida. Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin texto antes o después, sin markdown) con esta estructura exacta:

{
  "name": "nombre corto del plato en español",
  "short": "ETIQ",
  "portion": "descripción de la porción",
  "servingGrams": 320,
  "totals": { "kcal": 450, "protein": 25, "carbs": 48, "fat": 18 },
  "healthScore": 78,
  "ingredients": [
    { "name": "ingrediente", "grams": 100, "kcal": 120, "confidence": 92 }
  ],
  "note": "consejo nutricional breve en español"
}

Incluye 3-7 ingredientes principales. Sé realista con las estimaciones. El campo "short" debe ser una palabra de máximo 6 letras en mayúsculas.`;

  const response = await fetch(`${GEMINI_API}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inline_data: { mime_type: mimeType, data } },
          { text: prompt },
        ],
      }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err.error?.message || `Error ${response.status}`;
    if (response.status === 400 || response.status === 403) {
      throw new Error('API key no válida. Cópiala de nuevo desde aistudio.google.com');
    }
    throw new Error(msg);
  }

  const json = await response.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Respuesta inesperada de la IA');

  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.totals || !parsed.ingredients) throw new Error('Datos incompletos');

  return parsed;
}
