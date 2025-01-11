import TimeCard from "@/components/cards/time-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useApp } from "@/context/app";
import { useWorkTimesByDate } from "@/database/hooks";
import { LucideAlertCircle, LucideLoader2 } from "lucide-react";

type Props = {};

const RecentSection = (_props: Props) => {
  const { date } = useApp();
  const dateString = new Date(date).toLocaleDateString();
  console.log({ dateString });

  const { data, isLoading, error } = useWorkTimesByDate(dateString);
  return (
    <>
      <h2 className="text-xl font-semibold mb-7">Recent Tracks</h2>

      {!isLoading && error && (
        <Alert variant="destructive">
          <LucideAlertCircle />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something wents to wrong</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && Array.isArray(data) && (
        <div className="flex flex-col gap-5">
          {data.map((item) => (
            <TimeCard work={item} key={item._id} />
          ))}
        </div>
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

export default RecentSection;
