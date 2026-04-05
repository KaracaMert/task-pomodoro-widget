import { useCallback } from 'react'
import { Container } from '@/components/Container'
import { Controls } from '@/components/Controls'
import { PomodoroTimer } from '@/components/PomodoroTimer'
import { TaskDisplay } from '@/components/TaskDisplay'
import { TaskDropdown } from '@/components/TaskDropdown'
import { useTimer } from '@/hooks/useTimer'
import { useTasks } from '@/hooks/useTasks'
import type { Task } from '@/types'

function App() {
  const { tasks, activeTask, setActiveTask } = useTasks()
  const { isRunning, phase, timeRemaining, totalDuration, start, pause, reset } = useTimer()

  const handleTaskSelect = useCallback((task: Task) => {
    setActiveTask(task)
    reset()
  }, [setActiveTask, reset])

  return (
    <Container>
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <TaskDropdown tasks={tasks} activeTask={activeTask} onSelect={handleTaskSelect} />
        <TaskDisplay task={activeTask} />
      </div>
      <PomodoroTimer phase={phase} timeRemaining={timeRemaining} totalDuration={totalDuration} />
      <Controls isRunning={isRunning} onStart={start} onPause={pause} onReset={reset} />
    </Container>
  )
}

export default App
