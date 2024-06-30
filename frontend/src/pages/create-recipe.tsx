import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";

const CreateRecipe = () => {
  return (
    <section className="container px-4">
      <Navigation />
      <RecipeForm />
    </section>
  );
};

export default CreateRecipe;
