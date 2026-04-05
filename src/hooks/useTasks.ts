import { useState, useRef, useCallback } from 'react'
import type { Task } from '@/types'
import { parseObsidianTasks, completeTask } from '@/utils/markdownParser'

function readFileViaInput(): Promise<{ name: string; text: string }> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.md'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) { reject(new Error('No file selected')); return }
      resolve({ name: file.name, text: await file.text() })
    }
    input.oncancel = () => reject(new Error('Cancelled'))
    input.click()
  })
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // fileHandleRef: set when FSA API is available (Chrome/Edge/WebView2) — enables write-back
  const fileHandleRef = useRef<FileSystemFileHandle | null>(null)
  const markdownRef = useRef<string>('')

  const loadFile = useCallback(async () => {
    setIsLoading(true)
    try {
      let name: string
      let text: string

      if (typeof window.showOpenFilePicker === 'function') {
        // Chrome / Edge / Seelen UI WebView2 — full read + write
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: 'Markdown files', accept: { 'text/markdown': ['.md'] } }],
          multiple: false,
        })
        fileHandleRef.current = handle
        const file = await handle.getFile()
        name = handle.name
        text = await file.text()
      } else {
        // Firefox / Safari fallback — read only
        const result = await readFileViaInput()
        fileHandleRef.current = null
        name = result.name
        text = result.text
      }

      markdownRef.current = text
      const parsed = parseObsidianTasks(text, name)
      setTasks(parsed)
      setActiveTask(parsed[0] ?? null)
    } catch {
      // User cancelled — no-op
    } finally {
      setIsLoading(false)
    }
  }, [])

  const completeActiveTask = useCallback(async () => {
    if (!activeTask) return

    const updated = completeTask(markdownRef.current, activeTask.lineIndex)
    markdownRef.current = updated

    // Write back only when FSA handle is available
    if (fileHandleRef.current) {
      try {
        const writable = await fileHandleRef.current.createWritable()
        await writable.write(updated)
        await writable.close()
      } catch {
        // Write permission denied — in-memory update still applied
      }
    }

    setTasks(prev => {
      const remaining = prev.filter(t => t.id !== activeTask.id)
      setActiveTask(remaining[0] ?? null)
      return remaining
    })
  }, [activeTask])

  return { tasks, activeTask, setActiveTask, isLoading, loadFile, completeActiveTask }
}
