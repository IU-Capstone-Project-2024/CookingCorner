import React from "react";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { Ingredient } from "@/services/types/types";
import { UseFormRegister } from "react-hook-form";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";

interface IngredientContainerProps {
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  children: React.ReactNode;
}

const IngredientContainer = ({
  children,
  setIngredients,
}: IngredientContainerProps) => {
  function addIngredient(e: any) {
    e.preventDefault;
    setIngredients((prev) => [...prev, { portion: "", title: "" }]);
  }

  return (
    <div className="relative flex min-h-full flex-col items-center gap-4 rounded-md border border-mainBlack px-5 py-6">
      <label className="pointer-events-none absolute -top-[0%] left-[17px] -translate-y-[50%] border-none bg-primary p-1 font-inter text-sm">
        Ingredients
      </label>
      {children}
      <Button
        className="bg-mainBlack"
        size={"icon"}
        type="button"
        onClick={(e) => addIngredient(e)}
      >
        <FaPlus className="text-primary" />
      </Button>
    </div>
  );
};

interface IngredientInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<RecipeSchemaFields>;
  className?: string;
  ingredient: Ingredient;
  ingredientNumber: number;
}

const IngredientInput = ({
  className,
  register,
  ingredient,
  type = "text",
  ingredientNumber,
  ...props
}: IngredientInputProps) => {
  return (
    <div className="flex w-full justify-evenly rounded-full border-2 border-mainBlack bg-primary">
      <div className="relative flex flex-col items-center justify-center">
        <label className="absolute top-0 -translate-y-[50%] bg-primary p-1 text-sm">
          Ingredient:
        </label>
        <input
          type={type}
          {...register(`ingredients.${ingredientNumber}.title`)}
          defaultValue={ingredient?.title}
          className="mb-2 w-[100px] border-b-2 border-mainBlack bg-transparent pt-3 outline-none"
          {...props}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center">
        <label className="absolute top-0 -translate-y-[50%] bg-primary p-1 text-sm">
          Amount:
        </label>
        <input
          type={type}
          {...register(`ingredients.${ingredientNumber}.portion`)}
          defaultValue={ingredient?.portion}
          className="mb-2 w-[100px] border-b-2 border-mainBlack bg-transparent pt-3 text-center outline-none"
          {...props}
        />
      </div>
    </div>
  );
};

export { IngredientContainer, IngredientInput };
