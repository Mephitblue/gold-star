# Gold Stars — Product Requirements Document

> This document is written for Claude Code. Build this application exactly as specified. Do not add features beyond what is described. Prefer simple, working implementations over clever abstractions.

---

## Overview

**App name**: Gold Stars  
**Purpose**: A personal achievement tracker. Users log achievements, earn gold stars, and watch those stars fill constellations in a night sky above a cozy house.  
**Deployment target**: Vercel  
**Framework**: React + Vite  
**Styling**: Tailwind CSS  
**Storage**: localStorage only — no backend, no database, no authentication  
**Mobile**: Build mobile-responsive. Component structure should be React-compatible for future React Native port (avoid web-only APIs in business logic).

---

## Tech Stack

```
react
vite
tailwindcss
```

No other dependencies unless absolutely necessary. Do not add a UI component library. Do not add a state management library — React useState and useReducer are sufficient.

---

## Data Model

### Achievement

```js
{
  id: string,           // crypto.randomUUID()
  title: string,        // user-entered, required
  date: string,         // ISO date string, user-selected
  categoryId: string,   // references a category
  earnedAt: string,     // ISO timestamp when logged (Date.now())
}
```

### Category

```js
{
  id: string,
  label: string,        // display name
  emoji: string,        // single emoji
  isCustom: boolean,    // true if user-created
}
```

### App State (localStorage key: `goldstars_v1`)

```js
{
  achievements: Achievement[],
  categories: Category[],       // includes defaults + user-created
}
```

Load on mount, save on every state change.

---

## Constellation Data

Define in `src/data/constellations.js`. This is static data — do not generate it dynamically.

Each constellation has:
- `id`: string slug
- `name`: display name
- `stars`: array of `{ id, x, y }` objects — pixel coordinates within the SVG viewBox (0 0 800 500)
- `lines`: array of `[starId, starId]` pairs — which stars to draw connector lines between

Implement these 8 constellations in order (they fill in this order, fewest stars first):

