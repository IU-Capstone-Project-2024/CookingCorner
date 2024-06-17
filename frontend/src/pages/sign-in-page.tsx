import SignInForm from "../components/sign-in/sign-in-form";
import Logo from "../components/logo-component";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="font-inter relative flex h-screen w-screen flex-col items-center gap-4 bg-primary pt-24 text-lg">
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
