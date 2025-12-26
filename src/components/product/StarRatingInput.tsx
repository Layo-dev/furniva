import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

const StarRatingInput = ({ value, onChange }: StarRatingInputProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className="p-0.5 transition-transform hover:scale-110"
        >
          <Star
            className={cn(
              "w-6 h-6 transition-colors",
              (hoverValue || value) >= star
                ? "fill-cta text-cta"
                : "fill-transparent text-muted-foreground"
            )}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
