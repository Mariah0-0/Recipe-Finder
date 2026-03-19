import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, Tag, Youtube } from "lucide-react";

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
  strIngredient16: string | null;
  strIngredient17: string | null;
  strIngredient18: string | null;
  strIngredient19: string | null;
  strIngredient20: string | null;
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;
  strMeasure16: string | null;
  strMeasure17: string | null;
  strMeasure18: string | null;
  strMeasure19: string | null;
  strMeasure20: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<MealDetail | null>(null);
  const [ingredients, setIngredients] = useState<
    { ingredient: string; measure: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );

        setDetails(response.data.meals?.[0] || null);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    if (!details) return;

    const ingredientsList = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = details[`strIngredient${i}` as keyof MealDetail];
      const measure = details[`strMeasure${i}` as keyof MealDetail];

      if (ingredient && ingredient.trim() !== "") {
        ingredientsList.push({
          ingredient: ingredient,
          measure: measure || "",
        });
      }
    }

    setIngredients(ingredientsList);
  }, [details]);

  if (loading)
    return (
      <div className="container py-20 px-60 flex justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading recipe...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container py-20 px-60">
        <div className="bg-red-50 border border-red-200 p-6 text-center">
          <p className="text-red-600">Error: {error}</p>
          <Link
            to="/recipes"
            className="text-[var(--accent)] hover:underline mt-2 inline-block"
          >
            Back to recipes
          </Link>
        </div>
      </div>
    );

  if (!details)
    return (
      <div className="container py-20 px-60">
        <div className=" border border-gray-200 p-6 text-center">
          <p className="text-gray-600">Recipe not found</p>
          <Link
            to="/recipes"
            className="text-[var(--accent)] hover:underline mt-2 inline-block"
          >
            Back to recipes
          </Link>
        </div>
      </div>
    );

  return (
    <section className="container py-10 px-60">
      <Link
        to="/recipes"
        className="inline-flex items-center gap-1 text-gray-600 hover:text-[var(--accent)] mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to recipes
      </Link>

      <div className="flex gap-10 mb-10">
        <img
          src={details.strMealThumb}
          alt={details.strMeal}
          className="w-80 object-cover border border-gray-200"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {details.strMeal}
          </h1>

          <div className="flex flex-wrap gap-3 mb-4">
            {details.strCategory && (
              <span className=" px-3 py-1 text-sm flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {details.strCategory}
              </span>
            )}
            {details.strArea && (
              <span className="px-3 py-1 text-sm flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {details.strArea}
              </span>
            )}
          </div>

          {details.strYoutube && (
            <a
              href={details.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
            >
              <Youtube className="w-5 h-5" />
              Watch video tutorial
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-10">
        <div className="w-1/3">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {ingredients.map((item, index) => (
              <li key={index} className="flex items-baseline">
                <span className="w-5 h-5 inline-flex items-center justify-center text-sm mr-3">
                  {index + 1}
                </span>
                <span className="font-medium">{item.measure}</span>
                <span className="ml-2 text-gray-700">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-2/3">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            Instructions
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {details.strInstructions}
          </p>

          {details.strSource && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Source:{" "}
                <a
                  href={details.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  {details.strSource.replace(/^https?:\/\//, "").split("/")[0]}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecipeDetail;
