import BlogCard from "./BlogCard";

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Creating a Cozy Living Room",
    excerpt: "Transform your living space into a warm and inviting retreat with these expert interior design tips and tricks.",
    date: "19 April 2024",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=450&fit=crop",
    category: "Interior Design",
  },
  {
    id: 2,
    title: "The Art of Minimalist Furniture Design",
    excerpt: "Discover how minimalist design principles can transform your home into a serene and functional space.",
    date: "15 April 2024",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=450&fit=crop",
    category: "Design Trends",
  },
  {
    id: 3,
    title: "Sustainable Materials in Modern Furniture",
    excerpt: "Learn about eco-friendly materials that are revolutionizing the furniture industry without compromising style.",
    date: "12 April 2024",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=450&fit=crop",
    category: "Sustainability",
  },
  {
    id: 4,
    title: "How to Choose the Perfect Dining Table",
    excerpt: "A comprehensive guide to selecting the ideal dining table for your space, style, and family needs.",
    date: "8 April 2024",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=450&fit=crop",
    category: "Buying Guide",
  },
  {
    id: 5,
    title: "Color Psychology in Home Decor",
    excerpt: "Explore how different colors affect mood and atmosphere, and learn to use them effectively in your home.",
    date: "5 April 2024",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=450&fit=crop",
    category: "Interior Design",
  },
  {
    id: 6,
    title: "Small Space Solutions: Furniture for Apartments",
    excerpt: "Creative furniture solutions and space-saving ideas for making the most of compact living spaces.",
    date: "1 April 2024",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=450&fit=crop",
    category: "Small Spaces",
  },
];

const BlogGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map((post, index) => (
        <BlogCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
};

export default BlogGrid;
