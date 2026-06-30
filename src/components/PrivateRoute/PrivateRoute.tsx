import { Outlet, ScrollRestoration } from "react-router-dom";

export const PrivateRoute = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};
