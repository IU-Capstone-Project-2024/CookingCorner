import Navigation from "./navigation";

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div className="relative h-screen w-screen bg-primary">
      <div className="hidden md:block">{children}</div>
      <div className="md:hidden">
        {children}
        <div className="absolute bottom-0 flex h-16 w-full items-center justify-evenly rounded-t-xl border-2 border-mainBlack bg-primary">
          <Navigation />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
