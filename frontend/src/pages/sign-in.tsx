import AuthLayout from "@/components/auth/auth-layout";
import SignInForm from "@/components/auth/sign-in/sign-in-form";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <AuthLayout>
      <SignInForm />
      <span className="absolute bottom-8">
        <Link to={"/sign-up"} className="w-full">
          Sign up
        </Link>
      </span>
    </AuthLayout>
  );
};

export default SignIn;
