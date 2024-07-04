import { useMutation } from "@tanstack/react-query";
import { addToFavourites, createRecipe, login, register } from "./api";
import { SignInFields } from "@/schemas/sign-in.schema";
import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types/types";

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      register(data),

    onError: (err) => {
      console.log(`Error occured while registering. ${err}`);
    },

    onSuccess: () => {
      console.log("Successfully signed up");
      navigate("/sign-in");
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignInFields) => login(data),

    onError: (err) => {
      console.log(`Error occured while trying to log in. ${err}`);
    },

    onSuccess: (data) => {
      console.log("Successfully logged in");
      const {
        access_token,
        access_token_expires,
        refresh_token,
        refresh_token_expires,
      } = data.data;
      localStorage.setItem(
        "accessToken",
        JSON.stringify(`${access_token};${access_token_expires}`),
      );
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(`${refresh_token};${refresh_token_expires}`),
      );
      navigate("/home");
    },
  });
}

export function useAddFavourite() {
  return useMutation({
    mutationFn: (data: Recipe) => addToFavourites(data),

    onError: (err) => {
      console.log(`Error occured while adding to favourite. ${err}`);
    },

    onSuccess: () => {
      console.log("successfully added to favourite");
    },
  });
}

export function useCreateRecipe() {
  return useMutation({
    mutationFn: (data: FormData) => createRecipe(data),

    onError: (err) =>
      console.log(`Error occured while creating new recipe. ${err}`),
    onSuccess: () => console.log("New recipe successfully created!"),
  });
}
