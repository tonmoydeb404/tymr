import HeaderSection from "./sections/header";
import RecentSection from "./sections/recent";
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
          <RecentSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
