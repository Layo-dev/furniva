import { motion } from "framer-motion";
import { Armchair, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const roomCategories = [
  { name: "Living Room", items: "500+ Items", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" },
  { name: "Bed Room", items: "350+ Items", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop" },
  { name: "Dining Room", items: "280+ Items", image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=300&h=200&fit=crop" },
  { name: "Office", items: "420+ Items", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop" },
  { name: "Outdoor", items: "180+ Items", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop" },
];

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background py-12 md:py-20">
      {/* Decorative dots */}
      <div className="absolute top-20 right-10 grid grid-cols-5 gap-2 opacity-20">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-accent rounded-full" />
        ))}
      </div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full w-fit mb-6"
            >
              <Armchair className="h-4 w-4 text-accent" />
              <span className="body-3 text-foreground">The Best Online Furniture Store</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-foreground mb-6"
            >
              Explore Our Modern{" "}
              <span className="text-accent">Furniture</span> Collection
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="body-1 text-muted-foreground mb-8 max-w-lg"
            >
              Discover premium furniture designed to transform your living spaces.
              From contemporary sofas to elegant dining sets, find pieces that blend
              style with comfort.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-6 body-2-bold">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="px-8 py-6 body-2-bold border-foreground text-foreground hover:bg-foreground hover:text-background">
                View All Products
              </Button>
            </motion.div>
          </div>

          {/* Right - Room Categories */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {roomCategories.map((room, index) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                    index === 0 ? "col-span-2 md:col-span-1 row-span-2" : ""
                  }`}
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover min-h-[140px] group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-background">
                    <p className="body-2-bold">{room.name}</p>
                    <p className="body-3 opacity-80">{room.items}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
