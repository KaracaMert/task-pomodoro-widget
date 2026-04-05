import type { Task } from '@/types'

interface TaskDropdownProps {
  tasks: Task[]
  activeTask: Task | null
  onSelect: (task: Task) => void
}

// TODO: Implement dropdown UI in Iteration 2
export function TaskDropdown({ tasks: _tasks, activeTask: _activeTask, onSelect: _onSelect }: TaskDropdownProps) {
  return (
    <button className="text-white/70 text-xs shrink-0">▼</button>
  )
}
