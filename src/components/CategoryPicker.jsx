import { useState } from 'react'

const EMOJI_OPTIONS = ['🌟','🎯','🏆','🎓','🚀','💡','🎵','🌿','✈️','🧩','🔥','💪']

export default function CategoryPicker({ categories, selectedId, onChange, onAddCategory }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newEmoji, setNewEmoji] = useState('🌟')

  function handleAdd() {
    if (!newLabel.trim()) return
    const category = {
      id: crypto.randomUUID(),
      label: newLabel.trim(),
      emoji: newEmoji,
      isCustom: true,
    }
    onAddCategory(category)
    onChange(category.id)
    setNewLabel('')
    setNewEmoji('🌟')
    setShowAddForm(false)
  }

  return (
    <div>
      <select
        value={selectedId}
        onChange={e => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.emoji} {cat.label}
          </option>
        ))}
      </select>

      {!showAddForm && (
        <button
          type="button"
          onClick={() => setShowAddForm(true)}
          className="mt-1.5 text-xs text-yellow-600 hover:text-yellow-700 font-medium"
        >
          + Add category
        </button>
      )}

      {showAddForm && (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <input
            type="text"
            value={newLabel}
            onChange={e => setNewLabel(e.target.value)}
            placeholder="Category name"
            className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <div className="flex flex-wrap gap-1.5 mb-2">
            {EMOJI_OPTIONS.map(emoji => (
              <button
                key={emoji}
                type="button"
                onClick={() => setNewEmoji(emoji)}
                className={`text-lg w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                  newEmoji === emoji
                    ? 'bg-yellow-100 ring-2 ring-yellow-400'
                    : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-sm font-semibold py-1.5 rounded-md transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => { setShowAddForm(false); setNewLabel(''); setNewEmoji('🌟') }}
              className="text-sm text-gray-500 hover:text-gray-700 px-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
