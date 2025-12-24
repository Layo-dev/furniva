import { motion } from "framer-motion";
import { Check } from "lucide-react";

const OrderSuccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="text-center mb-8"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-cta rounded-full mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Check className="w-10 h-10 text-accent" strokeWidth={3} />
        </motion.div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold">Your order is completed!</h2>
      <p className="text-muted-foreground mt-2 body-2">
        Thank you for your purchase. Your order has been received and is being processed.
      </p>
    </motion.div>
  );
};

export default OrderSuccess;
