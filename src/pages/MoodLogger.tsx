import React from 'react';
import {getIntensityLabel, getMoodOption, MOOD_OPTIONS, MoodId} from '../utils/moodConfig';
import {saveMoodEntry} from '../utils/storage';

const DEFAULT_MOOD: MoodId = 'satisfied';
const DEFAULT_INTENSITY = 5;

const MoodLogger: React.FC = () => {
  const [selectedMood, setSelectedMood] = React.useState<MoodId>(DEFAULT_MOOD);
  const [intensity, setIntensity] = React.useState<number>(DEFAULT_INTENSITY);
  const [note, setNote] = React.useState('');
  const [statusMessage, setStatusMessage] = React.useState('');

  const currentIntensityLabel = getIntensityLabel(intensity);

  const onSaveEntry = () => {
    saveMoodEntry({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      mood: selectedMood,
      intensity,
      note: note.trim(),
    });

    setSelectedMood(DEFAULT_MOOD);
    setIntensity(DEFAULT_INTENSITY);
    setNote('');
    setStatusMessage('Mood entry saved successfully.');
  };

  return (
    <main className="flex-1 w-full md:ml-64 pt-24 md:pt-12 pb-32 md:pb-12 px-container-padding-mobile md:px-container-padding-desktop flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-stack-lg">
        <div className="text-center space-y-2">
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">How are you feeling?</h2>
          <p className="font-body-base text-body-base text-text-muted">Take a moment to check in with yourself.</p>
        </div>

        <div className="bg-background-main rounded-xl p-6 md:p-8 shadow-[0_4px_12px_rgba(39,33,60,0.05)] border border-surface-container-high flex flex-col gap-stack-lg relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-fixed rounded-full blur-3xl opacity-30 pointer-events-none" />

          <div className="flex flex-col gap-stack-sm relative z-10">
            <label className="font-headline-md text-headline-md text-on-surface" htmlFor="mood-selector">Quick Selection</label>
            <div id="mood-selector" className="grid grid-cols-5 gap-2 md:gap-4 mt-2" role="group" aria-label="Mood selector">
              {MOOD_OPTIONS.map((moodOption) => {
                const isSelected = moodOption.id === selectedMood;

                return (
                  <button
                    key={moodOption.id}
                    type="button"
                    aria-label={moodOption.label}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedMood(moodOption.id)}
                    className={`group flex flex-col items-center justify-center aspect-square rounded-[2rem] transition-all duration-300 active:scale-95 border-2 ${
                      isSelected
                        ? 'bg-primary-container border-primary-container shadow-[0_4px_8px_rgba(39,33,60,0.15)] scale-105'
                        : 'bg-surface-container-highest border-transparent hover:bg-surface-variant'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-4xl transition-transform ${isSelected ? 'text-on-primary-container fill' : 'text-on-surface-variant group-hover:scale-110'}`}>
                      {moodOption.icon}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-stack-sm relative z-10 pt-4">
            <div className="flex justify-between items-end">
              <label className="font-headline-md text-headline-md text-on-surface" htmlFor="mood-intensity">Intensity</label>
              <span className="font-body-base text-body-base text-primary-container font-medium">{currentIntensityLabel}</span>
            </div>
            <input
              id="mood-intensity"
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(event) => setIntensity(Number(event.target.value))}
              className="w-full accent-primary-container"
              aria-label="Mood intensity from 1 to 10"
              aria-valuemin={1}
              aria-valuemax={10}
              aria-valuenow={intensity}
              aria-valuetext={`${intensity} out of 10, ${currentIntensityLabel}`}
            />
            <div className="flex justify-between w-full px-1">
              <span className="font-label-sm text-label-sm text-text-muted">Mild</span>
              <span className="font-label-sm text-label-sm text-text-muted">Overwhelming</span>
            </div>
          </div>

          <div className="flex flex-col gap-base relative z-10 pt-4">
            <label className="font-headline-md text-headline-md text-on-surface" htmlFor="journal-notes">Journal Notes</label>
            <textarea
              id="journal-notes"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="w-full p-4 rounded-[1.5rem] border border-border-subtle focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none bg-surface-bright resize-none h-40 font-body-base text-body-base text-on-surface placeholder:text-text-muted transition-all shadow-sm"
              placeholder="What's contributing to this feeling? (Optional)"
            />
          </div>

          <div className="pt-6 relative z-10">
            <button
              type="button"
              onClick={onSaveEntry}
              className="w-full py-5 rounded-full bg-primary-container hover:bg-primary text-on-primary-container font-headline-md text-headline-md transition-all active:scale-95 shadow-[0_4px_12px_rgba(39,33,60,0.15)] flex justify-center items-center gap-2"
            >
              <span>Save Entry</span>
              <span className="material-symbols-outlined text-xl">check_circle</span>
            </button>
          </div>

          {statusMessage ? (
            <p className="text-sm text-tertiary font-medium" role="status" aria-live="polite">
              {statusMessage}
            </p>
          ) : null}

          <p className="text-sm text-text-secondary">
            Selected mood: {getMoodOption(selectedMood).emoji} {getMoodOption(selectedMood).label}
          </p>
        </div>
      </div>
    </main>
  );
};

export default MoodLogger;
