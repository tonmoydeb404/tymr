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
    <Card className="flex flex-col min-[400px]:flex-row min-[400px]:justify-between items-stretch gap-4 px-4 py-3">
      <div className="flex items-center gap-x-2">
        <LucideHash className="text-muted-foreground" size={28} />
        <div className="mr-auto">
          <h3 className="mb-0.5">{work?.title || "Untitled"}</h3>
          <p className="text-sm text-muted-foreground">
            {format(work.startTime, "hh:mm aaa")} -{" "}
            {work.endTime ? format(work.endTime, "hh:mm aaa") : "00"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-x-2 justify-between">
        <h4 className="font-semibold text-xl">
          {formatDuration(work.duration)}
        </h4>

        <Button size={"icon"} variant={"ghost"}>
          <LucideMoreVertical />
        </Button>
      </div>
    </Card>
  );
};

export default TimeCard;
