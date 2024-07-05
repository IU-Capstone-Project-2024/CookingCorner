import RootLayout from "@/components/root-layout";
import { convertDataToGMT } from "@/lib/utils";
import { Navigate, Outlet } from "react-router-dom";

const Root = () => {
  function checkAuth() {
    const token = localStorage.getItem("accessTokenExpires");
    if (token) {
      const time = JSON.parse(token).split(" ");
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
