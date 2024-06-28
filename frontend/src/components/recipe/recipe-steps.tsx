import { Recipe } from "@/types/types";
import Steps from "./steps/steps";
import Ingredients from "./ingredients/ingredients";

interface RecipeStepsProps {
  isSteps: boolean;
  recipe: Recipe;
}

const RecipeSteps = ({ isSteps, recipe }: RecipeStepsProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {isSteps ? (
        <Steps steps={recipe.steps} />
      ) : (
        <Ingredients ingredients={recipe.ingredients} />
      )}
    </div>
  );
};

export default RecipeSteps;
