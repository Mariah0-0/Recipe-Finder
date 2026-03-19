import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format",
      className: "top-0 right-0 w-56 h-72 z-10",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&auto=format",
      className: "top-20 right-62 w-56 h-72 z-20",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&auto=format",
      className: "top-78 right-0 w-56 h-72 z-0",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&auto=format",
      className: "top-98 right-62 w-56 h-72 z-30",
    },
  ];

  return (
    <div className="container px-25">
      <div className="relative flex flex-col lg:flex-row items-center min-h-[90vh]">
        <div className="lg:w-1/2 z-40 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 mt-13 leading-tight">
            Your Cravings
            <span className="block text-[var(--accent)]">
              At Your Fingertip
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Find the perfect recipe for any occasion. From quick meals to
            gourmet dishes, explore thousands of recipes from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/recipes"
              className="group bg-[var(--accent)] text-white px-8 py-4 text-lg font-semibold hover:bg-[var(--accent-hover)] transition-all flex items-center justify-center gap-2"
            >
              Explore Recipes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-14 max-w-md mx-auto lg:mx-0">
            <div>
              <div className="text-4xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-500">Recipes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-500">Happy Cooks</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative h-[500px] lg:h-[670px] mt-0 mr-2 lg:mt-0">
          {images.map((img) => (
            <div key={img.id} className={`absolute ${img.className}`}>
              <img
                src={img.url}
                alt="Delicious food"
                className="w-full h-full object-cover rounded-[inherit] shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[inherit]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