```js
export const CONSTELLATIONS = [
  {
    id: 'first-star',
    name: 'First Star',
    stars: [{ id: 'fs1', x: 400, y: 80 }],
    lines: [],
  },
  {
    id: 'crux',
    name: 'Crux',
    stars: [
      { id: 'cr1', x: 120, y: 160 },
      { id: 'cr2', x: 120, y: 220 },
      { id: 'cr3', x: 90,  y: 190 },
      { id: 'cr4', x: 150, y: 190 },
    ],
    lines: [['cr1','cr2'],['cr3','cr4']],
  },
  {
    id: 'cassiopeia',
    name: 'Cassiopeia',
    stars: [
      { id: 'ca1', x: 580, y: 100 },
      { id: 'ca2', x: 620, y: 130 },
      { id: 'ca3', x: 660, y: 110 },
      { id: 'ca4', x: 700, y: 140 },
      { id: 'ca5', x: 740, y: 120 },
    ],
    lines: [['ca1','ca2'],['ca2','ca3'],['ca3','ca4'],['ca4','ca5']],
  },
  {
    id: 'orion',
    name: 'Orion',
    stars: [
      { id: 'or1', x: 200, y: 200 },
      { id: 'or2', x: 240, y: 180 },
      { id: 'or3', x: 210, y: 250 },
      { id: 'or4', x: 250, y: 240 },
      { id: 'or5', x: 225, y: 300 },
      { id: 'or6', x: 215, y: 330 },
      { id: 'or7', x: 245, y: 330 },
    ],
    lines: [['or1','or2'],['or3','or4'],['or1','or3'],['or2','or4'],['or3','or5'],['or4','or5'],['or5','or6'],['or5','or7']],
  },
  {
    id: 'ursa-minor',
    name: 'Ursa Minor',
    stars: [
      { id: 'um1', x: 420, y: 140 },
      { id: 'um2', x: 450, y: 160 },
      { id: 'um3', x: 480, y: 150 },
      { id: 'um4', x: 510, y: 170 },
      { id: 'um5', x: 500, y: 200 },
      { id: 'um6', x: 470, y: 210 },
      { id: 'um7', x: 460, y: 190 },
    ],
    lines: [['um1','um2'],['um2','um3'],['um3','um4'],['um4','um5'],['um5','um6'],['um6','um7'],['um7','um4']],
  },
  {
    id: 'scorpius',
    name: 'Scorpius',
    stars: [
      { id: 'sc1', x: 650, y: 250 },
      { id: 'sc2', x: 670, y: 270 },
      { id: 'sc3', x: 690, y: 260 },
      { id: 'sc4', x: 710, y: 280 },
      { id: 'sc5', x: 700, y: 300 },
      { id: 'sc6', x: 720, y: 320 },
      { id: 'sc7', x: 710, y: 340 },
      { id: 'sc8', x: 730, y: 350 },
    ],
    lines: [['sc1','sc2'],['sc2','sc3'],['sc3','sc4'],['sc4','sc5'],['sc5','sc6'],['sc6','sc7'],['sc7','sc8']],
  },
  {
    id: 'leo',
    name: 'Leo',
    stars: [
      { id: 'le1', x: 300, y: 150 },
      { id: 'le2', x: 330, y: 130 },
      { id: 'le3', x: 360, y: 150 },
      { id: 'le4', x: 350, y: 180 },
      { id: 'le5', x: 320, y: 200 },
      { id: 'le6', x: 290, y: 190 },
      { id: 'le7', x: 370, y: 220 },
      { id: 'le8', x: 400, y: 210 },
      { id: 'le9', x: 410, y: 190 },
    ],
    lines: [['le1','le2'],['le2','le3'],['le3','le4'],['le4','le5'],['le5','le6'],['le6','le1'],['le4','le7'],['le7','le8'],['le8','le9']],
  },
  {
    id: 'ursa-major',
    name: 'Ursa Major',
    stars: [
      { id: 'ub1', x: 100, y: 350 },
      { id: 'ub2', x: 140, y: 340 },
      { id: 'ub3', x: 180, y: 355 },
      { id: 'ub4', x: 220, y: 345 },
      { id: 'ub5', x: 240, y: 380 },
      { id: 'ub6', x: 200, y: 400 },
      { id: 'ub7', x: 160, y: 390 },
      { id: 'ub8', x: 270, y: 360 },
      { id: 'ub9', x: 300, y: 340 },
      { id: 'ub10', x: 320, y: 355 },
    ],
    lines: [['ub1','ub2'],['ub2','ub3'],['ub3','ub4'],['ub4','ub5'],['ub5','ub6'],['ub6','ub7'],['ub7','ub4'],['ub4','ub8'],['ub8','ub9'],['ub9','ub10']],
  },
];
```

---

## Default Categories

Define in `src/data/categories.js`:

```js
export const DEFAULT_CATEGORIES = [
  { id: 'work',      label: 'Work',       emoji: '💼', isCustom: false },
  { id: 'fitness',   label: 'Fitness',    emoji: '🏃', isCustom: false },
  { id: 'learning',  label: 'Learning',   emoji: '📚', isCustom: false },
  { id: 'creative',  label: 'Creative',   emoji: '🎨', isCustom: false },
  { id: 'personal',  label: 'Personal',   emoji: '🌱', isCustom: false },
  { id: 'social',    label: 'Social',     emoji: '🤝', isCustom: false },
  { id: 'financial', label: 'Financial',  emoji: '💰', isCustom: false },
  { id: 'health',    label: 'Health',     emoji: '❤️', isCustom: false },
];
```

---

## localStorage Hook

Create `src/hooks/useAchievements.js`:

- On mount: read `goldstars_v1` from localStorage. If empty, initialize with `{ achievements: [], categories: DEFAULT_CATEGORIES }`.
- Expose: `achievements`, `categories`, `addAchievement(achievement)`, `addCategory(category)`.
- On every state change: write full state back to `goldstars_v1`.
- `addAchievement` appends to achievements array and triggers re-render.

---

## Star Allocation Logic

This logic determines which star in the sky to fill when an achievement is logged.

```
totalStarsEarned = achievements.length

For each constellation (sorted by star count ascending, "First Star" always first):
  if totalStarsEarned >= starsInThisConstellation:
    all stars in this constellation are filled
  else:
    fill the first N stars of this constellation where N = remaining stars
    stop
```

Implement this as a pure function `getAllocatedStars(achievements, constellations)` that returns a `Set` of star IDs that should be rendered as filled/gold.

Also compute `isConstellationComplete(constellation, allocatedStars)` — returns true if every star in the constellation is in allocatedStars.

