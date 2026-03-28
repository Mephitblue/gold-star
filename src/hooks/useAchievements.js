import { useState, useEffect } from 'react'
import { DEFAULT_CATEGORIES } from '../data/categories'

const STORAGE_KEY = 'goldstars_v1'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { achievements: [], categories: [...DEFAULT_CATEGORIES] }
}

export function useAchievements() {
  const [state, setState] = useState(loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  function addAchievement(achievement) {
    setState(prev => ({ ...prev, achievements: [...prev.achievements, achievement] }))
  }

  function addCategory(category) {
    setState(prev => ({ ...prev, categories: [...prev.categories, category] }))
  }

  function deleteAchievement(id) {
    setState(prev => ({ ...prev, achievements: prev.achievements.filter(a => a.id !== id) }))
  }

  function clearAll() {
    setState({ achievements: [], categories: [...DEFAULT_CATEGORIES] })
  }

  return {
    achievements: state.achievements,
    categories: state.categories,
    addAchievement,
    addCategory,
    deleteAchievement,
    clearAll,
  }
}
