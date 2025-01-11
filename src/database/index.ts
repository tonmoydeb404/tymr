import { WorkTime } from "@/types/work-times";
import { DBSchema, openDB } from "idb";

const DB_NAME = "workTimeDB";
const STORE_NAME = "workTimes";

interface DB extends DBSchema {
  workTimes: {
    value: WorkTime;
    key: string;
    indexes: {
      date: string;
      startTime: string;
      endTime: string;
    };
  };
}

export const dbPromise = openDB<DB>(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "_id",
      });
      store.createIndex("date", "date", { unique: false });
      store.createIndex("startTime", "startTime", { unique: false });
      store.createIndex("endTime", "endTime", { unique: false });
    }
  },
});

export const getDB = async () => await dbPromise;
