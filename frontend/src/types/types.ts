import { ProfileEditSchema } from "@/schemas/profile-edit.schema";
import { IconType } from "react-icons";
import { z } from "zod";

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
  image_path: string;
  description: string;
  title: string;
};

export type FilterConditions = {
  [index: string]: string | boolean;
};

export type ContextState = {
  filters: FilterConditions;
  setFilters: (value: FilterConditions) => void;
  handleFiltersChange: (name: string, value?: string | boolean) => void;
};

export type Category = "warm_dishes" | "smoked" | "boiled" | "dessert";

export type Recipe = {
  id: number;
  carbohydrates_value: number;
  category_id: number;
  category_name: string;
  comments: string;
  cooking_time: number;
  creator_username: string;
  description: string;
  dishes: string;
  fats_value: number;
  icon_path: string;
  ingredients: Ingredient[];
  is_favorite: boolean;
  is_my_recipe: boolean;
  is_private: boolean;
  name: string;
  nutritional_value: number;
  preparing_time: number;
  proteins_value: number;
  rating: number;
  portions: number;
  reviews: number;
  source: string;
  steps: Step[];
  tag_id: number;
  tag_name: number;
  total_time: number;
  user_id: number;
  video_link: string;
  waiting_time: number;
};

export type Ingredient = {
  portion: string;
  title: string;
};

export type User = z.infer<typeof ProfileEditSchema>;

export type RecipeResponse = {
  lastRecipes: Recipe[];
  recommendedRecipes: Recipe[];
};
