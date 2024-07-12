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
import { useLocation, useNavigate } from "react-router-dom";

interface RecipeFormProps {
  submitRef: RefObject<HTMLButtonElement>;
}

const RecipeForm = ({ submitRef }: RecipeFormProps) => {
  const categories = useCategories();
  const createRecipeMutation = useCreateRecipe();
  const data = useLocation().state;
  const navigate = useNavigate();
  // const uploadFileMutation = useUploadFile();
  // const data = useFile();
  const form = useForm<RecipeSchemaFields>({
    resolver: zodResolver(RecipeSchema),
  });

  if (categories.isError) {
    return <p>Error</p>;
  }

  if (categories.isPending) {
    return <p>Loading</p>;
  }

  // const fileRef = form.register("icon_path");

  // function getFile() {
  //   console.log(data.data.data);
  //   setBinary(data?.data?.data);
  // }

  function processRecipeCreation(data: RecipeSchemaFields) {
    createRecipeMutation.mutate(data, { onSuccess: () => navigate("/home") });
    form.reset();
    // let formData = new FormData();
    // formData.append("file", data.icon_path[0]);
    // uploadFileMutation.mutate(formData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(processRecipeCreation)}
        className="mt-2 flex flex-col gap-2 font-inter"
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
              {form.formState.errors.icon_path && <p>Error</p>}
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
          defaultValue={data?.name ?? ""}
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
          defaultValue={data?.description ?? ""}
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
          defaultValue={data?.preparing_time.toString() ?? ""}
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
          defaultValue={data?.cooking_time.toString() ?? ""}
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Cooking time" />
          )}
        />
        <FormField
          control={form.control}
          name="waiting_time"
          defaultValue={data?.waiting_time.toString() ?? ""}
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Rest time" />
          )}
        />
        <FormField
          control={form.control}
          name="total_time"
          defaultValue={data?.total_time.toString() ?? ""}
          render={({ field }) => (
            <Input isize={"default"} {...field} placeholder="Total time" />
          )}
        />
        <FormField
          control={form.control}
          name="portions"
          defaultValue={data?.portions.toString() ?? ""}
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
  );
};

export default RecipeForm;
