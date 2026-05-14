import {MoodId} from './moodConfig';

export interface MoodEntry {
  id: string;
  timestamp: string;
  mood: MoodId;
  intensity: number;
  note: string;
}

export interface UserProfile {
  displayName: string;
}

export interface WeeklyInsight {
  summary: string;
  suggestion: string;
  generatedAt: string;
}

export const STORAGE_KEYS = {
  entries: 'neuromood_entries',
  user: 'neuromood_user',
  lastInsight: 'neuromood_last_insight',
} as const;

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getLocalStorageItem<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (!canUseStorage()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore write failures in MVP mode.
  }
}

export function getMoodEntries(): MoodEntry[] {
  return getLocalStorageItem<MoodEntry[]>(STORAGE_KEYS.entries, []);
}

export function saveMoodEntry(entry: MoodEntry): MoodEntry[] {
  const entries = getMoodEntries();
  const updatedEntries = [...entries, entry];
  setLocalStorageItem(STORAGE_KEYS.entries, updatedEntries);
  return updatedEntries;
}

export function getUserProfile(): UserProfile {
  return getLocalStorageItem<UserProfile>(STORAGE_KEYS.user, {displayName: ''});
}

export function setUserProfile(profile: UserProfile): void {
  setLocalStorageItem(STORAGE_KEYS.user, profile);
}

export function getLastInsight(): WeeklyInsight | null {
  return getLocalStorageItem<WeeklyInsight | null>(STORAGE_KEYS.lastInsight, null);
}

export function setLastInsight(insight: WeeklyInsight): void {
  setLocalStorageItem(STORAGE_KEYS.lastInsight, insight);
}
