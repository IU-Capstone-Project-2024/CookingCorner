import { memo, useState } from "react";
import HomeLayout from "@/components/home/home-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyRecipes } from "@/services/queries";
import useFilters from "@/hooks/useFilters";
import MyRecipeCard from "@/components/home/my-recipe-card";

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
        <p className="col-span-2 text-center font-inter font-semibold text-mainBlack">
          You haven't added any recipes yet!
        </p>
      )}
    </HomeLayout>
  );
});

export default Home;
