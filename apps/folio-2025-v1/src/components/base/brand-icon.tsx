import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const brandIconVariants = cva('inline-flex items-center justify-center shrink-0', {
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
    variant: {
      default: 'text-current',
      primary: 'text-foreground',
      secondary: 'text-muted',
      muted: 'text-muted/80',
      accent: 'text-accent',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      danger: 'text-red-500',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})

export interface BrandIconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'size' | 'ref'>,
    VariantProps<typeof brandIconVariants> {
  customSize?: string | number
}

export const BrandIcon = forwardRef<SVGSVGElement, BrandIconProps>(
  ({ size, variant, className, customSize, ...props }, ref) => {
    const wrapperStyle: React.CSSProperties = {}

    if (customSize) {
      wrapperStyle.width = typeof customSize === 'number' ? `${customSize}px` : customSize
      wrapperStyle.height = typeof customSize === 'number' ? `${customSize}px` : customSize
    }

    return (
      <span
        className={cn(brandIconVariants({ size, variant }), className)}
        style={customSize ? wrapperStyle : undefined}
      >
        <svg
          ref={ref}
          width="100%"
          height="100%"
          viewBox="0 0 33 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <path
            d="M0 23V0H4.448L10.88 20.448H11.072L15.1323 7.80256C15.988 5.2017 19.0796 0 24.5998 0C27.9918 0 31.9597 1.856 31.9597 6.496H29.3038C29.3038 3.936 27.6077 2.368 24.5678 2.368C21.3997 2.368 20.0238 4.128 20.0238 5.984C20.0238 12.096 32.4398 7.84 32.4398 16.896C32.4398 20.416 29.4096 23 24.5136 23H21H17.6366V20.832H24.7598C27.7038 20.832 29.8158 19.392 29.8158 17.056C29.8158 10.5821 19.2475 14.2669 17.6366 7.80256L12.768 23H9.184L2.688 2.784H2.496V23H0Z"
            fill="currentColor"
          />
        </svg>
      </span>
    )
  },
)

BrandIcon.displayName = 'BrandIcon'
