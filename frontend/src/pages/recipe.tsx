import RecipeNavigation from "@/components/recipe/recipe-navigation";
import RecipeDescription from "@/components/recipe/recipe-description";
import RecipeSteps from "@/components/recipe/recipe-steps";
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { useRecipe } from "@/services/queries";
import { useParams } from "react-router-dom";

const RecipePage = () => {
  const params = useParams();
  const recipe = useRecipe(+params.recipeId!);
  const [isSteps, setIsSteps] = useState(true);

  if (recipe.isError) {
    return <div>Something went wrong, please reload a page</div>;
  }

  if (recipe.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex flex-col items-center gap-4 px-7 font-inter">
      <RecipeNavigation privateRecipe={recipe.data.private} />
      <img
        src={recipe.data.img === null ? "no_image.png" : "/" + recipe.data.img}
        className="max-h-[200px] w-full max-w-[335px] object-cover"
      />
      <Tabs defaultValue="steps" className="font-inter">
        <RecipeDescription recipe={recipe.data} setIsSteps={setIsSteps} />
        <RecipeSteps isSteps={isSteps} recipe={recipe.data} />
      </Tabs>
    </section>
  );
};

export default RecipePage;
