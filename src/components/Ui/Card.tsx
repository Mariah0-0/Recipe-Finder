import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Rating from "./Rating";

interface ICardProps {
  id: string;
  img: string;
  title: string;
  rating: number;
  isFavorited: boolean;
  onFavoriteToggle: (id: string) => void;
}

const Card = ({
  id,
  img,
  title,
  rating,
  isFavorited,
  onFavoriteToggle,
}: ICardProps) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".favorite-btn")) {
      return;
    }
    navigate(`/recipe/${id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle(id);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex flex-col group cursor-pointer relative"
    >
      <div className="relative">
        <img
          src={img}
          alt={title || "Card image"}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className={`favorite-btn absolute top-1 right-1 p-1 transition-colors cursor-pointer ${
            isFavorited ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <Heart
            className={`w-7 h-7 ${
              isFavorited
                ? "fill-[var(--accent)] text-[var(--accent)]"
                : "text-gray-600 fill-white/50"
            }`}
          />
        </button>
      </div>
      <div className="px-2 mt-4 flex flex-col gap-1 px-5">
        <Rating value={rating} />
        <h3 className="font-regular text-xl group-hover:text-[var(--accent)]">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default Card;
