import { Button } from "@/components/ui/button";
import { LucideCalendar } from "lucide-react";

type Props = {};

const HeaderSection = (_props: Props) => {
  return (
    <header className="mt-20 flex items-center">
      <h1 className="text-3xl font-bold">Afternoon, Tonmoy.</h1>

      <h2 className="ml-auto text-lg text-muted-foreground">
        Wednesday, April 14th, 2021
      </h2>
      <h3 className="ml-2 text-lg font-semibold">3:17 pm</h3>
      <Button size={"icon"} className="ml-2" variant={"outline"}>
        <LucideCalendar />
      </Button>
    </header>
  );
};

export default HeaderSection;
