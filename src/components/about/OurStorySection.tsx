import { motion } from "framer-motion";

const OurStorySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground uppercase tracking-wider text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Crafted Comfort: Quality Materials, Enduring Designs
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              At Furniva, we believe that furniture should be more than just functional—it 
              should be a reflection of your lifestyle and personality. For over two decades, 
              we've been crafting pieces that combine timeless design with exceptional 
              craftsmanship. Every piece tells a story of dedication, from the careful 
              selection of sustainable materials to the skilled hands that bring each 
              design to life.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-16 h-0.5 bg-cta"></div>
              <div>
                <p className="font-semibold text-lg">Jerry Alexander</p>
                <p className="text-muted-foreground text-sm">Founder & CEO</p>
              </div>
            </div>
          </motion.div>

          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=300&fit=crop"
                  alt="Craftsman working on furniture"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop"
                  alt="Finished sofa piece"
                  className="rounded-2xl w-full h-56 object-cover"
                />
              </div>
              <div className="pt-8">
                <img
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=500&fit=crop"
                  alt="Furniture workshop"
                  className="rounded-2xl w-full h-80 object-cover"
                />
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-cta/20 rounded-2xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
