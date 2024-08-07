import { pages } from "@/lib/constants";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  }, [location]);

  return pages.map((page, idx) => (
    <div
      key={`page-${idx}`}
      className={`flex w-full cursor-pointer flex-col items-center justify-center gap-[2px] font-inter ${page.path.includes(location.pathname) && location.pathname !== "/" ? "text-hover" : "text-mainBlack"} `}
      onClick={() => navigate(page.path)}
    >
      <page.icon size={24} />
      {page.description}
    </div>
  ));
};

export default Navigation;
