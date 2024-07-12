import { memo, useState } from "react";
import HomeLayout from "@/components/home/home-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyRecipes } from "@/services/queries";
import useFilters from "@/hooks/useFilters";
import MyRecipeCard from "@/components/home/my-recipe-card";
import { FaArrowDownLong, FaMagnifyingGlass, FaPlus } from "react-icons/fa6";

const Home = memo(() => {
  const [search, setSearch] = useState("");
  const { filters, setFilters } = useFilters();
  const recipes = useMyRecipes(filters);

  if (recipes.isError) {
    return (
      <HomeLayout
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      >
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </HomeLayout>
    );
  }

  if (recipes.isPending) {
    return (
      <HomeLayout
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      >
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
        <Skeleton className="h-32 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
      </HomeLayout>
    );
  }

  return (
    <HomeLayout setSearch={setSearch} filters={filters} setFilters={setFilters}>
      {recipes.data.length ? (
        recipes.data
          .filter((recipe) => recipe.name.toLowerCase().startsWith(search))
          .map((recipe, index) => (
            <MyRecipeCard key={`favourite-recipe-${index}`} recipe={recipe} />
          ))
      ) : (
        <div className="col-span-2 flex max-w-[390px] flex-col items-center text-center font-inter font-semibold text-mainBlack">
          <img src="/home_page_image.svg" alt="home page image" />
          <p className="text-balance text-center">
            Apparently you don't have any recipes saved yet. You can use the
            <span className="mx-1 inline-flex">
              <FaMagnifyingGlass size={16} />
            </span>
            search page to find new recipes you're interested in, you can use
            the
            <span className="mx-1 inline-flex rounded-full border-2 border-mainBlack p-1">
              <FaArrowDownLong size={12} />
            </span>{" "}
            import existing recipes from a website, or{" "}
            <span className="mx-1 inline-flex rounded-full border-2 border-mainBlack p-1">
              <FaPlus size={12} />
            </span>
            add and write your recipe manually.
          </p>
        </div>
      )}
    </HomeLayout>
  );
});

export default Home;
