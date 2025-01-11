import { WorkTime } from "@/types/work-times";
import useSWR, { mutate } from "swr";
import {
  deleteWorkTime,
  endWorkTime,
  getActiveWorkTime,
  getWorkTimeReport,
  getWorkTimesByDate,
  startWorkTime,
  updateWorkTime,
} from "./services";

export const useWorkTimesByDate = (date: string) => {
  return useSWR(["workTimesByDate", date], () => getWorkTimesByDate(date));
};

export const useActiveWorkTime = () => {
  return useSWR("activeWorkTime", getActiveWorkTime);
};

export const useWorkTimeReport = (startDate: string, endDate: string) => {
  return useSWR(["workTimeReport", startDate, endDate], () =>
    getWorkTimeReport(startDate, endDate)
  );
};

export const useStartWorkTime = () => {
  return async (payload: Omit<WorkTime, "endTime" | "duration">) => {
    await startWorkTime(payload);
    mutate(["workTimesByDate", payload.date]);
    mutate("activeWorkTime");
  };
};

export const useEndWorkTime = () => {
  return async (id: number, endTime: string) => {
    await endWorkTime(id, endTime);
    mutate("activeWorkTime");
    mutate("workTimeReport");
  };
};

export const useUpdateWorkTime = () => {
  return async (id: number, updates: Partial<WorkTime>) => {
    await updateWorkTime(id, updates);
    mutate("workTimeReport");
  };
};

export const useDeleteWorkTime = () => {
  return async (id: number) => {
    await deleteWorkTime(id);
    mutate("workTimeReport");
  };
};
