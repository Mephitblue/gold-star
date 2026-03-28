export default function AchievementProgressToast({ constellation, onDismiss }) {
  if (!constellation) return null

  const { name, starsEarned, starsTotal } = constellation
  const showPips = starsTotal <= 10

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-80 -translate-x-1/2 transition-transform duration-300">
      <div className="bg-[#0a0e1a] border border-white border-opacity-10 rounded-xl px-4 py-3 shadow-xl text-white flex items-start gap-3">
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
                    <circle cx="5" cy="5" r="4" fill="#FFD700" />
                  ) : (
                    <circle cx="5" cy="5" r="3.5" fill="none" stroke="#ffffff" strokeOpacity="0.4" />
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
