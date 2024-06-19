import RootLayout from "@/components/root-layout";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};

export default Root;
