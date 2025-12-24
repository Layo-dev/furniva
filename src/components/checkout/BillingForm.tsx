import { motion } from "framer-motion";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface BillingFormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  deliveryAddress: "same" | "different";
}

interface BillingFormProps {
  register: UseFormRegister<BillingFormData>;
  errors: FieldErrors<BillingFormData>;
  onCountryChange: (value: string) => void;
  onDeliveryAddressChange: (value: "same" | "different") => void;
  selectedCountry: string;
  selectedDeliveryAddress: "same" | "different";
}

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
];

const BillingForm = ({
  register,
  errors,
  onCountryChange,
  onDeliveryAddressChange,
  selectedCountry,
  selectedDeliveryAddress,
}: BillingFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold mb-6">Billing Details</h2>

      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            First Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className="rounded-lg"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            Last Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className="rounded-lg"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name (Optional)</Label>
        <Input
          id="companyName"
          {...register("companyName")}
          className="rounded-lg"
          placeholder="Company Name"
        />
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label>
          Country <span className="text-destructive">*</span>
        </Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="rounded-lg">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-sm text-destructive">{errors.country.message}</p>
        )}
      </div>

      {/* Street Address */}
      <div className="space-y-2">
        <Label htmlFor="streetAddress">
          Street Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="streetAddress"
          {...register("streetAddress")}
          className="rounded-lg"
          placeholder="Street Address"
        />
        {errors.streetAddress && (
          <p className="text-sm text-destructive">{errors.streetAddress.message}</p>
        )}
      </div>

      {/* City, State, Zip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">
            City <span className="text-destructive">*</span>
          </Label>
          <Input
            id="city"
            {...register("city")}
            className="rounded-lg"
            placeholder="City"
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">
            State <span className="text-destructive">*</span>
          </Label>
          <Input
            id="state"
            {...register("state")}
            className="rounded-lg"
            placeholder="State"
          />
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode">
            Zip Code <span className="text-destructive">*</span>
          </Label>
          <Input
            id="zipCode"
            {...register("zipCode")}
            className="rounded-lg"
            placeholder="Zip Code"
          />
          {errors.zipCode && (
            <p className="text-sm text-destructive">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Phone and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            className="rounded-lg"
            placeholder="Phone"
            type="tel"
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            {...register("email")}
            className="rounded-lg"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-4">
        <Label>Delivery Address</Label>
        <RadioGroup
          value={selectedDeliveryAddress}
          onValueChange={(v) => onDeliveryAddressChange(v as "same" | "different")}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="same" id="same" />
            <Label htmlFor="same" className="font-normal cursor-pointer">
              Same as billing address
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="different" id="different" />
            <Label htmlFor="different" className="font-normal cursor-pointer">
              Different shipping address
            </Label>
          </div>
        </RadioGroup>
      </div>
    </motion.div>
  );
};

export default BillingForm;
