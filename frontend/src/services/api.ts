import { API } from "@/lib/utils";
import { RecipeSchemaFields } from "@/schemas/recipe.schema";
import { SignInFields } from "@/schemas/sign-in.schema";
import { FilterConditions, Recipe, User } from "@/types/types";

const verifyToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      await API.get(`/verify-token/${JSON.parse(accessToken)}`);
    } catch (err: any) {
      if (err.response.status === 403) {
        localStorage.clear();
        window.location.href = "/sign-in";
      }
    }
  }
};

export const getMyRecipes = async (filters: FilterConditions) => {
  verifyToken();
  return (await API.post<Recipe[]>("/recipes/get_my_recipes", filters)).data;
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
  verifyToken();
  return (await API.post("/get_User/me")).data;
};

export const addToFavourites = async (id: number) => {
  verifyToken();
  return await API.post(`/recipes/add_to_favourites?recipe_id=${id}`);
};

export const removeFromFavourites = async (id: number) => {
  verifyToken();
  return await API.delete(`/recipes/remove_from_favourites?recipe_id=${id}`);
};

export const addToMyRecipes = async (id: number) => {
  verifyToken();
  return await API.post(`/recipes/add_to_my_recipes?recipe_id=${id}`);
};

export const deleteRecipe = async (id: number) => {
  verifyToken();
  return await API.delete(`/recipes/delete_from_my_recipes?recipe_id=${id}`);
};

export const uploadFile = async (file: FormData) => {
  verifyToken();
  return await API.post("/recipes/upload_file", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFile = async () => {
  verifyToken();
  return await API.get("/recipes/get_file");
};

export const createRecipe = async (data: RecipeSchemaFields) => {
  verifyToken();
  return await API.post("/recipes/create", data);
};

export const changePrivacy = async (data: { id: number }) => {
  verifyToken();
  return await API.put(`/recipes/publish/${data.id}`);
};

export const findByRecipeName = async (
  name: string,
  filters: FilterConditions,
) => {
  verifyToken();
  return (
    await API.post<Recipe[]>(`/recipes/get_by_name?name=${name}`, filters)
  ).data ?? [];
};

export const getRecipeById = async (id: number) => {
  verifyToken();
  return (await API.get<Recipe>(`/recipes/get_by_id/${id}`)).data;
};

export const getBestRatedRecipes = async () => {
  verifyToken();
  return (await API.get<Recipe[]>("/recipes/get_best_rated")).data;
};

export const getRecentRecipes = async () => {
  verifyToken();
  return (await API.get<Recipe[]>("/recipes/get_recent_recipes")).data;
};

export const changeProfileData = async (data: User) => {
  verifyToken();
  return await API.post("/edit_user_data", data)
};

export const getCategories = async () => {
  verifyToken();
  return (await API.get("/categories/get_all")).data;
};

export const rateRecipe = async (data: { id: number; rating: number }) => {
  verifyToken();
  return await API.post(
    `/recipes/rate_recipe?recipe_id=${data.id}&rating=${data.rating}`,
    {},
  );
};

export const uploadRecipe = async (url: string) => {
  verifyToken();
  return await API.get(`/recipes/generate_recipe?url=${url}`);
};

export const editRecipe = async (data: RecipeSchemaFields & { id: number }) => {
  verifyToken();
  return await API.put(`/recipes/update`, data);
};

export const editUserImage = async (data: FormData) => {
  verifyToken();
  return await API.post("/edit_user_image", data)
}

export const uploadRecipeImage = async (image: FormData) => {
  verifyToken()
  return (await API.post("/recipes/upload_recipe_image", image)).data
}