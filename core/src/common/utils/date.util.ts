export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getStartOfDay(date: Date): Date {
  return new Date(new Date(date).setHours(0, 0, 0, 0));
}
