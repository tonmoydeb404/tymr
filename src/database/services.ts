import { WorkTime } from "@/types/work-times";
import { nanoid } from "nanoid";
import { getDB } from ".";

export const startWorkTime = async (payload: Pick<WorkTime, "title">) => {
  const startTime = new Date().toISOString();
  const date = new Date().toLocaleDateString();

  const db = await getDB();

  const existingWorks = await db.getAllFromIndex("workTimes", "date", date);
  const todayWork = existingWorks.find((work) => !work.endTime);

  if (todayWork) {
    throw new Error("Already a time tracking is running");
  }

  const data: WorkTime = {
    ...payload,
    endTime: null,
    duration: 0,
    startTime,
    date,
    _id: nanoid(),
  };

  await db.add("workTimes", data);

  return data;
};

export const endWorkTime = async () => {
  const db = await getDB();

  // Find today's active work
  const endTime = new Date().toISOString();
  const today = new Date().toLocaleDateString();
  const activeWork = await db.getAllFromIndex("workTimes", "date", today);

  const todayWork = activeWork.find((work) => !work.endTime);

  if (!todayWork) {
    throw new Error("No active work found for today!");
  }

  // Set the end time and calculate the duration
  todayWork.endTime = endTime;
  todayWork.duration =
    new Date(endTime).getTime() - new Date(todayWork.startTime).getTime();

  // Save the updated work time
  await db.put("workTimes", todayWork);

  return todayWork;
};

export const updateWorkTime = async (
  id: string,
  updates: Partial<WorkTime>
) => {
  const db = await getDB();
  const workTime = await db.get("workTimes", id);

  if (!workTime) {
    throw new Error("Work history not found");
  }
  await db.put("workTimes", { ...workTime, ...updates });

  return { ...workTime, ...updates };
};

export const deleteWorkTime = async (id: string) => {
  const db = await getDB();
  const workTime = await db.get("workTimes", id);

  if (!workTime) {
    throw new Error("Work history not found!");
  }

  await db.delete("workTimes", id);

  return workTime;
};

export const getWorkTimesByDate = async (date: string) => {
  const db = await getDB();
  const entities = await db.getAllFromIndex("workTimes", "date", date);

  return entities
    .filter((item) => item.endTime)
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
};

export const getActiveWorkTime = async () => {
  const db = await getDB();
  const date = new Date().toLocaleDateString();
  const entities = await db.getAllFromIndex("workTimes", "date", date);
  return entities.find((workTime) => !workTime.endTime) ?? null;
};

export const getWorkTimeReport = async (startDate: string, endDate: string) => {
  const db = await getDB();
  const allWorkTimes = await db.getAll("workTimes");
  return allWorkTimes.filter(
    (workTime) =>
      workTime.endTime && workTime.date >= startDate && workTime.date <= endDate
  );
};
