import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
const ShopPageHeader = () => {
  return <section className="bg-secondary py-12 md:py-16 relative overflow-hidden">
      {/* Decorative dots pattern */}
      <div className="absolute top-4 right-8 grid grid-cols-4 gap-2 opacity-20">
        {Array.from({
        length: 16
      }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
      </div>
      <div className="absolute bottom-4 left-8 grid grid-cols-4 gap-2 opacity-20">
        {Array.from({
        length: 16
      }).map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
      </div>

      <div className="container-custom">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center">
          <h1 className="text-foreground mb-4 font-semibold text-5xl">Shop</h1>
          <nav className="flex items-center justify-center gap-2 body-2 text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Shop</span>
          </nav>
        </motion.div>
      </div>
    </section>;
};
export default ShopPageHeader;