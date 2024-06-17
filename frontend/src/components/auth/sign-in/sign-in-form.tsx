import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import FormInput from "../../input";
import { SignInFields, SignInSchema } from "@/schemas/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFields>({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const processSignIn: SubmitHandler<SignInFields> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processSignIn)}
      className="flex w-full max-w-[360px] flex-col gap-4 px-4"
    >
      <FormInput
        id="login"
        name="login"
        type="text"
        register={register}
        label="Login"
        error={errors.login}
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        register={register}
        label="Password"
        error={errors.password}
      />
      <Button type="submit" className="mt-4">
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
