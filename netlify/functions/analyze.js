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
  const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { imageData, mimeType, apiKey } = body;

  if (!apiKey || !apiKey.trim()) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing API key' }) };
  }

  let geminiRes;
  try {
    geminiRes = await fetch(`${GEMINI_API}?key=${apiKey.trim()}`, {
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
  } catch (err) {
    return { statusCode: 502, headers, body: JSON.stringify({ error: 'No se pudo conectar con Google. Intenta de nuevo.' }) };
  }

  const data = await geminiRes.json();

  return {
    statusCode: geminiRes.status,
    headers,
    body: JSON.stringify(data),
  };
};
