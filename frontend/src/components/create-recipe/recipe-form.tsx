import { RecipeSchema, RecipeSchemaFields } from "@/schemas/recipe.schema";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject } from "react";
import { useCreateRecipe } from "@/services/mutations";
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

interface RecipeFormProps {
  submitRef: RefObject<HTMLButtonElement>;
}

const RecipeForm = ({ submitRef }: RecipeFormProps) => {
  const categories = useCategories();
  const form = useForm<RecipeSchemaFields>({
    resolver: zodResolver(RecipeSchema),
    defaultValues: {
      name: "",
    },
  });

  if (categories.isError) {
    return <p>Error</p>;
  }

  if (categories.isPending) {
    return <p>Loading</p>;
  }

  const createRecipeMutation = useCreateRecipe();

  function processRecipeCreation(data: RecipeSchemaFields) {
    createRecipeMutation.mutate(data);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processRecipeCreation)}
        className="mt-2 flex flex-col gap-2 font-inter"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              placeholder="Name"
              error={form.formState.errors.name}
            />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Description" />
          )}
        />
        <FormField
          control={form.control}
          name="category_name"
          render={({ field }) => (
            <Select onValueChange={field.onChange} {...field}>
              <SelectTrigger className="h-12 w-full bg-primary px-4 py-2 font-inter font-medium text-mainBlack-secondary">
                <SelectValue placeholder="Category" />
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
          )}
        />
        <FormField
          control={form.control}
          name="tag_name"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Tag" />
          )}
        />
        <FormField
          control={form.control}
          name="preparing_time"
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              placeholder="Preparation time"
            />
          )}
        />
        <FormField
          control={form.control}
          name="cooking_time"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Cooking time" />
          )}
        />
        <FormField
          control={form.control}
          name="waiting_time"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Rest time" />
          )}
        />
        <FormField
          control={form.control}
          name="total_time"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Total time" />
          )}
        />
        <FormField
          control={form.control}
          name="portions"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Portions" />
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <textarea
              placeholder="Ingredients"
              {...field}
              className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
            />
          )}
        />
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <textarea
              placeholder="Cooking steps"
              {...field}
              className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
            />
          )}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Comments" />
          )}
        />
        <FormField
          control={form.control}
          name="nutritional_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              placeholder="Nutritional value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="proteins_value"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Proteins value" />
          )}
        />
        <FormField
          control={form.control}
          name="fats_value"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Fats value" />
          )}
        />
        <FormField
          control={form.control}
          name="carbohydrates_value"
          render={({ field }) => (
            <Input
              isize={"default"}
              {...field}
              placeholder="Carbohydrates value"
            />
          )}
        />
        <FormField
          control={form.control}
          name="dishes"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Dishes" />
          )}
        />
        <FormField
          control={form.control}
          name="video_link"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Video link" />
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Source" />
          )}
        />
        <button ref={submitRef} className="hidden" />
      </form>
    </Form>
    // <Form
    //   className="mt-2 flex flex-col gap-2 font-inter"
    //   onSubmit={form.handleSubmit(processRecipeCreation)}
    // >
    //   <div className="inline-flex items-center justify-center">
    //     <Label
    //       className="text-md flex h-12 items-center justify-center rounded-md border border-mainBlack bg-hover-switch px-4 py-2 font-bold"
    //       htmlFor="image-file"
    //     >
    //       Add top image
    //     </Label>
    //     <Input
    //       id="image-file"
    //       variant={"image"}
    //       isize={"image"}
    //       className="mx-auto hidden text-center"
    //       type="file"
    //     />
    //   </div>
    //   <Input
    //     placeholder="Name"
    //     isize={"default"}
    //     {...form.register("title")}
    //     className="placeholder:text-mainBlack-secondary"
    //     error={form.formState.errors.title}
    //   />
    //   <Input
    //     placeholder="Description"
    //     isize={"default"}
    //     {...form.register("description")}
    //   />
    //   <RecipeCategory register={form.register} />
    //   {/* <Input
    //     placeholder="Category"
    //     isize={"default"}
    //     {...form.register("category")}
    //   /> */}
    //   <Input placeholder="Tag" isize={"default"} {...form.register("tag")} />
    //   <Input
    //     placeholder="Preparation time"
    //     isize={"default"}
    //     type="number"
    //     {...form.register("preparationTime")}
    //   />
    //   <Input
    //     placeholder="Cooking time"
    //     isize={"default"}
    //     type="number"
    //     {...form.register("cookingTime")}
    //   />
    //   <Input
    //     placeholder="Rest time"
    //     isize={"default"}
    //     type="number"
    //     {...form.register("restTime")}
    //   />
    //   <Input
    //     placeholder="Total time"
    //     isize={"default"}
    //     type="number"
    //     {...form.register("totalTime")}
    //   />
    //   <Input
    //     placeholder="Portions"
    //     isize={"default"}
    //     type="number"
    //     {...form.register("portions")}
    //   />
    //   <textarea
    //     placeholder="Ingredients"
    //     {...form.register("ingredients")}
    //     className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
    //   />
    //   <textarea
    //     placeholder="Cooking steps"
    //     {...form.register("cookingSteps")}
    //     className="h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm placeholder:text-mainBlack-secondary"
    //   />
    //   <Input
    //     placeholder="Comments"
    //     isize={"default"}
    //     {...form.register("comments")}
    //   />
    //   <Input
    //     placeholder="Nutritional value"
    //     isize={"default"}
    //     {...form.register("nutritionalValue")}
    //   />
    //   <Input
    //     placeholder="Proteins value"
    //     isize={"default"}
    //     {...form.register("proteinsValue")}
    //   />
    //   <Input
    //     placeholder="Fats value"
    //     isize={"default"}
    //     {...form.register("fatsValue")}
    //   />
    //   <Input
    //     placeholder="Carbohydrates value"
    //     isize={"default"}
    //     {...form.register("carbohydratesValue")}
    //   />
    //   <Input
    //     placeholder="Dishes"
    //     isize={"default"}
    //     {...form.register("dishes")}
    //   />
    //   <Input
    //     placeholder="Video link"
    //     isize={"default"}
    //     {...form.register("videoLink")}
    //   />
    //   <Input
    //     placeholder="Source"
    //     isize={"default"}
    //     {...form.register("source")}
    //   />
    //   <button ref={submitRef} className="hidden" />
    // </Form>
  );
};

export default RecipeForm;
