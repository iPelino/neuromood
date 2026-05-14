import {GoogleGenAI} from '@google/genai';
import {buildWeeklyInsightsPrompt} from './prompts';
import {MoodEntry, WeeklyInsight} from './storage';

function extractInsight(responseText: string): Pick<WeeklyInsight, 'summary' | 'suggestion'> {
  const jsonMatch = responseText.match(/\{[\s\S]*\}/);

  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as {summary?: string; suggestion?: string};
      if (parsed.summary && parsed.suggestion) {
        return {
          summary: parsed.summary.trim(),
          suggestion: parsed.suggestion.trim(),
        };
      }
    } catch {
      // Fall through to text fallback.
    }
  }

  const compact = responseText.trim();
  if (!compact) {
    throw new Error('empty_response');
  }

  const lines = compact
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return {
    summary: lines[0] ?? 'Your mood check-ins show a mix of energy and recovery moments this week.',
    suggestion: lines[1] ?? 'Try a short mindful break at the same time each afternoon.',
  };
}

export async function generateWeeklyInsight(entries: MoodEntry[]): Promise<WeeklyInsight> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error('missing_api_key');
  }

  const ai = new GoogleGenAI({apiKey});
  const prompt = buildWeeklyInsightsPrompt(entries);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const parsed = extractInsight(response.text ?? '');

  return {
    ...parsed,
    generatedAt: new Date().toISOString(),
  };
}
