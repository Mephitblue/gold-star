# ⭐ Gold Stars

A personal achievement tracker where every accomplishment earns a gold star — and gold stars fill constellations in the night sky above your cozy home.

## What It Does

Log your achievements and watch the stars come alive. Each achievement you record earns one gold star, which lights up a star in the night sky. Stars fill constellations one by one, starting with the smallest. When you complete a constellation, a celebration moment marks the occasion.

Your very first star goes to a special single-star constellation called **First Star** — a private milestone just for you.

## Features

- **Night sky homepage** — a cozy house beneath a star-filled sky. Stars begin as outlines and fill with gold as you earn them.
- **Constellation progression** — 8–10 pre-defined constellations fill in order from fewest to most stars.
- **Achievement logging** — record an achievement with a title, date, and category.
- **Progress toast** — after each achievement, a brief message shows which constellation you're working on and how many stars you've filled so far (e.g. "⭐ Working on Orion — 3 of 7 stars"). Auto-dismisses after 4 seconds.
- **Category system** — pre-populated categories with emoji icons (Work, Fitness, Learning, Creative, Personal, and more). Add your own custom categories.
- **Celebration moments** — animated callout when a constellation is fully completed, showing the constellation name.
- **First Star** — a special one-star constellation that lights up on your very first achievement.
- **Persistent data** — achievements saved to localStorage. No account required, no backend, works instantly.

## Tech Stack

- **Framework**: React (Vite)
- **Styling**: Tailwind CSS
- **Sky rendering**: SVG
- **Storage**: localStorage (no backend)
- **Deployment**: Vercel

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/gold-stars.git
cd gold-stars

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment

This app deploys to Vercel with zero configuration:

```bash
npm run build
# Then push to GitHub and connect the repo in Vercel dashboard
# Or use Vercel CLI: vercel --prod
```

## Constellation Data

Constellations are defined in `src/data/constellations.js`. Each has a name, a star count, and pre-set x/y coordinates for each star in the SVG sky. Stars are filled in order — the constellation with the fewest stars fills first.

| Constellation | Stars |
|---|---|
| First Star | 1 |
| Crux | 4 |
| Cassiopeia | 5 |
| Orion | 7 |
| Ursa Minor | 7 |
| Scorpius | 8 |
| Leo | 9 |
| Ursa Major | 10 |

## Project Structure

```
src/
├── components/
│   ├── NightSky.jsx          # SVG sky, stars, constellations
│   ├── House.jsx             # Cozy house silhouette
│   ├── StarAnimation.jsx     # Fill animation for earned stars
│   ├── ConstellationModal.jsx # Celebration callout
│   ├── AchievementProgressToast.jsx # Post-achievement progress nudge
│   ├── AchievementForm.jsx   # Log a new achievement
│   ├── AchievementList.jsx   # Scrollable history
│   └── CategoryPicker.jsx    # Category selector with emoji
├── data/
│   ├── constellations.js     # Constellation definitions + star positions
│   └── categories.js         # Default categories with emoji
├── hooks/
│   └── useAchievements.js    # localStorage read/write logic
├── App.jsx
└── main.jsx
```

## Future Enhancements

- User accounts and cloud sync (Supabase)
- Share a constellation completion to social media
- Achievement streaks and statistics
- Mobile app via React Native
- More constellations as the sky grows

## Running Costs

Zero. The app is entirely client-side with no backend, database, or paid APIs. Vercel's free tier handles hosting comfortably.

## License

MIT
