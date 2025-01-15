export type WorkTime = {
  _id: string;
  title?: string;
  date: string; // in YYYY-MM-DD format
  duration: number; // in miliseconds
  startTime: string; // in ISO format
  endTime: string; // if empty string means not ended yet otherwise in ISO format
};
