import AppLayout from "@/layout";
import HomePage from "@/pages/home";
import ReportsPage from "@/pages/reports";
import { Routes as ReactRoutes, Route } from "react-router";

type Props = {};

const Routes = (_props: Props) => {
  return (
    <ReactRoutes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>
    </ReactRoutes>
  );
};

export default Routes;
