import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Layout/Navbar";
import AppRouter from "./router/AppRouter";

function App() {
  const [favorites, setFavorites] = useState<string[]>([]);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto py-2">
          <AppRouter favorites={favorites} setFavorites={setFavorites} />
        </main>
        <footer className="bg-white mt-auto">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            © 2026 RecipeFinder. All rights reserved.
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
