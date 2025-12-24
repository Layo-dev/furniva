import { motion } from "framer-motion";

interface OrderItem {
  id: number;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetailsProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  taxes: number;
  couponDiscount: number;
  total: number;
}

const OrderDetails = ({
  items,
  subtotal,
  shipping,
  taxes,
  couponDiscount,
  total,
}: OrderDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-secondary rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold mb-6">Order Details</h3>

      {/* Products List */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 pb-4 border-b border-border last:border-0"
          >
            <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">
                Color: {item.color} | Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between body-2">
          <span className="text-muted-foreground">Sub Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between body-2">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Free"}</span>
        </div>
        <div className="flex justify-between body-2">
          <span className="text-muted-foreground">Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between body-2 text-green-600">
            <span>Coupon Discount</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between body-1-bold pt-3 border-t border-border">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
