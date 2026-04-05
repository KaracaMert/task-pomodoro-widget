interface ControlsProps {
  isRunning: boolean
  onStart: () => void
  onPause: () => void
  onReset: () => void
}

// TODO: Style with dark black buttons in Iteration 3/5
export function Controls({ isRunning, onStart, onPause, onReset }: ControlsProps) {
  return (
    <div className="flex gap-1 shrink-0">
      <button
        onClick={isRunning ? onPause : onStart}
        className="text-white text-sm px-1"
      >
        {isRunning ? '⏸️' : '▶️'}
      </button>
      <button onClick={onReset} className="text-white text-sm px-1">
        🔄
      </button>
    </div>
  )
}
