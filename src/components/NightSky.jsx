import { useState, useEffect, useRef } from 'react'
import { CONSTELLATIONS } from '../data/constellations'
import House from './House'

function starPoints(cx, cy, outerR, innerR) {
  const pts = []
  for (let i = 0; i < 10; i++) {
    const angle = (i * Math.PI) / 5 - Math.PI / 2
    const r = i % 2 === 0 ? outerR : innerR
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

function labelPos(constellation) {
  const xs = constellation.stars.map(s => s.x)
  const ys = constellation.stars.map(s => s.y)
  const cx = Math.min(Math.max(xs.reduce((a, b) => a + b, 0) / xs.length, 30), 770)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  return { x: cx, y: minY < 25 ? maxY + 18 : minY - 10 }
}

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

export default function NightSky({ allocatedStars, onConstellationClick, completingConstellationId }) {
  const [animatingStars, setAnimatingStars] = useState(new Set())
  const [hoveredId, setHoveredId] = useState(null)
  const [drawingId, setDrawingId] = useState(null)
  const [drawPhase, setDrawPhase] = useState(0)
  const prevAllocatedRef = useRef(new Set())

  useEffect(() => {
    if (!completingConstellationId) return
    const constellation = CONSTELLATIONS.find(c => c.id === completingConstellationId)
    setDrawingId(completingConstellationId)
    setDrawPhase(1)
    const raf = requestAnimationFrame(() => setDrawPhase(2))
    const totalMs = (constellation?.lines.length ?? 0) * 150 + 600
    const timer = setTimeout(() => { setDrawingId(null); setDrawPhase(0) }, totalMs)
    return () => { cancelAnimationFrame(raf); clearTimeout(timer) }
  }, [completingConstellationId])

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

  return (
    <svg
      viewBox="0 0 800 500"
      width="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      {/* Background */}
      <rect width="800" height="500" fill="#0a0e1a" />

      {/* Twinkling background stars */}
      {BG_STARS.map((s, i) => (
        <g key={s.id} opacity={s.o}>
          <polygon
            points={starPoints(s.x, s.y, 1.8, 0.7)}
            fill="#ffffff"
            className="twinkle"
            style={{
              animationDelay: `${(i * 0.37) % 4}s`,
              animationDuration: `${2.5 + (i * 0.13) % 2}s`,
            }}
          />
        </g>
      ))}

      {/* Constellations — lines, stars, and label all in one group per constellation */}
      {CONSTELLATIONS.map(constellation => {
        const isHovered = hoveredId === constellation.id
        const isComplete = constellation.stars.every(s => allocatedStars.has(s.id))
        const hasAny = constellation.stars.some(s => allocatedStars.has(s.id))
        const lp = labelPos(constellation)

        return (
          <g
            key={constellation.id}
            onClick={() => onConstellationClick && onConstellationClick(constellation)}
            onMouseEnter={() => setHoveredId(constellation.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Connector lines */}
            {constellation.lines.map(([aId, bId], i) => {
              const a = constellation.stars.find(s => s.id === aId)
              const b = constellation.stars.find(s => s.id === bId)
              if (!a || !b) return null
              const lineLength = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y))
              const isDrawing = drawingId === constellation.id
              return (
                <line
                  key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={isComplete ? '#FFD700' : '#ffffff'}
                  strokeOpacity={isHovered ? 0.55 : isComplete ? 0.25 : 0.12}
                  strokeWidth={isHovered ? 1 : 0.5}
                  style={{
                    strokeDasharray: isDrawing ? lineLength : undefined,
                    strokeDashoffset: isDrawing ? (drawPhase === 2 ? 0 : lineLength) : undefined,
                    transition: isDrawing && drawPhase === 2
                      ? `stroke-dashoffset 0.5s ease-out ${i * 0.15}s, stroke-opacity 0.2s, stroke-width 0.2s`
                      : 'stroke-opacity 0.2s, stroke-width 0.2s',
                  }}
                />
              )
            })}

            {/* Stars */}
            {constellation.stars.map(star => {
              const earned = allocatedStars.has(star.id)
              const animating = animatingStars.has(star.id)
              return (
                <g key={star.id}>
                  <circle cx={star.x} cy={star.y} r="12" fill="transparent" />
                  {earned ? (
                    <polygon
                      points={starPoints(star.x, star.y, 6, 2.4)}
                      fill="#FFD700"
                      className={animating ? 'star-fill' : ''}
                      style={isHovered ? { filter: 'drop-shadow(0 0 5px #FFD700)' } : {}}
                    />
                  ) : (
                    <polygon
                      points={starPoints(star.x, star.y, 5, 2)}
                      fill={isHovered ? 'rgba(255,215,0,0.12)' : 'none'}
                      stroke="#ffffff"
                      strokeOpacity={isHovered ? 0.65 : 0.3}
                      style={{ transition: 'stroke-opacity 0.2s' }}
                    />
                  )}
                </g>
              )
            })}

            {/* Constellation name label */}
            <text
              x={lp.x}
              y={lp.y}
              textAnchor="middle"
              fill={isComplete ? '#FFD700' : '#ffffff'}
              fillOpacity={isHovered ? 1 : isComplete ? 0.65 : hasAny ? 0.3 : 0.18}
              fontSize="7.5"
              fontFamily="system-ui, sans-serif"
              letterSpacing="0.8"
              style={{ transition: 'fill-opacity 0.2s', userSelect: 'none', pointerEvents: 'none' }}
            >
              {constellation.name.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* House silhouette */}
      <House />
    </svg>
  )
}
