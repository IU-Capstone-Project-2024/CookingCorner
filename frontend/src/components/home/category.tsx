import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/services/queries";

interface CategoryProps {
  handleFiltersChange: (name: string, value?: string | boolean) => void;
}

const Category = ({ handleFiltersChange }: CategoryProps) => {
  const categories = useCategories();

  if (categories.isError) {
    return <p>Error</p>;
  }

  if (categories.isPending) {
    return <p>Loading</p>;
  }

  return (
    <Select
      onValueChange={(value) => handleFiltersChange("category_name", value)}
    >
      <SelectTrigger className="h-8 max-w-[290px] bg-primary font-inter font-medium">
        <SelectValue placeholder="All" defaultValue={"all"} />
      </SelectTrigger>
      <SelectContent className="bg-primary font-inter font-medium">
        <SelectGroup>
          {categories.data.map((item: string) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Category;
