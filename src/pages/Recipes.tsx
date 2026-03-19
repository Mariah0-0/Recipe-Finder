import axios from "axios";
import { useEffect, useState } from "react";
import Card from "@components/Ui/Card";

interface Category {
  strCategory: string;
}

interface Cuisine {
  strArea: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface IRecipesProps {
  favorites: string[];
  setFavorites: (value: string[] | ((prev: string[]) => string[])) => void;
}

const Recipes = ({ favorites, setFavorites }: IRecipesProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCuisine, setSelectedCuisine] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, cuisinesRes] = await Promise.all([
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list"),
          axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list"),
        ]);

        setCategories(categoriesRes.data.meals || []);
        setCuisines(cuisinesRes.data.meals || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load filters");
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchMeals = async () => {
      setLoading(true);
      try {
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        if (selectedCategory) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;
        } else if (selectedCuisine) {
          url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCuisine}`;
        }

        const response = await axios.get(url);
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
  }, [selectedCategory, selectedCuisine]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedCuisine("");
  };

  const handleCuisineClick = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    setSelectedCategory("");
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedCuisine("");
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((favId: string) => favId !== id)
        : [...prev, id],
    );
  };

  return (
    <section className="flex min-h-screen">
      <div className="w-[20%] py-7 px-4 border-r border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-4 px-4">
          <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
          {(selectedCategory || selectedCuisine) && (
            <button
              onClick={clearFilters}
              className="text-sm text-[var(--accent)] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 px-4 flex items-center">
            <span className="w-1 h-5 bg-[var(--accent)] inline-block mr-2"></span>
            Categories
          </h3>
          <div className="py-1 flex flex-col">
            {categories.map((c, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(c.strCategory)}
                className={`text-base w-full py-2 px-6 text-left border-l-2 transition-colors cursor-pointer ${
                  selectedCategory === c.strCategory
                    ? "border-[var(--accent)] text-[var(--accent)] font-medium bg-[var(--accent)]/5"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {c.strCategory}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 px-4 flex items-center">
            <span className="w-1 h-5 bg-[var(--accent)] inline-block mr-2"></span>
            Cuisines
          </h3>
          <div className="py-1 flex flex-col">
            {cuisines.map((c, index) => (
              <button
                key={index}
                onClick={() => handleCuisineClick(c.strArea)}
                className={`text-base w-full py-2 px-6 text-left border-l-2 transition-colors cursor-pointer ${
                  selectedCuisine === c.strArea
                    ? "border-[var(--accent)] text-[var(--accent)] font-medium bg-[var(--accent)]/5"
                    : "border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-100"
                }`}
              >
                {c.strArea}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[80%] py-7 px-4 xl:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedCategory || selectedCuisine || "All Recipes"}
            </h1>
            <p className="text-gray-500 mt-1">
              {meals.length} {meals.length === 1 ? "recipe" : "recipes"} found
            </p>
          </div>
          {(selectedCategory || selectedCuisine) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Filtered by:</span>
              <span className="bg-gray-100 px-3 py-1 text-sm">
                {selectedCategory || selectedCuisine}
              </span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading recipes...</p>
          </div>
        ) : meals.length === 0 ? (
          <div className="flex items-center justify-center h-64 border border-gray-200 bg-gray-50">
            <div className="text-center">
              <p className="text-xl text-gray-500 mb-2">No recipes found</p>
              <p className="text-gray-400">
                Try selecting a different category or cuisine
              </p>
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

            {meals.length > 0 && (
              <div className="flex justify-center mt-12 pt-6 border-t border-gray-200">
                <span className="text-sm text-gray-400">
                  Showing {meals.length} recipes
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Recipes;
