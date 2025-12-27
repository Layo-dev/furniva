import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import WishlistItem from "./WishlistItem";
import { WishlistItem as WishlistItemType } from "@/contexts/WishlistContext";

interface WishlistTableProps {
  items: WishlistItemType[];
  onRemove: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const WishlistTable = ({ items, onRemove, onAddToCart }: WishlistTableProps) => {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-muted-foreground text-lg">Your wishlist is empty</p>
        <p className="text-muted-foreground text-sm mt-2">
          Browse our products and add items to your wishlist
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-cta hover:bg-cta">
            <TableHead className="text-cta-foreground font-semibold w-16"></TableHead>
            <TableHead className="text-cta-foreground font-semibold">
              Product
            </TableHead>
            <TableHead className="text-cta-foreground font-semibold">
              Price
            </TableHead>
            <TableHead className="text-cta-foreground font-semibold">
              Date Added
            </TableHead>
            <TableHead className="text-cta-foreground font-semibold">
              Stock Status
            </TableHead>
            <TableHead className="text-cta-foreground font-semibold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              onAddToCart={onAddToCart}
            />
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default WishlistTable;
