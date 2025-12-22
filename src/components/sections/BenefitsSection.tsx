import { motion } from "framer-motion";
import { Truck, CreditCard, Headphones } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $100. Fast and reliable delivery.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options including credit cards and installments.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    description: "Our support team is available around the clock to assist you.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-accent rounded-full flex items-center justify-center">
                <benefit.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h4 className="text-foreground mb-2">{benefit.title}</h4>
                <p className="body-3 text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
