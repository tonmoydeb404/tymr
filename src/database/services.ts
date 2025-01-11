import { WorkTime } from "@/types/work-times";
import { getDB } from ".";

export const startWorkTime = async (
  payload: Omit<WorkTime, "endTime" | "duration">
) => {
  const db = await getDB();
  await db.add("workTimes", { ...payload, endTime: "", duration: 0 });
};

export const endWorkTime = async (id: number, endTime: string) => {
  const db = await getDB();
  const workTime = await db.get("workTimes", id);
  if (workTime) {
    workTime.endTime = endTime;
    workTime.duration =
      (new Date(endTime).getTime() - new Date(workTime.startTime).getTime()) /
      3600000;
    await db.put("workTimes", workTime);
  }
};

export const updateWorkTime = async (
  id: number,
  updates: Partial<WorkTime>
) => {
  const db = await getDB();
  const workTime = await db.get("workTimes", id);
  if (workTime) {
    await db.put("workTimes", { ...workTime, ...updates });
  }
};

export const deleteWorkTime = async (id: number) => {
  const db = await getDB();
  await db.delete("workTimes", id);
};

export const getWorkTimesByDate = async (date: string) => {
  const db = await getDB();
  return await db.getAllFromIndex("workTimes", "date", date);
};

export const getActiveWorkTime = async () => {
  const db = await getDB();
  const allWorkTimes = await db.getAll("workTimes");
  return allWorkTimes.find((workTime) => !workTime.endTime);
};

export const getWorkTimeReport = async (startDate: string, endDate: string) => {
  const db = await getDB();
  const allWorkTimes = await db.getAll("workTimes");
  return allWorkTimes.filter(
    (workTime) =>
      workTime.endTime && workTime.date >= startDate && workTime.date <= endDate
  );
};
