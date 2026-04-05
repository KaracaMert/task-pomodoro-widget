import type { Task } from '@/types'

interface TaskDisplayProps {
  task: Task | null
}

export function TaskDisplay({ task }: TaskDisplayProps) {
  if (!task) {
    return <span className="text-white/50 text-sm">No task selected</span>
  }
  return (
    <div className="flex flex-col min-w-0">
      <span className="text-white text-sm font-medium truncate">{task.title}</span>
      {task.goal && (
        <span className="text-white/60 text-xs italic truncate">{task.goal}</span>
      )}
    </div>
  )
}
