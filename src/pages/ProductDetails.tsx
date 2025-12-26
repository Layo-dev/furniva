import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { motion } from "framer-motion";

// Sample product data
const sampleProduct = {
  id: 1,
  name: "Luxury Comfort Armchair",
  category: "Living Room",
  price: 299.99,
  originalPrice: 399.99,
  discount: 25,
  rating: 4.9,
  reviewCount: 245,
  description:
    "Experience ultimate comfort with our premium armchair. Crafted with high-quality materials and designed for both style and relaxation. Perfect for any modern living space.",
  colors: ["#2D5A27", "#8B4513", "#1C1C1C", "#D4A574"],
  sku: "FRN-ARM-001",
  tags: ["Armchair", "Living Room", "Premium"],
  images: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=600&fit=crop",
  ],
  specifications: [
    { label: "Dimensions", value: "32\"W x 34\"D x 36\"H" },
    { label: "Weight", value: "45 lbs" },
    { label: "Material", value: "Premium Fabric, Solid Wood Frame" },
    { label: "Color Options", value: "Green, Brown, Black, Beige" },
    { label: "Assembly", value: "Required (tools included)" },
    { label: "Warranty", value: "5 Years Limited" },
  ],
};

const ProductDetails = () => {
  const { id } = useParams();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: sampleProduct.name },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Product Details" breadcrumbs={breadcrumbs} />

      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductGallery
                images={sampleProduct.images}
                discount={sampleProduct.discount}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ProductInfo product={sampleProduct} />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ProductTabs specifications={sampleProduct.specifications} />
          </motion.div>
        </div>
      </section>

      <RelatedProducts />
      <Footer />
    </div>
  );
};

export default ProductDetails;
