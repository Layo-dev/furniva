import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Chairs",
    items: "1500+ Items",
    subcategories: ["Office Chairs", "Dining Chairs", "Lounge Chairs"],
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&h=600&fit=crop",
    bgColor: "bg-secondary",
  },
  {
    name: "Sofa",
    items: "750+ Items",
    subcategories: ["Sectional Sofas", "Loveseats", "Sleeper Sofas"],
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=600&fit=crop",
    bgColor: "bg-accent/10",
  },
  {
    name: "Lighting",
    items: "450+ Items",
    subcategories: ["Floor Lamps", "Table Lamps", "Pendant Lights"],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=600&fit=crop",
    bgColor: "bg-cta/10",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`${category.bgColor} rounded-3xl p-6 md:p-8 cursor-pointer group overflow-hidden relative`}
            >
              {/* Content */}
              <div className="relative z-10">
                <p className="body-3 text-muted-foreground mb-2">{category.items}</p>
                <h3 className="text-foreground mb-4">{category.name}</h3>
                
                <ul className="space-y-2 mb-6">
                  {category.subcategories.map((sub) => (
                    <li key={sub} className="body-2 text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                      {sub}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 body-2-bold text-accent group-hover:gap-4 transition-all">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Image */}
              <motion.div
                className="absolute bottom-0 right-0 w-2/3 h-2/3"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
