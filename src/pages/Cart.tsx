import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import CartTable from "@/components/cart/CartTable";
import OrderSummary from "@/components/cart/OrderSummary";
import CouponSection from "@/components/cart/CouponSection";
import { CartItemData } from "@/components/cart/CartItem";

const initialCartItems: CartItemData[] = [
  {
    id: 1,
    name: "Wooden Sofa Chair",
    color: "Brown",
    price: 299.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200",
  },
  {
    id: 2,
    name: "Red Gaming Chair",
    color: "Red",
    price: 499.0,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200",
  },
  {
    id: 3,
    name: "Swivel Chair",
    color: "Yellow",
    price: 199.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200",
  },
  {
    id: 4,
    name: "Circular Sofa Chair",
    color: "Grey",
    price: 399.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=200",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItemData[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState<string | undefined>();
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
