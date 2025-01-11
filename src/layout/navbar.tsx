import { paths } from "@/router/paths";
import { NavLink } from "react-router";

// ----------------------------------------------------------------------

const links = [
  { label: "Home", path: paths.root },
  { label: "Reports", path: paths.reports },
  { label: "Stats", path: paths.stats },
];

// ----------------------------------------------------------------------

type Props = {};

const Navbar = (_props: Props) => {
  return (
    <header className="container mx-auto mt-10 flex flex-col items-center justify-center">
      <nav className="flex flex-row gap-2.5 items-center justify-center px-9 border rounded-full shadow-sm">
        {links.map((item) => (
          <NavLink
            to={item.path}
            className="px-4 py-4 relative overflow-hidden after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary after:-translate-x-full after:duration-200 hover:after:translate-x-0 [&.active]:after:!translate-x-0 font-medium"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Navbar;
