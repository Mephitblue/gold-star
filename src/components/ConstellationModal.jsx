import confetti from 'canvas-confetti'
import { useEffect } from 'react'

function playChime() {
  const ctx = new AudioContext()
  const notes = [523, 659, 784, 1047] // C5–E5–G5–C6
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = freq
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.12)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.4)
    osc.start(ctx.currentTime + i * 0.12)
    osc.stop(ctx.currentTime + i * 0.12 + 0.4)
  })
}

export default function ConstellationModal({ constellation, onDismiss }) {
  const starCount = Math.min(constellation.stars.length, 10)

  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#FFD700', '#ffffff', '#fffacd'],
      shapes: ['star'],
    })
    playChime()
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-70"
        onClick={onDismiss}
      />
      {/* Card */}
      <div className="relative z-10 bg-[#0d1220] border border-yellow-400 border-opacity-40 rounded-2xl p-8 mx-4 max-w-sm w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">
          {'⭐'.repeat(starCount)}
        </div>
        <h2 className="text-white text-3xl font-bold mb-2">
          {constellation.name}
        </h2>
        <p className="text-yellow-300 text-lg mb-6">
          You've completed the {constellation.name} constellation!
        </p>
        <button
          onClick={onDismiss}
          className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-2 rounded-full transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
