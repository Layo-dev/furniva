import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const AccountAddresses = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl font-bold mb-6">Manage Addresses</h2>
      <div className="text-center py-12">
        <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No addresses saved</p>
        <p className="text-muted-foreground text-sm mt-2">
          Add an address for faster checkout
        </p>
      </div>
    </motion.div>
  );
};

export default AccountAddresses;
