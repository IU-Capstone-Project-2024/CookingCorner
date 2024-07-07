import { memo, useState } from "react";
import { useMyRecipes } from "@/services/queries";
import HomeLayout from "@/components/home/home-layout";
import { Skeleton } from "@/components/ui/skeleton";
import MyRecipeCard from "@/components/home/my-recipe-card";
import RecipeCard from "@/components/search/recipe-card";

const Home = memo(() => {
  const recipes = useMyRecipes();
  console.log(recipes.data);
  const [search, setSearch] = useState("");

  if (recipes.isError) {
    return (
      <HomeLayout recipes={recipes} setSearch={setSearch}>
        <p className="col-span-2 flex text-center font-semibold">
          Something went wrong
        </p>
      </HomeLayout>
    );
  }

  if (recipes.isPending) {
    return (
      <HomeLayout recipes={recipes} setSearch={setSearch}>
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
    <HomeLayout recipes={recipes} setSearch={setSearch}>
      {recipes.data.length ? (
        recipes.data
          .filter((recipe) => recipe.name.toLowerCase().startsWith(search))
          .map((recipe, index) => (
            <RecipeCard key={`favourite-recipe-${index}`} recipe={recipe} />
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
