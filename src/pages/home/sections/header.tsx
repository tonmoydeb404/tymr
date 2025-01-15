import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApp } from "@/context/app";
import { getGreeting } from "@/helpers/common";
import useClock from "@/hooks/use-clock";
import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";

type Props = {};

const HeaderSection = (_props: Props) => {
  const { date, setDate } = useApp();
  const time = useClock();

  return (
    <div className="flex items-start justify-between lg:items-center gap-x-3">
      <div className="flex flex-col lg:flex-row lg:items-center lg:flex-1 lg:justify-between">
        <h1 className="text-[22px] sm:text-2xl md:text-3xl font-bold">
          {getGreeting()}.
        </h1>

        <div className="flex flex-col md:flex-row gap-x-3">
          <h2 className="text-muted-foreground">
            {format(date, "EEEE, MMMM do, yyyy")}
          </h2>
          {time ? (
            <h3 className="font-semibold">{format(time, "hh:mm aaa")}</h3>
          ) : null}
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"outline"}>
            <LucideCalendar />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => (d ? setDate(d) : {})}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HeaderSection;
