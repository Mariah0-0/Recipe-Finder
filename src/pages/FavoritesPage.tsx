import { Link } from "react-router-dom";
import Card from "@components/Ui/Card";
import { useEffect, useState } from "react";
import axios from "axios";

interface IFavoritesProps {
  favorites: string[];
  setFavorites: (value: string[] | ((prev: string[]) => string[])) => void;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const FavoritesPage = ({ favorites, setFavorites }: IFavoritesProps) => {
  const [favoriteMeals, setFavoriteMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchFavoriteMeals = async () => {
      if (favorites.length === 0) {
        setFavoriteMeals([]);
        return;
      }

      try {
        const meals = await Promise.all(
          favorites.map(async (id) => {
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
            );
            return response.data.meals?.[0];
          }),
        );
        setFavoriteMeals(meals.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch favorite meals:", error);
      }
    };

    fetchFavoriteMeals();
  }, [favorites]);

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.filter((favId: string) => favId !== id),
    );
  };

  if (favoriteMeals.length === 0) {
    return (
      <div className="container py-20 w-[80%] mx-auto">
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
        </div>
        <div className="flex items-center justify-center h-64 border border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-2">No favorites yet</p>
            <p className="text-gray-400">
              Browse recipes and add them to your favorites
            </p>
            <Link
              to="/recipes"
              className="inline-block mt-4 text-[var(--accent)] hover:underline"
            >
              Browse Recipes →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container py-10 w-[90%] xl:w-[80%] mx-auto">
      <div className="mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
        <p className="text-gray-500 mt-1">
          {favoriteMeals.length}{" "}
          {favoriteMeals.length === 1 ? "recipe" : "recipes"} saved
        </p>
      </div>

      {favoriteMeals.length === 0 ? (
        <div className="flex items-center justify-center h-64 border border-gray-200 bg-gray-50">
          <div className="text-center">
            <p className="text-xl text-gray-500 mb-2">No favorites yet</p>
            <p className="text-gray-400">
              Browse recipes and add them to your favorites
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-10">
            {favoriteMeals.map((meal) => (
              <Card
                key={meal.idMeal}
                id={meal.idMeal}
                img={meal.strMealThumb}
                title={meal.strMeal}
                rating={Math.floor(Math.random() * 5) / 2 + 3}
                isFavorited={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>

          <div className="flex justify-center mt-12 pt-6 border-t border-gray-200">
            <span className="text-sm text-gray-400">
              Showing {favoriteMeals.length} favorites
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default FavoritesPage;
