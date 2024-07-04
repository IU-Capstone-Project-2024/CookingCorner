import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { UseFormRegister } from "react-hook-form";

interface RecipeCategoryProps {
  register: UseFormRegister<RecipeSchemaFields>;
}

const RecipeCategory = ({ register }: RecipeCategoryProps) => {
  return (
    <Select>
      <SelectTrigger className="h-12 w-full bg-primary px-4 py-2 font-inter font-medium text-mainBlack-secondary">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="bg-primary font-inter font-medium">
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="warm dishes">Warm dishes</SelectItem>
          <SelectItem value="smoked">Smoked</SelectItem>
          <SelectItem value="boiled">Boiled</SelectItem>
          <SelectItem value="dessert">Dessert</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default RecipeCategory;
