import { Star, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
}

interface ReviewItemProps {
  review: Review;
  index: number;
}

const ReviewItem = ({ review, index }: ReviewItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="border-b border-border pb-6 last:border-0"
    >
      <div className="flex items-start gap-4">
        <img
          src={review.avatar}
          alt={review.author}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">{review.author}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < review.rating
                          ? "fill-cta text-cta"
                          : "fill-transparent text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
            </div>
          </div>
          <h5 className="font-medium text-foreground mt-3">{review.title}</h5>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            {review.content}
          </p>
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent mt-3 transition-colors">
            <ThumbsUp className="w-4 h-4" />
            <span>Helpful ({review.helpful})</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewItem;
