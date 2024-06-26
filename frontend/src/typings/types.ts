import { IconType } from "react-icons";

export type FormData = {
  login: string;
  password: string;
};

export type Page = {
  icon: IconType,
  description: string;
  path: string;
}

export type Step = {
  step_number: number;
  step_img: string;
  description: string;
}

export type Category = "warm_dishes" | "smoked" | "boiled" | "dessert"

export type Recipe = {
  img: string | null;
  title: string;
  rating: number;
  cookingTime: number;
  preparationTime: number;
  portions: number;
  author: User;
  favourite: boolean;
  starred: boolean;
  category: Category;
  steps: Step[],
  id: number;
}

export type User = {
  img: string | null;
  username: string;
  name: string | null;
  surname: string | null;
  email: string | null;
  experience: number | null;
}

export type RecipeResponse = {
  lastRecipes: Recipe[],
  recommendedRecipes: Recipe[]
}