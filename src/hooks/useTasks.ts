import { useState } from 'react'
import type { Task } from '@/types'

export function useTasks() {
  // TODO: Implement Obsidian markdown reading in Iteration 4
  const [tasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState<Task | null>(null)

  return { tasks, activeTask, setActiveTask }
}
