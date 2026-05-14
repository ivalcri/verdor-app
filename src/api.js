const ANTHROPIC_API = 'https://api.anthropic.com/v1/messages';

export async function analyzeFood(imageDataUrl, apiKey) {
  const match = imageDataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) throw new Error('Formato de imagen no válido');

  const mediaType = match[1];
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

  const response = await fetch(ANTHROPIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-allow-browser': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20251001',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
          { type: 'text', text: prompt },
        ],
      }],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || `Error ${response.status}`);
  }

  const json = await response.json();
  const text = json.content?.[0]?.text || '';

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Respuesta inesperada de la IA');

  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.totals || !parsed.ingredients) throw new Error('Datos incompletos');

  return parsed;
}
