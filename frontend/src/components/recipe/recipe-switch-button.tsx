import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const RecipeSwitchButton = () => {
  return (
    <>
      <TabsList className="w-full rounded-full border-[3px] border-mainBlack bg-primary">
        <TabsTrigger value="steps">Cooking steps</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
      </TabsList>
    </>
  );
};

export default RecipeSwitchButton;
