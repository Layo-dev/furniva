import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const deals = [
  {
    id: 1,
    name: "Premium Office Chair",
    category: "Office Furniture",
    price: 349,
    originalPrice: 699,
    rating: 4.9,
    reviews: 128,
    description: "Ergonomic design with lumbar support for all-day comfort.",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Vintage Leather Sofa",
    category: "Living Room",
    price: 1499,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 89,
    description: "Handcrafted genuine leather with classic design aesthetics.",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Modern Dining Set",
    category: "Dining Room",
    price: 899,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 156,
    description: "Complete 6-piece dining set with contemporary styling.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop",
  },
];

export const DealsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div className="w-1 h-12 bg-accent rounded-full" />
          <div>
            <h2 className="text-foreground">Deals of the Day</h2>
            <p className="body-2 text-muted-foreground mt-1">Don't miss out on these amazing offers</p>
          </div>
        </motion.div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="bg-card rounded-2xl overflow-hidden border border-border"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="body-3 text-accent mb-2">{deal.category}</p>
                <h4 className="text-foreground mb-2">{deal.name}</h4>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(deal.rating)
                            ? "fill-cta text-cta"
                            : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="body-3 text-muted-foreground">
                    ({deal.reviews} reviews)
                  </span>
                </div>

                <p className="body-3 text-muted-foreground mb-4 line-clamp-2">
                  {deal.description}
                </p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[24px] font-bold text-foreground">
                      ${deal.price}
                    </span>
                    <span className="body-2 text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <motion.a
                    href="#"
                    className="flex items-center gap-1 body-2-bold text-accent hover:gap-2 transition-all"
                    whileHover={{ x: 4 }}
                  >
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
