import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden image-zoom-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image w-full h-full object-cover"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-3 py-1 bg-foreground text-background text-xs tracking-widest uppercase">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs tracking-widest uppercase">
                Best Seller
              </span>
            )}
            {product.originalPrice && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs tracking-widest uppercase">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full transition-all duration-300",
              isHovered || isWishlisted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            )}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isWishlisted ? "fill-destructive text-destructive" : "text-foreground"
              )}
            />
          </button>

          {/* Quick Add Button */}
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-3 left-3 right-3"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                // Quick add logic - opens product page for size selection
              }}
              className="w-full py-3 bg-background/95 backdrop-blur-sm text-foreground text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-background transition-colors"
            >
              <ShoppingBag className="h-4 w-4" />
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <p className="text-xs text-muted-foreground tracking-wide uppercase">
            {product.subcategory}
          </p>
          <h3 className="font-serif text-lg group-hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-3">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Colors */}
          <div className="flex gap-2 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
