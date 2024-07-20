import Navigation from "@/components/create-recipe/navigation";
import RecipeForm from "@/components/create-recipe/recipe-form";
import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { useCreateRecipe, useUploadRecipeImage } from "@/services/mutations";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { getDataWithImages, getImages } from "@/lib/utils";

const CreateRecipe = () => {
  const submitRef = useRef<HTMLButtonElement>(null);
  const createRecipeMutation = useCreateRecipe();
  const uploadImageMutation = useUploadRecipeImage();
  const navigate = useNavigate();
  const form = useForm<RecipeSchemaFields>({
    mode: "onChange",
    resolver: zodResolver(RecipeSchema),
  });

  async function createRecipe(data: RecipeSchemaFields) {
    const images = getImages(data);
    let results = await Promise.all(
      images.map(
        (image) => uploadImageMutation.mutateAsync(image) ?? undefined,
      ),
    );
    results = data.icon_path === undefined ? [undefined, ...results] : results;
    const updatedData = getDataWithImages(results, data);

    createRecipeMutation.mutate(updatedData, {
      onSettled: () => navigate("/home"),
    });
    form.reset();
  }

  const submitClick = () => {
    if (submitRef.current) {
      submitRef.current?.click();
    }
  };

  return (
    <section className="w-full max-w-[390px] px-4">
      <Navigation submitForm={submitClick} />
      <RecipeForm
        submitRef={submitRef}
        form={form}
        recipeAction={createRecipe}
      />
    </section>
  );
};

export default CreateRecipe;
