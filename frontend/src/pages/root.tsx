import FilterProvider from "@/components/filter-provider";
import RootLayout from "@/components/root-layout";
import { checkAuth } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  return checkAuth() ? (
    <RootLayout>
      <FilterProvider>
        <Outlet />
      </FilterProvider>
    </RootLayout>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default Root;
