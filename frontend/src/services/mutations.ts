import { SignUpFields } from "@/schemas/sign-up.schema";
import { useMutation } from "@tanstack/react-query";
import { register } from "./api";

export function useRegister() {
  return useMutation({
    mutationFn: (data: { login: string; password: string }) => register(data),
    onError: () => {
      console.log("Error occured");
    },

    onSuccess: () => {
      console.log("Success");
    },
  });
}
