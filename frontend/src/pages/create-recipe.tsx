import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";
import { useRef } from "react";

const CreateRecipe = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const submitClick = () => {
    if (submitRef) {
      submitRef.current?.click();
    }
  };

  return (
    <section className="container px-4">
      <Navigation submitForm={submitClick} />
      <RecipeForm submitRef={submitRef} />
    </section>
  );
};

export default CreateRecipe;
