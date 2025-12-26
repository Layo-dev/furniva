import { motion } from "framer-motion";
import RatingSummary from "./RatingSummary";
import ReviewList from "./ReviewList";
import AddReviewForm from "./AddReviewForm";

const ratingDistribution = [
  { stars: 5, count: 180 },
  { stars: 4, count: 45 },
  { stars: 3, count: 15 },
  { stars: 2, count: 3 },
  { stars: 1, count: 2 },
];

const ReviewTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <RatingSummary
        rating={4.9}
        totalReviews={245}
        distribution={ratingDistribution}
      />
      <ReviewList />
      <AddReviewForm />
    </motion.div>
  );
};

export default ReviewTab;
