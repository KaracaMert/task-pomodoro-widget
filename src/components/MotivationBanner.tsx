interface MotivationBannerProps {
  message: string
}

export function MotivationBanner({ message }: MotivationBannerProps) {
  return (
    <div className="text-white/80 text-xs text-center py-1 w-full">
      {message}
    </div>
  )
}
