import { useMutation } from "@tanstack/react-query";
import { login, register } from "./api";
import { SignInFields } from "@/schemas/sign-in.schema";
import { useNavigate } from "react-router-dom";

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
      localStorage.setItem("accessToken", JSON.stringify(access_token))
      localStorage.setItem("refreshToken", JSON.stringify(refresh_token))
      navigate('/home')
    },
  });
}

