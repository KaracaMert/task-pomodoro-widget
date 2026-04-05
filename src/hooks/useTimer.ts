import { useState } from 'react'
import type { PomodoroConfig, TimerState } from '@/types'

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  sessionsBeforeLongBreak: 4,
}

export function useTimer(config: PomodoroConfig = DEFAULT_CONFIG) {
  // TODO: Implement in Iteration 1
  const [state] = useState<TimerState>({
    phase: 'work',
    timeRemaining: config.workDuration,
    isRunning: false,
    sessionCount: 0,
  })

  return {
    ...state,
    start: () => {},
    pause: () => {},
    reset: () => {},
  }
}
