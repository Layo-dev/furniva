-- Drop the existing ALL policy and create separate policies for better security control
DROP POLICY IF EXISTS "Users can manage own cart" ON public.cart;

-- Create SELECT policy - authenticated users can only view their own cart
CREATE POLICY "Users can view own cart" 
ON public.cart 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create INSERT policy - authenticated users can create their own cart
CREATE POLICY "Users can create own cart" 
ON public.cart 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create UPDATE policy - authenticated users can update their own cart
CREATE POLICY "Users can update own cart" 
ON public.cart 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create DELETE policy - authenticated users can delete their own cart
CREATE POLICY "Users can delete own cart" 
ON public.cart 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Also fix cart_items table for consistency
DROP POLICY IF EXISTS "Only users with access to parent cart" ON public.cart_items;

-- Create SELECT policy for cart_items
CREATE POLICY "Users can view own cart items" 
ON public.cart_items 
FOR SELECT 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM cart 
  WHERE cart.id = cart_items.cart_id 
  AND cart.user_id = auth.uid()
));

-- Create INSERT policy for cart_items
CREATE POLICY "Users can add items to own cart" 
ON public.cart_items 
FOR INSERT 
TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM cart 
  WHERE cart.id = cart_items.cart_id 
  AND cart.user_id = auth.uid()
));

-- Create UPDATE policy for cart_items
CREATE POLICY "Users can update own cart items" 
ON public.cart_items 
FOR UPDATE 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM cart 
  WHERE cart.id = cart_items.cart_id 
  AND cart.user_id = auth.uid()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM cart 
  WHERE cart.id = cart_items.cart_id 
  AND cart.user_id = auth.uid()
));

-- Create DELETE policy for cart_items
CREATE POLICY "Users can delete own cart items" 
ON public.cart_items 
FOR DELETE 
TO authenticated
USING (EXISTS (
  SELECT 1 FROM cart 
  WHERE cart.id = cart_items.cart_id 
  AND cart.user_id = auth.uid()
));