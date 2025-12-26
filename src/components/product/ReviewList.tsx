import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReviewItem from "./ReviewItem";

const sampleReviews = [
  {
    id: 1,
    author: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    title: "Absolutely love this chair!",
    content: "This armchair exceeded my expectations. The quality is outstanding and it's incredibly comfortable. The fabric feels premium and the color matches perfectly with my living room decor. Highly recommend!",
    date: "December 15, 2024",
    helpful: 24,
  },
  {
    id: 2,
    author: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4,
    title: "Great quality, minor assembly issues",
    content: "The chair itself is beautiful and very comfortable. Assembly was a bit tricky but manageable. Would have loved clearer instructions. Overall, very satisfied with my purchase.",
    date: "December 10, 2024",
    helpful: 12,
  },
  {
    id: 3,
    author: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    title: "Perfect addition to my home office",
    content: "I use this chair for work and it provides excellent support. The design is elegant and professional. Worth every penny!",
    date: "December 5, 2024",
    helpful: 18,
  },
];

const ReviewList = () => {
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Customer Reviews</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rated</SelectItem>
            <SelectItem value="lowest">Lowest Rated</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {sampleReviews.map((review, index) => (
          <ReviewItem key={review.id} review={review} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
