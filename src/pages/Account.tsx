import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import AccountSidebar from "@/components/account/AccountSidebar";
import PersonalInfoForm from "@/components/account/PersonalInfoForm";
import AccountOrders from "@/components/account/AccountOrders";
import AccountAddresses from "@/components/account/AccountAddresses";
import AccountPayment from "@/components/account/AccountPayment";
import AccountPassword from "@/components/account/AccountPassword";
import { toast } from "sonner";

const Account = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "My Account" },
  ];

  const handleTabChange = (tab: string) => {
    if (tab === "logout") {
      toast.success("Logged out successfully");
      navigate("/");
      return;
    }
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoForm />;
      case "orders":
        return <AccountOrders />;
      case "addresses":
        return <AccountAddresses />;
      case "payment":
        return <AccountPayment />;
      case "password":
        return <AccountPassword />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="My Account" breadcrumbs={breadcrumbs} />
      
      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <AccountSidebar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="lg:col-span-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Account;
