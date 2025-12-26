import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Expand, ShoppingCart, Star } from "lucide-react";

const relatedProducts = [
  {
    id: 2,
    name: "Modern Dining Chair",
    category: "Chair",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    discount: 25,
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    category: "Lighting",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    discount: 20,
  },
  {
    id: 4,
    name: "Wooden Coffee Table",
    category: "Table",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop",
    discount: 15,
  },
  {
    id: 5,
    name: "Velvet Accent Chair",
    category: "Chair",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    discount: 17,
  },
];

const RelatedProducts = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-center mb-10"
        >
          Explore Related Products
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-square bg-secondary rounded-2xl overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                      -{product.discount}%
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:bg-cta hover:text-cta-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:bg-cta hover:text-cta-foreground transition-colors">
                      <Expand className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-background rounded-full flex items-center justify-center hover:bg-cta hover:text-cta-foreground transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-cta text-cta"
                            : "fill-transparent text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.rating})
                    </span>
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">${product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
