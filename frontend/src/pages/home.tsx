import RecipeCard from "@/components/recipe/recipe-card";
import Title from "@/components/title";
import { addRecipe, getRecipes } from "@/lib/utils";
import { Recipe, RecipeResponse } from "@/modules/types";
import { useLoaderData } from "react-router-dom";

export async function action(recipe: Recipe) {
  const recipes = await addRecipe(recipe);
  return recipes;
}

export async function loader() {
  const recipes = await getRecipes();
  return recipes;
}

const Home = () => {
  const { lastRecipes, recommendedRecipes } = useLoaderData() as RecipeResponse;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <Title className="mx-auto">Last recipes</Title>
        <div className="flex gap-2">
          {lastRecipes.length === 0 ? (
            <p className="text-mainBlack font-inter font-semibold">
              You don't have any reviewed recipes yet!
            </p>
          ) : (
            lastRecipes.map((recipe, idx) => (
              <RecipeCard
                key={`last-recipe-${idx}`}
                recipe={recipe}
                action={action}
              />
            ))
          )}
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Title className="mx-auto">Recommended</Title>
        <div className="flex gap-2">
          {recommendedRecipes.map((recipe, idx) => (
            <RecipeCard
              key={`recommended-recipe-${idx}`}
              recipe={recipe}
              action={action}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
