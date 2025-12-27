import { X } from "lucide-react";
import { motion } from "framer-motion";
import QuantitySelector from "./QuantitySelector";
import { Button } from "@/components/ui/button";

export interface CartItemData {
  id: string;
  product_id: string;
  name: string;
  color?: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const subtotal = item.price * item.quantity;

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="border-b border-border"
    >
      <td className="py-4">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-secondary rounded-lg overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium">{item.name}</h4>
            {item.color && (
              <p className="text-sm text-muted-foreground">Color: {item.color}</p>
            )}
          </div>
        </div>
      </td>
      <td className="py-4 text-center">
        <span className="body-2">${item.price.toFixed(2)}</span>
      </td>
      <td className="py-4">
        <div className="flex justify-center">
          <QuantitySelector
            quantity={item.quantity}
            onIncrement={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
            onDecrement={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
          />
        </div>
      </td>
      <td className="py-4 text-center">
        <span className="body-2-bold">${subtotal.toFixed(2)}</span>
      </td>
      <td className="py-4 text-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.product_id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="h-5 w-5" />
        </Button>
      </td>
    </motion.tr>
  );
};

export default CartItem;
