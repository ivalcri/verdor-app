const GEMINI_API = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const PROMPT = `Analiza esta foto de un plato de comida. Devuelve EXCLUSIVAMENTE un objeto JSON válido (sin texto antes o después, sin markdown) con esta estructura exacta:

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

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { imageData, mimeType, apiKey } = body;
  if (!apiKey) return { statusCode: 400, body: JSON.stringify({ error: 'Missing API key' }) };

  const geminiRes = await fetch(`${GEMINI_API}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inline_data: { mime_type: mimeType, data: imageData } },
          { text: PROMPT },
        ],
      }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
    }),
  });

  const data = await geminiRes.json();

  return {
    statusCode: geminiRes.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
};
