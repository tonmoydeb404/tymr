import { useActiveWorkTime } from "@/database/hooks";
import { ReactNode, useMemo, useState } from "react";
import { AppContext, IAppContext, values } from "./context";

type Props = {
  children: ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;

  const [date, setDate] = useState(values.date);
  const activeResponse = useActiveWorkTime();

  const activeWork = useMemo(() => {
    if (!activeResponse.data) return null;

    if (activeResponse.data.endTime) return null;

    return activeResponse.data;
  }, [activeResponse?.data]);

  const value: IAppContext = useMemo(
    () => ({
      activeWork,
      date,
      setDate,
    }),
    [activeWork, date]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
