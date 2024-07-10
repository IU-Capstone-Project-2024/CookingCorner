import { Recipe } from "@/types/types";
import Steps from "./steps/steps";
import Ingredients from "./ingredients/ingredients";
import { TabsContent } from "../ui/tabs";

interface RecipeStepsProps {
  isSteps: boolean;
  recipe: Recipe;
}

const RecipeSteps = ({ recipe }: RecipeStepsProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <TabsContent value="steps">
        <Steps steps={recipe.steps} />
      </TabsContent>
      <TabsContent value="ingredients">
        <Ingredients ingredients={recipe.ingredients} />
      </TabsContent>
    </div>
  );
};

export default RecipeSteps;
