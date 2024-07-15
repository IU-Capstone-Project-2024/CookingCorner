import { Input } from "../ui/input";
import { RefObject, useState } from "react";
import { Form, FormField } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/services/queries";
import { useLocation } from "react-router-dom";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { UseFormReturn } from "react-hook-form";
import { IngredientContainer, IngredientInput } from "../ingredient-input";
import { Ingredient, Step } from "@/types/types";
import { StepContainer, StepInput } from "../step-input";

interface RecipeFormProps {
  submitRef: RefObject<HTMLButtonElement>;
  recipeAction: (data: RecipeSchemaFields) => void;
  form: UseFormReturn<RecipeSchemaFields>;
}

const RecipeForm = ({ submitRef, form, recipeAction }: RecipeFormProps) => {
  const categories = useCategories();
  const data = useLocation().state;
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    data?.ingredients ?? [],
  );
  const [steps, setSteps] = useState<Step[]>(data?.steps ?? []);

  if (categories.isError) {
    return <p>Error</p>;
  }

  if (categories.isPending) {
    return <p>Loading</p>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(recipeAction)}
        className="mt-2 flex flex-col gap-4 font-inter"
      >
        {/* <FormField
          control={form.control}
          name="icon_path"
          render={({ field }) => (
            <div className="inline-flex items-center justify-center">
              <Label
                className="text-md flex h-12 items-center justify-center rounded-md border border-mainBlack bg-hover-switch px-4 py-2 font-bold"
                htmlFor="image-file"
              >
                Add top image
              </Label>
              <FormControl>
                <Input
                  {...fileRef}
                  id="image-file"
                  variant={"image"}
                  isize={"image"}
                  className="mx-auto hidden text-center"
                  type="file"
                />
              </FormControl>
            </div>
          )}
        /> */}
        <FormField
          control={form.control}
          name="name"
          defaultValue={data?.name ?? undefined}
          render={({ field }) => (
            <Input
              isize={"default"}
              label="Name"
              error={form.formState.errors.name}
              {...field}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          defaultValue={data?.description ?? undefined}
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Description" />
          )}
        />
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <div className="relative">
              <Select onValueChange={field.onChange} {...field}>
                <label className="pointer-events-none absolute left-[17px] top-[0%] z-10 -translate-y-[50%] border-none bg-primary p-1 font-inter text-sm font-normal text-mainBlack">
                  Categories
                </label>
                <SelectTrigger className="h-12 w-full bg-primary px-4 py-2 font-inter font-medium text-mainBlack-secondary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-primary font-inter font-medium">
                  <SelectGroup>
                    {categories.data.map((item: string) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <FormField
          control={form.control}
          name="preparing_time"
          defaultValue={data?.preparing_time.toString() ?? undefined}
          render={({ field }) => (
            <Input
              isize={"default"}
              type="number"
              {...field}
              label="Preparation time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="cooking_time"
          defaultValue={data?.cooking_time.toString() ?? undefined}
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              type="number"
              label="Cooking time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="waiting_time"
          defaultValue={data?.waiting_time.toString() ?? undefined}
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              type="number"
              label="Rest time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="portions"
          defaultValue={data?.portions.toString() ?? undefined}
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Portions" />
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <IngredientContainer setIngredients={setIngredients} {...field}>
              {ingredients.map((ingredient, idx) => (
                <IngredientInput
                  key={`${ingredient}-${idx}`}
                  ingredient={ingredient}
                  register={form.register}
                  ingredientNumber={idx}
                />
              ))}
            </IngredientContainer>
          )}
        />
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <StepContainer setSteps={setSteps} {...field}>
              {steps.map((step, idx) => (
                <StepInput
                  label="Description"
                  labelPosition={"middle"}
                  key={`${step}-${idx}`}
                  cooking_step={step}
                  register={form.register}
                  stepNumber={idx}
                />
              ))}
            </StepContainer>
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Comments" />
          )}
        />
        <FormField
          control={form.control}
          name="nutritional_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              type="number"
              {...field}
              label="Nutritional value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="proteins_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              type="number"
              {...field}
              label="Proteins value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="fats_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              type="number"
              {...field}
              label="Fats value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="carbohydrates_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              type="number"
              {...field}
              label="Carbohydrates value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="dishes"
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Dishes" />
          )}
        />
        <FormField
          control={form.control}
          name="video_link"
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Video link" />
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <Input isize={"default"} {...field} label="Source" />
          )}
        />
        <button ref={submitRef} className="hidden" />
      </form>
    </Form>
  );
};

export default RecipeForm;
