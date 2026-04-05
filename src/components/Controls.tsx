import { useEffect, useState } from 'react'

interface ControlsProps {
  isRunning: boolean
  justCompleted: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

function DockButton({
  onClick,
  title,
  pulse,
  dim,
  children,
}: {
  onClick: () => void
  title: string
  pulse?: boolean
  dim?: boolean
  children: React.ReactNode
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--slu-item-hover)' : 'var(--slu-item-bg)',
        boxShadow: 'var(--slu-item-shadow)',
        color: dim && !hovered ? 'var(--slu-gray-600)' : 'var(--slu-gray-900)',
        transition: 'background-color 0.2s ease-out, color 0.2s ease-out, transform 0.1s ease-out',
      }}
      className={`w-7 h-7 rounded-[7px] shrink-0 flex items-center justify-center
        active:scale-90 cursor-pointer
        ${pulse ? 'animate-pulse' : ''}`}
    >
      {children}
    </button>
  )
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

  return (
    <div className="flex items-center gap-1 shrink-0">
      <DockButton
        onClick={isRunning ? onPause : onStart}
        title={isRunning ? 'Pause (Space)' : 'Start (Space)'}
        pulse={justCompleted && !isRunning}
      >
        <span className="text-[11px]">{isRunning ? '⏸' : '▶'}</span>
      </DockButton>
      <DockButton onClick={onReset} title="Reset (R)" dim>
        <span className="text-sm">↺</span>
      </DockButton>
    </div>
  )
}
