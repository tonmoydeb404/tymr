import { WorkTime } from "@/types/work-times";
import { createContext } from "react";

export interface IAppContext {
  date: string;
  setDate: (date: string) => void;
  activeWork: WorkTime | null;
}

export const values: IAppContext = {
  activeWork: null,
  setDate: () => {},
  date: new Date().toISOString(),
};

export const AppContext = createContext(values);
