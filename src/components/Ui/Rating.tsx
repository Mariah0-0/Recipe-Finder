import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  size?: number;
  color?: string;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  value,
  size = 25,
  color = "var(--accent)",
  className = "",
}) => {
  const clampedValue = Math.min(Math.max(value, 0), 5);

  const fullStars = Math.floor(clampedValue);
  const hasHalfStar = clampedValue % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            fill={color}
            color={color}
            strokeWidth={0}
          />
        ))}

        {hasHalfStar && (
          <div className="relative">
            <Star size={size} fill="none" color={color} strokeWidth={0} />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${size / 2}px` }}
            >
              <Star size={size} fill={color} color={color} strokeWidth={0} />
            </div>
          </div>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            fill="none"
            color={color}
            strokeWidth={0}
          />
        ))}
      </div>
    </div>
  );
};

export default Rating;
