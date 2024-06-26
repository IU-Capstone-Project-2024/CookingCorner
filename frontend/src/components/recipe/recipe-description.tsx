import { Recipe } from "@/typings/types";
import RecipeTitle from "../search/recipe-card-title";
import RecipeEvaluations from "./recipe-evaluations";
import RecipeTime from "./recipe-time";

interface RecipeDescriptionProps {
  recipe: Recipe;
}

const RecipeDescription = ({ recipe }: RecipeDescriptionProps) => {
  return (
    <div className="flex w-full flex-col gap-4 text-left">
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeEvaluations />
      <RecipeTime
        cookingTime={recipe.cookingTime}
        preparationTime={recipe.preparationTime}
        portions={recipe.portions}
      />
    </div>
  );
};

export default RecipeDescription;
