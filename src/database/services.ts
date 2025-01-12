import { getDateString } from "@/helpers/work-time";
import { WorkTime } from "@/types/work-times";
import { endOfWeek, startOfWeek, subDays } from "date-fns";
import { nanoid } from "nanoid";
import { getDB } from ".";

export const startWorkTime = async (payload: Pick<WorkTime, "title">) => {
  const startTime = new Date().toISOString();
  const date = getDateString(new Date());

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
  const today = getDateString(new Date());
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
  const date = getDateString(new Date());
  const entities = await db.getAllFromIndex("workTimes", "date", date);
  return entities.find((workTime) => !workTime.endTime) ?? null;
};

export const getWorkTimeReport = async (startDate: string, endDate: string) => {
  const db = await getDB();

  // Use a range query to get only the work times within the date range
  const range = IDBKeyRange.bound(startDate, endDate, false, false);
  const workTimes = await db.getAllFromIndex("workTimes", "date", range);

  // Return the completed work times sorted by startTime
  return workTimes
    .filter((workTime) => workTime.endTime)
    .sort(
      (a, b) =>
        new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
    );
};

export const getWorkTimeDailyStat = async (date: string) => {
  const db = await getDB();

  // ----------------------------------------------------------------------

  const workTimes = await db.getAllFromIndex("workTimes", "date", date);

  const totalDuration = workTimes.reduce(
    (sum, workTime) => sum + (workTime.endTime ? workTime.duration : 0),
    0
  );

  // ----------------------------------------------------------------------

  const prevDate = getDateString(subDays(new Date(date), 1));

  const prevWorkTimes = await db.getAllFromIndex("workTimes", "date", prevDate);

  const prevTotalDuration = prevWorkTimes.reduce(
    (sum, workTime) => sum + (workTime.endTime ? workTime.duration : 0),
    0
  );

  return { current: totalDuration, previous: prevTotalDuration };
};

export const getWorkTimeWeeklyStat = async (date: string) => {
  const weekStart = getDateString(startOfWeek(date));
  const weekEnd = getDateString(endOfWeek(date));

  const db = await getDB();

  // ----------------------------------------------------------------------

  const workTimes = await db.getAllFromIndex(
    "workTimes",
    "date",
    IDBKeyRange.bound(weekStart, weekEnd, false, false)
  );

  const totalDuration = workTimes.reduce(
    (sum, workTime) => sum + (workTime.endTime ? workTime.duration : 0),
    0
  );

  // ----------------------------------------------------------------------

  const prevWeekStart = getDateString(subDays(startOfWeek(date), 7));
  const prevWeekEnd = getDateString(subDays(endOfWeek(date), 7));

  const prevWorkTimes = await db.getAllFromIndex(
    "workTimes",
    "date",
    IDBKeyRange.bound(prevWeekStart, prevWeekEnd, false, false)
  );

  const prevTotalDuration = prevWorkTimes.reduce(
    (sum, workTime) => sum + (workTime.endTime ? workTime.duration : 0),
    0
  );

  return { current: totalDuration, previous: prevTotalDuration };
};
