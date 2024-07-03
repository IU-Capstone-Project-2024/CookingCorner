import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useCreateRecipe } from "@/services/mutations";
import { prepareRecipeData } from "@/lib/utils";

interface RecipeFormProps {
  submitRef: RefObject<HTMLButtonElement>;
}

const RecipeForm = ({ submitRef }: RecipeFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeSchemaFields>({
    mode: "onChange",
    resolver: zodResolver(RecipeSchema),
  });

  const createRecipeMutation = useCreateRecipe();

  const processRecipeCreation: SubmitHandler<RecipeSchemaFields> = (data) => {
    createRecipeMutation.mutate(prepareRecipeData(data));
    reset();
  };

  return (
    <form
      className="mt-2 flex flex-col gap-2 font-inter"
      onSubmit={handleSubmit(processRecipeCreation)}
    >
      <div className="inline-flex items-center justify-center">
        <Label
          className="text-md flex h-12 items-center justify-center rounded-md border border-mainBlack bg-hover-switch px-4 py-2 font-bold"
          htmlFor="image-file"
        >
          Add top image
        </Label>
        <Input
          id="image-file"
          variant={"image"}
          isize={"image"}
          className="mx-auto hidden text-center"
          type="file"
        />
      </div>
      <Input
        placeholder="Name"
        isize={"default"}
        {...register("title")}
        className="placeholder:text-mainBlack-secondary"
        error={errors.title}
      />
      <Input
        placeholder="Description"
        isize={"default"}
        {...register("description")}
      />
      <Input
        placeholder="Category"
        isize={"default"}
        {...register("category")}
      />
      <Input placeholder="Tag" isize={"default"} {...register("tag")} />
      <Input
        placeholder="Preparation time"
        isize={"default"}
        type="number"
        {...register("preparationTime")}
      />
      <Input
        placeholder="Cooking time"
        isize={"default"}
        type="number"
        {...register("cookingTime")}
      />
      <Input
        placeholder="Rest time"
        isize={"default"}
        type="number"
        {...register("restTime")}
      />
      <Input
        placeholder="Total time"
        isize={"default"}
        type="number"
        {...register("totalTime")}
      />
      <Input
        placeholder="Portions"
        isize={"default"}
        type="number"
        {...register("portions")}
      />
      <textarea
        placeholder="Ingredients"
        {...register("ingredients")}
        className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
      />
      <textarea
        placeholder="Cooking steps"
        {...register("cookingSteps")}
        className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
      />
      <Input
        placeholder="Comments"
        isize={"default"}
        {...register("comments")}
      />
      <Input
        placeholder="Nutritional value"
        isize={"default"}
        {...register("nutritionalValue")}
      />
      <Input
        placeholder="Proteins value"
        isize={"default"}
        {...register("proteinsValue")}
      />
      <Input
        placeholder="Fats value"
        isize={"default"}
        {...register("fatsValue")}
      />
      <Input
        placeholder="Carbohydrates value"
        isize={"default"}
        {...register("carbohydratesValue")}
      />
      <Input placeholder="Dishes" isize={"default"} {...register("dishes")} />
      <Input
        placeholder="Video link"
        isize={"default"}
        {...register("videoLink")}
      />
      <Input placeholder="Source" isize={"default"} {...register("source")} />
      <button ref={submitRef} className="hidden" />
    </form>
  );
};

export default RecipeForm;
