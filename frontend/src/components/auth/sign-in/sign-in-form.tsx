import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import FormInput from "../../input";
import { SignInFields, SignInSchema } from "@/schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/services/mutations";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const processSignIn: SubmitHandler<SignInFields> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(processSignIn)}
      className="flex w-full max-w-[360px] flex-col gap-4 px-4"
    >
      <FormInput
        id="login"
        name="username"
        type="text"
        register={register}
        label="Login"
        isError={loginMutation.isError}
        error={errors.username}
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        register={register}
        label="Password"
        isError={loginMutation.isError}
        error={errors.password}
      />
      <Button
        type="submit"
        className="mt-4 text-lg"
        disabled={loginMutation.isPending}
        variant={"registration"}
        size={"lg"}
      >
        {loginMutation.isPending ? "Logging in" : "Sign in"}
      </Button>
    </form>
  );
};

export default SignInForm;
