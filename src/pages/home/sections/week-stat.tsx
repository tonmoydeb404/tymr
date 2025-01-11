import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useApp } from "@/context/app";
import { useWorkTimeReport } from "@/database/hooks";
import { formatDuration } from "@/helpers/common";
import { endOfWeek, startOfWeek } from "date-fns";
import { useMemo } from "react";

type Props = {};

const WeekStatSection = (_props: Props) => {
  const { date } = useApp();
  const { data } = useWorkTimeReport(
    startOfWeek(date).toLocaleDateString(),
    endOfWeek(date).toLocaleDateString()
  );

  const count = useMemo(() => {
    if (!Array.isArray(data)) return 0;

    return data.reduce((prev, curr) => prev + curr.duration, 0);
  }, [data]);

  return (
    <Card className="max-md:flex-1 w-full">
      <CardHeader className="text-sm font-semibold text-muted-foreground">
        This Week
      </CardHeader>
      <CardContent className="text-4xl font-bold pb-2">
        {formatDuration(count)}
      </CardContent>
      <CardFooter className="text-xs">Last updated at 3:17 PM</CardFooter>
    </Card>
  );
};

export default WeekStatSection;
