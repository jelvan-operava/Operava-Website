export interface PurpleRunningBorderBeamProps {
  duration?: number
  delay?: number
  rx?: number
}

export default function PurpleRunningBorderBeam({
  duration = 4.5,
  delay = 0,
  rx = 24,
}: PurpleRunningBorderBeamProps) {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-3xl">
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle static border frame */}
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx={rx}
          fill="none"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1.5"
        />

        {/* Running Purple Outer Ambient Neon Halo */}
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx={rx}
          fill="none"
          stroke="#9333ea"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="1000"
          opacity="0.85"
          style={{
            strokeDasharray: '150 850',
            animation: `beamRun ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.95)) drop-shadow(0 0 20px rgba(147, 51, 234, 0.75))',
          }}
        />

        {/* Running Vivid Purple/Violet Straight Light Beam */}
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx={rx}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength="1000"
          style={{
            strokeDasharray: '120 880',
            animation: `beamRun ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            filter: 'drop-shadow(0 0 4px #e9d5ff)',
          }}
        />

        {/* Bright White Leading Edge Spark */}
        <rect
          x="1.5"
          y="1.5"
          width="calc(100% - 3px)"
          height="calc(100% - 3px)"
          rx={rx}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength="1000"
          style={{
            strokeDasharray: '30 970',
            animation: `beamRun ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      </svg>
    </div>
  )
}
