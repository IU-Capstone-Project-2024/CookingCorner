import { Input } from "../ui/input";
import { Label } from "../ui/label";

const RecipeForm = () => {
  return (
    <form className="mt-2 flex flex-col gap-2 font-inter">
      <div className="inline-flex items-center justify-center">
        <Label
          className="h-8 rounded-md border border-mainBlack bg-hover-switch px-4 py-2"
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
        className="placeholder:text-mainBlack-secondary"
      />
      <Input placeholder="Description" isize={"default"} />
      <Input placeholder="Category" isize={"default"} />
      <Input placeholder="Tag" isize={"default"} />
      <Input placeholder="Preparation time" isize={"default"} />
      <Input placeholder="Cooking time" isize={"default"} />
      <Input placeholder="Rest time" isize={"default"} />
      <Input placeholder="Total time" isize={"default"} />
      <Input placeholder="Portions" isize={"default"} />
      <textarea
        placeholder="Ingredients"
        className="placeholder:text-mainBlack-secondary h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm"
      />
      <textarea
        placeholder="Cooking steps"
        className="placeholder:text-mainBlack-secondary h-32 resize-none rounded-md border border-mainBlack bg-primary px-4 py-2 text-sm placeholder:text-sm"
      />
      <Input placeholder="Comments" isize={"default"} />
      <Input placeholder="Nutritional value" isize={"default"} />
      <Input placeholder="Proteins value" isize={"default"} />
      <Input placeholder="Fats value" isize={"default"} />
      <Input placeholder="Carbohydrates value" isize={"default"} />
      <Input placeholder="Dishes" isize={"default"} />
      <Input placeholder="Video link" isize={"default"} />
      <Input placeholder="Source" isize={"default"} />
    </form>
  );
};

export default RecipeForm;
