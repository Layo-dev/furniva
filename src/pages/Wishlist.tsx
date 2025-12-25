import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import WishlistTable from "@/components/wishlist/WishlistTable";
import WishlistActions from "@/components/wishlist/WishlistActions";
import { toast } from "sonner";

const initialWishlistItems = [
  {
    id: 1,
    name: "Wooden Sofa Chair",
    color: "Brown",
    price: 299.99,
    dateAdded: "18 April 2024",
    inStock: true,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Red Gaming Chair",
    color: "Red",
    price: 349.99,
    dateAdded: "15 April 2024",
    inStock: true,
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Swivel Chair",
    color: "Gray",
    price: 199.99,
    dateAdded: "12 April 2024",
    inStock: false,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Circular Sofa Chair",
    color: "Beige",
    price: 449.99,
    dateAdded: "10 April 2024",
    inStock: true,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop",
  },
];

const Wishlist = () => {
  const [items, setItems] = useState(initialWishlistItems);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wishlist" },
  ];

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item removed from wishlist");
  };

  const handleAddToCart = (id: number) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      toast.success(`${item.name} added to cart`);
    }
  };

  const handleClearWishlist = () => {
    setItems([]);
    toast.success("Wishlist cleared");
  };

  const handleAddAllToCart = () => {
    const inStockItems = items.filter((item) => item.inStock);
    toast.success(`${inStockItems.length} items added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Wishlist" breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <WishlistTable
            items={items}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
          />
          <WishlistActions
            onClearWishlist={handleClearWishlist}
            onAddAllToCart={handleAddAllToCart}
            itemCount={items.length}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
