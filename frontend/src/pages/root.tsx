import RootLayout from "@/components/root-layout";
import { checkAuth } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  return checkAuth() ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default Root;
