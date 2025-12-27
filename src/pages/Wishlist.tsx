import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import WishlistTable from "@/components/wishlist/WishlistTable";
import WishlistActions from "@/components/wishlist/WishlistActions";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Wishlist" },
  ];

  const handleRemove = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  const handleAddToCart = async (productId: string) => {
    const item = wishlistItems.find((i) => i.product_id === productId);
    if (item) {
      await addToCart({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
      });
    }
  };

  const handleClearWishlist = async () => {
    await clearWishlist();
  };

  const handleAddAllToCart = async () => {
    if (wishlistItems.length === 0) {
      toast.info("Wishlist is empty");
      return;
    }

    let addedCount = 0;
    for (const item of wishlistItems) {
      await addToCart({
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
      });
      addedCount++;
    }
    toast.success(`${addedCount} item${addedCount !== 1 ? "s" : ""} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Wishlist" breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <WishlistTable
            items={wishlistItems}
            onRemove={handleRemove}
            onAddToCart={handleAddToCart}
          />
          <WishlistActions
            onClearWishlist={handleClearWishlist}
            onAddAllToCart={handleAddAllToCart}
            itemCount={wishlistItems.length}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
