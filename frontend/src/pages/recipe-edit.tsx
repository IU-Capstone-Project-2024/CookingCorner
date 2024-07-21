import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";
import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useEditRecipe, useUploadRecipeImage } from "@/services/mutations";
import { compareImages, getDataWithImages } from "@/lib/utils";

const RecipeEdit = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const editRecipeMutation = useEditRecipe();
  const uploadImageMutation = useUploadRecipeImage();
  const navigate = useNavigate();
  const recipeData = useLocation().state;
  const form = useForm<RecipeSchemaFields>({
    mode: "onChange",
    resolver: zodResolver(RecipeSchema),
  });

  async function editRecipe(data: RecipeSchemaFields) {
    const images = compareImages(recipeData, data);

    let results = await Promise.all(
      images.map((image) =>
        !image.hasOwnProperty("file_name")
          ? uploadImageMutation.mutateAsync(image)
          : undefined,
      ),
    );

    results = images.map((image, idx) => {
      if (!image.hasOwnProperty("file_name")) {
        return results[idx];
      } else {
        return image;
      }
    });

    editRecipeMutation.mutate(
      { ...getDataWithImages(results, data), id: recipeData.id },
      { onSuccess: () => navigate(`/recipes/${recipeData.id}`) },
    );
    form.reset();
  }

  const submitClick = () => {
    if (submitRef.current) {
      submitRef.current?.click();
    }
  };

  return (
    <section className="container max-w-[390px] px-4">
      <Navigation submitForm={submitClick} id={recipeData.id} />
      <RecipeForm submitRef={submitRef} form={form} recipeAction={editRecipe} />
    </section>
  );
};

export default RecipeEdit;
