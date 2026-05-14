import React from 'react';
import {Link} from 'react-router-dom';
import {getMoodOption} from '../utils/moodConfig';
import {getMoodEntries, MoodEntry} from '../utils/storage';

const History: React.FC = () => {
  const [entries, setEntries] = React.useState<MoodEntry[]>([]);

  React.useEffect(() => {
    const sorted = [...getMoodEntries()].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setEntries(sorted);
  }, []);

  return (
    <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
      <header className="mb-stack-md">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">Mood History</h2>
        <p className="text-text-secondary mt-1">Review your past check-ins and track your emotional journey.</p>
      </header>

      {entries.length === 0 ? (
        <section className="rounded-DEFAULT border border-border-subtle bg-surface p-8 text-center">
          <p className="text-text-secondary">No mood entries yet. Start by logging your first check-in.</p>
          <Link to="/log" className="inline-flex mt-4 rounded-full bg-primary-container px-5 py-2 text-on-primary-container font-medium hover:bg-primary transition-colors">
            Log a mood
          </Link>
        </section>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => {
            const mood = getMoodOption(entry.mood);
            return (
              <article key={entry.id} className="rounded-DEFAULT border border-border-subtle bg-surface p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-surface-container-low flex items-center justify-center text-xl" aria-hidden="true">
                      {mood.emoji}
                    </div>
                    <div>
                      <h3 className="font-medium text-text-primary">{mood.label}</h3>
                      <p className="text-sm text-text-secondary">{new Date(entry.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-surface-container-low px-3 py-1 text-sm text-primary">Intensity {entry.intensity}/10</span>
                </div>
                {entry.note ? <p className="mt-3 text-sm text-text-secondary">{entry.note.slice(0, 120)}</p> : null}
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
};

export default History;
