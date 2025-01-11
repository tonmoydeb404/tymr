import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LucideHash, LucideMoreVertical } from "lucide-react";
import HeaderSection from "./sections/header";
import TodayStatSection from "./sections/today-stat";
import TrackerSection from "./sections/tracker";
import WeekStatSection from "./sections/week-stat";

type Props = {};

const HomePage = (_props: Props) => {
  return (
    <>
      <HeaderSection />
      <TrackerSection />
      <div className="mt-20 grid grid-cols-12">
        <div className="col-span-3 flex flex-col gap-4">
          <TodayStatSection />
          <div className="border w-2/5 mx-auto"></div>
          <WeekStatSection />
        </div>

        <div className="col-span-9 pl-7">
          <h2 className="text-xl font-semibold mb-7">Recent Tracks</h2>

          <Card className="flex items-center gap-4 px-4 py-3">
            <LucideHash className="text-muted-foreground" size={28} />
            <div className="mr-auto">
              <h3 className="mb-0.5">Untitled</h3>
              <p className="text-sm text-muted-foreground">
                03:20 am - 05:10 am
              </p>
            </div>

            <h4 className="font-semibold text-xl">02:30</h4>

            <Button size={"icon"} variant={"ghost"}>
              <LucideMoreVertical />
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default HomePage;
