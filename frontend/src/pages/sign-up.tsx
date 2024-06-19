import AuthLayout from "@/components/auth/auth-layout";
import SignUpForm from "@/components/auth/sign-up/sign-up-form";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <AuthLayout>
      <SignUpForm />
      <span className="absolute bottom-8">
        <Link to={"/sign-in"} className="w-full">
          Sign in
        </Link>
      </span>
    </AuthLayout>
  );
};

export default SignUp;
