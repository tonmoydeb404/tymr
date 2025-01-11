import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useApp } from "@/context/app";
import { useWorkTimesByDate } from "@/database/hooks";
import { formatDuration } from "@/helpers/common";
import { useMemo } from "react";

type Props = {};

const TodayStatSection = (_props: Props) => {
  const { date } = useApp();
  const { data } = useWorkTimesByDate(new Date(date).toLocaleDateString());

  const count = useMemo(() => {
    if (!Array.isArray(data)) return 0;

    return data.reduce((prev, curr) => prev + curr.duration, 0);
  }, [data]);

  return (
    <Card className="max-md:flex-1 w-full">
      <CardHeader className="text-sm font-semibold text-muted-foreground">
        Time Today
      </CardHeader>
      <CardContent className="text-4xl font-bold pb-2">
        {formatDuration(count)}
      </CardContent>
      <CardFooter className="text-xs">Last updated at 3:17 PM</CardFooter>
    </Card>
  );
};

export default TodayStatSection;
