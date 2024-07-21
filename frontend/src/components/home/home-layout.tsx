import React, { Dispatch, SetStateAction } from "react";
import SearchBar from "./search-bar";
import { FilterConditions } from "@/types/types";
import { SettingsContainer, SettingsItem } from "../settings";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import Category from "./category";
import NewRecipe from "./new-recipe";

interface HomeLayoutProps {
  children?: React.ReactNode;
  setSearch: Dispatch<SetStateAction<string>>;
  filters: FilterConditions;
  handleFiltersChange: (name: string, value?: string | boolean) => void;
}

const HomeLayout = ({
  children,
  setSearch,
  filters,
  handleFiltersChange,
}: HomeLayoutProps) => {
  return (
    <section className="flex flex-col items-center gap-2">
      <SearchBar setSearch={setSearch} />
      <SettingsContainer className="w-full max-w-[390px]">
        <SettingsItem>
          <NewRecipe />
        </SettingsItem>
        <SettingsItem className="w-full">
          <Category handleFiltersChange={handleFiltersChange} />
        </SettingsItem>
        <SettingsItem>
          <img
            src={filters.ascending_order ? "asc_order.svg" : "des_order.svg"}
            className="w-10 cursor-pointer"
            onClick={() => handleFiltersChange("ascending_order")}
          />
        </SettingsItem>
        <SettingsItem>
          {!filters.is_favourite ? (
            <FaRegHeart
              size={24}
              className="cursor-pointer text-hover"
              onClick={() => handleFiltersChange("is_favourite")}
            />
          ) : (
            <FaHeart
              size={24}
              className="cursor-pointer text-hover"
              onClick={() => handleFiltersChange("is_favourite")}
            />
          )}
        </SettingsItem>
      </SettingsContainer>
      <div className="grid grid-cols-2 gap-2 px-2">{children}</div>
    </section>
  );
};

export default HomeLayout;
