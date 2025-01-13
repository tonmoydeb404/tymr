import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LucideCalendar, LucidePrinter } from "lucide-react";
import { DateRange } from "react-day-picker";

type Props = {
  date: DateRange | undefined;
  setDate: (d: DateRange | undefined) => void;
};

const HeaderSection = (props: Props) => {
  const { date, setDate } = props;
  return (
    <div className="mb-10 flex items-center flex-wrap gap-2">
      <h2 className="font-bold mr-auto">Work History</h2>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            id="date"
            variant={"outline"}
            className={cn(
              "max-w-[250px] w-full justify-start text-left font-normal overflow-hidden",
              !date && "text-muted-foreground print:hidden"
            )}
          >
            <LucideCalendar />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>

      <Button size={"sm"} onClick={window.print} className="print:hidden">
        Print <LucidePrinter />
      </Button>
    </div>
  );
};

export default HeaderSection;
