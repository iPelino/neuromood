export type MoodId =
  | 'very_dissatisfied'
  | 'dissatisfied'
  | 'neutral'
  | 'satisfied'
  | 'very_satisfied';

export interface MoodOption {
  id: MoodId;
  label: string;
  emoji: string;
  icon: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  {
    id: 'very_dissatisfied',
    label: 'Very low',
    emoji: '😞',
    icon: 'sentiment_very_dissatisfied',
  },
  {
    id: 'dissatisfied',
    label: 'Low',
    emoji: '😕',
    icon: 'sentiment_dissatisfied',
  },
  {
    id: 'neutral',
    label: 'Neutral',
    emoji: '😐',
    icon: 'sentiment_neutral',
  },
  {
    id: 'satisfied',
    label: 'Good',
    emoji: '🙂',
    icon: 'sentiment_satisfied',
  },
  {
    id: 'very_satisfied',
    label: 'Great',
    emoji: '😄',
    icon: 'sentiment_very_satisfied',
  },
];

const moodMap = new Map(MOOD_OPTIONS.map((mood) => [mood.id, mood]));

export function getMoodOption(moodId: MoodId): MoodOption {
  return moodMap.get(moodId) ?? MOOD_OPTIONS[2];
}

export function getIntensityLabel(intensity: number): string {
  if (intensity <= 2) return 'Very mild';
  if (intensity <= 4) return 'Mild';
  if (intensity <= 6) return 'Moderate';
  if (intensity <= 8) return 'High';
  return 'Very intense';
}
