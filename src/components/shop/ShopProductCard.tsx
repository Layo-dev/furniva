import { motion } from "framer-motion";
import { Heart, Expand, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  image: string;
  inStock: boolean;
}

interface ShopProductCardProps {
  product: Product;
  index: number;
}

const ShopProductCard = ({ product, index }: ShopProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id.toString());

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) {
      toast.error("Product is out of stock");
      return;
    }

    await addToCart({
      product_id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWishlist) {
      await removeFromWishlist(product.id.toString());
    } else {
      await addToWishlist({
        product_id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -8 }}
        className="bg-card rounded-2xl overflow-hidden border border-border group">
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded body-3-bold">
            -{product.discount}%
          </span>
        )}

        {/* Out of Stock Badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
            <span className="bg-background text-foreground px-4 py-2 rounded body-2-bold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.preventDefault()}
        >
          <Button
            size="icon"
            variant="secondary"
            className={`w-9 h-9 rounded-full bg-background shadow-md ${
              inWishlist
                ? "bg-cta text-cta-foreground"
                : "hover:bg-cta hover:text-cta-foreground"
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
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
            <Expand className="w-4 h-4" />
          </Button>
          
          <Button
            size="icon"
            variant="secondary"
            className="w-9 h-9 rounded-full bg-background hover:bg-cta hover:text-cta-foreground shadow-md"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="body-3 text-muted-foreground">{product.category}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-cta text-cta" />
            <span className="body-3 text-muted-foreground">{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h4 className="text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-1">
          {product.name}
        </h4>

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
    </Link>
  );
};

export default ShopProductCard;
