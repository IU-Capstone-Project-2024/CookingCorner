import React, { Dispatch, SetStateAction } from "react";
import Settings from "./settings";
import SearchBar from "./search-bar";
import { FilterConditions } from "@/types/types";

interface HomeLayoutProps {
  children?: React.ReactNode;
  setSearch: Dispatch<SetStateAction<string>>;
  filters: FilterConditions;
  setFilters: (value: FilterConditions) => void;
}

const HomeLayout = ({
  children,
  setSearch,
  filters,
  setFilters,
}: HomeLayoutProps) => {
  return (
    <section className="flex flex-col items-center gap-2">
      <SearchBar setSearch={setSearch} />
      <Settings filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </section>
  );
};

export default HomeLayout;
