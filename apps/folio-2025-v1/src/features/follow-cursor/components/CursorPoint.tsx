import { forwardRef } from 'react'

export const CursorPoint = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-2.5 h-2.5 bg-white mix-blend-difference"
    />
  )
})

CursorPoint.displayName = 'CursorPoint'
