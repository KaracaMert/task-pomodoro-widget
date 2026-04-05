import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

export function Container({ children }: ContainerProps) {
  return (
    <div
      style={{ background: 'var(--slu-surface)', boxShadow: 'var(--slu-item-shadow)' }}
      className="flex items-center gap-2 w-full h-[50px] px-2.5 rounded-[15px] overflow-hidden select-none"
    >
      {children}
    </div>
  )
}
