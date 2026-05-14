import React from 'react';
import {Link} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import {generateWeeklyInsight} from '../utils/gemini';
import {INSIGHTS_MINIMUM_ENTRIES, INSIGHTS_WINDOW_DAYS} from '../utils/prompts';
import {getMoodEntries, getLastInsight, MoodEntry, setLastInsight, WeeklyInsight} from '../utils/storage';

function getRecentEntries(entries: MoodEntry[]): MoodEntry[] {
  const windowStart = new Date();
  windowStart.setDate(windowStart.getDate() - INSIGHTS_WINDOW_DAYS);

  return entries.filter((entry) => new Date(entry.timestamp) >= windowStart);
}

const Insights: React.FC = () => {
  const [insight, setInsight] = React.useState<WeeklyInsight | null>(getLastInsight());
  const [entryCount, setEntryCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchInsights = React.useCallback(async () => {
    const entries = getRecentEntries(getMoodEntries());
    setEntryCount(entries.length);

    if (entries.length < INSIGHTS_MINIMUM_ENTRIES) {
      setLoading(false);
      setError('');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const generated = await generateWeeklyInsight(entries);
      setInsight(generated);
      setLastInsight(generated);
    } catch (caughtError) {
      if (caughtError instanceof Error && caughtError.message === 'missing_api_key') {
        setError('Missing API key. Add GEMINI_API_KEY to your local environment to unlock AI insights.');
      } else {
        setError('We could not generate insights right now. Please try again in a moment.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchInsights();
  }, [fetchInsights]);

  return (
    <main className="pt-20 md:pt-8 pb-28 md:pb-8 px-container-padding-mobile md:px-container-padding-desktop md:ml-64 max-w-[1600px] mx-auto">
      <header className="mb-stack-md">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-text-primary">AI Insights</h2>
        <p className="text-text-secondary mt-1">Get a weekly summary based on your recent mood check-ins.</p>
      </header>

      {loading ? (
        <section className="rounded-DEFAULT border border-border-subtle bg-surface p-6">
          <LoadingSpinner label="Analyzing your recent mood entries..." />
        </section>
      ) : null}

      {!loading && error ? <ErrorMessage message={error} onRetry={() => void fetchInsights()} /> : null}

      {!loading && !error && entryCount < INSIGHTS_MINIMUM_ENTRIES ? (
        <section className="rounded-DEFAULT border border-border-subtle bg-surface p-8 text-center">
          <p className="text-text-secondary">Log a few more moods to unlock insights. We need at least {INSIGHTS_MINIMUM_ENTRIES} entries from the last week.</p>
          <Link to="/log" className="inline-flex mt-4 rounded-full bg-primary-container px-5 py-2 text-on-primary-container font-medium hover:bg-primary transition-colors">
            Log mood now
          </Link>
        </section>
      ) : null}

      {!loading && !error && entryCount >= INSIGHTS_MINIMUM_ENTRIES && insight ? (
        <section className="rounded-DEFAULT border border-border-subtle bg-surface p-6">
          <div className="flex items-center gap-2 text-secondary mb-4">
            <span className="material-symbols-outlined" aria-hidden="true">psychology</span>
            <h3 className="font-headline-md text-headline-md text-text-primary">Your weekly summary</h3>
          </div>
          <p className="text-text-secondary leading-relaxed">{insight.summary}</p>
          <div className="mt-5 rounded-DEFAULT bg-surface-container-low p-4">
            <p className="text-sm font-medium text-text-primary">Actionable suggestion</p>
            <p className="mt-1 text-text-secondary">{insight.suggestion}</p>
          </div>
          <p className="mt-4 text-xs text-text-muted">Generated {new Date(insight.generatedAt).toLocaleString()}</p>
        </section>
      ) : null}
    </main>
  );
};

export default Insights;
