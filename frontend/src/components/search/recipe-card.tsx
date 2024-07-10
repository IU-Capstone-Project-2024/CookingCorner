import { Recipe } from "@/types/types";
import RecipeTitle from "./recipe-card-title";
import RecipeDescription from "./recipe-card-description";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAddRecipe } from "@/services/mutations";

interface RecipeCardProps {
  recipe: Recipe;
  action?: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const navigate = useNavigate();
  const addToRecipesMutation = useAddRecipe();

  function handleAddToRecipes(id: number, e: any) {
    e.stopPropagation();
    addToRecipesMutation.mutate(id);
  }

  return (
    <div
      className="flex min-h-64 max-w-44 cursor-pointer flex-col justify-between gap-2 rounded-lg border-[3px] border-mainBlack p-2 hover:bg-hover-secondary"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      <img
        src={recipe.icon_path === null ? "no_image.svg" : recipe.icon_path}
        alt={"recipe picture"}
        className="w-fit"
      />
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <RecipeDescription
        rating={recipe.rating}
        author={recipe.creator_username}
        cookingTime={recipe.cooking_time}
      />
      <Button onClick={(e) => handleAddToRecipes(recipe.id, e)}>
        <p className="flex items-center gap-2 text-xs">Add to your recipes</p>
      </Button>
    </div>
  );
};

export default RecipeCard;
