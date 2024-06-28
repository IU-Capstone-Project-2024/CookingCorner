import { Recipe } from "@/types/types";
import { FaArrowLeft, FaRegHeart } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

interface RecipeNavigationProps {
  action: (recipe: Recipe) => void;
  recipe: Recipe;
}

const RecipeNavigation = memo(({ action, recipe }: RecipeNavigationProps) => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 flex w-full items-center justify-between bg-primary p-2">
      <Button
        variant={"icon"}
        size={"icon"}
        onClick={() => navigate("/recipes")}
      >
        <FaArrowLeft size={20} />
      </Button>
      <Button
        variant={"icon"}
        size={"icon"}
        className={`${recipe.favourite ? "bg-hover" : ""}`}
        onClick={() => action(recipe)}
      >
        <FaRegHeart size={20} />
      </Button>
    </div>
  );
});

export default RecipeNavigation;
