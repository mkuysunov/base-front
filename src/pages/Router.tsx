import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PrivateRoute } from "@/components/PrivateRoute";
import { routes } from "@/utils/routes";

import { DashboardPage } from "./DashboardPage";

const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [{ path: routes.home.path, element: <DashboardPage /> }],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
