import { useCallback, useEffect, useRef } from 'react'
import { Container } from '@/components/Container'
import { Controls } from '@/components/Controls'
import { PomodoroTimer } from '@/components/PomodoroTimer'
import { TaskDisplay } from '@/components/TaskDisplay'
import { TaskDropdown } from '@/components/TaskDropdown'
import { useTimer } from '@/hooks/useTimer'
import { useTasks } from '@/hooks/useTasks'
import type { Task } from '@/types'

function App() {
  const { tasks, activeTask, setActiveTask, isLoading, loadFile, completeActiveTask } = useTasks()
  const { isRunning, phase, timeRemaining, totalDuration, justCompleted, start, pause, reset } = useTimer()

  // Auto-complete the active task when a work session ends
  const prevJustCompletedRef = useRef(false)
  useEffect(() => {
    if (justCompleted && !prevJustCompletedRef.current) {
      // phase has already advanced — if it's now a break, a work session just ended
      if (phase === 'short-break' || phase === 'long-break') {
        completeActiveTask()
      }
    }
    prevJustCompletedRef.current = justCompleted
  }, [justCompleted, phase, completeActiveTask])

  const handleTaskSelect = useCallback((task: Task) => {
    setActiveTask(task)
    reset()
  }, [setActiveTask, reset])

  // No file loaded — show a minimal prompt
  if (tasks.length === 0) {
    return (
      <Container>
        <button
          onClick={loadFile}
          disabled={isLoading}
          style={{ color: isLoading ? 'var(--slu-gray-600)' : 'var(--slu-gray-900)', transition: 'color 0.2s ease-out' }}
          className="flex-1 text-xs text-left cursor-pointer"
        >
          {isLoading ? 'Loading…' : '📂 Load tasks from Obsidian'}
        </button>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <TaskDropdown tasks={tasks} activeTask={activeTask} onSelect={handleTaskSelect} />
        <TaskDisplay task={activeTask} />
      </div>
      <PomodoroTimer phase={phase} timeRemaining={timeRemaining} totalDuration={totalDuration} />
      <Controls isRunning={isRunning} justCompleted={justCompleted} onStart={start} onPause={pause} onReset={reset} />
    </Container>
  )
}

export default App
