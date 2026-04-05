import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg px-3 py-2 shadow-lg bg-black/30 backdrop-blur-md border border-white/10 min-h-[50px] w-full">
      {children}
    </div>
  )
}
