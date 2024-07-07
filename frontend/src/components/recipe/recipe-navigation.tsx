import { FaArrowLeft, FaEllipsisVertical } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { memo } from "react";
import { Select, SelectContent, SelectGroup } from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { usePublish } from "@/services/mutations";

interface RecipeNavigationProps {
  isPending?: boolean;
  isPrivate?: boolean;
}

const RecipeNavigation = memo(
  ({ isPrivate, isPending }: RecipeNavigationProps) => {
    const navigate = useNavigate();
    const params = useParams();
    const publishMutate = usePublish();

    function handlePublish() {
      publishMutate.mutate(+params.recipeId!);
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
        {!isPending && (
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
                <Button className="rounded-md border-none">
                  Edit your recipe
                </Button>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    );
  },
);

export default RecipeNavigation;
