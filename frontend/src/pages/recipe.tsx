import { Params, useLoaderData } from "react-router-dom";
import { Recipe } from "@/types/types";
import { addFavouriteRecipe, getRecipe } from "@/lib/utils";
import RecipeNavigation from "@/components/recipe/recipe-navigation";
import RecipeDescription from "@/components/recipe/recipe-description";
import RecipeSteps from "@/components/recipe/recipe-steps";
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";

export async function action(recipe: Recipe) {
  await addFavouriteRecipe(recipe);
}

export async function loader({ params }: { params: Params<"recipeId"> }) {
  const recipe = await getRecipe(Number(params.recipeId));
  return recipe;
}

const RecipePage = () => {
  const recipe = useLoaderData() as Recipe;
  const [isSteps, setIsSteps] = useState(true);

  return (
    <section className="container flex flex-col items-center gap-4 px-7 font-inter">
      <RecipeNavigation recipe={recipe} action={action} />
      <img
        src={recipe.img === null ? "no_image.png" : "/".concat(recipe.img)}
        className="max-h-[200px] w-full max-w-[335px] object-cover"
      />
      <Tabs defaultValue="steps" className="font-inter">
        <RecipeDescription recipe={recipe} setIsSteps={setIsSteps} />
        <RecipeSteps isSteps={isSteps} recipe={recipe} />
      </Tabs>
    </section>
  );
};

export default RecipePage;
