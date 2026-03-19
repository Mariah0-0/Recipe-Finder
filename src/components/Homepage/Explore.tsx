import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Coffee,
  UtensilsCrossed,
  Pizza,
  Cookie,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: "breakfast",
    name: "Breakfast",
    icon: Coffee,
    color: "bg-amber-100",
    iconColor: "text-amber-600",
    description: "Start your day right",
    count: "120+ recipes",
  },
  {
    id: "lunch",
    name: "Lunch",
    icon: UtensilsCrossed,
    color: "bg-emerald-100",
    iconColor: "text-emerald-600",
    description: "Midday favorites",
    count: "180+ recipes",
  },
  {
    id: "dinner",
    name: "Dinner",
    icon: Pizza,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
    description: "Evening meals",
    count: "200+ recipes",
  },
  {
    id: "snacks",
    name: "Snacks",
    icon: Cookie,
    color: "bg-rose-100",
    iconColor: "text-rose-600",
    description: "Quick bites",
    count: "90+ recipes",
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/recipes?category=${categoryId}`);
  };

  return (
    <section className="pt-80 pb-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Recipes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover delicious meals by category or search for your favorite
            dishes
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for recipes (e.g., pasta, chicken, dessert)..."
              className="w-full px-6 py-4 pr-32 text-lg rounded-full border-2 bg-white border-gray-200 focus:border-[var(--accent)] focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--accent)] text-white px-6 py-3 rounded-full hover:bg-[var(--accent-hover)] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="mb-16 px-25">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-semibold text-gray-800">
              Browse by Category
            </h3>
            <button
              onClick={() => navigate("/recipes")}
              className="text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="group relative bg-white hover:transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div
                    className={`absolute inset-0 ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative p-6 flex flex-col items-center text-center">
                    <div
                      className={`w-20 h-20 ${category.color} rounded-full flex items-center justify-center mb-4 group-hover: transition-transform`}
                    >
                      <Icon className={`w-10 h-10 ${category.iconColor}`} />
                    </div>

                    <h4 className="text-xl font-semibold text-gray-800 mb-1">
                      {category.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {category.description}
                    </p>
                    <span className="text-xs font-medium text-[var(--accent)]">
                      {category.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
