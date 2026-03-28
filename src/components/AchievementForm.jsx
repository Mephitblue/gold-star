import { useState } from 'react'
import CategoryPicker from './CategoryPicker'

function todayString() {
  return new Date().toISOString().slice(0, 10)
}

export default function AchievementForm({ categories, addAchievement, addCategory }) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(todayString)
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? '')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter an achievement title.')
      return
    }
    setError('')
    addAchievement({
      id: crypto.randomUUID(),
      title: title.trim(),
      date,
      categoryId,
      earnedAt: new Date().toISOString(),
    })
    setTitle('')
    setDate(todayString())
  }

  return (
    <div className="p-5 border-b border-gray-100">
      <h1 className="text-xl font-bold text-gray-900 mb-4">
        ⭐ Gold Stars
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={title}
            onChange={e => { setTitle(e.target.value); setError('') }}
            placeholder="What did you accomplish?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <CategoryPicker
            categories={categories}
            selectedId={categoryId}
            onChange={setCategoryId}
            onAddCategory={cat => {
              addCategory(cat)
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-500 text-gray-900 font-semibold py-2.5 rounded-lg transition-colors text-sm"
        >
          Log Achievement ⭐
        </button>
      </form>
    </div>
  )
}
