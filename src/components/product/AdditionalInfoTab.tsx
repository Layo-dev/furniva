import { motion } from "framer-motion";

interface Specification {
  label: string;
  value: string;
}

interface AdditionalInfoTabProps {
  specifications: Specification[];
}

const AdditionalInfoTab = ({ specifications }: AdditionalInfoTabProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {specifications.map((spec, index) => (
              <tr
                key={spec.label}
                className={index % 2 === 0 ? "bg-secondary/50" : "bg-background"}
              >
                <td className="px-6 py-4 font-medium text-foreground w-1/3">
                  {spec.label}
                </td>
                <td className="px-6 py-4 text-muted-foreground">{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default AdditionalInfoTab;
