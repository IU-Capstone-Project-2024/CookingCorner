import RecipeNavigation from "@/components/recipe/recipe-navigation";
import RecipeDescription from "@/components/recipe/recipe-description";
import RecipeSteps from "@/components/recipe/recipe-steps";
import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";

const RecipePage = () => {
  const [isSteps, setIsSteps] = useState(true);

  return (
    <section className="container flex flex-col items-center gap-4 px-7 font-inter">
      {/* <RecipeNavigation recipe={recipe} /> */}
      {/* <img
        src={recipe.img === null ? "no_image.png" : "/".concat(recipe.img)}
        className="max-h-[200px] w-full max-w-[335px] object-cover"
      /> */}
      <Tabs defaultValue="steps" className="font-inter">
        {/* <RecipeDescription recipe={recipe} setIsSteps={setIsSteps} />
        <RecipeSteps isSteps={isSteps} recipe={recipe} /> */}
      </Tabs>
    </section>
  );
};

export default RecipePage;
