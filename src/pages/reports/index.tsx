import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useApp } from "@/context/app";
import { useWorkTimeReport } from "@/database/hooks";
import { getDateString } from "@/helpers/work-time";
import { endOfMonth, startOfMonth } from "date-fns";
import { LucideAlertCircle, LucideBox, LucideLoader2 } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import HeaderSection from "./sections/header";
import TableSection from "./sections/table";

type Props = {};

const ReportsPage = (_props: Props) => {
  const { date } = useApp();

  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfMonth(date),
    to: endOfMonth(date),
  });
  const { data, isLoading, error } = useWorkTimeReport(
    range?.from ? getDateString(range?.from) : undefined,
    range?.to ? getDateString(range?.to) : undefined
  );
  return (
    <>
      <title>Reports - Tymr</title>
      <HeaderSection date={range} setDate={setRange} />

      {!isLoading && error && (
        <Alert variant="destructive">
          <LucideAlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something wents to wrong</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && Array.isArray(data) && (
        <>
          {data.length === 0 && (
            <div className="border border-dashed flex flex-col items-center justify-center text-center py-8">
              <LucideBox className="stroke-muted-foreground mb-2" />
              <AlertTitle className="text-muted-foreground text-sm">
                Nothing tracked yet
              </AlertTitle>
            </div>
          )}

          {data.length > 0 && <TableSection data={data} />}
        </>
      )}

      {isLoading && (
        <Alert>
          <LucideLoader2 className="animate-spin" />
          <AlertTitle>Loading</AlertTitle>
        </Alert>
      )}
    </>
  );
};

export default ReportsPage;
