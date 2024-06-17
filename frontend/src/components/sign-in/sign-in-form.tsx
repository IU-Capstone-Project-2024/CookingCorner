import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../input-component";
import { Button } from "../ui/button";

function processSignIn(data: FieldValues) {
  console.log(data);
}

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => processSignIn(data))}
      className="flex w-full max-w-[360px] flex-col gap-4 px-4"
    >
      <FormInput
        id="login"
        name="login"
        type="text"
        register={register}
        label="login"
      />
      <FormInput
        id="password"
        name="password"
        type="password"
        register={register}
        label="password"
      />
      <Button type="submit">Sign in</Button>
    </form>
  );
};

export default SignInForm;
