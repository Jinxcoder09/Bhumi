import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  filter?: "new" | "bestseller" | "all";
  limit?: number;
  showViewAll?: boolean;
}

export const FeaturedProducts = ({
  title,
  subtitle,
  filter = "all",
  limit = 4,
  showViewAll = true,
}: FeaturedProductsProps) => {
  const filteredProducts = products
    .filter((p) => {
      if (filter === "new") return p.isNew;
      if (filter === "bestseller") return p.isBestSeller;
      return true;
    })
    .slice(0, limit);

  return (
    <section className="py-24 bg-background">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
        >
          <div>
            {subtitle && (
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                {subtitle}
              </p>
            )}
            <h2 className="font-serif text-3xl md:text-4xl">{title}</h2>
          </div>

          {showViewAll && (
            <Button variant="luxury-outline" asChild>
              <Link to="/shop" className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
