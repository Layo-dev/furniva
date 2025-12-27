import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { WishlistItem as WishlistItemType } from "@/contexts/WishlistContext";
import { format } from "date-fns";

interface WishlistItemProps {
  item: WishlistItemType;
  onRemove: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const WishlistItem = ({
  item,
  onRemove,
  onAddToCart,
}: WishlistItemProps) => {
  // Extract date from wishlist item id (format: wishlist_timestamp)
  const getDateAdded = () => {
    try {
      const timestamp = item.id.replace("wishlist_", "");
      const date = new Date(parseInt(timestamp));
      return format(date, "dd MMMM yyyy");
    } catch {
      return "Recently added";
    }
  };

  const dateAdded = getDateAdded();
  // Default to in stock (can be enhanced later with product data)
  const inStock = true;
  return (
    <TableRow className="border-b border-border">
      <TableCell className="py-4">
        <button
          onClick={() => onRemove(item.product_id)}
          className="w-8 h-8 rounded-full bg-secondary hover:bg-destructive hover:text-destructive-foreground flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </TableCell>
      <TableCell className="py-4">
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{item.name}</p>
            {item.color && (
              <p className="text-muted-foreground text-sm">Color: {item.color}</p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell className="py-4 font-medium">${item.price.toFixed(2)}</TableCell>
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
          onClick={() => onAddToCart(item.product_id)}
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
