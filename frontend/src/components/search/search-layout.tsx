import React from "react";
import SearchBar from "../search-bar";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface SearchLayoutProps {
  children: React.ReactNode;
  cancelSearch?: boolean;
}

const SearchLayout = ({ children, cancelSearch }: SearchLayoutProps) => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center gap-4 px-2">
      <div className="flex w-full items-center justify-center gap-2">
        <SearchBar />
        {cancelSearch && (
          <FaXmark
            size={28}
            className="cursor-pointer rounded-full border-2 border-mainBlack p-1"
            onClick={() => navigate("/recipes")}
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-4">{children}</div>
    </section>
  );
};

export default SearchLayout;
