import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/theme";
import { paths } from "@/router/paths";
import {
  LucideChartNoAxesCombined,
  LucideHome,
  LucideMoon,
  LucideSun,
  LucideTable2,
} from "lucide-react";
import { NavLink } from "react-router";

// ----------------------------------------------------------------------

const links = [
  { label: "Home", path: paths.root, icon: LucideHome },
  { label: "Reports", path: paths.reports, icon: LucideTable2 },
  { label: "Stats", path: paths.stats, icon: LucideChartNoAxesCombined },
];

// ----------------------------------------------------------------------

type Props = {};

const Navbar = (_props: Props) => {
  const { toggleTheme, theme } = useTheme();

  return (
    <header className="flex gap-2.5 items-center justify-center fixed w-full left-0 max-md:bottom-8 md:top-8 z-10">
      <nav className="flex flex-row gap-2.5 items-center justify-center px-3 md:px-6 border rounded-full shadow-sm bg-background/10 backdrop-blur">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="py-2 px-3 sm:py-3 sm:px-4 md:px-3 md:py-2 relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:-translate-x-[110%] after:duration-200 hover:after:translate-x-0 [&.active]:after:!translate-x-0 font-medium inline-flex items-center gap-2"
          >
            <span>
              <item.icon className="size-5 md:size-4" />
            </span>
            <span className="max-md:hidden">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <Button
        onClick={toggleTheme}
        variant={"outline"}
        className="rounded-full size-10 md:size-[42px] max-md:[&_svg]:size-5 !bg-background/10 backdrop-blur"
      >
        {theme === "dark" ? <LucideSun /> : <LucideMoon />}
      </Button>
    </header>
  );
};

export default Navbar;
