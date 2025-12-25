import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface WishlistActionsProps {
  onClearWishlist: () => void;
  onAddAllToCart: () => void;
  itemCount: number;
}

const WishlistActions = ({
  onClearWishlist,
  onAddAllToCart,
  itemCount,
}: WishlistActionsProps) => {
  const [copied, setCopied] = useState(false);
  const wishlistLink = `${window.location.origin}/wishlist?share=abc123`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(wishlistLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (itemCount === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3 w-full md:w-auto">
        <Input
          value={wishlistLink}
          readOnly
          className="w-full md:w-80 bg-secondary"
        />
        <Button
          onClick={handleCopyLink}
          className="bg-cta hover:bg-cta/90 text-cta-foreground flex-shrink-0"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="ml-2">{copied ? "Copied" : "Copy Link"}</span>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onClearWishlist}
          className="text-muted-foreground hover:text-destructive transition-colors underline"
        >
          Clear Wishlist
        </button>
        <Button
          onClick={onAddAllToCart}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Add All to Cart
        </Button>
      </div>
    </motion.div>
  );
};

export default WishlistActions;
