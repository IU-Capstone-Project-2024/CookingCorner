import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import Title from "@/components/title";
import { Skeleton } from "@/components/ui/skeleton";
import { useBestRated, useRecent } from "@/services/queries";
import { Recipe } from "@/types/types";
import { useState } from "react";

const Search = () => {
  // const { lastRecipes, recommendedRecipes } = useLoaderData() as RecipeResponse;
  // const bestRated = useBestRated();
  const recentRecipes = useRecent();
  console.log(recentRecipes.data);
  const [search, setSearch] = useState("");

  if (recentRecipes.isError) {
    return (
      <SearchLayout setSearch={setSearch}>
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </SearchLayout>
    );
  }

  if (recentRecipes.isPending) {
    return (
      <SearchLayout setSearch={setSearch}>
        <Title className="mx-auto">Last recipes</Title>
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
          <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        </div>

        <Title className="mx-auto">Best rated</Title>
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
    <SearchLayout setSearch={setSearch}>
      <Title className="mx-auto">Last recipes</Title>
      <div className="grid grid-cols-2 gap-2">
        {recentRecipes.data.length === 0 ? (
          <p className="col-span-2 text-center font-inter font-semibold text-mainBlack">
            You don't have any reviewed recipes yet!
          </p>
        ) : (
          recentRecipes.data.map((recipe, idx) => (
            <RecipeCard key={`last-recipe-${idx}`} recipe={recipe} />
          ))
        )}
      </div>

      <Title className="mx-auto">Best rated</Title>
      <div className="grid grid-cols-2 gap-2">
        {/* {bestRated.data.map((recipe, idx) => (
          <RecipeCard key={`recommended-recipe-${idx}`} recipe={recipe} />
        ))} */}
      </div>
    </SearchLayout>
  );
};

export default Search;
