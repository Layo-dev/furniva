import { motion } from "framer-motion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

const PageHeader = ({ title, breadcrumbs }: PageHeaderProps) => {
  return (
    <section className="relative bg-secondary py-12 md:py-16 overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute left-8 top-8 grid grid-cols-3 gap-1.5 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        ))}
      </div>
      <div className="absolute right-8 bottom-8 grid grid-cols-3 gap-1.5 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
        ))}
      </div>

      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <Breadcrumb>
            <BreadcrumbList className="justify-center">
              {breadcrumbs.map((item, index) => (
                <BreadcrumbItem key={index}>
                  {index < breadcrumbs.length - 1 ? (
                    <>
                      <BreadcrumbLink asChild>
                        <Link to={item.href || "/"}>{item.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
