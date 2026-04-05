export interface Task {
  id: string
  title: string
  goal?: string
  completed: boolean
  filePath: string
  lineIndex: number
}

export type PomodoroPhase = 'work' | 'short-break' | 'long-break'

export interface PomodoroConfig {
  workDuration: number        // seconds, default 1500 (25 min)
  shortBreakDuration: number  // seconds, default 300 (5 min)
  longBreakDuration: number   // seconds, default 900 (15 min)
  sessionsBeforeLongBreak: number // default 4
}

export interface TimerState {
  phase: PomodoroPhase
  timeRemaining: number
  isRunning: boolean
  sessionCount: number
}
