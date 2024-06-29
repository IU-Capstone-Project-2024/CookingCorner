import { API } from "@/lib/utils";
import { SignInFields } from "@/schemas/sign-in.schema";
import { Recipe } from "@/types/types";

export const getMyRecipes = async () => {
  return (await API.get<Recipe[]>("/recipes/get_all")).data.map(
    (recipe) => recipe,
  );
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  return (await API.post("/register", data));
};


export const login = async (data: SignInFields) => {
  return (await API.post("/login", data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }));
}

export const getMe = async () => {
  return ((await API.post("/get_User/me")).data)
}