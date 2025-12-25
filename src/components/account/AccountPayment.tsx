import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const AccountPayment = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
      <div className="text-center py-12">
        <CreditCard className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No payment methods saved</p>
        <p className="text-muted-foreground text-sm mt-2">
          Add a payment method for faster checkout
        </p>
      </div>
    </motion.div>
  );
};

export default AccountPayment;
