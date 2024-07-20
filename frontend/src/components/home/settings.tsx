import { FaArrowDownWideShort, FaRegHeart, FaHeart } from "react-icons/fa6";
import Category from "./category";
import NewRecipe from "./new-recipe";
import { FilterConditions } from "@/types/types";

interface SettingsProps {
  filters: FilterConditions;
  setFilters: (value: FilterConditions) => void;
}

const Settings = ({ filters, setFilters }: SettingsProps) => {
  function handleFiltersChange(name: string, value?: string | boolean) {
    setFilters({ ...filters, [name]: value ?? !filters[name] });
  }

  return (
    <section className="inline-flex h-12 w-full items-center justify-center gap-4 border-2 border-x-transparent border-y-mainBlack bg-hover-secondary">
      <NewRecipe />
      <Category handleFiltersChange={handleFiltersChange} />
      <FaArrowDownWideShort
        size={24}
        className="cursor-pointer"
        onClick={() => handleFiltersChange("ascending_order")}
      />
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
    </section>
  );
};

export default Settings;
