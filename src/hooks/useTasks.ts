import { useState } from 'react'
import type { Task } from '@/types'

// TODO: Replace with Obsidian markdown reading in Iteration 4
const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Write project report', goal: 'finish Q1 summary', completed: false, filePath: '', lineIndex: 0 },
  { id: '2', title: 'Review pull requests', goal: 'merge before EOD', completed: false, filePath: '', lineIndex: 1 },
  { id: '3', title: 'Update documentation', goal: undefined, completed: false, filePath: '', lineIndex: 2 },
  { id: '4', title: 'Fix login bug', goal: 'auth flow broken on mobile', completed: false, filePath: '', lineIndex: 3 },
  { id: '5', title: 'Team sync meeting prep', goal: undefined, completed: false, filePath: '', lineIndex: 4 },
]

export function useTasks() {
  const [tasks] = useState<Task[]>(MOCK_TASKS)
  const [activeTask, setActiveTask] = useState<Task | null>(MOCK_TASKS[0])
  return { tasks, activeTask, setActiveTask }
}
