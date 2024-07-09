import { API } from "@/lib/utils";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { SignInFields } from "@/schemas/sign-in.schema";
import { FilterConditions, Recipe, User } from "@/types/types";

export const getMyRecipes = async (filters: FilterConditions) => {
  return (await API.post<Recipe[]>("/recipes/get_my_recipes", filters)).data ?? [];
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

export const addToFavourites = async (id: number) => {
  return await API.post(`/recipes/add_to_favourites?recipe_id=${id}`);
};

export const removeFromFavourites = async (id: number) => {
  return await API.delete(`/recipes/remove_from_favourites?recipe_id=${id}`)
}

export const addToMyRecipes = async (id: number) => {
  return await API.post(`/recipes/add_to_my_recipes?recipe_id=${id}`)
}

export const deleteRecipe = async (id: number) => {
  return await API.delete(`/recipes/delete_from_my_recipes?recipe_id=${id}`)
}

export const uploadFile = async (file: FormData) => {
  return await API.post('/recipes/upload_file', file, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getFile = async () => {
  return await API.get('/recipes/get_file')
}

export const createRecipe = async (data: RecipeSchemaFields) => {
  return await API.post("/recipes/create", data);
};

export const changePrivacy = async (id: number) => {
  return await API.put(`/recipes/publish/${id}`);
};

export const findByRecipeName = async (name: string) => {
  return (await API.get<Recipe[]>(`/recipes/get_by_name?name=${name}`)).data
}

export const getRecipeById = async (id: number) => {
  return (await API.get<Recipe>(`/recipes/get_by_id/${id}`)).data;
};

export const getBestRatedRecipes = async () => {
  return (await API.get<Recipe[]>("/recipes/get_best_rated")).data;
};

export const getRecentRecipes = async () => {
  return (await API.get<Recipe[]>("/recipes/get_recent_recipes")).data;
}

export const changeProfileData = async (data: User) => {
  return (await API.post("/edit_user_data", data))
}

export const getCategories = async () => {
  return (await API.get('/categories/get_all')).data
}