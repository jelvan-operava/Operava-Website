import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'motion/react'
import {
  Clock,
  FileCheck2,
  RotateCcw,
  ArrowRight,
  Copy,
  Check,
  Building2,
  Mail,
  User,
  Globe2,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'

export interface SubmittedContactData {
  name: string
  company: string
  email: string
  phone: string
  country: string
  service: string
  teamModel: string
  timeline: string
  description: string
  ndaConsent: boolean
  referenceId: string
  submittedAt: string
}

interface ContactSuccessStateProps {
  data: SubmittedContactData
  onReset: () => void
}

export default function ContactSuccessState({ data, onReset }: ContactSuccessStateProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyRef = () => {
    navigator.clipboard.writeText(data.referenceId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
    exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  }

  return (
    <motion.div
      id="contact-success-state"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-8 sm:p-10 bg-gradient-to-b from-emerald-50/70 via-white to-white border-2 border-emerald-200/90 rounded-3xl shadow-xl shadow-emerald-950/5 relative overflow-hidden"
    >
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-100/30 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20" />

      {/* 1. Interactive Lottie-Style Animated Badge & Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8 relative z-10">
        
        {/* Animated Checkmark Badge with Concentric Ripples */}
        <div className="relative flex items-center justify-center shrink-0">
          {/* Outer Ripple Wave 1 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.45, 1.8], opacity: [0.6, 0.25, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="absolute w-16 h-16 rounded-2xl bg-emerald-400/40"
          />
          {/* Outer Ripple Wave 2 */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.8 }}
            animate={{ scale: [1, 1.35, 1.6], opacity: [0.5, 0.2, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
            className="absolute w-16 h-16 rounded-2xl bg-emerald-500/30"
          />

          {/* Floating Confetti Sparkles */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0.9], opacity: [0, 1, 0.8] }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -top-2 -right-2 text-amber-500"
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0.7], opacity: [0, 1, 0.6] }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-1 -left-2 text-emerald-500"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Success SVG Disc */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 18,
              delay: 0.1,
            }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/35 relative z-10"
          >
            <svg
              className="w-9 h-9"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Animated Path Circle outline */}
              <motion.circle
                cx="24"
                cy="24"
                r="20"
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
              />
              {/* Animated Check Stroke */}
              <motion.path
                d="M14 24.5L21 31.5L34 17.5"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.35, duration: 0.45, ease: 'easeOut' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Title & Reference */}
        <div className="flex-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <FileCheck2 className="w-3.5 h-3.5" />
            Inquiry Successfully Submitted & Verified
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Thank you, {data.name}!
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm text-gray-600">
            <span>Reference Tracking ID:</span>
            <div className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-800 font-mono font-bold px-2.5 py-0.5 rounded-lg border border-violet-200 shadow-2xs">
              <span>{data.referenceId}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                title="Copy reference code"
                className="hover:text-violet-950 transition-colors cursor-pointer p-0.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            {copied && (
              <span className="text-xs font-medium text-emerald-600 animate-in fade-in duration-150">
                Copied to clipboard!
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. Submission Details Summary Card */}
      <motion.div
        variants={itemVariants}
        className="p-6 bg-white/95 backdrop-blur-sm border border-gray-200/90 rounded-2xl mb-8 shadow-xs relative z-10"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Inquiry Summary Details
          </span>
          <span className="text-xs text-gray-400 font-medium">{data.submittedAt}</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Contact Person</p>
              <p className="font-semibold text-gray-900">{data.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Work Email</p>
              <p className="font-semibold text-violet-700 font-mono">{data.email}</p>
            </div>
          </div>

          {data.company && (
            <div className="flex items-start gap-2.5">
              <Building2 className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Company / Organization</p>
                <p className="font-semibold text-gray-900">{data.company}</p>
              </div>
            </div>
          )}

          {data.country && (
            <div className="flex items-start gap-2.5">
              <Globe2 className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Country / Region</p>
                <p className="font-semibold text-gray-900">{data.country}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-2.5">
            <Briefcase className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Selected Service</p>
              <p className="font-semibold text-gray-900">{data.service}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Layers className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Delivery Model</p>
              <p className="font-semibold text-gray-900">{data.teamModel}</p>
            </div>
          </div>
        </div>

        {data.description && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 font-medium mb-1.5">Project Scope / Requirements</p>
            <p className="text-xs sm:text-sm text-gray-700 italic bg-gray-50/80 p-3.5 rounded-xl border border-gray-100 leading-relaxed">
              "{data.description}"
            </p>
          </div>
        )}
      </motion.div>

      {/* 3. Next Steps Timeline */}
      <motion.div variants={itemVariants} className="mb-8 relative z-10">
        <h4 className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-violet-600" />
          What Happens Next?
        </h4>
        <div className="grid sm:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:border-violet-200 transition-colors">
            <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center mb-2.5">
              01
            </div>
            <h5 className="text-xs font-bold text-gray-900 mb-1">Scope Review</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              Our solutions team reviews your technical stack and delivery requirements within 24 hours.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:border-violet-200 transition-colors">
            <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center mb-2.5">
              02
            </div>
            <h5 className="text-xs font-bold text-gray-900 mb-1">Direct Outreach</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              We send a detailed follow-up email to <span className="font-semibold text-gray-800">{data.email}</span> with scheduling options.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-2xs hover:border-violet-200 transition-colors">
            <div className="w-7 h-7 rounded-xl bg-violet-100 text-violet-700 text-xs font-black flex items-center justify-center mb-2.5">
              03
            </div>
            <h5 className="text-xs font-bold text-gray-900 mb-1">Tailored Proposal</h5>
            <p className="text-xs text-gray-600 leading-relaxed">
              We provide resource allocation, transparent pricing, and NDA execution prior to kickoff.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 4. Action Buttons */}
      <motion.div
        variants={itemVariants}
        className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-emerald-200/80 relative z-10"
      >
        <button
          id="submit-another-inquiry-btn"
          onClick={onReset}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-gray-500" />
          Submit Another Inquiry
        </button>

        <div className="flex items-center gap-3">
          <Link
            to="/services/it"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-violet-700 hover:bg-violet-800 active:scale-[0.98] transition-all shadow-md shadow-violet-700/20"
          >
            Explore IT & BPO Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* Trust Footer */}
      <motion.div variants={itemVariants} className="mt-4 pt-3 flex items-center gap-2 text-[11px] text-gray-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Your data is confidential and protected under strict Philippine and global data privacy standards.</span>
      </motion.div>
    </motion.div>
  )
}