Also implement `getActiveConstellation(achievements, constellations)` — returns an object describing the constellation currently being filled:

```js
// Returns null if all constellations are complete
{
  name: string,        // e.g. "Orion"
  starsEarned: number, // stars filled so far in this constellation
  starsTotal: number,  // total stars in this constellation
}
```

This is used to show the post-achievement progress message (see Component: AchievementProgressToast).

---

## UI — Page Layout

Single page. Two panels stacked vertically on mobile, side by side on desktop (lg breakpoint):

**Left / Top panel**: Night sky (takes up most of the screen)  
**Right / Bottom panel**: Achievement form + achievement list (scrollable)

The sky panel should feel like a window into space — dark background (`#0a0e1a`), with the house silhouette anchored to the bottom.

---

## Component: NightSky

File: `src/components/NightSky.jsx`

Renders an SVG with `viewBox="0 0 800 500"` and `width="100%"`.

**Background**: dark navy rect filling the entire viewBox (`fill="#0a0e1a"`).

**House silhouette**: A simple SVG house shape at the bottom center of the viewBox. Dark fill (`#1a1f2e`). Include a warm glowing window (small rect with `fill="#FFD580"` and mild opacity).

**Constellation connector lines**: For each constellation, render `<line>` elements between connected stars. Use `stroke="#ffffff"` at `opacity="0.12"` and `strokeWidth="0.5"`. Always visible (outline mode even when stars are empty).

**Stars**: For each star in each constellation:
- If the star is in `allocatedStars` (earned): render as a filled gold circle. Use `fill="#FFD700"`, radius 4. Apply CSS animation class `star-fill` on first render of the filled state.
- If not earned: render as a hollow circle. `fill="none"`, `stroke="#ffffff"`, `strokeOpacity="0.3"`, radius 3.

**Star fill animation** (`star-fill` CSS class):
```css
@keyframes starFill {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.4); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.star-fill {
  animation: starFill 0.5s ease-out forwards;
  transform-origin: center;
}
```

Apply this class only when a star transitions from empty to filled — use a ref or previous value comparison to detect the transition.

**Background stars (decorative)**: Render ~40 tiny static dots (`r="1"`, `fill="#ffffff"`, various opacities 0.1–0.4) scattered across the sky at hardcoded positions to fill empty space. These are not constellation stars and never change state.

Props: `{ allocatedStars: Set<string> }`

---

## Component: ConstellationModal

File: `src/components/ConstellationModal.jsx`

Triggers when a constellation becomes complete for the first time.

Detection: compare previous `allocatedStars` to current. If a new constellation is now complete that wasn't before, show the modal.

Display:
- Overlay backdrop (semi-transparent dark)
- Centered card with constellation name in large text
- Message: "You've completed the [Name] constellation!"
- A row of gold star emoji (one per star in the constellation, max 10)
- A "Continue" button to dismiss

Props: `{ constellation, onDismiss }` — parent controls visibility.

---

## Component: AchievementForm

File: `src/components/AchievementForm.jsx`

Fields:
- **Title**: text input, required, placeholder "What did you accomplish?"
- **Date**: date input, defaults to today
- **Category**: dropdown/select showing `{emoji} {label}` for each category

Below the category select: a small "+ Add category" link that reveals an inline mini-form:
- Text input for category name
- Emoji picker: a row of 12 common emoji the user can click to select (🌟 🎯 🏆 🎓 🚀 💡 🎵 🌿 ✈️ 🧩 🔥 💪)
- "Add" button — calls `addCategory` and selects the new category

Submit button: "Log Achievement ⭐"

On submit:
1. Validate title is not empty
2. Call `addAchievement({ id: crypto.randomUUID(), title, date, categoryId, earnedAt: new Date().toISOString() })`
3. Reset form
4. Trigger star fill animation (parent detects via achievements length change)

---

## Component: AchievementProgressToast

File: `src/components/AchievementProgressToast.jsx`

Shown immediately after a user successfully logs an achievement — before any constellation-complete modal. Displays which constellation they are currently working toward and how far along they are.

**Trigger**: Appears when `addAchievement` is called and a constellation is not yet complete (i.e., the ConstellationModal is not about to fire). If the achievement also completes a constellation, the ConstellationModal takes over and this toast is skipped.

