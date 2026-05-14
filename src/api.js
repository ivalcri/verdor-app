export async function analyzeFood(imageDataUrl, apiKey) {
  apiKey = (apiKey || '').trim();
  if (!apiKey) throw new Error('Falta la API key de Google Gemini');

  const match = imageDataUrl.match(/^data:(image\/[^;]+);base64,(.+)$/);
  if (!match) throw new Error('Formato de imagen no válido');

  const mimeType = match[1];
  const imageData = match[2];

  const response = await fetch('/.netlify/functions/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageData, mimeType, apiKey }),
  });

  const json = await response.json();

  if (!response.ok) {
    const msg = json.error?.message || json.error || `Error ${response.status}`;
    if (response.status === 400 || response.status === 403) {
      throw new Error('API key no válida. Cópiala de nuevo desde aistudio.google.com');
    }
    throw new Error(msg);
  }

  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Respuesta inesperada de la IA');

  const parsed = JSON.parse(jsonMatch[0]);
  if (!parsed.totals || !parsed.ingredients) throw new Error('Datos incompletos');

  return parsed;
}
