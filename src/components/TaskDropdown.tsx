import { useState, useEffect, useRef } from 'react'
import type { Task } from '@/types'

interface TaskDropdownProps {
  tasks: Task[]
  activeTask: Task | null
  onSelect: (task: Task) => void
}

export function TaskDropdown({ tasks, activeTask, onSelect }: TaskDropdownProps) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
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
      {/* Chevron — dock item style */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Select task"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? 'var(--slu-item-hover)' : 'var(--slu-item-bg)',
          boxShadow: 'var(--slu-item-shadow)',
          color: 'var(--slu-gray-600)',
          transition: 'background-color 0.2s ease-out',
        }}
        className="w-7 h-7 rounded-[7px] shrink-0 flex items-center justify-center text-[10px] active:scale-90 cursor-pointer"
      >
        <span
          style={{
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s ease',
          }}
        >
          ▼
        </span>
      </button>

      {/* Dropdown panel — slu-std-popover style */}
      {open && (
        <div
          style={{ background: 'var(--slu-gray-50)', boxShadow: 'var(--slu-pop-shadow)' }}
          className="absolute bottom-full left-0 mb-2 w-64 z-50 rounded-[10px] overflow-hidden py-1"
        >
          {tasks.length === 0 ? (
            <p style={{ color: 'var(--slu-gray-600)' }} className="text-xs px-3 py-2.5">
              🎉 All tasks done!
            </p>
          ) : (
            tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                isActive={activeTask?.id === task.id}
                onSelect={() => { onSelect(task); setOpen(false) }}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function TaskItem({
  task,
  isActive,
  onSelect,
}: {
  task: Task
  isActive: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--slu-item-hover)' : 'transparent',
        transition: 'background-color 0.15s ease-out',
      }}
      className="w-full text-left px-3 py-2 flex items-start gap-2 cursor-pointer"
    >
      <span style={{ color: 'var(--slu-gray-600)' }} className="text-xs mt-0.5 w-3 shrink-0 font-mono">
        {isActive ? '✓' : ''}
      </span>
      <div className="min-w-0">
        <p
          style={{ color: isActive ? 'var(--slu-gray-900)' : 'var(--slu-gray-600)' }}
          className={`text-xs leading-snug truncate ${isActive ? 'font-medium' : ''}`}
        >
          {task.title}
        </p>
        {task.goal && (
          <p style={{ color: 'var(--slu-gray-600)' }} className="text-[11px] truncate italic mt-0.5 opacity-70">
            {task.goal}
          </p>
        )}
      </div>
    </button>
  )
}
