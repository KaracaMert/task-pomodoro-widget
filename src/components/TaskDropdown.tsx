import { useState, useEffect, useRef } from 'react'
import type { Task } from '@/types'

interface TaskDropdownProps {
  tasks: Task[]
  activeTask: Task | null
  onSelect: (task: Task) => void
}

export function TaskDropdown({ tasks, activeTask, onSelect }: TaskDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-white/70 text-xs px-1 py-0.5 hover:text-white transition-colors"
        aria-label="Select task"
      >
        <span
          style={{
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-64 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 shadow-xl py-1 z-50">
          {tasks.length === 0 ? (
            <p className="text-white/40 text-xs px-3 py-2">🎉 All tasks done!</p>
          ) : (
            tasks.map(task => (
              <button
                key={task.id}
                onClick={() => { onSelect(task); setOpen(false) }}
                className="w-full text-left px-3 py-1.5 hover:bg-white/10 transition-colors flex items-start gap-2"
              >
                <span className="text-white/40 text-xs mt-0.5 w-3 shrink-0">
                  {activeTask?.id === task.id ? '✓' : ''}
                </span>
                <div className="min-w-0">
                  <p className={`text-sm truncate ${activeTask?.id === task.id ? 'text-white font-medium' : 'text-white/80'}`}>
                    {task.title}
                  </p>
                  {task.goal && (
                    <p className="text-white/40 text-xs truncate italic">{task.goal}</p>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
