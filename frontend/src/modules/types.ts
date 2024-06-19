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

export type Recipe = {
  img: string;
  title: string;
  rating: number;
  cookingTime: number;
  author: User;
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