import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import OrderSuccess from "@/components/order/OrderSuccess";
import OrderInfoBar from "@/components/order/OrderInfoBar";
import OrderDetails from "@/components/order/OrderDetails";

const orderItems = [
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

const OrderCompleted = () => {
  const subtotal = 1895.0;
  const shipping = 0;
  const taxes = 151.6;
  const couponDiscount = 50;
  const total = subtotal + shipping + taxes - couponDiscount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader
        title="Order Completed"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
          { label: "Order Completed" },
        ]}
      />

      <main className="flex-1 py-12">
        <div className="container-custom max-w-4xl">
          <OrderSuccess />
          
          <OrderInfoBar
            orderId="#FRN-2024-001234"
            paymentMethod="Credit Card"
            transactionId="TXN-7890123456"
            estimatedDelivery="Dec 28, 2024"
          />
          
          <OrderDetails
            items={orderItems}
            subtotal={subtotal}
            shipping={shipping}
            taxes={taxes}
            couponDiscount={couponDiscount}
            total={total}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderCompleted;
