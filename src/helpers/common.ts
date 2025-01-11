export function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 60000); // Convert ms to total minutes
  const hours = Math.floor(totalMinutes / 60); // Calculate hours
  const minutes = totalMinutes % 60; // Remaining minutes

  // Format with leading zeros
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}
