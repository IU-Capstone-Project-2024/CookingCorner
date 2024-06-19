import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-primary text-center font-inter">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="mt-10 text-xl">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
