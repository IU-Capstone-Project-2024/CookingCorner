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
  img: string;
  title: string;
  rating: number;
  cookingTime: number;
  author: User;
  favourite: boolean;
  starred: boolean;
  category: Category;
  steps: Step[],
}

export type User = {
  username: string;
  name: string;
  surname: string;
  email: string;
  experience: number;
}

export type RecipeResponse = {
  lastRecipes: Recipe[],
  recommendedRecipes: Recipe[]
}