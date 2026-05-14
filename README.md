# NeuroMood

NeuroMood is a wellness-tracking MVP that helps users log daily moods, view emotional trends, and receive gentle AI-powered insights.

## Key Features

- Mood Logger with selectable mood, intensity slider, and note capture
- Local history timeline with reverse-chronological mood entries
- AI Insights page powered by Gemini for weekly summaries and one actionable suggestion
- Personalized settings (display name + theme preference)
- Light/dark theme support with system default handling
- PWA manifest and offline fallback page

## Local Setup

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

`GEMINI_API_KEY` is required for the AI Insights page.

## Run the App

```bash
npm run dev
```

## Build and Type Check

```bash
npm run lint
npm run build
```

## Deployment / Live App

Add the production URL here once available.
