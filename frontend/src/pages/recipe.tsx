import RecipeNavigation from "@/components/recipe/recipe-navigation";
import RecipeDescription from "@/components/recipe/recipe-description";
import RecipeSteps from "@/components/recipe/recipe-steps";
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useRecipe } from "@/services/queries";
import { useParams } from "react-router-dom";
import RecipeLayout from "@/components/recipe/recipe-layout";
import { Skeleton } from "@/components/ui/skeleton";

const RecipePage = () => {
  const params = useParams();
  const recipe = useRecipe(+params.recipeId!);
  console.log(recipe.data);
  const [isSteps, setIsSteps] = useState(true);

  if (recipe.isError) {
    return (
      <RecipeLayout>
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </RecipeLayout>
    );
  }

  if (recipe.isPending) {
    return (
      <RecipeLayout>
        <Skeleton className="h-[200px] w-full border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-8 w-full items-start bg-hover-secondary" />
        <div className="grid w-full grid-cols-3 gap-2">
          <Skeleton className="h-8 w-full bg-hover-secondary" />
          <Skeleton className="h-8 w-full bg-hover-secondary" />
          <Skeleton className="h-8 w-full bg-hover-secondary" />
        </div>
        <div className="grid w-full grid-cols-3 gap-1">
          <Skeleton className="h-12 w-full bg-hover-secondary" />
          <Skeleton className="h-12 w-full bg-hover-secondary" />
          <Skeleton className="h-12 w-full bg-hover-secondary" />
        </div>
        <div className="flex h-8 w-full items-center gap-1 rounded-full border-2 border-mainBlack bg-primary p-1">
          <Skeleton className="h-6 w-full rounded-full bg-hover-secondary" />
          <Skeleton className="h-6 w-full rounded-full bg-hover-secondary" />
        </div>
        <Skeleton className="h-[200px] w-full bg-hover-secondary" />
      </RecipeLayout>
    );
  }

  return (
    <RecipeLayout isPrivate={recipe.data.private}>
      <img
        src={recipe.data.img === null ? "no_image.png" : "/" + recipe.data.img}
        className="max-h-[200px] w-full max-w-[320px] object-cover"
      />
      <Tabs defaultValue="steps" className="font-inter">
        <RecipeDescription recipe={recipe.data} setIsSteps={setIsSteps} />
        <RecipeSteps isSteps={isSteps} recipe={recipe.data} />
      </Tabs>
    </RecipeLayout>
  );
};

export default RecipePage;
