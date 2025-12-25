import { motion } from "framer-motion";
import { TreeDeciduous, Armchair } from "lucide-react";

const features = [
  {
    icon: TreeDeciduous,
    title: "Best Quality Wood",
    description:
      "We source only the finest sustainable hardwoods, ensuring each piece is built to last for generations while respecting our environment.",
  },
  {
    icon: Armchair,
    title: "Comfort Driven Design",
    description:
      "Every curve and cushion is designed with your comfort in mind, combining ergonomic excellence with aesthetic beauty.",
  },
];

const ProductQualitySection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=500&fit=crop"
              alt="Quality furniture craftsmanship"
              className="rounded-2xl w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-2xl -z-10"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-muted-foreground uppercase tracking-wider text-sm mb-4 block">
              Our Product Quality
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
              Setting the Standard for Quality Furniture
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-xl bg-secondary"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-cta rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-cta-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductQualitySection;
