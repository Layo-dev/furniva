import { motion } from "framer-motion";

const DescriptionTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <p className="text-muted-foreground leading-relaxed">
        Experience the perfect blend of comfort and style with our Luxury Comfort Armchair. 
        Crafted with premium materials and designed with meticulous attention to detail, this 
        armchair is the epitome of modern elegance. Whether you're unwinding after a long day 
        or hosting guests, this piece will elevate your living space.
      </p>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Key Features:</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>Premium quality solid wood frame for durability and longevity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>High-density foam cushioning for maximum comfort</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>Soft, breathable fabric upholstery in multiple color options</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>Ergonomic design with optimal lumbar support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
            <span>Easy assembly with included tools and instructions</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Care Instructions:</h3>
        <p className="text-muted-foreground">
          Vacuum regularly using a soft brush attachment. Spot clean with a damp cloth and mild 
          soap. Avoid direct sunlight to prevent fading. Professional cleaning recommended for 
          stubborn stains.
        </p>
      </div>
    </motion.div>
  );
};

export default DescriptionTab;
