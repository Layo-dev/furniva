import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({
  quantity,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2 border border-border rounded-lg p-1">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default QuantitySelector;
