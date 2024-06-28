import RootLayout from "@/components/root-layout";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  const auth = true;
  return auth ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default Root;
