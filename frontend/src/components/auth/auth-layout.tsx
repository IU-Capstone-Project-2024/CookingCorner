import Logo from "../logo";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex h-screen w-screen flex-col items-center gap-4 bg-primary pt-24 font-inter text-lg">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
