import { RefObject } from 'react'

export function calculatePosition(
  ref: RefObject<HTMLDivElement | null>,
  x: number,
  y: number,
): { x: number; y: number } {
  if (!ref.current) return { x: 0, y: 0 }

  const rect = ref.current.getBoundingClientRect()
  const offsetX = rect.width / 2
  const offsetY = rect.height / 2
  return {
    x: x - offsetX,
    y: y - offsetY,
  }
}
