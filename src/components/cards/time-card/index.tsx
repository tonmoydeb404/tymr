import { Card } from "@/components/ui/card";
import { formatDuration } from "@/helpers/common";
import { WorkTime } from "@/types/work-times";
import { format } from "date-fns";
import { LucideHash } from "lucide-react";
import Actions from "./actions";

type Props = {
  work: WorkTime;
  onDelete: (data: WorkTime) => void;
};

const TimeCard = (props: Props) => {
  const { work, onDelete } = props;
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

        <Actions onDelete={() => onDelete(work)} />
      </div>
    </Card>
  );
};

export default TimeCard;
