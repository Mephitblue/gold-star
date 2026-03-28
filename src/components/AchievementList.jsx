function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function AchievementList({ achievements, categories }) {
  const categoryMap = Object.fromEntries(categories.map(c => [c.id, c]))
  const sorted = [...achievements].reverse()

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4">
      <p className="text-sm font-semibold text-gray-500 mb-3">
        ⭐ {achievements.length} achievement{achievements.length !== 1 ? 's' : ''}
      </p>

      {sorted.length === 0 ? (
        <p className="text-sm text-gray-400 text-center mt-8 leading-relaxed">
          Log your first achievement<br />to light up the First Star.
        </p>
      ) : (
        <ul className="space-y-2">
          {sorted.map(a => {
            const cat = categoryMap[a.categoryId]
            return (
              <li
                key={a.id}
                className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
              >
                <span className="text-2xl leading-none mt-0.5">{cat?.emoji ?? '⭐'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(a.date)}
                    {cat && (
                      <span className="ml-2 text-gray-400">{cat.label}</span>
                    )}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
