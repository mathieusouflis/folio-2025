import React from 'react'
import { cn } from '@/lib/utils/cn'

type GridOwnProps<T extends React.ElementType = 'div'> = {
  /**
   * Whether to apply grid margins (left/right padding)
   * @default true
   */
  withMargins?: boolean

  /**
   * Whether to apply grid gap between columns
   * @default true
   */
  withGap?: boolean

  /**
   * Custom number of columns (overrides default 12)
   */
  columns?: number

  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: T

  /**
   * Enable debug mode to visualize grid
   * @default false
   */
  debug?: boolean
}

export type GridProps<T extends React.ElementType = 'div'> = GridOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof GridOwnProps<T>>

/**
 * Grid Container - Main wrapper for pixel-perfect grid layouts
 *
 * @example
 * ```tsx
 * <Grid>
 *   <GridItem span={6}>Left half</GridItem>
 *   <GridItem span={6}>Right half</GridItem>
 * </Grid>
 * ```
 */
export function Grid<T extends React.ElementType = 'div'>({
  children,
  className,
  withMargins = true,
  withGap = true,
  columns,
  as,
  debug = false,
  style,
  ...props
}: GridProps<T>) {
  const Component = as || ('div' as React.ElementType)
  const gridStyle = {
    ...style,
    ...(columns && ({ '--grid-columns': columns } as React.CSSProperties)),
  }

  return (
    <Component
      className={cn(
        'grid-container',
        !withMargins && '!px-0',
        !withGap && '!gap-0',
        debug && 'grid-debug',
        className,
      )}
      style={gridStyle}
      {...props}
    >
      {children}
    </Component>
  )
}

type GridItemOwnProps<T extends React.ElementType = 'div'> = {
  /**
   * Number of columns to span (any number based on your grid)
   */
  span?: number | 'full'

  /**
   * Column to start from (any number based on your grid)
   */
  start?: number

  /**
   * Column to end at (any number based on your grid)
   */
  end?: number

  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: T
}

export type GridItemProps<T extends React.ElementType = 'div'> = GridItemOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof GridItemOwnProps<T>>

/**
 * Grid Item - Child component for Grid container
 * Provides precise control over column positioning
 *
 * @example
 * ```tsx
 * // Span 6 columns
 * <GridItem span={6}>Content</GridItem>
 *
 * // Start at column 3, span 4 columns
 * <GridItem start={3} span={4}>Content</GridItem>
 *
 * // Precise positioning: columns 4-9
 * <GridItem start={4} end={9}>Content</GridItem>
 * ```
 */
export function GridItem<T extends React.ElementType = 'div'>({
  children,
  className,
  span,
  start,
  end,
  as,
  style,
  ...props
}: GridItemProps<T>) {
  const Component = as || 'div'
  const useInlineStyles =
    (span && span !== 'full' && span > 12) || (start && start > 12) || (end && end > 13)

  const gridStyle: React.CSSProperties = {
    ...style,
    ...(useInlineStyles && span && span !== 'full' && { gridColumn: `span ${span}` }),
    ...(useInlineStyles && start && { gridColumnStart: start }),
    ...(useInlineStyles && end && { gridColumnEnd: end }),
  }

  return (
    <Component
      className={cn(
        !useInlineStyles && span && `grid-span-${span}`,
        !useInlineStyles && start && `grid-col-start-${start}`,
        !useInlineStyles && end && `grid-col-end-${end}`,
        className,
      )}
      style={useInlineStyles ? gridStyle : style}
      {...props}
    >
      {children}
    </Component>
  )
}

type GridMarginOwnProps<T extends React.ElementType = 'div'> = {
  /**
   * Which sides to apply grid margins
   * @default 'x' (left and right)
   */
  side?: 'x' | 'l' | 'r' | 't' | 'b'

  /**
   * Apply negative margins (for breakout content)
   * @default false
   */
  negative?: boolean

  /**
   * HTML element to render as
   * @default 'div'
   */
  as?: T
}

export type GridMarginProps<T extends React.ElementType = 'div'> = GridMarginOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof GridMarginOwnProps<T>>

/**
 * Grid Margin - Apply grid margins to any element
 * Useful for aligning non-grid content with the grid system
 *
 * @example
 * ```tsx
 * // Apply left and right margins
 * <GridMargin>Content aligned with grid</GridMargin>
 *
 * // Breakout content (negative margins)
 * <GridMargin negative>Full-width content</GridMargin>
 * ```
 */
export function GridMargin<T extends React.ElementType = 'div'>({
  children,
  className,
  side = 'x',
  negative = false,
  as,
  ...props
}: GridMarginProps<T>) {
  const Component = as || 'div'
  return (
    <Component
      className={cn(negative ? 'grid-margin-x-negative' : `grid-margin-${side}`, className)}
      {...props}
    >
      {children}
    </Component>
  )
}

export const GridSystem = {
  Container: Grid,
  Item: GridItem,
  Margin: GridMargin,
}
