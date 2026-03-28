function starPoints(cx, cy, outerR, innerR) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

export default function AchievementProgressToast({ constellation, onDismiss }) {
  if (!constellation) return null

  const { name, starsEarned, starsTotal } = constellation
  const showPips = starsTotal <= 10

  return (
    <div className="fixed top-1/2 left-1/2 z-40 w-80 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300">
      <div className="bg-[#1c2340] border border-yellow-400 border-opacity-50 rounded-xl px-4 py-3 shadow-2xl text-white flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-snug">
            ⭐ Working on <span className="text-yellow-300">{name}</span>
            {' '}— {starsEarned} of {starsTotal} stars
          </p>
          {showPips && (
            <div className="flex gap-1 mt-2">
              {Array.from({ length: starsTotal }, (_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 10 10">
                  {i < starsEarned ? (
                    <polygon points={starPoints(5, 5, 4.5, 1.8)} fill="#FFD700" />
                  ) : (
                    <polygon points={starPoints(5, 5, 4, 1.6)} fill="none" stroke="#ffffff" strokeOpacity="0.4" />
                  )}
                </svg>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onDismiss}
          className="text-white text-opacity-50 hover:text-opacity-100 text-lg leading-none flex-shrink-0 mt-0.5"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  )
}
