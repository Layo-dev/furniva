import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CouponSectionProps {
  onApply: (code: string) => void;
  onClear: () => void;
  appliedCode?: string;
}

const CouponSection = ({ onApply, onClear, appliedCode }: CouponSectionProps) => {
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (code.trim()) {
      onApply(code.trim());
      setCode("");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Input
        placeholder="Coupon Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="flex-1 rounded-lg"
      />
      <div className="flex gap-2">
        <Button
          onClick={handleApply}
          className="bg-cta hover:bg-cta/90 text-cta-foreground rounded-lg px-6"
        >
          Apply
        </Button>
        {appliedCode && (
          <Button
            variant="ghost"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default CouponSection;
