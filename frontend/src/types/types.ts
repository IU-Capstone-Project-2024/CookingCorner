import { IconType } from "react-icons";

export type FormData = {
  login: string;
  password: string;
};

export type Page = {
  icon: IconType;
  description: string;
  path: string;
};

export type Step = {
  stepNumber: number;
  img: string;
  description: string;
};

export type Category = "warm_dishes" | "smoked" | "boiled" | "dessert";

export type Recipe = {
  id: number;
  title: string;
  img: string | null;
  private: boolean;
  rating: number;
  cookingTime: number;
  preparationTime: number;
  portions: number;
  favourite: boolean;
  starred: boolean;
  reviews: number;
  author: User;
  category: Category;
  steps: Step[];
  ingredients: Ingredient[];
};

export type Ingredient = {
  ingredientNumber: number;
  img: string | null;
  title: string;
};

export type User = {
  image_path: string | null;
  username: string;
  name: string | null;
  surname: string | null;
  email: string | null;
  cooking_experience: number | null;
};

export type RecipeResponse = {
  lastRecipes: Recipe[];
  recommendedRecipes: Recipe[];
};
