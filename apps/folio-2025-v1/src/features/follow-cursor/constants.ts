export const ANIMATION_DURATIONS = {
  pointMove: 0.15,
  textBoxMove: 0.2,
  hoverExpand: 0.2,
  hoverCollapse: 0.3,
  textBoxAppear: 0.2,
  textBoxDisappear: 0.3,
  textSlideIn: 0.4,
  textSlideOut: 0.3,
  boxAnimationDelay: 0.35,
} as const

export const ANIMATION_EASING = {
  default: 'power2',
  in: 'power2.in',
  out: 'power2.out',
} as const

export const CURSOR_SIZES = {
  default: 10,
  hover: 25,
} as const

export const TEXT_BOX_ROTATION = {
  default: 0,
  exit: -12,
} as const