**Display**: A small banner or card that slides in (CSS transition, `translateY` from below) at the bottom of the right panel, or overlaid at the bottom of the sky panel on desktop. Auto-dismisses after 4 seconds. Also has an `×` dismiss button.

**Content**:
- Constellation name and a partial star display showing progress
- Message format: `"⭐ Working on [Constellation Name] — [N] of [Total] stars"`
- Example: `"⭐ Working on Orion — 3 of 7 stars"`
- For the very first achievement (First Star constellation, 1 of 1): show `"⭐ Your First Star is lit!"` instead, and skip the fraction since it immediately triggers the ConstellationModal anyway — so this toast will not actually appear for that case.
- Show a simple inline pip row: filled gold circles for earned stars, hollow circles for remaining. Max 10 pips; if constellation has more than 10 stars, show the fraction text only.

**Styling**: Dark navy background (`#0a0e1a`), white text, gold accent for star pips. Rounded card, subtle border. Feels like a gentle nudge from the sky.

**Props**: `{ constellation: { name, starsEarned, starsTotal } | null, onDismiss: () => void }`

Render nothing when `constellation` is null.

---

## Component: AchievementList

File: `src/components/AchievementList.jsx`

Scrollable list of all achievements, newest first.

Each entry:
- Category emoji (large, ~24px)
- Achievement title (bold)
- Date (formatted as "Mar 28, 2026")
- Category label (muted, small)

Show total count at top: "⭐ 12 achievements"

If empty: show a gentle prompt — "Log your first achievement to light up the First Star."

Props: `{ achievements, categories }`

---

## App.jsx

Responsibilities:
- Initialize `useAchievements` hook
- Compute `allocatedStars` from achievements + constellations
- Compute `activeConstellation` using `getActiveConstellation` after each achievement is added
- Detect newly completed constellations, store in state to trigger ConstellationModal
- On `addAchievement`: if the new achievement completes a constellation, show ConstellationModal and skip the toast; otherwise show AchievementProgressToast with the active constellation info
- Auto-dismiss the toast after 4 seconds (use `setTimeout`, cleared on manual dismiss or if a new achievement is logged before it expires)
- Render layout: NightSky on left/top, form+list on right/bottom
- Render ConstellationModal when triggered
- Render AchievementProgressToast when triggered

---

## Styling Notes

Use Tailwind utility classes throughout. Do not write custom CSS except for the star animation keyframes (put those in `index.css`).

Sky panel background: `bg-[#0a0e1a]`  
Right panel background: white or `bg-gray-50`  
The right panel should have comfortable padding and a max-height with overflow-y-auto on the achievement list.

The overall feel should be cozy and calm — not flashy. The gold stars are the hero element.

---

## What NOT to Build

Do not build any of the following (these are post-hackathon):
- User authentication or accounts
- A backend or API
- A database (Supabase, Firebase, etc.)
- Achievement editing or deletion
- Sharing or social features
- Statistics or streak tracking
- Any animations beyond the star fill and constellation modal

---

## File Structure to Create

```
gold-stars/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── src/
│   ├── index.css           (Tailwind directives + star animation keyframes)
│   ├── main.jsx
│   ├── App.jsx
│   ├── data/
│   │   ├── constellations.js
│   │   └── categories.js
│   ├── hooks/
│   │   └── useAchievements.js
│   └── components/
│       ├── NightSky.jsx
│       ├── House.jsx
│       ├── ConstellationModal.jsx
│       ├── AchievementProgressToast.jsx
│       ├── AchievementForm.jsx
│       ├── AchievementList.jsx
│       └── CategoryPicker.jsx
└── public/
```

---

## Definition of Done

The app is complete when:

1. `npm run dev` starts without errors
2. The night sky renders with all constellation stars as outlines
3. Clicking "Log Achievement" with a title, date, and category adds the achievement
4. The correct star fills with a gold animation immediately after logging
5. The First Star fills on the very first achievement
6. After logging an achievement (that does not complete a constellation), a toast appears showing the constellation name and star progress (e.g. "⭐ Working on Orion — 3 of 7 stars")
7. The toast auto-dismisses after 4 seconds and has a manual dismiss button
8. When a constellation is fully filled, the celebration modal appears with the constellation name (toast is skipped in this case)
9. Achievements persist across page refresh (localStorage)
10. `npm run build` produces a working production build
11. The app is deployed to Vercel and accessible at a public URL
