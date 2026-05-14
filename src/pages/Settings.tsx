import React from 'react';
import {getUserProfile, setUserProfile} from '../utils/storage';
import {getStoredThemePreference, setThemePreference, ThemePreference} from '../utils/theme';

const Settings: React.FC = () => {
  const [displayName, setDisplayName] = React.useState(() => getUserProfile().displayName);
  const [themePreference, setThemePreferenceState] = React.useState<ThemePreference>(() => getStoredThemePreference());
  const [statusMessage, setStatusMessage] = React.useState('');

  const onSaveSettings = () => {
    setUserProfile({displayName: displayName.trim()});
    setThemePreference(themePreference);
    setStatusMessage('Settings saved.');
  };

  return (
    <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
      <header className="mb-stack-md">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">Settings</h2>
        <p className="text-text-secondary mt-1">Personalize your NeuroMood experience.</p>
      </header>

      <section className="rounded-DEFAULT border border-border-subtle bg-surface p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label htmlFor="display-name" className="block font-medium text-text-primary">Display name</label>
            <input
              id="display-name"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-DEFAULT border border-border-subtle bg-background-main px-4 py-3 text-on-surface"
            />
          </div>

          <div>
            <p className="font-medium text-text-primary">Theme preference</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(['system', 'light', 'dark'] as ThemePreference[]).map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() => {
                    setThemePreferenceState(theme);
                    setThemePreference(theme);
                  }}
                  className={`rounded-full px-4 py-2 capitalize transition-colors ${
                    themePreference === theme
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onSaveSettings}
            className="rounded-full bg-primary-container px-5 py-2 text-on-primary-container font-medium hover:bg-primary transition-colors"
          >
            Save settings
          </button>

          {statusMessage ? (
            <p className="text-sm text-tertiary font-medium" role="status" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default Settings;
