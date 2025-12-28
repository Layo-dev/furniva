-- Drop the existing ALL policy and create separate policies for better security control
DROP POLICY IF EXISTS "Users can manage own orders" ON public.orders;

-- Create SELECT policy - users can only view their own orders
CREATE POLICY "Users can view own orders" 
ON public.orders 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Create INSERT policy - users can create their own orders
CREATE POLICY "Users can create own orders" 
ON public.orders 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create UPDATE policy - users can update their own orders
CREATE POLICY "Users can update own orders" 
ON public.orders 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create DELETE policy - users can delete their own orders
CREATE POLICY "Users can delete own orders" 
ON public.orders 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);