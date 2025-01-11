import { openDB } from "idb";

const DB_NAME = "workTimeDB";
const STORE_NAME = "workTimes";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("date", "date", { unique: false });
      store.createIndex("startTime", "startTime", { unique: false });
      store.createIndex("endTime", "endTime", { unique: false });
    }
  },
});

export const getDB = async () => await dbPromise;
