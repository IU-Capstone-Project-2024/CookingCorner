import { API } from "@/lib/utils";
import { SignInFields } from "@/schemas/sign-in.schema";
import { Recipe } from "@/types/types";

export const getMyRecipes = async () => {
  return (await API.get<Recipe[]>("/recipes/get_my_recipes")).data;
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  return await API.post("/register", data);
};

export const login = async (data: SignInFields) => {
  return await API.post("/login", data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getMe = async () => {
  return (await API.post("/get_User/me")).data;
};

export const addToFavourites = async (data: Recipe) => {
  return await API.post("/recipes/add_to_favourites", data);
};

export const createRecipe = async (data: FormData) => {
  return await API.post("/recipe/create_recipe", data);
};

export const changePrivacy = async (id: number) => {
  return await API.put(`/recipes/publish`, id);
};
