import React from 'react'

interface UnderlineProps {
  children: React.ReactNode
  active?: boolean
  className?: string
  size?: 'xs' | 'sm'
}

export const Underline: React.FC<UnderlineProps> = ({
  children,
  active = true,
  className = '',
  size = 'xs',
}) => {
  const heightClass = size === 'sm' ? 'h-[2px]' : 'h-[1px]'

  if (!active) {
    return (
      <span className={`group relative inline-block cursor-pointer ${className}`}>
        <span className="relative z-10 transition-colors duration-150 mix-blend-difference">
          {children}
        </span>
        <span
          className={`absolute bottom-0 left-0 ${heightClass} -z-20 w-full origin-bottom bg-current transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1) group-hover:h-full`}
        />
      </span>
    )
  }

  return (
    <span className={`group relative inline-block cursor-pointer ${className}`}>
      {children}
      <span
        className={`absolute bottom-0 left-0 ${heightClass} w-full origin-right scale-x-0 transform bg-current transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100`}
      />
    </span>
  )
}
