import RecipeCard from "@/components/recipe/recipe-card";
import SearchBar from "@/components/search-bar";
import { addFavouriteRecipe, getMyRecipes } from "@/lib/utils";
import { Recipe } from "@/modules/types";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

export async function action(recipe: Recipe) {
  const recipes = await addFavouriteRecipe(recipe);
  return recipes;
}

export async function loader() {
  const recipes = await getMyRecipes();
  return recipes;
}

const Home = () => {
  const recipes = useLoaderData() as Recipe[];
  const [search, setSearch] = useState("");

  return (
    <section className="flex flex-col items-center gap-2">
      <SearchBar setSearch={setSearch} />
      <div className="grid grid-cols-2 gap-2">
        {recipes
          .filter((recipe) => recipe.title.toLowerCase().startsWith(search))
          .map((recipe, index) => (
            <RecipeCard
              key={`favourite-recipe-${index}`}
              recipe={recipe}
              action={action}
            />
          ))}
      </div>
    </section>
  );
};

export default Home;
