import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import useFilters from "@/hooks/useFilters";
import { useSearch } from "@/services/queries";
import { useParams } from "react-router-dom";
import Category from "@/components/home/category";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { SettingsContainer, SettingsItem } from "@/components/settings";

const SearchResult = () => {
  const params = useParams();
  const { filters, handleFiltersChange } = useFilters();
  const recipes = useSearch(params.query ?? "", filters);

  if (recipes.isError) {
    return <p>Error</p>;
  }

  if (recipes.isPending) {
    return <p>Loading...</p>;
  }

  return (
    <SearchLayout cancelSearch={true}>
      <SettingsContainer className="w-full">
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
