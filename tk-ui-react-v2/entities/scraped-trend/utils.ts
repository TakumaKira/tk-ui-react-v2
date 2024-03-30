export function isInvalidDate(date: Date): boolean {
  return isNaN(date.getTime());
}