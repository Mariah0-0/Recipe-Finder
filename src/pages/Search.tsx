import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Card from "@components/Ui/Card";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface ISearchProps {
  favorites: string[];
  setFavorites: (value: string[] | ((prev: string[]) => string[])) => void;
}

const SearchPage = ({ favorites, setFavorites }: ISearchProps) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      if (!query) {
        setMeals([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
        );
        console.log(response.data);
        setMeals(response.data.meals || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch meals");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [query]);

  if (loading) {
    return (
      <div className="container py-20 flex justify-center">
        <p className="text-gray-500">Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-20">
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link
            to="/"
            className="text-[var(--accent)] hover:underline mt-2 inline-block"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="container py-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Search Recipes
          </h1>
          <p className="text-gray-500">Enter a search term to find recipes</p>
        </div>
      </div>
    );
  }

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((favId: string) => favId !== id)
        : [...prev, id],
    );
  };

  return (
    <section className="container py-10 w-[90%] xl:w-[80%] mx-auto">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-500 mt-1">
          {meals.length} {meals.length === 1 ? "recipe" : "recipes"} found
        </p>
      </div>

      {meals.length === 0 ? (
        <div className="flex items-center justify-center h-64 border border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-2">No recipes found</p>
            <p className="text-gray-400">Try searching with a different term</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
            {meals.map((meal) => (
              <Card
                key={meal.idMeal}
                id={meal.idMeal}
                img={meal.strMealThumb}
                title={meal.strMeal}
                rating={Math.floor(Math.random() * 5) / 2 + 3}
                isFavorited={favorites.includes(meal.idMeal)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-400">
              Showing {meals.length} recipes
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default SearchPage;
