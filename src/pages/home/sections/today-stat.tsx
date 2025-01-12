import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useApp } from "@/context/app";
import { useWorkTimeDailyStats } from "@/database/hooks";
import { formatDuration } from "@/helpers/common";

type Props = {};

const TodayStatSection = (_props: Props) => {
  const { date } = useApp();
  const { data } = useWorkTimeDailyStats(new Date(date).toLocaleDateString());

  return (
    <Card className="max-md:flex-1 w-full">
      <CardHeader className="text-sm font-semibold text-muted-foreground">
        Time Today
      </CardHeader>
      <CardContent className="text-4xl font-bold pb-2">
        {formatDuration(data?.current || 0)}
      </CardContent>
      <CardFooter className="text-xs">Last updated at 3:17 PM</CardFooter>
    </Card>
  );
};

export default TodayStatSection;
