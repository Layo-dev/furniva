import { createContext, useContext, useEffect, useState, useRef, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

export interface CartItem {
  id: string; // cart_item id for database, or temp ID for guest
  product_id: string;
  name: string;
  color?: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  loading: boolean;
  addToCart: (product: Omit<CartItem, "id" | "quantity">, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  syncGuestCart: () => Promise<void>; // Merge guest cart when user logs in
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "furniva_guest_cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState<string | null>(null);
  const hasSyncedRef = useRef(false);

  // Load cart on mount and when user changes
  useEffect(() => {
    hasSyncedRef.current = false; // Reset sync flag when user changes
    loadCart();
  }, [user]);

  // Sync guest cart when user logs in (only once)
  useEffect(() => {
    if (user && cartId && !hasSyncedRef.current) {
      hasSyncedRef.current = true;
      syncGuestCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, cartId]);

  const loadCart = async () => {
    setLoading(true);
    try {
      if (user) {
        // Load from Supabase for logged-in users
        await loadUserCart();
      } else {
        // Load from localStorage for guests
        loadGuestCart();
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserCart = async () => {
    if (!user) return;

    try {
      // Get or create cart
      let { data: cart, error: cartError } = await supabase
        .from("cart")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cartError && cartError.code !== "PGRST116") {
        throw cartError;
      }

      if (!cart) {
        // Create new cart
        const { data: newCart, error: createError } = await supabase
          .from("cart")
          .insert([{ id: crypto.randomUUID(), user_id: user.id }])
          .select()
          .single();

        if (createError) throw createError;
        cart = newCart;
      }

      setCartId(cart.id);

      // Load cart items with product details from Supabase
      const { data: items, error: itemsError } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          products (
            id,
            name,
            price,
            image,
            color
          )
        `)
        .eq("cart_id", cart.id);

      if (itemsError) throw itemsError;

      const formattedItems: CartItem[] = (items || []).map((item: any) => ({
        id: item.id,
        product_id: item.products.id,
        name: item.products.name,
        price: parseFloat(item.products.price),
        quantity: item.quantity,
        image: item.products.image || "",
        color: item.products.color || "",
      }));

      // Also load localStorage items (for products not in database)
      try {
        const stored = localStorage.getItem(`${GUEST_CART_KEY}_${user.id}`);
        if (stored) {
          const localStorageItems: CartItem[] = JSON.parse(stored);
          // Only add items that have temp IDs (not in database)
          const tempItems = localStorageItems.filter(item => item.id.startsWith("temp_"));
          // Merge with database items, avoiding duplicates
          const allItems = [...formattedItems];
          tempItems.forEach(tempItem => {
            if (!allItems.find(item => item.product_id === tempItem.product_id)) {
              allItems.push(tempItem);
            }
          });
          setCartItems(allItems);
        } else {
          setCartItems(formattedItems);
        }
      } catch (error) {
        console.error("Error loading localStorage items:", error);
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.error("Error loading user cart:", error);
      // Fallback to localStorage if database fails
      try {
        const stored = localStorage.getItem(`${GUEST_CART_KEY}_${user.id}`);
        if (stored) {
          const items = JSON.parse(stored) as CartItem[];
          setCartItems(items);
        } else {
          setCartItems([]);
        }
      } catch (localError) {
        console.error("Error loading from localStorage:", localError);
        setCartItems([]);
      }
    }
  };

  const loadGuestCart = () => {
    try {
      const stored = localStorage.getItem(GUEST_CART_KEY);
      if (stored) {
        const items = JSON.parse(stored) as CartItem[];
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error loading guest cart:", error);
      setCartItems([]);
    }
  };

  const saveGuestCart = (items: CartItem[]) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Error saving guest cart:", error);
    }
  };

  const addToCart = async (
    product: Omit<CartItem, "id" | "quantity">,
    quantity: number = 1
  ) => {
    // Helper function to check if string is a valid UUID
    const isValidUUID = (str: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(str);
    };

    // Check if product exists in database (only if product_id is a valid UUID)
    const productExistsInDB = async (productId: string): Promise<boolean> => {
      if (!isValidUUID(productId)) {
        return false;
      }
      try {
        const { data, error } = await supabase
          .from("products")
          .select("id")
          .eq("id", productId)
          .maybeSingle();
        return !error && data !== null;
      } catch {
        return false;
      }
    };

    if (user && cartId) {
      // Check if product exists in database
      const exists = await productExistsInDB(product.product_id);
      
      if (exists) {
        // Add to Supabase cart
        const existingItem = cartItems.find(
          (item) => item.product_id === product.product_id
        );

        if (existingItem) {
          // Update quantity
          await updateQuantity(product.product_id, existingItem.quantity + quantity);
        } else {
          // Add new item
          const { error } = await supabase.from("cart_items").insert([
            {
              id: crypto.randomUUID(),
              cart_id: cartId,
              product_id: product.product_id,
              quantity,
            },
          ]);

          if (error) {
            console.error("Error adding to cart:", error);
            console.error("Error details:", JSON.stringify(error, null, 2));
            toast.error(`Failed to add item to cart: ${error.message}`);
            return;
          }

          // Reload cart
          await loadUserCart();
          toast.success("Item added to cart");
        }
      } else {
        // Product doesn't exist in DB - use localStorage fallback for logged-in users
        console.log("Product not found in database, using localStorage fallback");
        const existingItem = cartItems.find(
          (item) => item.product_id === product.product_id
        );

        let updatedItems: CartItem[];
        if (existingItem) {
          updatedItems = cartItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: `temp_${Date.now()}`,
            ...product,
            quantity,
          };
          updatedItems = [...cartItems, newItem];
        }

        setCartItems(updatedItems);
        // Save to user-specific localStorage when product doesn't exist in DB
        try {
          localStorage.setItem(`${GUEST_CART_KEY}_${user.id}`, JSON.stringify(updatedItems));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
        toast.success("Item added to cart");
      }
    } else {
      // Add to localStorage cart
      const existingItem = cartItems.find(
        (item) => item.product_id === product.product_id
      );

      let updatedItems: CartItem[];
      if (existingItem) {
        updatedItems = cartItems.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `temp_${Date.now()}`,
          ...product,
          quantity,
        };
        updatedItems = [...cartItems, newItem];
      }

      setCartItems(updatedItems);
      saveGuestCart(updatedItems);
      toast.success("Item added to cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    const item = cartItems.find((item) => item.product_id === productId);
    if (!item) return;

    // Check if item is in database (has UUID id) or localStorage (has temp id)
    const isInDatabase = item.id && !item.id.startsWith("temp_");

    if (user && cartId && isInDatabase) {
      // Update in Supabase
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", item.id);

      if (error) {
        console.error("Error updating quantity:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        toast.error(`Failed to update quantity: ${error.message}`);
        return;
      }

      // Reload cart
      await loadUserCart();
    } else {
      // Update in localStorage (for guests or items not in database)
      const updatedItems = cartItems.map((item) =>
        item.product_id === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      
      if (user) {
        // Save to user-specific localStorage
        try {
          localStorage.setItem(`${GUEST_CART_KEY}_${user.id}`, JSON.stringify(updatedItems));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      } else {
        saveGuestCart(updatedItems);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const item = cartItems.find((item) => item.product_id === productId);
    if (!item) return;

    // Check if item is in database (has UUID id) or localStorage (has temp id)
    const isInDatabase = item.id && !item.id.startsWith("temp_");

    if (user && cartId && isInDatabase) {
      // Remove from Supabase
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", item.id);

      if (error) {
        console.error("Error removing from cart:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));
        toast.error(`Failed to remove item: ${error.message}`);
        return;
      }

      // Reload cart
      await loadUserCart();
    } else {
      // Remove from localStorage (for guests or items not in database)
      const updatedItems = cartItems.filter(
        (item) => item.product_id !== productId
      );
      setCartItems(updatedItems);
      
      if (user) {
        // Save to user-specific localStorage
        try {
          localStorage.setItem(`${GUEST_CART_KEY}_${user.id}`, JSON.stringify(updatedItems));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      } else {
        saveGuestCart(updatedItems);
      }
    }
  };

  const clearCart = async () => {
    if (user && cartId) {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

      if (error) {
        console.error("Error clearing cart:", error);
        return;
      }

      await loadUserCart();
    } else {
      setCartItems([]);
      localStorage.removeItem(GUEST_CART_KEY);
    }
  };

  const syncGuestCart = async () => {
    if (!user || !cartId) return;

    try {
      const guestCartJson = localStorage.getItem(GUEST_CART_KEY);
      if (!guestCartJson) return;

      const guestItems: CartItem[] = JSON.parse(guestCartJson);

      // Merge guest cart with user cart
      for (const guestItem of guestItems) {
        const existingItem = cartItems.find(
          (item) => item.product_id === guestItem.product_id
        );

        if (existingItem) {
          // Update quantity
          await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + guestItem.quantity })
            .eq("id", existingItem.id);
        } else {
          // Add new item
          await supabase.from("cart_items").insert([
            {
              id: crypto.randomUUID(),
              cart_id: cartId,
              product_id: guestItem.product_id,
              quantity: guestItem.quantity,
            },
          ]);
        }
      }

      // Clear guest cart
      localStorage.removeItem(GUEST_CART_KEY);

      // Reload cart
      await loadUserCart();
      toast.success("Cart synced successfully");
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        syncGuestCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

