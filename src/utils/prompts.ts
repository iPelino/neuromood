import {getMoodOption} from './moodConfig';
import {MoodEntry} from './storage';

export const INSIGHTS_MINIMUM_ENTRIES = 3;
export const INSIGHTS_WINDOW_DAYS = 7;

export function buildWeeklyInsightsPrompt(entries: MoodEntry[]): string {
  const entryLines = entries
    .map((entry) => {
      const mood = getMoodOption(entry.mood);
      const note = entry.note ? ` Note: ${entry.note}` : '';
      return `- ${new Date(entry.timestamp).toISOString()}: ${mood.label} (${mood.emoji}), intensity ${entry.intensity}/10.${note}`;
    })
    .join('\n');

  return [
    'You are a supportive wellness assistant for the NeuroMood app.',
    'Analyze this 7-day mood log and respond with JSON only.',
    'Return exactly this shape: {"summary":"<2-3 sentences>","suggestion":"<1 practical action>"}.',
    'Keep it compassionate, specific, and easy to follow.',
    'Mood entries:',
    entryLines,
  ].join('\n');
}
