import { WorkTime } from "@/types/work-times";
import { createContext } from "react";

export interface IAppContext {
  date: Date;
  setDate: (date: Date) => void;
  activeWork: WorkTime | null;
}

export const values: IAppContext = {
  activeWork: null,
  setDate: () => {},
  date: new Date(),
};

export const AppContext = createContext(values);
