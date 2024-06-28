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

const RecipeDescription = memo(
  ({ recipe, setIsSteps }: RecipeDescriptionProps) => {
    return (
      <div className="sticky top-12 flex w-full flex-col gap-4 bg-primary p-2 text-left">
        <RecipeTitle>{recipe.title}</RecipeTitle>
        <RecipeEvaluations
          rating={recipe.rating}
          author={recipe.author}
          reviews={recipe.reviews}
        />
        <RecipeTime
          cookingTime={recipe.cookingTime}
          preparationTime={recipe.preparationTime}
          portions={recipe.portions}
        />
        <div className="text-center">
          <RecipeSwitchButton setIsSteps={setIsSteps} />
        </div>
      </div>
    );
  },
);

export default RecipeDescription;
