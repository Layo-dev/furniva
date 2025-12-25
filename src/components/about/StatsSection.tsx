import { motion } from "framer-motion";

const stats = [
  { value: "25+", label: "Years Experience" },
  { value: "180+", label: "Stores Worldwide" },
  { value: "100K+", label: "Happy Customers" },
  { value: "35+", label: "Awards Won" },
  { value: "99%", label: "Satisfied Clients" },
];

const StatsSection = () => {
  return (
    <section className="py-12 bg-cta">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
