import { useEffect } from 'react'

interface ControlsProps {
  isRunning: boolean
  justCompleted: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

export function Controls({ isRunning, justCompleted, onStart, onPause, onReset }: ControlsProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.code === 'Space') {
        e.preventDefault()
        isRunning ? onPause() : onStart()
      }
      if (e.key === 'r' || e.key === 'R') {
        onReset()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isRunning, onStart, onPause, onReset])

  const playPulse = justCompleted && !isRunning

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={isRunning ? onPause : onStart}
        title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs text-white
          bg-black/50 hover:bg-black/70 active:scale-95 transition-all
          ${playPulse ? 'animate-pulse ring-1 ring-white/40' : ''}`}
      >
        {isRunning ? '⏸' : '▶'}
      </button>
      <button
        onClick={onReset}
        title="Reset (R)"
        className="w-7 h-7 rounded-full flex items-center justify-center text-sm text-white/60
          bg-black/50 hover:bg-black/70 active:scale-95 transition-all hover:text-white/90"
      >
        ↺
      </button>
    </div>
  )
}
