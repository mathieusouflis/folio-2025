import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'
import { LucideIcon, LucideProps } from 'lucide-react'

const iconVariants = cva('inline-flex items-center justify-center shrink-0', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
      '3xl': 'w-12 h-12',
      '4xl': 'w-16 h-16',
    },
    strokeWidth: {
      thin: '[&_svg]:stroke-[1]',
      normal: '[&_svg]:stroke-[1.5]',
      medium: '[&_svg]:stroke-[2]',
      bold: '[&_svg]:stroke-[2.5]',
      bolder: '[&_svg]:stroke-[3]',
    },
    variant: {
      default: 'text-current',
      primary: 'text-foreground',
      secondary: 'text-gray-500',
      muted: 'text-gray-400',
      accent: 'text-blue-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
    strokeWidth: 'normal',
    variant: 'default',
  },
})

export interface IconProps
  extends Omit<LucideProps, 'size' | 'strokeWidth'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon
  customSize?: string | number
  customStrokeWidth?: string | number
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComponent,
      size,
      strokeWidth,
      variant,
      className,
      customSize,
      customStrokeWidth,
      ...props
    },
    ref,
  ) => {
    const wrapperStyle: React.CSSProperties = {}

    if (customSize) {
      wrapperStyle.width = typeof customSize === 'number' ? `${customSize}px` : customSize
      wrapperStyle.height = typeof customSize === 'number' ? `${customSize}px` : customSize
    }

    return (
      <span
        className={cn(iconVariants({ size, strokeWidth, variant }), className)}
        style={customSize ? wrapperStyle : undefined}
      >
        <IconComponent ref={ref} {...props} size="100%" strokeWidth={customStrokeWidth} />
      </span>
    )
  },
)

Icon.displayName = 'Icon'
