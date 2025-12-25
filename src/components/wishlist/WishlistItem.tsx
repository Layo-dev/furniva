import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface WishlistItemProps {
  id: number;
  name: string;
  color: string;
  price: number;
  dateAdded: string;
  inStock: boolean;
  image: string;
  onRemove: (id: number) => void;
  onAddToCart: (id: number) => void;
}

const WishlistItem = ({
  id,
  name,
  color,
  price,
  dateAdded,
  inStock,
  image,
  onRemove,
  onAddToCart,
}: WishlistItemProps) => {
  return (
    <TableRow className="border-b border-border">
      <TableCell className="py-4">
        <button
          onClick={() => onRemove(id)}
          className="w-8 h-8 rounded-full bg-secondary hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground text-sm">Color: {color}</p>
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4 font-medium">${price.toFixed(2)}</TableCell>
      <TableCell className="py-4 text-muted-foreground">{dateAdded}</TableCell>
      <TableCell className="py-4">
        <span
          className={`font-medium ${
            inStock ? "text-accent" : "text-destructive"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
      </TableCell>
      <TableCell className="py-4">
        <Button
          onClick={() => onAddToCart(id)}
          disabled={!inStock}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Add to Cart
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default WishlistItem;
