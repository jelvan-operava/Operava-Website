export default function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-0 overflow-hidden" aria-hidden="true">
      {/* Background grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6D28D9" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main SVG visualization */}
      <svg
        viewBox="0 0 560 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection lines */}
        <line x1="280" y1="240" x2="140" y2="140" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="280" y1="240" x2="420" y2="140" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="280" y1="240" x2="100" y2="280" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="280" y1="240" x2="460" y2="280" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="280" y1="240" x2="200" y2="380" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="280" y1="240" x2="360" y2="380" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
        <line x1="140" y1="140" x2="420" y2="140" stroke="#6D28D9" strokeWidth="0.5" strokeOpacity="0.2" />
        <line x1="100" y1="280" x2="460" y2="280" stroke="#6D28D9" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Outer orbit ring */}
        <circle cx="280" cy="240" r="160" stroke="#6D28D9" strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="2 6" />
        <circle cx="280" cy="240" r="110" stroke="#6D28D9" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 4" />

        {/* Central core */}
        <circle cx="280" cy="240" r="48" fill="#4C1D95" fillOpacity="0.08" />
        <circle cx="280" cy="240" r="32" fill="#6D28D9" fillOpacity="0.12" />
        <circle cx="280" cy="240" r="20" fill="#6D28D9" fillOpacity="0.9" />
        <text x="280" y="245" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="0.06em">OPERAVA</text>

        {/* Node: Technology */}
        <circle cx="140" cy="140" r="30" fill="#EDE9FE" />
        <circle cx="140" cy="140" r="30" stroke="#6D28D9" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
        <text x="140" y="135" textAnchor="middle" fill="#4C1D95" fontSize="7.5" fontWeight="700">TECHNOLOGY</text>
        <text x="140" y="146" textAnchor="middle" fill="#6D28D9" fontSize="7">Software · Cloud</text>

        {/* Node: BPO */}
        <circle cx="420" cy="140" r="30" fill="#EDE9FE" />
        <circle cx="420" cy="140" r="30" stroke="#6D28D9" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
        <text x="420" y="135" textAnchor="middle" fill="#4C1D95" fontSize="7.5" fontWeight="700">WORKFORCE</text>
        <text x="420" y="146" textAnchor="middle" fill="#6D28D9" fontSize="7">BPO · Operations</text>

        {/* Node: Global */}
        <circle cx="100" cy="280" r="24" fill="#F5F3FF" />
        <circle cx="100" cy="280" r="24" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <text x="100" y="276" textAnchor="middle" fill="#4C1D95" fontSize="7" fontWeight="700">GLOBAL</text>
        <text x="100" y="286" textAnchor="middle" fill="#6D28D9" fontSize="6.5">Remote</text>

        {/* Node: Data */}
        <circle cx="460" cy="280" r="24" fill="#F5F3FF" />
        <circle cx="460" cy="280" r="24" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <text x="460" y="276" textAnchor="middle" fill="#4C1D95" fontSize="7" fontWeight="700">DATA</text>
        <text x="460" y="286" textAnchor="middle" fill="#6D28D9" fontSize="6.5">Insights</text>

        {/* Node: Process */}
        <circle cx="200" cy="380" r="24" fill="#F5F3FF" />
        <circle cx="200" cy="380" r="24" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <text x="200" y="376" textAnchor="middle" fill="#4C1D95" fontSize="7" fontWeight="700">PROCESS</text>
        <text x="200" y="386" textAnchor="middle" fill="#6D28D9" fontSize="6.5">Efficient</text>

        {/* Node: Scale */}
        <circle cx="360" cy="380" r="24" fill="#F5F3FF" />
        <circle cx="360" cy="380" r="24" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.4" fill="none" />
        <text x="360" y="376" textAnchor="middle" fill="#4C1D95" fontSize="7" fontWeight="700">SCALE</text>
        <text x="360" y="386" textAnchor="middle" fill="#6D28D9" fontSize="6.5">Growth</text>

        {/* Animated pulse rings */}
        <circle cx="280" cy="240" r="20" stroke="#6D28D9" strokeWidth="1" strokeOpacity="0.6" fill="none">
          <animate attributeName="r" values="20;60;20" dur="4s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.6;0;0.6" dur="4s" repeatCount="indefinite" />
        </circle>

        {/* Small floating data dots */}
        <circle cx="210" cy="170" r="3" fill="#6D28D9" fillOpacity="0.5">
          <animate attributeName="cy" values="170;160;170" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="200" r="2" fill="#6D28D9" fillOpacity="0.4">
          <animate attributeName="cy" values="200;190;200" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="320" cy="300" r="2.5" fill="#6D28D9" fillOpacity="0.3">
          <animate attributeName="cy" values="300;290;300" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="180" cy="310" r="2" fill="#6D28D9" fillOpacity="0.35">
          <animate attributeName="cy" values="310;302;310" dur="3.5s" repeatCount="indefinite" />
        </circle>

        {/* Translucent shape accents */}
        <ellipse cx="440" cy="100" rx="60" ry="40" fill="#6D28D9" fillOpacity="0.04" />
        <ellipse cx="110" cy="380" rx="50" ry="35" fill="#6D28D9" fillOpacity="0.04" />
      </svg>
    </div>
  )
}
