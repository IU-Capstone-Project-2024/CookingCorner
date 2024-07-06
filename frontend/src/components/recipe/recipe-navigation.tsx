import { FaArrowLeft, FaEllipsisVertical } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

interface RecipeNavigationProps {
  privateRecipe: boolean;
}

const RecipeNavigation = memo(({ privateRecipe }: RecipeNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="sticky top-0 flex w-full items-center justify-between gap-2 bg-primary p-2"
      data-open={isOpen}
    >
      <Button
        variant={"icon"}
        size={"icon"}
        onClick={() => navigate("/recipes")}
      >
        <FaArrowLeft size={20} />
      </Button>
      {privateRecipe && (
        <p className="text-center">Your recipe is currently private</p>
      )}
      <Select>
        <SelectTrigger className="rounded-full border-2 border-mainBlack bg-primary p-1 font-inter font-medium outline-none">
          <FaEllipsisVertical size={20} />
        </SelectTrigger>
        <SelectContent className="space-y-1 bg-primary font-inter font-medium">
          <SelectGroup className="inline-flex flex-col rounded-md border-2 border-mainBlack">
            <Button className="rounded-md border-none">
              Publish the recipe
            </Button>
            <Button className="rounded-md border-none">Edit your recipe</Button>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
});

export default RecipeNavigation;
