-- Drop the existing ALL policy and create separate policies for better security control
DROP POLICY IF EXISTS "Authenticated users can manage their own profile" ON public.profiles;

-- Create SELECT policy - users can only view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Create INSERT policy - users can create their own profile
CREATE POLICY "Users can create own profile" 
ON public.profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create UPDATE policy - users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create DELETE policy - users can delete their own profile
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
TO authenticated
USING (auth.uid() = id);