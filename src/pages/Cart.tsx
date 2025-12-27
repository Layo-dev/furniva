import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import CartTable from "@/components/cart/CartTable";
import OrderSummary from "@/components/cart/OrderSummary";
import CouponSection from "@/components/cart/CouponSection";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, loading } = useCart();
  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  const handleRemove = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    setCouponDiscount(50); // Demo discount
  };

  const handleClearCoupon = () => {
    setCouponCode(undefined);
    setCouponDiscount(0);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const taxes = subtotal * 0.08;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader
        title="Shopping Cart"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shopping Cart" },
        ]}
      />

      <main className="flex-1 py-12">
        <div className="container-custom">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => navigate("/shop")}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
              >
                <CartTable
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemove}
                />

                <div className="mt-8">
                  <CouponSection
                    onApply={handleApplyCoupon}
                    onClear={handleClearCoupon}
                    appliedCode={couponCode}
                  />
                </div>
              </motion.div>

              <div>
                <OrderSummary
                  itemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  subtotal={subtotal}
                  shipping={shipping}
                  taxes={taxes}
                  couponDiscount={couponDiscount}
                  buttonText="Proceed to Checkout"
                  onButtonClick={() => navigate("/checkout")}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
