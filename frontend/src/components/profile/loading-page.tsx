import { Skeleton } from "../ui/skeleton";

const LoadingPage = () => {
  return (
    <section className="flex flex-col items-center justify-between gap-4">
      <Skeleton className="size-60 rounded-full border-2 border-mainBlack bg-hover-secondary" />
      <Skeleton className="h-8 w-80 rounded-md bg-hover-secondary" />
      <Skeleton className="h-8 w-80 rounded-md bg-hover-secondary" />
      <Skeleton className="h-8 w-80 rounded-md bg-hover-secondary" />
      <Skeleton className="h-8 w-80 rounded-md bg-hover-secondary" />
    </section>
  );
};

export default LoadingPage;
