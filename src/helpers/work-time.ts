import { format } from "date-fns";

export const getDateString = (date: string | Date) =>
  format(date, "yyyy-MM-dd"); // YYYY-MM-DD
