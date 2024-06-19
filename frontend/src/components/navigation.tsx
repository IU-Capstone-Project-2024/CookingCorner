import { pages } from "@/lib/constants";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigator = useNavigate();
  const location = useLocation();

  return pages.map((page, idx) => (
    <div
      key={`page-${idx}`}
      className={`flex w-full flex-col items-center justify-center gap-[2px] font-inter ${location.pathname.includes(page.path) ? "text-mainHover" : "text-mainBlack"} `}
      onClick={() => navigator(page.path)}
    >
      <page.icon size={24} />
      {page.description}
    </div>
  ));
};

export default Navigation;
