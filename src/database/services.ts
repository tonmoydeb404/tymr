import { getDateString } from "@/helpers/work-time";
import { WorkTime } from "@/types/work-times";
import { endOfWeek, startOfWeek, subDays } from "date-fns";
import { nanoid } from "nanoid";
import { getDB } from ".";

export const startWorkTime = async (payload: Pick<WorkTime, "title">) => {
  const startTime = new Date().toISOString();
  const date = getDateString(new Date());

  const db = await getDB();

  const activeWorks = await db.getAllFromIndex("workTimes", "endTime", null);

  if (activeWorks.length > 0) {
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

  // Find active work
  const endTime = new Date().toISOString();
  const works = await db.getAllFromIndex("workTimes", "endTime", null);
  const work = works[0];

  if (!work) {
    throw new Error("No active work found!");
  }

  // Set the end time and calculate the duration
  work.endTime = endTime;
  work.duration =
    new Date(endTime).getTime() - new Date(work.startTime).getTime();

  // Save the updated work time
  await db.put("workTimes", work);

  return work;
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
  const works = await db.getAllFromIndex("workTimes", "endTime", null);
  const work = works[0];
  return work;
};

export const getWorkTimeReport = async (
  startDate?: string,
  endDate?: string
) => {
  const db = await getDB();

  let workTimes;

  if (startDate || endDate) {
    // Use a range query based on provided dates
    const range =
      startDate && endDate
        ? IDBKeyRange.bound(startDate, endDate, false, false)
        : startDate
        ? IDBKeyRange.lowerBound(startDate, false)
        : IDBKeyRange.upperBound(endDate, false);

    workTimes = await db.getAllFromIndex("workTimes", "date", range);
  } else {
    // No date range provided, fetch all work times
    workTimes = await db.getAllFromIndex("workTimes", "date");
  }

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
