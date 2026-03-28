export default function House() {
  return (
    <g>
      {/* Chimney */}
      <rect x="442" y="298" width="24" height="48" fill="#1a1f2e" />
      {/* Roof */}
      <polygon points="268,378 532,378 400,272" fill="#1a1f2e" />
      {/* Main building */}
      <rect x="298" y="375" width="204" height="125" fill="#1a1f2e" />
      {/* Left window warm glow */}
      <rect x="322" y="398" width="42" height="36" rx="3" fill="#FFD580" opacity="0.8" />
      {/* Right window warm glow */}
      <rect x="436" y="398" width="42" height="36" rx="3" fill="#FFD580" opacity="0.8" />
      {/* Window cross-bars */}
      <line x1="343" y1="398" x2="343" y2="434" stroke="#1a1f2e" strokeWidth="1.5" />
      <line x1="322" y1="416" x2="364" y2="416" stroke="#1a1f2e" strokeWidth="1.5" />
      <line x1="457" y1="398" x2="457" y2="434" stroke="#1a1f2e" strokeWidth="1.5" />
      <line x1="436" y1="416" x2="478" y2="416" stroke="#1a1f2e" strokeWidth="1.5" />
      {/* Door */}
      <rect x="381" y="434" width="38" height="66" rx="3" fill="#0d1117" />
      {/* Door knob */}
      <circle cx="414" cy="469" r="2.5" fill="#2a2f3e" />
    </g>
  )
}
