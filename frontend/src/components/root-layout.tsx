import Navigation from "./navigation";

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col items-center bg-primary pb-20 pt-10">
      {children}
      <nav className="fixed bottom-0 z-10 flex h-16 w-full max-w-[390px] items-center justify-evenly rounded-t-xl border-2 border-mainBlack bg-primary">
        <Navigation />
      </nav>
    </main>
  );
};

export default RootLayout;
