import { format } from "date-fns";

export function formatDuration(ms: number): string {
  const totalMinutes = Math.floor(ms / 1000 / 60); // Convert ms to total minutes
  const hours = Math.floor(totalMinutes / 60); // Calculate hours
  const minutes = totalMinutes % 60; // Remaining minutes

  // Format with leading zeros
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}`;
}

export const getGreeting = (): string => {
  const currentHour = Number(format(new Date(), "HH"));

  if (currentHour >= 5 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Afternoon";
  } else if (currentHour >= 17 && currentHour < 21) {
    return "Evening";
  } else {
    return "Night";
  }
};
