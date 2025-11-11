export function isDate(value: string | Date): boolean {
  if (typeof value === 'string') {
    const date = new Date(value)
    return !isNaN(date.getTime())
  }
  return value instanceof Date
}
