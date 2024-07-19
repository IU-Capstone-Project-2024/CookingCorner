import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import useFilters from "@/hooks/useFilters";
import { useSearch } from "@/services/queries";
import { useParams } from "react-router-dom";
import Category from "@/components/home/category";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { SettingsContainer, SettingsItem } from "@/components/settings";
import { Skeleton } from "@/components/ui/skeleton";

const SearchResult = () => {
  const params = useParams();
  const { filters, handleFiltersChange } = useFilters();
  const recipes = useSearch(params.query ?? "", filters);

  if (recipes.isError) {
    return (
      <SearchLayout cancelSearch={true}>
        <p>Error</p>
      </SearchLayout>
    );
  }

  if (recipes.isPending) {
    return (
      <SearchLayout cancelSearch={true}>
        <SettingsContainer className="w-full max-w-[390px]">
          <SettingsItem className="w-full">
            <Category handleFiltersChange={handleFiltersChange} />
          </SettingsItem>
          <SettingsItem>
            <FaArrowDownWideShort
              size={24}
              className="cursor-pointer"
              onClick={() => handleFiltersChange("ascending_order")}
            />
          </SettingsItem>
        </SettingsContainer>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        </div>
      </SearchLayout>
    );
  }

  return (
    <SearchLayout cancelSearch={true}>
      <SettingsContainer className="w-full max-w-[390px]">
        <SettingsItem className="w-full">
          <Category handleFiltersChange={handleFiltersChange} />
        </SettingsItem>
        <SettingsItem>
          <FaArrowDownWideShort
            size={24}
            className="cursor-pointer"
            onClick={() => handleFiltersChange("ascending_order")}
          />
        </SettingsItem>
      </SettingsContainer>
      {!recipes.data.length ? (
        <div className="text-md font-inter font-semibold">Nothing found</div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {recipes.data.map((recipe, idx) => (
            <RecipeCard key={`search-recipe-card-${idx}`} recipe={recipe} />
          ))}
        </div>
      )}
    </SearchLayout>
  );
};

export default SearchResult;
