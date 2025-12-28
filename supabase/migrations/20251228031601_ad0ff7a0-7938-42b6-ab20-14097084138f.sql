-- Create audit log table for role changes
CREATE TABLE public.role_audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    performed_by UUID,
    performed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    old_role app_role,
    new_role app_role
);

-- Enable RLS on audit log
ALTER TABLE public.role_audit_log ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view role audit logs"
ON public.role_audit_log
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- No one can modify audit logs directly (only via trigger)
-- The trigger function uses SECURITY DEFINER to bypass this

-- Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_role_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        INSERT INTO public.role_audit_log (user_id, role, action, performed_by, new_role)
        VALUES (NEW.user_id, NEW.role, 'INSERT', auth.uid(), NEW.role);
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO public.role_audit_log (user_id, role, action, performed_by, old_role, new_role)
        VALUES (NEW.user_id, NEW.role, 'UPDATE', auth.uid(), OLD.role, NEW.role);
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO public.role_audit_log (user_id, role, action, performed_by, old_role)
        VALUES (OLD.user_id, OLD.role, 'DELETE', auth.uid(), OLD.role);
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$;

-- Create trigger on user_roles table
CREATE TRIGGER user_roles_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
FOR EACH ROW
EXECUTE FUNCTION public.audit_role_changes();