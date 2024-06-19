import { Recipe } from "@/modules/types";
import RecipeTitle from "./recipe-title";
import RecipeDescription from "./recipe-description";
import { Button } from "../ui/button";

interface RecipeCardProps {
  recipe: Recipe;
  action: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, action }: RecipeCardProps) => {
  return (
    <div className="border-mainBlack flex min-h-64 max-w-44 flex-col justify-between gap-2 rounded-lg border-[3px] p-2">
      <img src={recipe.img} alt={recipe.title} width={125} />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeDescription
        rating={recipe.rating}
        author={recipe.author}
        cookingTime={recipe.cookingTime}
      />
      <Button
        size="recipeCard"
        variant="recipeCard"
        onClick={() => action(recipe)}
      >
        Add to my recipes
      </Button>
    </div>
  );
};

export default RecipeCard;
