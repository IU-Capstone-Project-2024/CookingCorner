import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../input";
import { Button } from "../../ui/button";
import { SignUpFields, SignUpSchema } from "@/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/services/mutations";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
      cpassword: "",
    },
  });

  const registerMutation = useRegister();

  const processSignUp: SubmitHandler<SignUpFields> = (data) => {
    const { username, password } = data;
    registerMutation.mutate({ username, password });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processSignUp)}
      className="flex w-full max-w-[360px] flex-col gap-4 px-4"
    >
      <FormInput
        id="username"
        name="username"
        type="text"
        register={register}
        label="Login"
        error={errors.username}
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        register={register}
        label="Password"
        error={errors.password}
      />
      <FormInput
        id="confirm-password"
        name="cpassword"
        type="password"
        register={register}
        label="Confirm password"
        error={errors.cpassword}
      />
      <Button
        type="submit"
        className="mt-4"
        disabled={registerMutation.isPending}
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
