import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";
import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { useCreateRecipe } from "@/services/mutations";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const createRecipeMutation = useCreateRecipe();
  const navigate = useNavigate();
  const form = useForm<RecipeSchemaFields>({
    mode: "onChange",
    resolver: zodResolver(RecipeSchema),
  });

  function processRecipeCreation(data: RecipeSchemaFields) {
    createRecipeMutation.mutate(data, { onSuccess: () => navigate("/home") });
    form.reset();
  }

  const submitClick = () => {
    if (submitRef.current) {
      submitRef.current?.click();
    }
  };

  return (
    <section className="container px-4">
      <Navigation submitForm={submitClick} />
      <RecipeForm
        submitRef={submitRef}
        form={form}
        processRecipeCreation={processRecipeCreation}
      />
    </section>
  );
};

export default CreateRecipe;
