import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { CategoriesSection } from "@/components/sections/CategoriesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { DealsSection } from "@/components/sections/DealsSection";
import { PromoBannersSection } from "@/components/sections/PromoBannersSection";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <BenefitsSection />
        <CategoriesSection />
        <ProductsSection />
        <DealsSection />
        <PromoBannersSection />
        <FlashSaleSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
