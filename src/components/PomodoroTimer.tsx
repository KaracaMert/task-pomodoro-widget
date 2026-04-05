import type { PomodoroPhase } from '@/types'

const PHASE_ICONS: Record<PomodoroPhase, string> = {
  'work': '🔴',
  'short-break': '🟢',
  'long-break': '🔵',
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function getRingColor(ratio: number): string {
  if (ratio > 0.5) return '#22c55e'  // green  — plenty of time
  if (ratio > 0.25) return '#eab308' // yellow — getting low
  return '#ef4444'                   // red    — almost done
}

interface PomodoroTimerProps {
  phase: PomodoroPhase
  timeRemaining: number
  totalDuration: number
}

const RADIUS = 13
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function PomodoroTimer({ phase, timeRemaining, totalDuration }: PomodoroTimerProps) {
  const ratio = timeRemaining / totalDuration
  const strokeDashoffset = CIRCUMFERENCE * ratio
  const color = getRingColor(ratio)

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {/* Circular progress ring */}
      <div className="relative w-8 h-8">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 34 34">
          {/* Background track */}
          <circle
            cx="17" cy="17" r={RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="2.5"
          />
          {/* Progress arc */}
          <circle
            cx="17" cy="17" r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s linear, stroke 0.5s ease' }}
          />
        </svg>
        {/* Phase icon centered inside ring */}
        <span className="absolute inset-0 flex items-center justify-center text-[10px] leading-none">
          {PHASE_ICONS[phase]}
        </span>
      </div>

      {/* MM:SS countdown */}
      <span className="font-mono text-xs font-medium text-white/90 tabular-nums tracking-wide">
        {formatTime(timeRemaining)}
      </span>
    </div>
  )
}
