import { Star, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { useCart } from "@/contexts/CartContext";

interface ProductInfoProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviewCount: number;
    description: string;
    colors: string[];
    sku: string;
    tags: string[];
    images?: string[];
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    await addToCart(
      {
        product_id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        color: selectedColor,
      },
      quantity
    );
  };

  return (
    <div className="space-y-6">
      {/* Category & Badge */}
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground text-sm">{product.category}</span>
        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          New
        </span>
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "fill-cta text-cta"
                  : "fill-transparent text-muted-foreground"
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} Reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-foreground">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-lg text-muted-foreground line-through">
          ${product.originalPrice.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="text-muted-foreground leading-relaxed">{product.description}</p>

      {/* Color Selection */}
      <div className="space-y-3">
        <span className="text-sm font-medium">Color:</span>
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
        />
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onIncrement={() => setQuantity((q) => q + 1)}
          onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
        />
        <Button 
          onClick={handleAddToCart}
          className="flex-1 bg-cta text-cta-foreground hover:bg-cta/90"
        >
          Add to Cart
        </Button>
        <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </div>

      {/* Meta Info */}
      <div className="pt-6 border-t border-border space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">SKU:</span>
          <span className="font-medium">{product.sku}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Tags:</span>
          <div className="flex gap-2">
            {product.tags.map((tag) => (
              <span key={tag} className="text-foreground hover:text-accent cursor-pointer">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Share:</span>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Facebook className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Twitter className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
