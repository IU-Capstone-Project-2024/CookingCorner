import { Recipe } from "@/types/types";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import RecipeDescription from "../search/recipe-card-description";
import RecipeTitle from "../search/recipe-card-title";
import { useAddFavourite, useRemoveFavourite } from "@/services/mutations";

interface MyRecipeCardProps {
  recipe: Recipe;
  action?: (recipe: Recipe) => void;
}

const MyRecipeCard = ({ recipe }: MyRecipeCardProps) => {
  const navigate = useNavigate();
  const addFavouriteMutation = useAddFavourite();
  const removeFavouriteMutation = useRemoveFavourite();

  function handleAddToFavourites(id: number, e: any, is_favorite: boolean) {
    e.stopPropagation();
    is_favorite
      ? removeFavouriteMutation.mutate(id)
      : addFavouriteMutation.mutate(id);
  }

  return (
    <div
      className="flex min-h-64 max-w-44 cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-[3px] border-mainBlack p-2 hover:bg-hover-secondary"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      <img
        src={recipe.icon_path === null ? "no_image.png" : recipe.icon_path}
        alt={recipe.name}
        className="w-fit"
      />
      <RecipeTitle>{recipe.name}</RecipeTitle>
      <RecipeDescription
        rating={recipe.rating}
        author={recipe.creator_username}
        cookingTime={recipe.cooking_time}
      />
      <Button
        onClick={(e) => handleAddToFavourites(recipe.id, e, recipe.is_favorite)}
        variant={recipe.is_favorite ? "favourite" : "recipeCard"}
        className="w-full"
      >
        {recipe.is_favorite ? (
          <p className="flex items-center gap-1 text-xs">
            Remove from <FaHeart size={18} className="text-hover" />
          </p>
        ) : (
          <p className="flex items-center gap-1 text-xs">
            Add to <FaRegHeart size={18} className="text-hover" />
          </p>
        )}
      </Button>
    </div>
  );
};

export default MyRecipeCard;
