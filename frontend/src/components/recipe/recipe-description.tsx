import { Recipe } from "@/types/types";
import RecipeTitle from "../search/recipe-card-title";
import RecipeEvaluations from "./recipe-evaluations";
import RecipeTime from "./recipe-time";
import { memo } from "react";
import RecipeSwitchButton from "./recipe-switch-button";

interface RecipeDescriptionProps {
  recipe: Recipe;
  setIsSteps: (value: boolean) => void;
}

const RecipeDescription = memo(({ recipe }: RecipeDescriptionProps) => {
  return (
    <div className="sticky top-12 flex w-full flex-col gap-4 bg-primary p-2 text-left">
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <RecipeEvaluations
        rating={recipe.rating}
        author={recipe.creator_username}
        reviews={recipe.reviews}
      />
      <RecipeTime
        cookingTime={recipe.cooking_time}
        preparationTime={recipe.preparing_time}
        portions={recipe.portions}
      />
      <div className="text-center">
        <RecipeSwitchButton />
      </div>
    </div>
  );
});

export default RecipeDescription;
