import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12"
    >
      <div className="container-custom">
        <div className="rounded-2xl overflow-hidden h-[400px] bg-secondary">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404345275!2d-118.69192993092697!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1703123456789!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Furniva Location"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default MapSection;
