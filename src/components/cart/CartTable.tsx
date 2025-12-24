import { AnimatePresence } from "framer-motion";
import CartItem, { CartItemData } from "./CartItem";

interface CartTableProps {
  items: CartItemData[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartTable = ({ items, onUpdateQuantity, onRemove }: CartTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-cta rounded-lg">
            <th className="text-left py-4 px-4 rounded-l-lg font-medium">Product</th>
            <th className="text-center py-4 px-4 font-medium">Price</th>
            <th className="text-center py-4 px-4 font-medium">Quantity</th>
            <th className="text-center py-4 px-4 font-medium">Subtotal</th>
            <th className="text-center py-4 px-4 rounded-r-lg font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
