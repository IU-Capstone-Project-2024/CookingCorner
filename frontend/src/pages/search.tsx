import SearchLayout from "@/components/search/search-layout";
import Title from "@/components/title";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/services/queries";
import { useState } from "react";

const Search = () => {
  // const { lastRecipes, recommendedRecipes } = useLoaderData() as RecipeResponse;
  const data = useSearch();
  const [search, setSearch] = useState("");

  if (data.isError) {
    return (
      <SearchLayout setSearch={setSearch}>
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </SearchLayout>
    );
  }

  if (data.isPending) {
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
        {/* {lastRecipes.length === 0 ? (
            <p className="font-inter font-semibold text-mainBlack">
              You don't have any reviewed recipes yet!
            </p>
          ) : (
            lastRecipes.map((recipe, idx) => (
              <RecipeCard key={`last-recipe-${idx}`} recipe={recipe} />
            ))
          )} */}
      </div>

      <Title className="mx-auto">Best rated</Title>
      <div className="grid grid-cols-2 gap-2">
        {/* {recommendedRecipes.map((recipe, idx) => (
            <RecipeCard key={`recommended-recipe-${idx}`} recipe={recipe} />
          ))} */}
      </div>
    </SearchLayout>
  );
};

export default Search;
