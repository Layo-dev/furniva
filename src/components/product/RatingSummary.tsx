import { Star } from "lucide-react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
  distribution: { stars: number; count: number }[];
}

const RatingSummary = ({ rating, totalReviews, distribution }: RatingSummaryProps) => {
  const maxCount = Math.max(...distribution.map((d) => d.count));

  return (
    <div className="flex gap-8 p-6 bg-secondary/50 rounded-2xl">
      {/* Overall Rating */}
      <div className="text-center">
        <div className="text-5xl font-bold text-foreground">{rating.toFixed(1)}</div>
        <div className="flex items-center justify-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating)
                  ? "fill-cta text-cta"
                  : "fill-transparent text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {totalReviews} Reviews
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="flex-1 space-y-2">
        {distribution.map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-sm w-8">{item.stars}★</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-cta rounded-full transition-all duration-500"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <span className="text-sm text-muted-foreground w-8">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingSummary;
