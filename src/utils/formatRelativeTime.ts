export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} ${plural(minutes, "minute")} ago`;
  if (hours < 24) return `${hours} ${plural(hours, "hour")} ago`;
  if (days < 30) return `${days} ${plural(days, "day")} ago`;
  if (months < 12) return `${months} ${plural(months, "month")} ago`;
  return `${years} ${plural(years, "year")} ago`;
}

function plural(value: number, word: string): string {
  return value === 1 ? word : `${word}s`;
}
