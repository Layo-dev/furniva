import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const PaymentMethods = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8 p-6 bg-secondary rounded-2xl"
    >
      <h3 className="text-lg font-bold mb-4">Payment Method</h3>

      <div className="flex flex-wrap gap-4 mb-4">
        {/* Payment method icons */}
        <div className="flex items-center justify-center w-16 h-10 bg-background rounded-lg border border-border">
          <svg viewBox="0 0 38 24" className="h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#1A1F71"/>
            <path d="M15 19l1.4-9h2.2l-1.4 9H15zm9.2-8.8c-.4-.2-1.1-.4-1.9-.4-2.1 0-3.6 1.2-3.6 2.9 0 1.3 1.1 2 1.9 2.4.8.4 1.1.7 1.1 1.1 0 .6-.7.9-1.3.9-.9 0-1.4-.1-2.1-.5l-.3-.1-.3 2c.5.2 1.5.4 2.5.4 2.2 0 3.7-1.1 3.7-3 0-1-.6-1.8-1.9-2.4-.8-.4-1.3-.7-1.3-1.1 0-.4.4-.8 1.3-.8.7 0 1.3.2 1.7.4l.2.1.4-1.9zm5.5-.2h-1.6c-.5 0-.9.1-1.1.6l-3.2 7.8h2.2l.4-1.2h2.7l.3 1.2h2l-1.7-8.4zm-2.5 5.4l.9-2.5c0 .1.2-.5.3-.8l.2.7.5 2.6h-1.9zM12.2 10l-2.1 6.1-.2-1.2c-.4-1.3-1.5-2.8-2.8-3.5l1.9 7.5h2.3l3.4-8.9h-2.5z" fill="#fff"/>
            <path d="M8.1 10H4.7l-.1.2c2.7.7 4.4 2.4 5.2 4.4L9 11.4c-.2-.8-.8-1.4-1.9-1.4h-1z" fill="#F9A533"/>
          </svg>
        </div>
        <div className="flex items-center justify-center w-16 h-10 bg-background rounded-lg border border-border">
          <svg viewBox="0 0 38 24" className="h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#000"/>
            <circle cx="15" cy="12" r="7" fill="#EB001B"/>
            <circle cx="23" cy="12" r="7" fill="#F79E1B"/>
            <path d="M19 7c1.7 1.3 2.8 3.4 2.8 5.7s-1.1 4.4-2.8 5.7c-1.7-1.3-2.8-3.4-2.8-5.7s1.1-4.4 2.8-5.7z" fill="#FF5F00"/>
          </svg>
        </div>
        <div className="flex items-center justify-center w-16 h-10 bg-background rounded-lg border border-border">
          <svg viewBox="0 0 38 24" className="h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.3 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z" fill="#006FCF"/>
            <path d="M8.5 19V5.5h8.3l1.6 10.7L20 5.5h8.3V19h-5V9l-2.2 10h-5.4l-2.2-10v10h-5z" fill="#fff"/>
          </svg>
        </div>
        <div className="flex items-center justify-center w-16 h-10 bg-background rounded-lg border border-border">
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Your payment information is processed securely. We do not store credit card details.
      </p>
    </motion.div>
  );
};

export default PaymentMethods;
