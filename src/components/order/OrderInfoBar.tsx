import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderInfoBarProps {
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  estimatedDelivery: string;
}

const OrderInfoBar = ({
  orderId,
  paymentMethod,
  transactionId,
  estimatedDelivery,
}: OrderInfoBarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-cta rounded-2xl p-6 mb-8"
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
        <div>
          <p className="text-sm text-cta-foreground/70">Order ID</p>
          <p className="font-bold text-cta-foreground">{orderId}</p>
        </div>
        <div>
          <p className="text-sm text-cta-foreground/70">Payment Method</p>
          <p className="font-bold text-cta-foreground">{paymentMethod}</p>
        </div>
        <div>
          <p className="text-sm text-cta-foreground/70">Transaction ID</p>
          <p className="font-bold text-cta-foreground">{transactionId}</p>
        </div>
        <div>
          <p className="text-sm text-cta-foreground/70">Estimated Delivery</p>
          <p className="font-bold text-cta-foreground">{estimatedDelivery}</p>
        </div>
        <div className="col-span-2 md:col-span-1 flex justify-end">
          <Button
            variant="outline"
            className="bg-background hover:bg-background/90 text-foreground rounded-lg"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderInfoBar;
