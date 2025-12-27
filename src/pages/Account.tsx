import { useState, useEffect } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Account = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "My Account" },
  ];

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleTabChange = async (tab: string) => {
    if (tab === "logout") {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
      return;
    }
    setActiveTab(tab);
  };

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  // Don't render if not authenticated
  if (!user) {
    return null;
  }

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
