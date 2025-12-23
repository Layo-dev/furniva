import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import ShopPageHeader from "@/components/shop/ShopPageHeader";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ActiveFilters from "@/components/shop/ActiveFilters";
import ProductGrid from "@/components/shop/ProductGrid";

// Sample product data
const allProducts = [
  {
    id: 1,
    name: "Modern Comfort Sofa",
    category: "Sofa",
    price: 899,
    originalPrice: 1199,
    discount: 25,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    inStock: true,
    color: "gray",
    material: "upholstered",
  },
  {
    id: 2,
    name: "Scandinavian Armchair",
    category: "Chair",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    inStock: true,
    color: "beige",
    material: "wood",
  },
  {
    id: 3,
    name: "Minimalist Coffee Table",
    category: "Table",
    price: 299,
    originalPrice: 299,
    discount: 0,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=400&fit=crop",
    inStock: true,
    color: "brown",
    material: "wood",
  },
  {
    id: 4,
    name: "Luxury King Size Bed",
    category: "Bed",
    price: 1299,
    originalPrice: 1599,
    discount: 19,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    inStock: true,
    color: "white",
    material: "upholstered",
  },
  {
    id: 5,
    name: "Velvet Lounge Chair",
    category: "Chair",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
    inStock: false,
    color: "green",
    material: "upholstered",
  },
  {
    id: 6,
    name: "Industrial Dining Table",
    category: "Table",
    price: 799,
    originalPrice: 999,
    discount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?w=400&h=400&fit=crop",
    inStock: true,
    color: "black",
    material: "metal",
  },
  {
    id: 7,
    name: "L-Shaped Sectional",
    category: "Sofa",
    price: 1499,
    originalPrice: 1899,
    discount: 21,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
    inStock: true,
    color: "gray",
    material: "upholstered",
  },
  {
    id: 8,
    name: "Platform Bed Frame",
    category: "Bed",
    price: 699,
    originalPrice: 899,
    discount: 22,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=400&h=400&fit=crop",
    inStock: true,
    color: "brown",
    material: "wood",
  },
  {
    id: 9,
    name: "Ergonomic Office Chair",
    category: "Chair",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
    inStock: true,
    color: "black",
    material: "metal",
  },
  {
    id: 10,
    name: "Glass Console Table",
    category: "Table",
    price: 449,
    originalPrice: 549,
    discount: 18,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop",
    inStock: true,
    color: "white",
    material: "glass",
  },
  {
    id: 11,
    name: "Chesterfield Sofa",
    category: "Sofa",
    price: 1199,
    originalPrice: 1499,
    discount: 20,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400&h=400&fit=crop",
    inStock: true,
    color: "brown",
    material: "upholstered",
  },
  {
    id: 12,
    name: "Modern Nightstand",
    category: "Bed",
    price: 179,
    originalPrice: 229,
    discount: 22,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=400&h=400&fit=crop",
    inStock: false,
    color: "white",
    material: "wood",
  },
];

const ITEMS_PER_PAGE = 9;

const Shop = () => {
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 2000] as [number, number],
    colors: [] as string[],
    materials: [] as string[],
    availability: [] as string[],
  });
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleRemoveFilter = (key: string, value: string) => {
    if (key === "priceRange") {
      setFilters((prev) => ({ ...prev, priceRange: [0, 2000] }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [key]: (prev[key as keyof typeof prev] as string[]).filter((v) => v !== value),
      }));
    }
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters({
      categories: [],
      priceRange: [0, 2000],
      colors: [],
      materials: [],
      availability: [],
    });
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.includes(p.category.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }

    // Material filter
    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }

    // Availability filter
    if (filters.availability.length > 0) {
      result = result.filter((p) => {
        if (filters.availability.includes("in-stock") && p.inStock) return true;
        if (filters.availability.includes("out-of-stock") && !p.inStock) return true;
        return false;
      });
    }

    // Sort
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ShopPageHeader />

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <ActiveFilters
            filters={filters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAll}
          />

          <div className="flex gap-8">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            <ProductGrid
              products={paginatedProducts}
              totalCount={filteredProducts.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onOpenFilters={() => setIsFilterOpen(true)}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
