import type { Task } from '@/types'

interface TaskDisplayProps {
  task: Task | null
}

export function TaskDisplay({ task }: TaskDisplayProps) {
  if (!task) {
    return (
      <span style={{ color: 'var(--slu-gray-600)' }} className="text-xs italic">
        No task selected
      </span>
    )
  }
  return (
    <div className="flex flex-col justify-center min-w-0 flex-1">
      <span style={{ color: 'var(--slu-gray-900)' }} className="text-xs font-medium leading-snug truncate">
        {task.title}
      </span>
      {task.goal && (
        <span style={{ color: 'var(--slu-gray-600)' }} className="text-[11px] italic leading-snug truncate mt-0.5">
          {task.goal}
        </span>
      )}
    </div>
  )
}
