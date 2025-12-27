import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  image: string;
  color?: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  loading: boolean;
  addToWishlist: (product: Omit<WishlistItem, "id">) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const GUEST_WISHLIST_KEY = "furniva_guest_wishlist";

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, [user]);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      if (user) {
        await loadUserWishlist();
      } else {
        loadGuestWishlist();
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserWishlist = async () => {
    if (!user) return;

    try {
      // Using localStorage for now - can be migrated to Supabase later
      const stored = localStorage.getItem(`${GUEST_WISHLIST_KEY}_${user.id}`);
      if (stored) {
        const items = JSON.parse(stored) as WishlistItem[];
        setWishlistItems(items);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error loading user wishlist:", error);
      setWishlistItems([]);
    }
  };

  const loadGuestWishlist = () => {
    try {
      const stored = localStorage.getItem(GUEST_WISHLIST_KEY);
      if (stored) {
        const items = JSON.parse(stored) as WishlistItem[];
        setWishlistItems(items);
      } else {
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error loading guest wishlist:", error);
      setWishlistItems([]);
    }
  };

  const saveWishlist = (items: WishlistItem[]) => {
    try {
      if (user) {
        localStorage.setItem(`${GUEST_WISHLIST_KEY}_${user.id}`, JSON.stringify(items));
      } else {
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(items));
      }
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const addToWishlist = async (product: Omit<WishlistItem, "id">) => {
    // Check if already in wishlist
    if (isInWishlist(product.product_id)) {
      toast.info("Item already in wishlist");
      return;
    }

    const newItem: WishlistItem = {
      id: `wishlist_${Date.now()}`,
      ...product,
    };

    const updatedItems = [...wishlistItems, newItem];
    setWishlistItems(updatedItems);
    saveWishlist(updatedItems);
    toast.success("Added to wishlist");
  };

  const removeFromWishlist = async (productId: string) => {
    const updatedItems = wishlistItems.filter(
      (item) => item.product_id !== productId
    );
    setWishlistItems(updatedItems);
    saveWishlist(updatedItems);
    toast.success("Removed from wishlist");
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.product_id === productId);
  };

  const clearWishlist = async () => {
    setWishlistItems([]);
    if (user) {
      localStorage.removeItem(`${GUEST_WISHLIST_KEY}_${user.id}`);
    } else {
      localStorage.removeItem(GUEST_WISHLIST_KEY);
    }
    toast.success("Wishlist cleared");
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

