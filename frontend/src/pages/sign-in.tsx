import SignInForm from "../components/auth/sign-in/sign-in-form";
import Logo from "../components/logo";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-4 bg-primary pt-24 font-inter text-lg">
      <Logo />
      <SignInForm />
      <span className="absolute bottom-8">
        <Link to={"/sign-up"} className="w-full">
          Sign up
        </Link>
      </span>
    </div>
  );
};

export default SignIn;
