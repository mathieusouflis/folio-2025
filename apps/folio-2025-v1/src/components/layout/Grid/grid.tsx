import React from 'react'
import { cn } from '@/lib/utils/cn'

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
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
  as?: React.ElementType

  /**
   * Enable debug mode to visualize grid
   * @default false
   */
  debug?: boolean
}

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
export function Grid({
  children,
  className,
  withMargins = true,
  withGap = true,
  columns,
  as: Component = 'div',
  debug = false,
  style,
  ...props
}: GridProps) {
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

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
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
  as?: React.ElementType
}

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
export function GridItem({
  children,
  className,
  span,
  start,
  end,
  as: Component = 'div',
  style,
  ...props
}: GridItemProps) {
  // Use CSS classes for common values (1-12), inline styles for custom values
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
        // Use CSS classes for values 1-12 (better performance)
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

export interface GridMarginProps extends React.HTMLAttributes<HTMLDivElement> {
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
  as?: React.ElementType
}

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
export function GridMargin({
  children,
  className,
  side = 'x',
  negative = false,
  as: Component = 'div',
  ...props
}: GridMarginProps) {
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
