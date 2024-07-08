import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import { useSearch } from "@/services/queries";
import { useState } from "react";
import { useParams } from "react-router-dom";

const SearchResult = () => {
  const params = useParams();
  const [search, setSearch] = useState("");
  const recipes = useSearch(params.query ?? "");
  console.log(recipes.data);

  if (recipes.isError) {
    return <p>Error</p>;
  }

  if (recipes.isPending) {
    return <p>Loading...</p>;
  }

  return (
    <SearchLayout setSearch={setSearch} cancelSearch={true}>
      {recipes.data === null || recipes.data.length === 0 ? (
        <div className="text-md font-inter font-semibold">Nothing found</div>
      ) : (
        <div>
          {recipes.data.map((recipe) => (
            <RecipeCard key={`search-recipe-card-id`} recipe={recipe} />
          ))}
        </div>
      )}
    </SearchLayout>
  );
};

export default SearchResult;
