export const getDateString = (date: string | Date) =>
  new Date(date).toISOString().split("T")[0];
