import { useContext } from "react";
import { AppContext, IAppContext } from "./context";

export const useApp = (): IAppContext => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useTheme must be used within a AppProvider");
  }
  return context;
};
