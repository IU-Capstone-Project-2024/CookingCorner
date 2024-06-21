import Navigation from "./navigation";

interface RootLayoutProps {
  children?: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <main className="min-w-screen relative min-h-screen bg-primary pb-20">
      <section className="hidden md:block">{children}</section>
      <section className="md:hidden">
        {children}
        <nav className="fixed bottom-0 z-10 flex h-16 w-full items-center justify-evenly rounded-t-xl border-2 border-mainBlack bg-primary">
          <Navigation />
        </nav>
      </section>
    </main>
  );
};

export default RootLayout;
