import RecipeCard from "@/components/search/recipe-card";
import { memo, useState } from "react";
import { useMyRecipes } from "@/services/queries";
import HomeLayout from "@/components/home/home-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const Home = memo(() => {
  const recipes = useMyRecipes();
  const [search, setSearch] = useState("");

  if (recipes.isError) {
    return (
      <HomeLayout recipes={recipes} setSearch={setSearch}>
        <p className="flex font-semibold">Something went wrong</p>
      </HomeLayout>
    );
  }

  if (recipes.isPending) {
    return (
      <HomeLayout recipes={recipes} setSearch={setSearch}>
        <Skeleton className="h-64 w-44 rounded-xl border-2 border-mainBlack bg-hover-secondary" />
      </HomeLayout>
    );
  }

  return (
    <HomeLayout recipes={recipes} setSearch={setSearch}>
      {/* {recipes.data
        .filter((recipe) => recipe.title.toLowerCase().startsWith(search))
        .map((recipe, index) => (
          <RecipeCard key={`favourite-recipe-${index}`} recipe={recipe} />
        ))} */}
    </HomeLayout>
  );
});

export default Home;
