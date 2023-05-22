// Форматировать дату из timestamp
export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000)

  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}`
}
