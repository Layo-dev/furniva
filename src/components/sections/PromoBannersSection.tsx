import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PromoBannersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gaming Chairs Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-secondary rounded-3xl p-8 md:p-10 overflow-hidden min-h-[300px] flex flex-col justify-center"
          >
            <div className="relative z-10 max-w-[60%]">
              <p className="body-3 text-accent mb-2">Premium Collection</p>
              <h3 className="text-foreground mb-4">Gaming Chairs</h3>
              <p className="body-2 text-muted-foreground mb-6">
                Experience ultimate comfort during long gaming sessions
              </p>
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <motion.img
              src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop"
              alt="Gaming Chair"
              className="absolute right-0 bottom-0 w-1/2 h-full object-contain"
              whileHover={{ scale: 1.05, rotate: -5 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Wood Chair Banner */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-cta/20 rounded-3xl p-8 md:p-10 overflow-hidden min-h-[300px] flex flex-col justify-center"
          >
            <div className="relative z-10 max-w-[60%]">
              <p className="body-3 text-accent mb-2">Artisan Collection</p>
              <h3 className="text-foreground mb-4">Wood Chair Collection</h3>
              <p className="body-2 text-muted-foreground mb-6">
                Handcrafted wooden chairs with timeless elegance
              </p>
              <Button className="bg-foreground hover:bg-foreground/90 text-background">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <motion.img
              src="https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop"
              alt="Wood Chair"
              className="absolute right-0 bottom-0 w-1/2 h-full object-contain"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
