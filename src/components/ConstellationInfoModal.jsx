function starPoints(cx, cy, outerR, innerR) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

export default function ConstellationInfoModal({ constellation, starAchievementMap, onDismiss }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onDismiss} />
      <div className="relative z-10 bg-[#0d1220] border border-yellow-400 border-opacity-40 rounded-2xl p-6 mx-4 max-w-sm w-full shadow-2xl">
        <h2 className="text-white text-xl font-bold mb-1">{constellation.name}</h2>
        <p className="text-yellow-300 text-xs mb-4">
          {constellation.stars.filter(s => starAchievementMap[s.id]).length} / {constellation.stars.length} stars earned
        </p>
        <ul className="space-y-2">
          {constellation.stars.map((star, i) => {
            const achievement = starAchievementMap[star.id]
            return (
              <li key={star.id} className="flex items-start gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mt-0.5">
                  {achievement ? (
                    <polygon points={starPoints(7, 7, 6.5, 2.6)} fill="#FFD700" />
                  ) : (
                    <polygon points={starPoints(7, 7, 6, 2.4)} fill="none" stroke="#ffffff" strokeOpacity="0.3" />
                  )}
                </svg>
                <span className={achievement ? 'text-white text-sm' : 'text-white/30 text-sm italic'}>
                  {achievement ? achievement.title : 'Not yet earned'}
                </span>
              </li>
            )
          })}
        </ul>
        <button
          onClick={onDismiss}
          className="mt-5 text-white/40 hover:text-white/80 text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}
