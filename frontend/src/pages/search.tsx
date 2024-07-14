import RecipeCard from "@/components/search/recipe-card";
import SearchLayout from "@/components/search/search-layout";
import Title from "@/components/title";
import { FaBook, FaMagnifyingGlass } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { useBestRated, useRecent } from "@/services/queries";
import { useState } from "react";

const Search = () => {
  const bestRated = useBestRated();
  const recentRecipes = useRecent();
  //@ts-ignore
  const [search, setSearch] = useState("");

  if (recentRecipes.isError || bestRated.isError) {
    return (
      <SearchLayout>
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </SearchLayout>
    );
  }

  if (recentRecipes.isPending || bestRated.isPending) {
    return (
      <SearchLayout>
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
    <SearchLayout>
      <Title className="mx-auto">Last recipes</Title>
      <div className="grid grid-cols-2 gap-2">
        {recentRecipes.data.length === 0 ? (
          <div className="col-span-2 flex max-w-[390px] flex-col items-center text-center font-inter font-semibold text-mainBlack">
            <img src="/home_page_image.svg" alt="home page image" />
            <p className="text-balance text-center">
              Apparently you haven't looked any recipes yet. You can use the
              <span className="mx-1 inline-flex">
                <FaMagnifyingGlass size={16} />
              </span>
              search page to find new recipes you're interested in, you can use
              the
              <span className="mx-1 inline-flex">
                <FaBook size={16} />
              </span>{" "}
              home page to import or write your recipes.
            </p>
          </div>
        ) : (
          recentRecipes.data.map((recipe, idx) => (
            <RecipeCard key={`last-recipe-${idx}`} recipe={recipe} />
          ))
        )}
      </div>

      <Title className="mx-auto">Best rated</Title>
      <div className="grid grid-cols-2 gap-2">
        {bestRated.data.map((recipe, idx) => (
          <RecipeCard key={`recommended-recipe-${idx}`} recipe={recipe} />
        ))}
      </div>
    </SearchLayout>
  );
};

export default Search;
