import { Ingredient } from "@/types/types";
import IngredientCard from "./ingredient-card";

interface IngredientsProps {
  ingredients: Ingredient[];
}
const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <div className="space-y-2">
      {ingredients === null ? (
        <div className="w-full rounded-[25px] border-2 border-mainBlack">
          <h2 className="text-center text-lg font-bold">
            No ingredients provided
          </h2>
          <p className="text-center text-sm font-medium">
            No ingredients were provided during creation of the recipe. You can
            always edit your recipe to change that.
          </p>
        </div>
      ) : (
        ingredients.map((ingredient, idx) => (
          <IngredientCard
            key={`ingredient-card-${idx}`}
            title={ingredient.title}
            portion={ingredient.portion}
          />
        ))
      )}
    </div>
  );
};

export default Ingredients;
