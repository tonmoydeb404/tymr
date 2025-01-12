import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useApp } from "@/context/app";
import { useWorkTimeWeeklyStats } from "@/database/hooks";
import { formatDuration } from "@/helpers/common";

type Props = {};

const WeekStatSection = (_props: Props) => {
  const { date } = useApp();
  const { data } = useWorkTimeWeeklyStats(new Date(date).toLocaleDateString());

  return (
    <Card className="max-md:flex-1 w-full">
      <CardHeader className="text-sm font-semibold text-muted-foreground">
        This Week
      </CardHeader>
      <CardContent className="text-4xl font-bold pb-2">
        {formatDuration(data?.current || 0)}
      </CardContent>
      <CardFooter className="text-xs">Last updated at 3:17 PM</CardFooter>
    </Card>
  );
};

export default WeekStatSection;
