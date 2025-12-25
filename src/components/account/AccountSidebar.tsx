import { motion } from "framer-motion";
import { User, Package, MapPin, CreditCard, Lock, LogOut } from "lucide-react";

const menuItems = [
  { id: "personal", label: "Personal Information", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Manage Address", icon: MapPin },
  { id: "payment", label: "Payment Method", icon: CreditCard },
  { id: "password", label: "Password Manager", icon: Lock },
  { id: "logout", label: "Logout", icon: LogOut },
];

interface AccountSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AccountSidebar = ({ activeTab, onTabChange }: AccountSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-secondary rounded-2xl p-4"
    >
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
              activeTab === item.id
                ? "bg-cta text-cta-foreground"
                : "hover:bg-background text-foreground"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default AccountSidebar;
