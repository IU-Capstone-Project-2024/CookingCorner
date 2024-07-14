import { FaArrowLeft, FaEllipsisVertical } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { memo } from "react";
import { Select, SelectContent, SelectGroup } from "../ui/select";
import { useDeleteRecipe, usePublish } from "@/services/mutations";
import { useAuth, useRecipe } from "@/services/queries";
import { SelectTrigger } from "@radix-ui/react-select";
interface RecipeNavigationProps {
  isPending?: boolean;
  isPrivate?: boolean;
}

const RecipeNavigation = memo(
  ({ isPrivate, isPending }: RecipeNavigationProps) => {
    const navigate = useNavigate();
    const params = useParams();

    const userData = useAuth().data;
    const recipe = useRecipe(+params.recipeId!).data;
    const publishMutation = usePublish();
    const deleteMutation = useDeleteRecipe();

    function handlePublish() {
      publishMutation.mutate({ id: +params.recipeId! });
    }

    function handleDelete() {
      deleteMutation.mutate(+params.recipeId!);
      navigate("/home");
    }

    return (
      <div className="sticky top-0 flex w-full items-center justify-between gap-2 bg-primary p-2">
        <Button
          variant={"icon"}
          size={"icon"}
          onClick={() => navigate("/recipes")}
        >
          <FaArrowLeft size={20} />
        </Button>
        {isPrivate && (
          <p className="text-center">Your recipe is currently private</p>
        )}
        {recipe?.is_my_recipe && !isPending && (
          <Select>
            <SelectTrigger className="rounded-full border-2 border-mainBlack bg-primary p-1 font-inter font-medium outline-none">
              <FaEllipsisVertical size={20} />
            </SelectTrigger>
            <SelectContent className="space-y-1 bg-primary font-inter font-medium">
              <SelectGroup className="inline-flex flex-col rounded-md border-2 border-mainBlack">
                {isPrivate && (
                  <Button
                    className="rounded-md border-none"
                    onClick={handlePublish}
                  >
                    Publish the recipe
                  </Button>
                )}
                {userData?.username === recipe?.creator_username && (
                  <Button
                    className="rounded-md border-none"
                    onClick={() =>
                      navigate(`/recipes/${params.recipeId}/edit`, {
                        state: recipe,
                      })
                    }
                  >
                    Edit your recipe
                  </Button>
                )}
                {((recipe?.is_my_recipe &&
                  userData?.username !== recipe?.creator_username) ||
                  (isPrivate && recipe?.is_my_recipe)) && (
                  <Button
                    className="rounded-md border-none"
                    onClick={handleDelete}
                  >
                    Delete from recipes
                  </Button>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    );
  },
);

export default RecipeNavigation;
