import React from 'react';
import {Link} from 'react-router-dom';
import {getMoodOption} from '../utils/moodConfig';
import {getLastInsight, getMoodEntries, getUserProfile, MoodEntry, WeeklyInsight} from '../utils/storage';

function buildTrendPoints(entries: MoodEntry[]): string {
  if (entries.length === 0) {
    return '';
  }

  if (entries.length === 1) {
    const y = 40 - ((entries[0].intensity - 1) / 9) * 35;
    return `50,${y.toFixed(2)}`;
  }

  return entries
    .map((entry, index) => {
      const x = (index / (entries.length - 1)) * 100;
      const y = 40 - ((entry.intensity - 1) / 9) * 35;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(' ');
}

const Dashboard: React.FC = () => {
  const [entries, setEntries] = React.useState<MoodEntry[]>([]);
  const [displayName, setDisplayName] = React.useState('there');
  const [lastInsight, setLastInsightState] = React.useState<WeeklyInsight | null>(null);

  React.useEffect(() => {
    const moodEntries = [...getMoodEntries()].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    setEntries(moodEntries);

    const user = getUserProfile();
    setDisplayName(user.displayName || 'there');

    setLastInsightState(getLastInsight());
  }, []);

  const latestEntry = entries.length > 0 ? entries[entries.length - 1] : null;
  const latestMood = latestEntry ? getMoodOption(latestEntry.mood) : null;
  const recentHistory = [...entries].reverse().slice(0, 3);
  const trendEntries = entries.slice(-7);
  const trendPoints = buildTrendPoints(trendEntries);

  return (
    <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-stack-md gap-4">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">Good day, {displayName}</h2>
          <p className="text-text-secondary mt-1">Here is your wellness overview for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button className="p-3 rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high transition-colors" aria-label="Notifications">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="w-12 h-12 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold" aria-label="Profile avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-stack-md">
        <section className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-headline-md text-headline-md text-text-primary">Current Balance</h3>
            <span className="px-3 py-1 bg-surface-container-low text-primary rounded-full font-label-sm text-label-sm font-medium">
              {latestEntry ? `Updated ${new Date(latestEntry.timestamp).toLocaleString()}` : 'No entries yet'}
            </span>
          </div>
          {latestMood && latestEntry ? (
            <div className="flex items-center gap-6 mt-4">
              <div className="w-20 h-20 bg-secondary-fixed rounded-full flex items-center justify-center text-4xl" aria-hidden="true">
                {latestMood.emoji}
              </div>
              <div>
                <p className="font-headline-lg text-headline-lg text-text-primary">{latestMood.label}</p>
                <p className="text-success-growth font-medium mt-1">Intensity {latestEntry.intensity}/10</p>
              </div>
            </div>
          ) : (
            <p className="text-text-secondary">Log your first mood to see your current balance.</p>
          )}
        </section>

        <section className="bg-secondary-fixed rounded-DEFAULT p-6 flex flex-col relative overflow-hidden xl:col-span-1">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[80px]" aria-hidden="true">auto_awesome</span>
          </div>
          <div className="flex items-center gap-2 mb-4 text-secondary relative z-10">
            <span className="material-symbols-outlined" aria-hidden="true">psychology</span>
            <h3 className="font-headline-md text-headline-md font-medium">AI Insight</h3>
          </div>
          <p className="text-on-secondary-fixed-variant relative z-10 text-[18px] leading-relaxed mb-6">
            {lastInsight?.summary ?? 'Log at least 3 moods this week to unlock your first AI insight.'}
          </p>
          <Link to="/insights" className="mt-auto self-start px-6 py-2 bg-surface text-primary rounded-full font-medium shadow-sm hover:shadow-md transition-shadow relative z-10">
            View Details
          </Link>
        </section>

        <section className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 md:col-span-2 xl:col-span-2 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-text-primary">Mood Trend</h3>
            <div className="text-text-secondary text-sm">Last 7 entries</div>
          </div>

          {trendEntries.length === 0 ? (
            <p className="text-text-secondary">No trend data yet. Add mood entries to see your chart.</p>
          ) : (
            <>
              <div className="flex-1 w-full relative min-h-[200px] flex items-end pt-4">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full border-b border-border-subtle h-0" />
                  <div className="w-full border-b border-border-subtle h-0" />
                  <div className="w-full border-b border-border-subtle h-0" />
                  <div className="w-full border-b border-border-subtle h-0" />
                </div>
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40" aria-label="Mood intensity trend chart">
                  <polyline
                    points={trendPoints}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary-container"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex justify-between w-full mt-4 text-text-muted font-label-sm text-label-sm px-2">
                {trendEntries.map((entry) => (
                  <span key={entry.id}>{new Date(entry.timestamp).toLocaleDateString(undefined, {weekday: 'short'})}</span>
                ))}
              </div>
            </>
          )}
        </section>

        <section className="bg-surface rounded-DEFAULT shadow-[0_4px_6px_rgba(39,33,60,0.1)] p-6 md:col-span-2 xl:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline-md text-headline-md text-text-primary">Recent History</h3>
            <Link to="/history" className="text-primary font-medium text-sm hover:underline">See All</Link>
          </div>

          {recentHistory.length === 0 ? (
            <div className="text-text-secondary">
              <p>No mood history yet.</p>
              <Link to="/log" className="inline-flex mt-3 rounded-full bg-primary-container px-4 py-2 text-on-primary-container font-medium hover:bg-primary transition-colors">
                Log your first mood
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              {recentHistory.map((entry, index) => {
                const mood = getMoodOption(entry.mood);
                const hasBorder = index < recentHistory.length - 1;
                return (
                  <div key={entry.id} className={`py-4 flex items-center justify-between ${hasBorder ? 'border-b border-border-subtle' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center text-xl" aria-hidden="true">
                        {mood.emoji}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{mood.label}</p>
                        <p className="text-sm text-text-secondary">{new Date(entry.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-surface-container-low text-primary rounded-full text-sm font-medium">Intensity: {entry.intensity}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
