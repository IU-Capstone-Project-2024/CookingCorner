import Settings from "@/components/home/settings";
import RecipeCard from "@/components/search/recipe-card";
import SearchBar from "@/components/search-bar";
import { memo, useState } from "react";
import { useMyRecipes } from "@/services/queries";

const Home = memo(() => {
  const recipes = useMyRecipes();
  const [search, setSearch] = useState("");

  if (recipes.isError) {
    return <div>Something went wrong!</div>;
  }

  if (recipes.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <section className="container flex flex-col items-center gap-2 p-2">
      <SearchBar setSearch={setSearch} />
      <Settings />
      <div className="grid grid-cols-2 gap-2">
        {/* {recipes
          .filter((recipe) => recipe.title.toLowerCase().startsWith(search))
          .map((recipe, index) => (
            <RecipeCard
              key={`favourite-recipe-${index}`}
              recipe={recipe}
              action={action}
            />
          ))} */}
      </div>
    </section>
  );
});

export default Home;
