import { Recipe } from "@/types/types";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import RecipeDescription from "../search/recipe-card-description";
import RecipeTitle from "../search/recipe-card-title";
import { useAddFavourite } from "@/services/mutations";

interface MyRecipeCardProps {
  recipe: Recipe;
  action?: (recipe: Recipe) => void;
}

const MyRecipeCard = ({ recipe }: MyRecipeCardProps) => {
  const navigate = useNavigate();
  const addFavouriteMutation = useAddFavourite();

  function handleAddToFavourites(id: number) {
    addFavouriteMutation.mutate(id);
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
      <Button onClick={() => handleAddToFavourites(recipe.id)}>
        <p className="flex items-center gap-2">
          Add to favourites{" "}
          {recipe.is_favorite ? (
            <FaHeart size={20} className="text-hover" />
          ) : (
            <FaRegHeart size={20} className="text-hover" />
          )}
        </p>
      </Button>
    </div>
  );
};

export default MyRecipeCard;
