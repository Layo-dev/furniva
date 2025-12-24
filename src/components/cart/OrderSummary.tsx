import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface OrderSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping?: number;
  taxes?: number;
  couponDiscount?: number;
  buttonText: string;
  onButtonClick: () => void;
}

const OrderSummary = ({
  itemCount,
  subtotal,
  shipping = 0,
  taxes = 0,
  couponDiscount = 0,
  buttonText,
  onButtonClick,
}: OrderSummaryProps) => {
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-secondary rounded-2xl p-6"
    >
      <h3 className="text-xl font-bold mb-6">Order Summary</h3>

      <div className="space-y-4">
        <div className="flex justify-between body-2">
          <span className="text-muted-foreground">Items</span>
          <span>{itemCount}</span>
        </div>

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

        <div className="border-t border-border pt-4 mt-4">
          <div className="flex justify-between body-1-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={onButtonClick}
        className="w-full mt-6 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-6"
      >
        {buttonText}
      </Button>
    </motion.div>
  );
};

export default OrderSummary;
