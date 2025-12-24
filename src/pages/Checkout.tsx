import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import BillingForm, { BillingFormData } from "@/components/checkout/BillingForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderSummary from "@/components/cart/OrderSummary";
import { useState } from "react";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  companyName: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  streetAddress: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email"),
  deliveryAddress: z.enum(["same", "different"]),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState<"same" | "different">("same");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BillingFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      deliveryAddress: "same",
    },
  });

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setValue("country", value);
  };

  const handleDeliveryAddressChange = (value: "same" | "different") => {
    setDeliveryAddress(value);
    setValue("deliveryAddress", value);
  };

  const onSubmit = (data: BillingFormData) => {
    console.log("Form submitted:", data);
    navigate("/order-completed");
  };

  // Demo cart data
  const subtotal = 1895.0;
  const shipping = 0;
  const taxes = 151.6;
  const couponDiscount = 50;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <PageHeader
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <main className="flex-1 py-12">
        <div className="container-custom">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <BillingForm
                  register={register}
                  errors={errors}
                  onCountryChange={handleCountryChange}
                  onDeliveryAddressChange={handleDeliveryAddressChange}
                  selectedCountry={country}
                  selectedDeliveryAddress={deliveryAddress}
                />
                <PaymentMethods />
              </div>

              <div>
                <OrderSummary
                  itemCount={5}
                  subtotal={subtotal}
                  shipping={shipping}
                  taxes={taxes}
                  couponDiscount={couponDiscount}
                  buttonText="Proceed to Payment"
                  onButtonClick={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
