import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const accountSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(1, "Phone is required").max(20),
  gender: z.enum(["male", "female", "other"]),
});

type AccountFormData = z.infer<typeof accountSchema>;

const PersonalInfoForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const form = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "male",
    },
  });

  // Fetch profile data from Supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      setLoading(true);
      
      // Use maybeSingle() instead of single() to handle case where profile doesn't exist
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
        // Check if it's a "not found" error (PGRST116) - this is expected for new users
        if (error.code === "PGRST116") {
          // Profile doesn't exist yet, we'll create it below
          console.log("Profile not found, will create new one");
        } else {
          toast.error(`Failed to load profile data: ${error.message}`);
          setLoading(false);
          return;
        }
      }

      // If profile doesn't exist, create one with default values
      if (!data) {
        console.log("Profile not found for user, creating new profile...");
        const { data: newProfile, error: createError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              first_name: user.user_metadata?.first_name || user.user_metadata?.full_name?.split(" ")[0] || "",
              last_name: user.user_metadata?.last_name || user.user_metadata?.full_name?.split(" ").slice(1).join(" ") || "",
              email: user.email || "",
              phone: user.user_metadata?.phone || "",
              gender: "male",
            },
          ])
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError);
          console.error("Error details:", JSON.stringify(createError, null, 2));
          console.error("User ID:", user.id);
          console.error("User email:", user.email);
          
          // Still allow form to be used - user can fill it out and save will create/update
          toast.warning(`Profile not found. You can fill out the form and save to create your profile.`);
          
          // Pre-fill with user email if available
          form.reset({
            firstName: "",
            lastName: "",
            email: user.email || "",
            phone: "",
            gender: "male",
          });
          setLoading(false);
          return;
        }

        // Populate form with newly created profile
        if (newProfile) {
          form.reset({
            firstName: newProfile.first_name || "",
            lastName: newProfile.last_name || "",
            email: newProfile.email || "",
            phone: newProfile.phone || "",
            gender: (newProfile.gender as "male" | "female" | "other") || "male",
          });
          setAvatarUrl(newProfile.avatar_url);
        }
      } else {
        // Populate form with existing profile data
        form.reset({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: (data.gender as "male" | "female" | "other") || "male",
        });
        setAvatarUrl(data.avatar_url);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user, form]);

  const onSubmit = async (data: AccountFormData) => {
    if (!user) {
      toast.error("You must be logged in to update your profile");
      return;
    }

    // Use upsert to create or update the profile
    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: "id"
      });

    if (error) {
      console.error("Error saving profile:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      toast.error(`Failed to save profile: ${error.message}`);
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-secondary rounded-2xl p-6 md:p-8"
      >
        <h2 className="text-xl font-bold mb-6">Personal Information</h2>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-2xl p-6 md:p-8"
    >
      <h2 className="text-xl font-bold mb-6">Personal Information</h2>

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <img
            src={
              avatarUrl ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            }
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-background"
          />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    First Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Last Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Gender <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
          >
            Update Changes
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default PersonalInfoForm;
