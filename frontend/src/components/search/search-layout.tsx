import React, { Dispatch, SetStateAction } from "react";
import SearchBar from "../search-bar";

interface SearchLayoutProps {
  children: React.ReactNode;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchLayout = ({ children, setSearch }: SearchLayoutProps) => {
  return (
    <section className="container flex flex-col items-center gap-8">
      <SearchBar setSearch={setSearch} />
      <div className="flex flex-col items-center gap-4">{children}</div>
    </section>
  );
};

export default SearchLayout;
