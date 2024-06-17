import SignUpForm from "@/components/auth/sign-up/sign-up-form";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-4 bg-primary pt-24 font-inter text-lg">
      <h1 className="mb-8 text-3xl font-bold">Sign up</h1>
      <SignUpForm />
      <span className="absolute bottom-8">
        <Link to={"/sign-in"} className="w-full">
          Sign in
        </Link>
      </span>
    </div>
  );
};

export default SignUp;
