export type ThemePreference = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'neuromood_theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === 'undefined') {
    return 'system';
  }

  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value;
  }
  return 'system';
}

export function getEffectiveTheme(preference: ThemePreference): 'light' | 'dark' {
  return preference === 'system' ? getSystemTheme() : preference;
}

export function applyThemePreference(preference: ThemePreference): void {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  if (preference === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', preference);
  }

  root.style.colorScheme = getEffectiveTheme(preference);
}

export function setThemePreference(preference: ThemePreference): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }
  applyThemePreference(preference);
}

export function initThemePreference(): void {
  applyThemePreference(getStoredThemePreference());
}
