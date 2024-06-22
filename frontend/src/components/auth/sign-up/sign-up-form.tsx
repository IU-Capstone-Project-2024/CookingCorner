import { useForm } from "react-hook-form";
import FormInput from "../../input";
import { Button } from "../../ui/button";
import { SignUpFields, SignUpSchema } from "@/schemas/sign-up.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignUpFormProps {
  action: (data: SignUpFields) => void;
}

const SignUpForm = ({ action }: SignUpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFields>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      login: "",
      password: "",
      cpassword: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(action)}
      className="flex w-full max-w-[360px] flex-col gap-4 px-4"
    >
      <FormInput
        id="login"
        name="login"
        type="text"
        register={register}
        label="Username"
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
      <FormInput
        id="confirm-password"
        name="cpassword"
        type="password"
        register={register}
        label="Confirm password"
        error={errors.cpassword}
      />
      <Button type="submit" className="mt-4">
        Sign up
      </Button>
    </form>
  );
};

export default SignUpForm;
