import React, { Dispatch, SetStateAction } from "react";
import SearchBar from "../search-bar";
import Settings from "./settings";
import useFilters from "@/hooks/useFilters";
import { Recipe } from "@/types/types";
import { UseQueryResult } from "@tanstack/react-query";

interface HomeLayoutProps {
  children?: React.ReactNode;
  recipes: UseQueryResult<Recipe[], Error>;
  setSearch: Dispatch<SetStateAction<string>>;
}

const HomeLayout = ({ children, recipes, setSearch }: HomeLayoutProps) => {
  const { isFavourite, handleChangeFavourite, handleChangeAscending } =
    useFilters({ recipes: recipes });

  return (
    <section className="flex flex-col items-center gap-2">
      <SearchBar setSearch={setSearch} />
      <Settings
        isFavourite={isFavourite}
        handleChangeAscending={handleChangeAscending}
        handleChangeFavourite={handleChangeFavourite}
      />
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </section>
  );
};

export default HomeLayout;
