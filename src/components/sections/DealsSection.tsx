import { motion } from "framer-motion";
import { Star, ArrowRight, Heart, Expand, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const deals = [
  {
    id: 1,
    name: "Recliner Chair Wood",
    category: "Chair",
    price: 105.00,
    originalPrice: 150.00,
    discount: 30,
    rating: 5.0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Recliner Chair Steel",
    category: "Chair",
    price: 80.00,
    originalPrice: 100.00,
    discount: 20,
    rating: 4.9,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Modern Lounge Chair",
    category: "Chair",
    price: 120.00,
    originalPrice: 160.00,
    discount: 25,
    rating: 4.8,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-card rounded-2xl overflow-hidden border border-border flex flex-row group"
            >
              {/* Image Section */}
              <div className="relative w-[45%] min-h-[220px] bg-secondary overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Discount Badge */}
                <span className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1.5 rounded-full body-3-bold">
                  {deal.discount}% off
                </span>

                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
                  >
                    <Expand className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                  {/* Category */}
                  <p className="body-3 text-muted-foreground mb-1">{deal.category}</p>
                  
                  {/* Product Name */}
                  <h4 className="text-foreground font-semibold mb-2">{deal.name}</h4>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-foreground">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="body-3 text-muted-foreground line-through">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <Star className="w-4 h-4 fill-cta text-cta" />
                    <span className="body-3 text-foreground font-medium">{deal.rating}</span>
                  </div>

                  {/* Description */}
                  <p className="body-3 text-muted-foreground line-clamp-3 mb-4">
                    {deal.description}
                  </p>
                </div>

                {/* Shop Now Link */}
                <motion.a
                  href="#"
                  className="flex items-center gap-1 body-2-bold text-accent hover:gap-2 transition-all w-fit"
                  whileHover={{ x: 4 }}
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
