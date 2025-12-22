import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const calculateTimeLeft = () => {
  const saleEnd = new Date();
  saleEnd.setDate(saleEnd.getDate() + 3);
  saleEnd.setHours(23, 59, 59);
  
  const difference = saleEnd.getTime() - new Date().getTime();
  
  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

export const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 md:py-24 bg-accent text-accent-foreground relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-10 left-10 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-accent-foreground rounded-full" />
        ))}
      </div>
      <div className="absolute bottom-10 right-10 grid grid-cols-4 gap-2 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-accent-foreground rounded-full" />
        ))}
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="body-1 text-accent-foreground/80 mb-4">Limited Time Offer</p>
            <h2 className="text-accent-foreground mb-6">
              Get 25% Off on All Products!
            </h2>
            <p className="body-1 text-accent-foreground/80 mb-8 max-w-md">
              Don't miss this exclusive flash sale. Transform your living space with
              our premium furniture collection at unbeatable prices.
            </p>

            {/* Countdown */}
            <div className="flex gap-4 mb-8">
              {timeBlocks.map((block, index) => (
                <motion.div
                  key={block.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-accent-foreground/10 rounded-xl p-4 text-center min-w-[80px]"
                >
                  <span className="text-[32px] md:text-[40px] font-bold block">
                    {block.value.toString().padStart(2, "0")}
                  </span>
                  <span className="body-3 text-accent-foreground/70">{block.label}</span>
                </motion.div>
              ))}
            </div>

            <Button className="bg-cta hover:bg-cta/90 text-cta-foreground px-8 py-6 body-2-bold">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Right Images */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <motion.div
              className="rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop"
                alt="Living Room"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="rounded-2xl overflow-hidden mt-8"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop"
                alt="Modern Sofa"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
