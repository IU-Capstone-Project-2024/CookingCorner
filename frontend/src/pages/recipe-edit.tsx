import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";
import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditRecipe } from "@/services/mutations";

const RecipeEdit = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const editRecipeMutation = useEditRecipe();
  const navigate = useNavigate();
  const recipeData = useLocation().state;
  const form = useForm<RecipeSchemaFields>({
    mode: "onChange",
    resolver: zodResolver(RecipeSchema),
  });

  function editRecipe(data: RecipeSchemaFields) {
    editRecipeMutation.mutate(
      { ...data, id: recipeData.id },
      { onSuccess: () => navigate("/home") },
    );
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
      <RecipeForm submitRef={submitRef} form={form} recipeAction={editRecipe} />
    </section>
  );
};

export default RecipeEdit;
