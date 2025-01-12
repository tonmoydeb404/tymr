import TimeCard from "@/components/cards/time-card";
import TimeDeleteModal from "@/components/modals/time-delete-modal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useApp } from "@/context/app";
import { useWorkTimesByDate } from "@/database/hooks";
import { getDateString } from "@/helpers/work-time";
import { LucideAlertCircle, LucideBox, LucideLoader2 } from "lucide-react";
import { useState } from "react";

type Props = {};

const RecentSection = (_props: Props) => {
  const { date } = useApp();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const dateString = getDateString(new Date(date));

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
        <>
          {data.length > 0 && (
            <div className="flex flex-col gap-5">
              {data.map((item) => (
                <TimeCard
                  work={item}
                  key={item._id}
                  onDelete={(d) => setDeleteId(d._id)}
                />
              ))}
            </div>
          )}
          {data.length === 0 && (
            <div className="border border-dashed flex flex-col items-center justify-center text-center py-8">
              <LucideBox className="stroke-muted-foreground mb-2" />
              <AlertTitle className="text-muted-foreground text-sm">
                Nothing tracked yet
              </AlertTitle>
            </div>
          )}
        </>
      )}

      {isLoading && (
        <Alert>
          <LucideLoader2 className="animate-spin" />
          <AlertTitle>Loading</AlertTitle>
        </Alert>
      )}

      <TimeDeleteModal id={deleteId} onClose={() => setDeleteId(null)} />
    </>
  );
};

export default RecentSection;
