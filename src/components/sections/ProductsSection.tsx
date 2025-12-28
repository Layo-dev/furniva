import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Expand, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

const filters = ["All Products", "Latest Products", "Best Sellers", "Featured Products"];

const products = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    category: "Chairs",
    price: 299,
    originalPrice: 599,
    discount: 50,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
    tag: "Best Seller",
  },
  {
    id: 2,
    name: "Elegant Lounge Sofa",
    category: "Sofas",
    price: 1299,
    originalPrice: 1499,
    discount: 13,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
    tag: "New",
  },
  {
    id: 3,
    name: "Minimalist Floor Lamp",
    category: "Lighting",
    price: 189,
    originalPrice: 249,
    discount: 24,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400&h=400&fit=crop",
    tag: null,
  },
  {
    id: 4,
    name: "Scandinavian Dining Table",
    category: "Tables",
    price: 899,
    originalPrice: 999,
    discount: 10,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=400&h=400&fit=crop",
    tag: "Featured",
  },
  {
    id: 5,
    name: "Velvet Accent Chair",
    category: "Chairs",
    price: 449,
    originalPrice: 549,
    discount: 18,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
    tag: null,
  },
  {
    id: 6,
    name: "Rattan Side Table",
    category: "Tables",
    price: 159,
    originalPrice: 199,
    discount: 20,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop",
    tag: "New",
  },
  {
    id: 7,
    name: "Leather Recliner",
    category: "Chairs",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=400&h=400&fit=crop",
    tag: "Best Seller",
  },
  {
    id: 8,
    name: "Pendant Light Fixture",
    category: "Lighting",
    price: 279,
    originalPrice: 349,
    discount: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop",
    tag: null,
  },
];

export const ProductsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All Products");
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-foreground mb-4">Our Products Collections</h2>
          <p className="body-1 text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium furniture pieces
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
        >
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              className={`body-3 ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {filter}
            </Button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="wait">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                className="bg-card rounded-2xl overflow-hidden border border-border group"
              >
                {/* Image Container */}
                <div className="relative aspect-square bg-secondary overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <span className="absolute top-4 left-4 bg-destructive text-destructive-foreground body-3-bold px-3 py-1 rounded-full">
                      {product.discount}% OFF
                    </span>
                  )}

                  {/* Tag */}
                  {product.tag && (
                    <span className="absolute top-4 right-4 bg-accent text-accent-foreground body-3 px-3 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}

                  {/* Mobile/Tablet Action Icons - Always Visible */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 lg:hidden">
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`w-9 h-9 rounded-full bg-background shadow-md ${
                        isInWishlist(product.id.toString())
                          ? "bg-cta text-cta-foreground"
                          : "hover:bg-cta hover:text-cta-foreground"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInWishlist(product.id.toString())) {
                          removeFromWishlist(product.id.toString());
                        } else {
                          addToWishlist({
                            product_id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                        }
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(product.id.toString()) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <Expand className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await addToCart({
                          product_id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Desktop Hover Actions */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-foreground/20 items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:flex"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`rounded-full ${
                        isInWishlist(product.id.toString())
                          ? "bg-cta text-cta-foreground"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInWishlist(product.id.toString())) {
                          removeFromWishlist(product.id.toString());
                        } else {
                          addToWishlist({
                            product_id: product.id.toString(),
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          });
                        }
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(product.id.toString()) ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                    
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <Expand className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      size="icon"
                      className="rounded-full bg-cta hover:bg-cta/90"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await addToCart({
                          product_id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 text-cta-foreground" />
                    </Button>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="body-3 text-muted-foreground mb-1">{product.category}</p>
                  <h4 className="text-foreground mb-2 line-clamp-1">{product.name}</h4>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-cta text-cta" />
                    <span className="body-3 text-foreground">{product.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="body-1-bold text-foreground">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="body-3 text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" className="px-8 py-6 body-2-bold border-foreground text-foreground hover:bg-foreground hover:text-background">
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
