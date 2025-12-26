import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/blog/${post.id}`}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 bg-cta text-cta-foreground px-3 py-1.5 rounded-md text-sm font-medium">
            {post.date}
          </div>
        </div>
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground">{post.category}</span>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
            Read More
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;
