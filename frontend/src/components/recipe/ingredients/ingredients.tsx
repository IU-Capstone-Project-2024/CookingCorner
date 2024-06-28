import { Ingredient } from "@/types/types";
import IngredientCard from "./ingredient-card";

interface IngredientsProps {
  ingredients: Ingredient[];
}
const Ingredients = ({ ingredients }: IngredientsProps) => {
  return (
    <>
      {ingredients.map((ingredient) => (
        <IngredientCard
          key={`ingredient-card-${ingredient.ingredientNumber}`}
          title={ingredient.title}
          ingredientNumber={ingredient.ingredientNumber}
          img={ingredient.img}
        />
      ))}
    </>
  );
};

export default Ingredients;
