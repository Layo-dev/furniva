import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: {
    categories: string[];
    priceRange: [number, number];
    colors: string[];
    materials: string[];
    availability: string[];
  };
  onRemoveFilter: (key: string, value: string) => void;
  onClearAll: () => void;
}

const categoryLabels: Record<string, string> = {
  sofa: "Sofa",
  chair: "Chair",
  table: "Table",
  bed: "Bed",
  bedroom: "Bedroom",
  "living-room": "Living Room",
  office: "Office",
  lighting: "Lighting",
  kitchen: "Kitchen",
  outdoor: "Outdoor",
  decor: "Decor",
};

const colorLabels: Record<string, string> = {
  black: "Black",
  white: "White",
  brown: "Brown",
  gray: "Gray",
  beige: "Beige",
  green: "Green",
  blue: "Blue",
};

const materialLabels: Record<string, string> = {
  metal: "Metal",
  wood: "Wood",
  upholstered: "Upholstered",
  glass: "Glass",
  fabric: "Fabric",
};

const availabilityLabels: Record<string, string> = {
  "in-stock": "In Stock",
  "out-of-stock": "Out of Stock",
};

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }: ActiveFiltersProps) => {
  const activeFilters: { key: string; value: string; label: string }[] = [];

  // Add category filters
  filters.categories.forEach((cat) => {
    activeFilters.push({
      key: "categories",
      value: cat,
      label: categoryLabels[cat] || cat,
    });
  });

  // Add price range if not default
  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) {
    activeFilters.push({
      key: "priceRange",
      value: "priceRange",
      label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
    });
  }

  // Add color filters
  filters.colors.forEach((color) => {
    activeFilters.push({
      key: "colors",
      value: color,
      label: colorLabels[color] || color,
    });
  });

  // Add material filters
  filters.materials.forEach((material) => {
    activeFilters.push({
      key: "materials",
      value: material,
      label: materialLabels[material] || material,
    });
  });

  // Add availability filters
  filters.availability.forEach((avail) => {
    activeFilters.push({
      key: "availability",
      value: avail,
      label: availabilityLabels[avail] || avail,
    });
  });

  if (activeFilters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-2 mb-6"
    >
      <span className="body-3 text-muted-foreground mr-2">Active Filters:</span>
      <AnimatePresence>
        {activeFilters.map((filter, index) => (
          <motion.button
            key={`${filter.key}-${filter.value}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onRemoveFilter(filter.key, filter.value)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cta/20 text-foreground rounded-full body-3 hover:bg-cta/40 transition-colors"
          >
            {filter.label}
            <X className="w-3 h-3" />
          </motion.button>
        ))}
      </AnimatePresence>
      <button
        onClick={onClearAll}
        className="body-3 text-muted-foreground hover:text-foreground underline ml-2 transition-colors"
      >
        Clear All
      </button>
    </motion.div>
  );
};

export default ActiveFilters;
