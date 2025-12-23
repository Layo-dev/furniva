import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  filters: {
    categories: string[];
    priceRange: [number, number];
    colors: string[];
    materials: string[];
    availability: string[];
  };
  onFilterChange: (key: string, value: unknown) => void;
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "sofa", label: "Sofa", count: 24 },
  { id: "chair", label: "Chair", count: 18 },
  { id: "table", label: "Table", count: 32 },
  { id: "bed", label: "Bed", count: 15 },
  { id: "bedroom", label: "Bedroom", count: 20 },
  { id: "living-room", label: "Living Room", count: 28 },
  { id: "office", label: "Office", count: 12 },
  { id: "lighting", label: "Lighting", count: 22 },
  { id: "kitchen", label: "Kitchen", count: 16 },
  { id: "outdoor", label: "Outdoor", count: 10 },
  { id: "decor", label: "Decor", count: 35 },
];

const colors = [
  { id: "black", color: "#1f1f1f" },
  { id: "white", color: "#ffffff" },
  { id: "brown", color: "#8B4513" },
  { id: "gray", color: "#808080" },
  { id: "beige", color: "#F5F5DC" },
  { id: "green", color: "#2E7D32" },
  { id: "blue", color: "#1976D2" },
];

const materials = [
  { id: "metal", label: "Metal" },
  { id: "wood", label: "Wood" },
  { id: "upholstered", label: "Upholstered" },
  { id: "glass", label: "Glass" },
  { id: "fabric", label: "Fabric" },
];

const availabilityOptions = [
  { id: "in-stock", label: "In Stock" },
  { id: "out-of-stock", label: "Out of Stock" },
];

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="body-2-bold text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) => {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((c) => c !== categoryId);
    onFilterChange("categories", newCategories);
  };

  const handleColorChange = (colorId: string) => {
    const newColors = filters.colors.includes(colorId)
      ? filters.colors.filter((c) => c !== colorId)
      : [...filters.colors, colorId];
    onFilterChange("colors", newColors);
  };

  const handleMaterialChange = (materialId: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, materialId]
      : filters.materials.filter((m) => m !== materialId);
    onFilterChange("materials", newMaterials);
  };

  const handleAvailabilityChange = (availabilityId: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, availabilityId]
      : filters.availability.filter((a) => a !== availabilityId);
    onFilterChange("availability", newAvailability);
  };

  const sidebarContent = (
    <div className="relative">
      {/* Green accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent rounded-full" />
      
      <div className="pl-6">
        <FilterSection title="Category">
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <span className="body-3 text-muted-foreground group-hover:text-foreground transition-colors">
                    {category.label}
                  </span>
                </div>
                <span className="body-3 text-muted-foreground">({category.count})</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFilterChange("priceRange", value)}
              max={2000}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between body-3 text-muted-foreground">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Color">
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.id)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  filters.colors.includes(color.id)
                    ? "border-accent scale-110"
                    : "border-border hover:border-muted-foreground"
                }`}
                style={{ backgroundColor: color.color }}
                title={color.id}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Material">
          <div className="space-y-3">
            {materials.map((material) => (
              <label
                key={material.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.materials.includes(material.id)}
                  onCheckedChange={(checked) =>
                    handleMaterialChange(material.id, checked as boolean)
                  }
                />
                <span className="body-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  {material.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Availability">
          <div className="space-y-3">
            {availabilityOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.availability.includes(option.id)}
                  onCheckedChange={(checked) =>
                    handleAvailabilityChange(option.id, checked as boolean)
                  }
                />
                <span className="body-3 text-muted-foreground group-hover:text-foreground transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="hidden lg:block w-[280px] flex-shrink-0"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 h-full w-[300px] bg-background z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-foreground">Filters</h3>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterSidebar;
