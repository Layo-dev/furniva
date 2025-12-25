import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jerry Alexander",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    role: "Production Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-muted-foreground uppercase tracking-wider text-sm mb-4 block">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-2xl p-6 text-center group hover:shadow-lg transition-shadow"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-cta group-hover:border-accent transition-colors"
                />
              </div>
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
