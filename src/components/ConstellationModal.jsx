export default function ConstellationModal({ constellation, onDismiss }) {
  const starCount = Math.min(constellation.stars.length, 10)

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
