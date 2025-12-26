import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const ColorSelector = ({ colors, selectedColor, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorSelect(color)}
          className={cn(
            "w-8 h-8 rounded-full border-2 transition-all duration-200",
            selectedColor === color
              ? "border-foreground scale-110"
              : "border-transparent hover:scale-105"
          )}
          style={{ backgroundColor: color }}
          aria-label={`Select ${color} color`}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
