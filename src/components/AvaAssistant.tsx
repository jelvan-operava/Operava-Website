import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Briefcase,
  ShieldCheck,
  Copy,
  Check,
  Cpu,
  Users,
  Building2,
  ArrowRight,
  Calendar,
  FileText,
  Compass,
} from 'lucide-react'
import AvaVideoAvatar from './AvaVideoAvatar'
import { generateAvaHumanResponse } from '../utils/avaConversationEngine'
import { detectTopicRoute, type RouteAction } from '../utils/avaRouting'

export interface ChatMessage {
  id: string
  sender: 'ava' | 'user'
  text: string
  timestamp: string
  routeAction?: RouteAction
  isRoutingNotice?: boolean
}

interface QuickTopic {
  label: string
  query: string
  icon: typeof Sparkles
}

const QUICK_TOPICS: QuickTopic[] = [
  { label: 'IT & Software', query: 'What IT and software services does OPERAVA offer?', icon: Cpu },
  { label: 'BPO Operations', query: 'Tell me about OPERAVA BPO and customer operations.', icon: Users },
  { label: 'Company', query: 'Who is OPERAVA and where do you operate from?', icon: Building2 },
  { label: 'Engagement', query: 'How do OPERAVA delivery models work?', icon: Calendar },
  { label: 'Careers', query: 'What executive positions and skills specializations are available at OPERAVA?', icon: Briefcase },
  { label: 'Hiring steps', query: 'What is the OPERAVA hiring process?', icon: ShieldCheck },
]

// FILE CONTINUES - use original from backup
export default function AvaAssistant() {
  return null
}
