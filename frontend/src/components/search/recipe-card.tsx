import { Recipe } from "@/types/types";
import RecipeTitle from "./recipe-card-title";
import RecipeDescription from "./recipe-card-description";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

interface RecipeCardProps {
  recipe: Recipe;
  action?: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, action }: RecipeCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex min-h-64 max-w-44 cursor-pointer flex-col items-center justify-between gap-2 rounded-lg border-[3px] border-mainBlack p-2 hover:bg-hover-secondary"
      onClick={() => navigate(`/recipes/${recipe.id}`)}
    >
      <img
        src={recipe.img === null ? "no_image.png" : recipe.img}
        alt={recipe.title}
        className="w-fit"
      />
      <RecipeTitle>{recipe.title}</RecipeTitle>
      <RecipeDescription
        rating={recipe.rating}
        author={recipe.author}
        cookingTime={recipe.cookingTime}
      />
      <Button
        size="recipeCard"
        variant={recipe.starred ? "favourite" : "recipeCard"}
      >
        {recipe.favourite ? (
          <p className="flex items-center gap-2">
            Add to favourites{" "}
            {recipe.starred ? (
              <FaHeart size={20} className="text-hover" />
            ) : (
              <FaRegHeart size={20} className="text-hover" />
            )}
          </p>
        ) : (
          <p className="flex items-center gap-2">Add to your recipes</p>
        )}
      </Button>
    </div>
  );
};

export default RecipeCard;
