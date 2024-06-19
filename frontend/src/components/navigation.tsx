import { pages } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigator = useNavigate();
  return pages.map((page, idx) => (
    <div
      key={`page-${idx}`}
      className="hover:text-mainHover flex w-full flex-col items-center justify-center gap-[2px] font-inter"
      onClick={() => navigator(page.path)}
    >
      <page.icon size={24} />
      {page.description}
    </div>
  ));
};

export default Navigation;
