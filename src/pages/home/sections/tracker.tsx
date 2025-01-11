import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/app";
import { useEndWorkTime, useStartWorkTime } from "@/database/hooks";
import useTimer from "@/hooks/use-timer";
import { LucideHash, LucidePlay, LucideStopCircle } from "lucide-react";
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
      className="mx-auto mt-10 flex items-center justify-center px-4 py-4 gap-4 focus-within:border-primary duration-200"
      as="label"
    >
      <LucideHash />

      <Input
        id="title"
        type="text"
        placeholder="What are you working on?"
        className="border-0 text-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        value={activeWork ? activeWork.title || "Untitled" : title}
        disabled={!!activeWork}
        onChange={(e) => setTitle(e.target.value)}
      />

      <span>{workedTime}</span>

      {!activeWork ? (
        <Button
          className="!size-12 rounded-full"
          onClick={() => startWork.trigger({ title })}
        >
          <LucidePlay />
        </Button>
      ) : (
        <Button
          className="!size-12 rounded-full"
          onClick={() => endWork.trigger()}
        >
          <LucideStopCircle />
        </Button>
      )}
    </Card>
  );
};

export default TrackerSection;
