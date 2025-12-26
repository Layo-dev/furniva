import { useState } from "react";
import { cn } from "@/lib/utils";
import DescriptionTab from "./DescriptionTab";
import AdditionalInfoTab from "./AdditionalInfoTab";
import ReviewTab from "./ReviewTab";

interface Specification {
  label: string;
  value: string;
}

interface ProductTabsProps {
  specifications: Specification[];
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "additional", label: "Additional Information" },
  { id: "review", label: "Review" },
];

const ProductTabs = ({ specifications }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="space-y-6">
      {/* Tab Headers */}
      <div className="flex gap-8 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-4 text-base font-medium transition-all relative",
              activeTab === tab.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === "description" && <DescriptionTab />}
        {activeTab === "additional" && (
          <AdditionalInfoTab specifications={specifications} />
        )}
        {activeTab === "review" && <ReviewTab />}
      </div>
    </div>
  );
};

export default ProductTabs;
