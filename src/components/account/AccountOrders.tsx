import { motion } from "framer-motion";
import { Package } from "lucide-react";

const AccountOrders = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl font-bold mb-6">My Orders</h2>
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No orders yet</p>
        <p className="text-muted-foreground text-sm mt-2">
          When you place orders, they will appear here
        </p>
      </div>
    </motion.div>
  );
};

export default AccountOrders;
