import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { products, Product } from "@/lib/products";
import { Button } from "@/components/ui/button";

const categories = [
  { value: "all", label: "All Products" },
  { value: "women", label: "Women" },
  { value: "men", label: "Men" },
  { value: "trending", label: "Trending" },
  { value: "sale", label: "Sale" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const category = searchParams.get("category") || "all";
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort") || "newest";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // Filter by special filters
    if (filter === "new") {
      result = result.filter((p) => p.isNew);
    }

    // Sort
    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // newest - keep original order
        break;
    }

    return result;
  }, [category, filter, sort]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === "all" || value === "") {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const pageTitle = category === "all" 
    ? "All Products" 
    : `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection`;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | BHUMI - Premium Clothing Store</title>
        <meta
          name="description"
          content={`Shop BHUMI's ${category === "all" ? "complete collection of premium clothing" : category + "'s premium clothing collection"}. Free shipping on orders over ₹5000.`}
        />
        <link rel="canonical" href={`https://bhumiexplore.web.app/shop${category !== "all" ? `?category=${category}` : ""}`} />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-16">
          <div className="container-luxury">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-serif text-4xl md:text-5xl mb-4">{pageTitle}</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products
              </p>
            </motion.div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => updateFilter("category", cat.value)}
                    className={`px-4 py-2 text-sm tracking-wide transition-all ${
                      category === cat.value
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                    className="appearance-none bg-transparent border border-border px-4 py-2 pr-10 text-sm cursor-pointer hover:border-foreground transition-colors"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Active Filters */}
            {(filter || category !== "all") && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {category !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm">
                    {category}
                    <button onClick={() => updateFilter("category", "all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm">
                    {filter}
                    <button onClick={() => updateFilter("filter", "")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-muted-foreground hover:text-foreground underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found matching your criteria.
                </p>
                <Button variant="luxury-outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
