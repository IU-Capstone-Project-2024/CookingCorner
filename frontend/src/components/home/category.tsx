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
  handleFilterChange: (name: string, value?: string | boolean) => void;
}

const Category = ({ handleFilterChange }: CategoryProps) => {
  const categories = useCategories();

  if (categories.isError) {
    return <p>Error</p>;
  }

  if (categories.isPending) {
    return <p>Loading</p>;
  }

  return (
    <Select>
      <SelectTrigger className="h-8 w-[180px] bg-primary font-inter font-medium">
        <SelectValue placeholder="Category" defaultValue={"all"} />
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
