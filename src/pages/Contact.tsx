import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCard from "@/components/contact/ContactInfoCard";
import MapSection from "@/components/contact/MapSection";

const Contact = () => {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Contact Us" breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoCard />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <Footer />
    </div>
  );
};

export default Contact;
