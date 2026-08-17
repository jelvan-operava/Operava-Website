import React from 'react'
import { motion } from 'motion/react'
import {
  Code2,
  Monitor,
  Layers,
  Cpu,
  Terminal,
  Lightbulb,
  GitMerge,
  Database,
  Headphones,
  Wrench,
  LifeBuoy,
  Briefcase,
  Activity,
  FileSpreadsheet,
  FileText,
  UserCheck,
  Sparkles,
  Zap,
  Globe,
  Shield,
  type LucideIcon,
} from 'lucide-react'

// Mapping of service icon keys to Lucide React icon components
const iconMap: Record<string, LucideIcon> = {
  // IT Services
  code: Code2,
  monitor: Monitor,
  layers: Layers,
  settings: Cpu,
  terminal: Terminal,
  lightbulb: Lightbulb,
  'git-merge': GitMerge,
  database: Database,
  cloud: Globe,
  server: Cpu,
  shield: Shield,
  zap: Zap,

  // BPO Services
  headphones: Headphones,
  tool: Wrench,
  'life-buoy': LifeBuoy,
  briefcase: Briefcase,
  'bar-chart': Activity,
  edit: FileSpreadsheet,
  'file-text': FileText,
  'user-check': UserCheck,
  users: UserCheck,
  sparkles: Sparkles,
}

interface ServiceAnimatedIconProps {
  icon: string
  size?: 'md' | 'lg' | 'xl'
  className?: string
  animated?: boolean
  number?: string
  interactive?: boolean
}

export default function ServiceAnimatedIcon({
  icon,
  size = 'lg',
  className = '',
  animated = true,
  interactive = true,
}: ServiceAnimatedIconProps) {
  const IconComponent = iconMap[icon] || Sparkles

  // Size configurations
  const sizeStyles = {
    md: {
      container: 'w-14 h-14',
      vessel: 'w-12 h-12 rounded-xl',
      icon: 'w-6 h-6',
      glow: 'w-16 h-16',
      ring: 'w-14 h-14',
    },
    lg: {
      container: 'w-20 h-20 sm:w-22 sm:h-22',
      vessel: 'w-16 h-16 sm:w-18 sm:h-18 rounded-2xl',
      icon: 'w-8 h-8 sm:w-9 sm:h-9',
      glow: 'w-24 h-24 sm:w-28 sm:h-28',
      ring: 'w-20 h-20 sm:w-22 sm:h-22',
    },
    xl: {
      container: 'w-24 h-24 sm:w-28 sm:h-28',
      vessel: 'w-20 h-20 sm:w-24 sm:h-24 rounded-3xl',
      icon: 'w-10 h-10 sm:w-12 sm:h-12',
      glow: 'w-32 h-32 sm:w-36 sm:h-36',
      ring: 'w-24 h-24 sm:w-28 sm:h-28',
    },
  }[size]

  return (
    <div
      className={`relative flex items-center justify-center select-none ${sizeStyles.container} ${className}`}
      id={`service-icon-${icon}`}
    >
      {/* 1. Pulsing Ambient Background Halo Glow */}
      {animated ? (
        <motion.div
          className={`absolute rounded-full bg-gradient-to-tr from-violet-500/20 via-purple-500/20 to-indigo-400/20 blur-xl pointer-events-none ${sizeStyles.glow}`}
          animate={{
            scale: [0.92, 1.15, 0.92],
            opacity: [0.35, 0.7, 0.35],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ) : (
        <div
          className={`absolute rounded-full bg-violet-500/20 blur-lg pointer-events-none ${sizeStyles.glow}`}
        />
      )}

      {/* 2. Slow-Rotating Orbital Dashed Ring */}
      {animated && (
        <motion.div
          className={`absolute rounded-full border border-dashed border-violet-300/50 dark:border-violet-600/40 pointer-events-none ${sizeStyles.ring}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Orbital Satellite Dot */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-600 shadow-sm shadow-violet-500" />
        </motion.div>
      )}

      {/* 3. Floating Floating Icon Vessel */}
      {animated ? (
        <motion.div
          className={`relative z-10 flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 border border-violet-200/70 shadow-lg shadow-violet-500/10 ${sizeStyles.vessel}`}
          animate={{
            y: [-3, 3, -3],
            rotate: [-1.5, 1.5, -1.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={
            interactive
              ? {
                  scale: 1.12,
                  y: -6,
                  borderColor: 'rgba(124, 58, 237, 0.6)',
                  boxShadow: '0 20px 25px -5px rgba(124, 58, 237, 0.2), 0 8px 10px -6px rgba(124, 58, 237, 0.2)',
                  transition: { duration: 0.25 },
                }
              : undefined
          }
        >
          {/* Subtle Inner Highlight */}
          <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-transparent via-transparent to-white/80 pointer-events-none" />

          {/* Animated Icon Motion */}
          <motion.div
            className="text-violet-700 flex items-center justify-center"
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <IconComponent
              className={`${sizeStyles.icon} text-violet-700 transition-colors duration-300`}
              strokeWidth={1.85}
            />
          </motion.div>
        </motion.div>
      ) : (
        <div
          className={`relative z-10 flex items-center justify-center bg-gradient-to-br from-violet-50 via-white to-purple-50 border border-violet-200/70 shadow-md ${sizeStyles.vessel}`}
        >
          <IconComponent
            className={`${sizeStyles.icon} text-violet-700`}
            strokeWidth={1.85}
          />
        </div>
      )}
    </div>
  )
}
