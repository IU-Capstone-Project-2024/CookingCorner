//@ts-nocheck
import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import useFilters from "@/hooks/useFilters";
import { useSearch } from "@/services/queries";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const params = useParams();
  const { filters, setFilters } = useFilters();
  const [search, setSearch] = useState("");
  const recipes = useSearch(params.query ?? "", filters);
  console.log(recipes.data);

  if (recipes.isError) {
    return <p>Error</p>;
  }

  if (recipes.isPending) {
    return <p>Loading...</p>;
  }

  return (
    <SearchLayout cancelSearch={true}>
      {recipes.data === null || recipes.data.length === 0 ? (
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
