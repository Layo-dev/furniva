import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogPagination from "@/components/blog/BlogPagination";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Blog" },
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader title="Our Blog" breadcrumbs={breadcrumbs} />

      <section className="py-16">
        <div className="container-custom">
          <BlogGrid />
          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
