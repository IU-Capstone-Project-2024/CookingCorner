import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Category = () => {
  return (
    <Select>
      <SelectTrigger className="h-8 w-[180px] bg-primary font-inter font-medium">
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

export default Category;
