import { Outlet } from "react-router";
import Navbar from "./navbar";

type Props = {};

const AppLayout = (_props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AppLayout;
