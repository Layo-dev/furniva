import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import OurStorySection from "@/components/about/OurStorySection";
import StatsSection from "@/components/about/StatsSection";
import ProductQualitySection from "@/components/about/ProductQualitySection";
import TeamSection from "@/components/about/TeamSection";

const About = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About Us" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="About Us" breadcrumbs={breadcrumbs} />
      <OurStorySection />
      <StatsSection />
      <ProductQualitySection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default About;
