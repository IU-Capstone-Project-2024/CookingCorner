import AuthLayout from "@/components/auth/auth-layout";
import SignUpForm from "@/components/auth/sign-up/sign-up-form";
import { Link } from "react-router-dom";
import { SignUpFields } from "@/schemas/sign-up.schema";
import { register } from "@/lib/utils";

export async function action(data: SignUpFields) {
  const action = await register(data);
  return action;
}

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm action={action} />
      <span className="absolute bottom-8">
        <Link to={"/sign-in"} className="w-full">
          Sign in
        </Link>
      </span>
    </AuthLayout>
  );
};

export default SignUp;
