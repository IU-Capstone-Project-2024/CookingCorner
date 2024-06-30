import { useMutation } from "@tanstack/react-query";
import { addToFavourites, login, register } from "./api";
import { SignInFields } from "@/schemas/sign-in.schema";
import { useNavigate } from "react-router-dom";
import { Recipe } from "@/types/types";

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      register(data),

    onError: () => {
      console.log("Error occured");
    },

    onSuccess: () => {
      console.log("Success")
      navigate("/sign-in")
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: SignInFields) =>
      login(data),

    onError: () => {
      console.log("Error occured");
    },

    onSuccess: (data) => {
      const {access_token, refresh_token} = data.data
      localStorage.setItem("accessToken", access_token)
      localStorage.setItem("refreshToken", refresh_token)
      navigate('/home')
    },
  });
}

export function useAddFavourite() {
  return useMutation({
    mutationFn: (data: Recipe) =>
      addToFavourites(data),

    onError: () => {
      console.log("Error occured");
    },

    onSuccess: () => {
      console.log("Success")
    },
  });
}