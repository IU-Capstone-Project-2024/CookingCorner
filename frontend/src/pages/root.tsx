import RootLayout from "@/components/root-layout";
import { convertDataToGMT } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  function checkAuth() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const time = JSON.parse(token).split(";")[1].split(" ");
      const updatedTime = convertDataToGMT(time);
      return !(updatedTime.getTime() < new Date().getTime());
    }
  }

  return checkAuth() ? (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default Root;
