import { useState, useEffect, useRef } from 'react'
import { CONSTELLATIONS } from '../data/constellations'
import House from './House'

const BG_STARS = [
  { id: 'bg1',  x: 42,  y: 42,  o: 0.30 },
  { id: 'bg2',  x: 78,  y: 25,  o: 0.20 },
  { id: 'bg3',  x: 165, y: 38,  o: 0.35 },
  { id: 'bg4',  x: 258, y: 22,  o: 0.15 },
  { id: 'bg5',  x: 355, y: 45,  o: 0.25 },
  { id: 'bg6',  x: 455, y: 30,  o: 0.30 },
  { id: 'bg7',  x: 548, y: 55,  o: 0.20 },
  { id: 'bg8',  x: 625, y: 35,  o: 0.35 },
  { id: 'bg9',  x: 712, y: 48,  o: 0.15 },
  { id: 'bg10', x: 775, y: 22,  o: 0.28 },
  { id: 'bg11', x: 35,  y: 95,  o: 0.20 },
  { id: 'bg12', x: 175, y: 110, o: 0.30 },
  { id: 'bg13', x: 285, y: 85,  o: 0.18 },
  { id: 'bg14', x: 385, y: 115, o: 0.25 },
  { id: 'bg15', x: 488, y: 92,  o: 0.35 },
  { id: 'bg16', x: 562, y: 78,  o: 0.20 },
  { id: 'bg17', x: 648, y: 98,  o: 0.30 },
  { id: 'bg18', x: 758, y: 88,  o: 0.22 },
  { id: 'bg19', x: 55,  y: 148, o: 0.28 },
  { id: 'bg20', x: 158, y: 138, o: 0.15 },
  { id: 'bg21', x: 268, y: 158, o: 0.32 },
  { id: 'bg22', x: 555, y: 148, o: 0.28 },
  { id: 'bg23', x: 638, y: 168, o: 0.18 },
  { id: 'bg24', x: 765, y: 152, o: 0.35 },
  { id: 'bg25', x: 72,  y: 238, o: 0.22 },
  { id: 'bg26', x: 188, y: 282, o: 0.30 },
  { id: 'bg27', x: 292, y: 272, o: 0.15 },
  { id: 'bg28', x: 572, y: 238, o: 0.25 },
  { id: 'bg29', x: 618, y: 282, o: 0.35 },
  { id: 'bg30', x: 758, y: 272, o: 0.20 },
  { id: 'bg31', x: 38,  y: 315, o: 0.18 },
  { id: 'bg32', x: 152, y: 328, o: 0.28 },
  { id: 'bg33', x: 348, y: 318, o: 0.22 },
  { id: 'bg34', x: 448, y: 282, o: 0.30 },
  { id: 'bg35', x: 548, y: 315, o: 0.15 },
  { id: 'bg36', x: 692, y: 332, o: 0.25 },
  { id: 'bg37', x: 782, y: 318, o: 0.32 },
  { id: 'bg38', x: 95,  y: 368, o: 0.20 },
  { id: 'bg39', x: 492, y: 358, o: 0.18 },
  { id: 'bg40', x: 748, y: 362, o: 0.22 },
]

export default function NightSky({ allocatedStars }) {
  const [animatingStars, setAnimatingStars] = useState(new Set())
  const prevAllocatedRef = useRef(new Set())

  useEffect(() => {
    const newlyFilled = []
    for (const id of allocatedStars) {
      if (!prevAllocatedRef.current.has(id)) {
        newlyFilled.push(id)
      }
    }
    if (newlyFilled.length > 0) {
      setAnimatingStars(new Set(newlyFilled))
      const timer = setTimeout(() => setAnimatingStars(new Set()), 600)
      prevAllocatedRef.current = new Set(allocatedStars)
      return () => clearTimeout(timer)
    }
    prevAllocatedRef.current = new Set(allocatedStars)
  }, [allocatedStars])

  // Build a map of star id -> constellation for connector lines
  const starMap = {}
  CONSTELLATIONS.forEach(c => c.stars.forEach(s => { starMap[s.id] = s }))

  return (
    <svg
      viewBox="0 0 800 500"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect width="800" height="500" fill="#0a0e1a" />

      {/* Decorative background stars */}
      {BG_STARS.map(s => (
        <circle key={s.id} cx={s.x} cy={s.y} r="1" fill="#ffffff" opacity={s.o} />
      ))}

      {/* Constellation connector lines */}
      {CONSTELLATIONS.map(constellation =>
        constellation.lines.map(([aId, bId], i) => {
          const a = starMap[aId]
          const b = starMap[bId]
          if (!a || !b) return null
          return (
            <line
              key={`${constellation.id}-line-${i}`}
              x1={a.x} y1={a.y}
              x2={b.x} y2={b.y}
              stroke="#ffffff"
              strokeOpacity="0.12"
              strokeWidth="0.5"
            />
          )
        })
      )}

      {/* Constellation stars */}
      {CONSTELLATIONS.map(constellation =>
        constellation.stars.map(star => {
          const earned = allocatedStars.has(star.id)
          const animating = animatingStars.has(star.id)
          if (earned) {
            return (
              <circle
                key={star.id}
                cx={star.x}
                cy={star.y}
                r="4"
                fill="#FFD700"
                className={animating ? 'star-fill' : ''}
              />
            )
          }
          return (
            <circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r="3"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.3"
            />
          )
        })
      )}

      {/* House silhouette */}
      <House />
    </svg>
  )
}
