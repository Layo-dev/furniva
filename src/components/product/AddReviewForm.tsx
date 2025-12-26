import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import StarRatingInput from "./StarRatingInput";

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1, "Please select a rating").max(5),
  title: z.string().min(1, "Review title is required"),
  review: z.string().min(10, "Review must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const AddReviewForm = () => {
  const { toast } = useToast();
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      title: "",
      review: "",
    },
  });

  const onSubmit = (data: ReviewFormValues) => {
    console.log("Review submitted:", data);
    toast({
      title: "Review Submitted!",
      description: "Thank you for your feedback.",
    });
    form.reset();
  };

  return (
    <div className="bg-secondary/50 rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Rating*</FormLabel>
                <FormControl>
                  <StarRatingInput
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Give your review a title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with this product..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Submit Review
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddReviewForm;
