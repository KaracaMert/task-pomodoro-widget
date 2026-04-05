import { useState, useRef, useCallback } from 'react'
import type { Task } from '@/types'
import { parseObsidianTasks, completeTask } from '@/utils/markdownParser'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fileHandleRef = useRef<FileSystemFileHandle | null>(null)
  const markdownRef = useRef<string>('')

  const loadFile = useCallback(async () => {
    try {
      setIsLoading(true)
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'Markdown files', accept: { 'text/markdown': ['.md'] } }],
        multiple: false,
      })
      fileHandleRef.current = handle
      const file = await handle.getFile()
      const text = await file.text()
      markdownRef.current = text
      const parsed = parseObsidianTasks(text, handle.name)
      setTasks(parsed)
      setActiveTask(parsed[0] ?? null)
    } catch {
      // User cancelled the file picker — no-op
    } finally {
      setIsLoading(false)
    }
  }, [])

  const completeActiveTask = useCallback(async () => {
    if (!activeTask || !fileHandleRef.current) return

    // Update the markdown in memory and on disk
    const updated = completeTask(markdownRef.current, activeTask.lineIndex)
    markdownRef.current = updated

    try {
      const writable = await fileHandleRef.current.createWritable()
      await writable.write(updated)
      await writable.close()
    } catch {
      // Write permission denied — markdown updated in memory only
    }

    // Remove completed task, advance to next
    setTasks(prev => {
      const remaining = prev.filter(t => t.id !== activeTask.id)
      setActiveTask(remaining[0] ?? null)
      return remaining
    })
  }, [activeTask])

  return { tasks, activeTask, setActiveTask, isLoading, loadFile, completeActiveTask }
}
