import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/app";
import { useEndWorkTime, useStartWorkTime } from "@/database/hooks";
import useTimer from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { LucideHash, LucidePause, LucidePlay } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {};

const TrackerSection = (_props: Props) => {
  const { activeWork } = useApp();
  const workedTime = useTimer(activeWork?.startTime);

  const [title, setTitle] = useState("");
  const startWork = useStartWorkTime({
    onSuccess: () => {
      setTitle("");
      toast.success("Time tracking started!");
    },
    onError: () => {
      toast.error("Failed to start time tracking");
    },
  });

  const endWork = useEndWorkTime({
    onSuccess: () => {
      setTitle("");
      toast.success("Time tracking stopped!");
    },
    onError: () => {
      toast.error("Failed to stop time tracking");
    },
  });

  return (
    <Card
      className="mx-auto mt-10 flex flex-col justify-center px-4 py-3 gap-x-0 sm:gap-x-4 focus-within:border-primary focus-within:duration-200"
      as="label"
    >
      {activeWork && (
        <span className="sm:hidden block text-3xl mb-2 font-bold">
          {workedTime}
        </span>
      )}

      <div className="flex items-center gap-x-2 sm:gap-x-4">
        <LucideHash className="shrink-0 size-4" />

        <Input
          id="title"
          type="text"
          placeholder="What are you working on?"
          className="border-0 px-0 sm:text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={activeWork ? activeWork.title || "Untitled" : title}
          disabled={!!activeWork}
          onChange={(e) => setTitle(e.target.value)}
        />

        <span
          className={cn(
            "max-sm:hidden duration-200",
            activeWork ? "text-xl font-semibold" : ""
          )}
        >
          {workedTime}
        </span>

        {!activeWork ? (
          <Button
            className=" !size-8 sm:!size-12 rounded-full"
            variant={"secondary"}
            onClick={() => startWork.trigger({ title })}
          >
            <LucidePlay className="sm:!size-5" />
          </Button>
        ) : (
          <Button
            className=" !size-8 sm:!size-12 rounded-full"
            variant={"destructive"}
            onClick={() => endWork.trigger()}
          >
            <LucidePause className="sm:!size-5" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default TrackerSection;
