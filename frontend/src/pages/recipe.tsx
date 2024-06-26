import { Params, useLoaderData } from "react-router-dom";
import { Recipe } from "@/typings/types";
import { addFavouriteRecipe, getRecipe } from "@/lib/utils";
import RecipeNavigation from "@/components/recipe/recipe-navigation";
import RecipeDescription from "@/components/recipe/recipe-description";
import RecipeSteps from "@/components/recipe/recipe-steps";
import RecipeSwitchButton from "@/components/recipe/recipe-switch-button";

export async function action(recipe: Recipe) {
  await addFavouriteRecipe(recipe);
}

export async function loader({ params }: { params: Params<"recipeId"> }) {
  const recipe = await getRecipe(Number(params.recipeId));
  return recipe;
}

const RecipePage = () => {
  const recipe = useLoaderData() as Recipe;

  return (
    <section className="flex flex-col items-center gap-4 px-7">
      <RecipeNavigation recipe={recipe} action={action} />
      <img
        src={recipe.img === null ? "no_image.png" : "/" + recipe.img}
        className="max-w-[335px]"
      />
      <RecipeDescription recipe={recipe} />
      <RecipeSwitchButton />
      <RecipeSteps />
    </section>
  );
};

export default RecipePage;
