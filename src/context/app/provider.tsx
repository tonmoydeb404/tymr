import { useActiveWorkTime } from "@/database/hooks";
import { parseISO } from "date-fns";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { AppContext, IAppContext, values } from "./context";

type Props = {
  children: ReactNode;
};

export const AppProvider = (props: Props) => {
  const { children } = props;

  const [date, setDate] = useState(values.date);
  const activeResponse = useActiveWorkTime();

  console.log({ date });

  const updateDate = useCallback((isoDate: string) => {
    const date = parseISO(isoDate);
    if (date) {
      setDate(date.toISOString());
    }
  }, []);

  const activeWork = useMemo(() => {
    if (!activeResponse.data) return null;

    if (activeResponse.data.endTime) return null;

    return activeResponse.data;
  }, [activeResponse?.data]);

  const value: IAppContext = useMemo(
    () => ({
      activeWork,
      date,
      setDate: updateDate,
    }),
    [activeWork, date, updateDate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
