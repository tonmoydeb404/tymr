import { Button } from "@/components/ui/button";
import { useApp } from "@/context/app";
import useClock from "@/hooks/use-clock";
import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";

type Props = {};

const HeaderSection = (_props: Props) => {
  const { date } = useApp();
  const time = useClock();

  return (
    <header className="mt-20 flex items-center">
      <h1 className="text-3xl font-bold">Afternoon, Tonmoy.</h1>

      <h2 className="ml-auto text-lg text-muted-foreground">
        {format(date, "EEEE, MMMM do, yyyy")}
      </h2>
      {time ? (
        <h3 className="ml-2 text-lg font-semibold">
          {format(time, "hh:mm aaa")}
        </h3>
      ) : null}
      <Button size={"icon"} className="ml-2" variant={"outline"}>
        <LucideCalendar />
      </Button>
    </header>
  );
};

export default HeaderSection;
