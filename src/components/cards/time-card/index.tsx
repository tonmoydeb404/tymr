import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDuration } from "@/helpers/common";
import { WorkTime } from "@/types/work-times";
import { format } from "date-fns";
import { LucideHash, LucideMoreVertical } from "lucide-react";

type Props = {
  work: WorkTime;
};

const TimeCard = (props: Props) => {
  const { work } = props;
  return (
    <Card className="flex items-center gap-4 px-4 py-3">
      <LucideHash className="text-muted-foreground" size={28} />
      <div className="mr-auto">
        <h3 className="mb-0.5">{work?.title || "Untitled"}</h3>
        <p className="text-sm text-muted-foreground">
          {format(work.startTime, "hh:mm aaa")} -{" "}
          {format(work.endTime, "hh:mm aaa")}
        </p>
      </div>

      <h4 className="font-semibold text-xl">{formatDuration(work.duration)}</h4>

      <Button size={"icon"} variant={"ghost"}>
        <LucideMoreVertical />
      </Button>
    </Card>
  );
};

export default TimeCard;
