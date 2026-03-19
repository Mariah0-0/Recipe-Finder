import { Routes, Route } from "react-router-dom";
import HomePage from "@pages/Home";
import Recipes from "@pages/Recipes";
import RecipeDetail from "@pages/RecipeDetail";
import Search from "@pages/Search";
import FavoritesPage from "@pages/FavoritesPage";
import NotFound from "@pages/NotFound";

interface AppRouterProps {
  favorites: string[];
  setFavorites: (value: string[] | ((prev: string[]) => string[])) => void;
}

const AppRouter = ({ favorites, setFavorites }: AppRouterProps) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/recipes"
        element={<Recipes favorites={favorites} setFavorites={setFavorites} />}
      />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route
        path="/search"
        element={<Search favorites={favorites} setFavorites={setFavorites} />}
      />
      <Route
        path="/favorites"
        element={
          <FavoritesPage favorites={favorites} setFavorites={setFavorites} />
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
