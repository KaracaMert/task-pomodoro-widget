import { useState, useEffect, useRef, useCallback } from 'react'
import type { PomodoroConfig, PomodoroPhase, TimerState } from '@/types'

const DEFAULT_CONFIG: PomodoroConfig = {
  workDuration: 1500,
  shortBreakDuration: 300,
  longBreakDuration: 900,
  sessionsBeforeLongBreak: 4,
}

function getPhaseDuration(phase: PomodoroPhase, config: PomodoroConfig): number {
  if (phase === 'work') return config.workDuration
  if (phase === 'short-break') return config.shortBreakDuration
  return config.longBreakDuration
}

function getNextPhase(
  currentPhase: PomodoroPhase,
  sessionCount: number,
  config: PomodoroConfig,
): PomodoroPhase {
  if (currentPhase !== 'work') return 'work'
  const completedSessions = sessionCount + 1
  return completedSessions % config.sessionsBeforeLongBreak === 0 ? 'long-break' : 'short-break'
}

export function useTimer(config: PomodoroConfig = DEFAULT_CONFIG) {
  const [state, setState] = useState<TimerState>({
    phase: 'work',
    timeRemaining: config.workDuration,
    isRunning: false,
    sessionCount: 0,
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    if (!state.isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          const cfg = configRef.current
          const newSessionCount =
            prev.phase === 'work' ? prev.sessionCount + 1 : prev.sessionCount
          const nextPhase = getNextPhase(prev.phase, prev.sessionCount, cfg)
          return {
            phase: nextPhase,
            timeRemaining: getPhaseDuration(nextPhase, cfg),
            isRunning: false,
            sessionCount: newSessionCount,
          }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [state.isRunning])

  const start = useCallback(() => setState(prev => ({ ...prev, isRunning: true })), [])
  const pause = useCallback(() => setState(prev => ({ ...prev, isRunning: false })), [])
  const reset = useCallback(
    () =>
      setState(prev => ({
        ...prev,
        timeRemaining: getPhaseDuration(prev.phase, configRef.current),
        isRunning: false,
      })),
    [],
  )

  return {
    ...state,
    totalDuration: getPhaseDuration(state.phase, config),
    start,
    pause,
    reset,
  }
}
