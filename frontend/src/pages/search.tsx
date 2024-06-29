import RecipeCard from "@/components/search/recipe-card";
import Title from "@/components/title";
import { Recipe, RecipeResponse } from "@/types/types";
import { useLoaderData } from "react-router-dom";

const Search = () => {
  const { lastRecipes, recommendedRecipes } = useLoaderData() as RecipeResponse;

  return (
    <section className="container flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <Title className="mx-auto">Last recipes</Title>
        <div className="grid grid-cols-2 gap-2">
          {lastRecipes.length === 0 ? (
            <p className="font-inter font-semibold text-mainBlack">
              You don't have any reviewed recipes yet!
            </p>
          ) : (
            lastRecipes.map((recipe, idx) => (
              <RecipeCard key={`last-recipe-${idx}`} recipe={recipe} />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Title className="mx-auto">Recommended</Title>
        <div className="grid grid-cols-2 gap-2">
          {recommendedRecipes.map((recipe, idx) => (
            <RecipeCard key={`recommended-recipe-${idx}`} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Search;
