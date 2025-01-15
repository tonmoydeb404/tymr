import HeaderSection from "./sections/header";
import RecentSection from "./sections/recent";
import TodayStatSection from "./sections/today-stat";
import TrackerSection from "./sections/tracker";
import WeekStatSection from "./sections/week-stat";

type Props = {};

const HomePage = (_props: Props) => {
  return (
    <>
      <title>Home - Tymr</title>
      <HeaderSection />
      <TrackerSection />
      <div className="mt-10 grid grid-cols-12 gap-y-10">
        <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col sm:flex-row md:flex-col items-center gap-4">
          <TodayStatSection />
          <div className="border w-2/5 sm:w-0 sm:h-2/5 md:w-2/5 md:h-0 mx-auto sm:mx-0 md:mx-auto"></div>
          <WeekStatSection />
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-9 md:pl-7">
          <RecentSection />
        </div>
      </div>
    </>
  );
};

export default HomePage;
