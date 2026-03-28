import { useState, useEffect, useRef } from 'react'
import { useAchievements } from './hooks/useAchievements'
import {
  CONSTELLATIONS,
  getAllocatedStars,
  getStarAchievementMap,
  isConstellationComplete,
  getActiveConstellation,
} from './data/constellations'
import NightSky from './components/NightSky'
import StatsBar from './components/StatsBar'
import AchievementForm from './components/AchievementForm'
import AchievementList from './components/AchievementList'
import ConstellationModal from './components/ConstellationModal'
import ConstellationInfoModal from './components/ConstellationInfoModal'
import AchievementProgressToast from './components/AchievementProgressToast'

export default function App() {
  const { achievements, categories, addAchievement, addCategory, clearAll } = useAchievements()
  const [completedConstellation, setCompletedConstellation] = useState(null)
  const [infoConstellation, setInfoConstellation] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimerRef = useRef(null)
  const prevLengthRef = useRef(achievements.length)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('reset')) {
      clearAll()
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  const allocatedStars = getAllocatedStars(achievements, CONSTELLATIONS)
  const starAchievementMap = getStarAchievementMap(achievements, CONSTELLATIONS)

  useEffect(() => {
    if (achievements.length <= prevLengthRef.current) {
      prevLengthRef.current = achievements.length
      return
    }

    const newAllocated = getAllocatedStars(achievements, CONSTELLATIONS)
    const oldAllocated = getAllocatedStars(achievements.slice(0, -1), CONSTELLATIONS)

    const newlyCompleted = CONSTELLATIONS.find(
      c => isConstellationComplete(c, newAllocated) && !isConstellationComplete(c, oldAllocated)
    )

    if (newlyCompleted) {
      setCompletedConstellation(newlyCompleted)
      setToast(null)
      clearTimeout(toastTimerRef.current)
    } else {
      const active = getActiveConstellation(achievements, CONSTELLATIONS)
      setToast(active)
      clearTimeout(toastTimerRef.current)
      toastTimerRef.current = setTimeout(() => setToast(null), 4000)
    }

    prevLengthRef.current = achievements.length
  }, [achievements.length])

  function dismissToast() {
    clearTimeout(toastTimerRef.current)
    setToast(null)
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#0a0e1a]">
      {/* Sky panel */}
      <div className="relative h-56 lg:h-auto lg:flex-1 flex-shrink-0">
        <NightSky allocatedStars={allocatedStars} onConstellationClick={setInfoConstellation} />
        <StatsBar achievements={achievements} allocatedStars={allocatedStars} />
      </div>

      {/* Right panel */}
      <div className="flex-1 lg:flex-none lg:w-96 flex flex-col bg-gray-50 overflow-hidden">
        <AchievementForm
          categories={categories}
          addAchievement={addAchievement}
          addCategory={addCategory}
        />
        <AchievementList
          achievements={achievements}
          categories={categories}
        />
      </div>

      {completedConstellation && (
        <ConstellationModal
          constellation={completedConstellation}
          onDismiss={() => setCompletedConstellation(null)}
        />
      )}

      {infoConstellation && !completedConstellation && (
        <ConstellationInfoModal
          constellation={infoConstellation}
          starAchievementMap={starAchievementMap}
          onDismiss={() => setInfoConstellation(null)}
        />
      )}

      <AchievementProgressToast
        constellation={toast}
        onDismiss={dismissToast}
      />
    </div>
  )
}
