import { forwardRef } from 'react'

export const CursorPoint = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="fixed z-1000 rounded-full pointer-events-none w-2.5 h-2.5 bg-white mix-blend-difference"
    />
  )
})

CursorPoint.displayName = 'CursorPoint'
