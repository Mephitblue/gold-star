import { CONSTELLATIONS } from '../data/constellations'

function calculateStreak(achievements) {
  if (achievements.length === 0) return 0

  const dates = [...new Set(
    achievements.map(a => new Date(a.earnedAt).toLocaleDateString('en-CA'))
  )].sort((a, b) => b.localeCompare(a))

  const today = new Date().toLocaleDateString('en-CA')
  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString('en-CA')

  if (dates[0] !== today && dates[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1] + 'T12:00:00')
    const curr = new Date(dates[i] + 'T12:00:00')
    if (Math.round((prev - curr) / 86400000) === 1) streak++
    else break
  }
  return streak
}

export default function StatsBar({ achievements, allocatedStars }) {
  const totalStars = achievements.length
  const completedCount = CONSTELLATIONS.filter(c =>
    c.stars.every(s => allocatedStars.has(s.id))
  ).length
  const streak = calculateStreak(achievements)

  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex justify-center gap-10 py-3"
      style={{ background: 'linear-gradient(transparent, rgba(10,14,26,0.85))' }}
    >
      <Stat icon="★" value={totalStars} label="stars" />
      <Stat icon="◎" value={completedCount} label={completedCount === 1 ? 'constellation' : 'constellations'} />
      <Stat icon="🔥" value={streak} label={streak === 1 ? 'day streak' : 'day streak'} dim={streak === 0} />
    </div>
  )
}

function Stat({ icon, value, label, dim }) {
  return (
    <div className={`flex items-baseline gap-1.5 ${dim ? 'opacity-30' : ''}`}>
      <span className="text-yellow-400 text-xs">{icon}</span>
      <span className="text-white font-bold text-lg leading-none">{value}</span>
      <span className="text-white/50 text-xs">{label}</span>
    </div>
  )
}
