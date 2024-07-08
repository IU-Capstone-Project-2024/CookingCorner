import React, { Dispatch, SetStateAction } from "react";
import Settings from "./settings";
import { Recipe } from "@/types/types";
import { UseQueryResult } from "@tanstack/react-query";
import SearchBar from "./search-bar";

interface HomeLayoutProps {
  children?: React.ReactNode;
  recipes: UseQueryResult<Recipe[], Error>;
  setSearch: Dispatch<SetStateAction<string>>;
  setIsFavourite?: Dispatch<SetStateAction<boolean>>;
  isFavourite: boolean;
}

const HomeLayout = ({
  children,
  setSearch,
  setIsFavourite,
  isFavourite,
}: HomeLayoutProps) => {
  return (
    <section className="flex flex-col items-center gap-2">
      <SearchBar setSearch={setSearch} />
      <Settings
        handleChangeFavourite={setIsFavourite}
        isFavourite={isFavourite}
      />
      <div className="grid grid-cols-2 gap-2">{children}</div>
    </section>
  );
};

export default HomeLayout;
