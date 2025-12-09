import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, Star, Truck, RotateCcw, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { getProductById, products, formatPrice } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const { addItem, setIsCartOpen } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }

    addItem(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Added to bag",
      description: `${product.name} has been added to your shopping bag.`,
    });
    setIsCartOpen(true);
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{product.name} | BHUMI - Premium Clothing</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://bhumiexplore.web.app/product/${product.id}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: product.image,
            brand: {
              "@type": "Brand",
              name: "BHUMI",
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          })}
        </script>
      </Helmet>

      <Layout>
        <div className="pt-24 pb-16">
          <div className="container-luxury">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-foreground transition-colors">
                Shop
              </Link>
              <span>/</span>
              <Link
                to={`/shop?category=${product.category}`}
                className="hover:text-foreground transition-colors capitalize"
              >
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <div className="relative aspect-[3/4] bg-secondary rounded-sm overflow-hidden">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Navigation arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === 0 ? product.images.length - 1 : prev - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          setSelectedImage((prev) =>
                            prev === product.images.length - 1 ? 0 : prev + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-foreground text-background text-xs tracking-widest uppercase">
                        New
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="px-3 py-1 bg-destructive text-destructive-foreground text-xs tracking-widest uppercase">
                        Sale
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "w-20 h-24 rounded-sm overflow-hidden border-2 transition-colors",
                        selectedImage === index
                          ? "border-foreground"
                          : "border-transparent hover:border-muted-foreground"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">
                  {product.subcategory}
                </p>

                <h1 className="font-serif text-3xl md:text-4xl mb-4">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-serif text-2xl">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground mb-8">{product.description}</p>

                {/* Color Selection */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-3">
                    Color: <span className="text-muted-foreground">{selectedColor || "Select a color"}</span>
                  </p>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          selectedColor === color.name
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">
                      Size: <span className="text-muted-foreground">{selectedSize || "Select a size"}</span>
                    </p>
                    <button className="text-sm text-muted-foreground underline hover:text-foreground transition-colors">
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] px-4 py-2 border text-sm transition-all",
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-sm font-medium mb-3">Quantity</p>
                  <div className="inline-flex items-center border border-border">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 min-w-[60px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mb-8">
                  <Button variant="cart" size="lg" className="flex-1" onClick={handleAddToCart}>
                    Add to Bag
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      className={cn(
                        "h-5 w-5",
                        isWishlisted && "fill-destructive text-destructive"
                      )}
                    />
                  </Button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-border">
                  <div className="text-center">
                    <Truck className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Free Shipping</p>
                    <p className="text-xs">Over ₹5000</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Easy Returns</p>
                    <p className="text-xs">30 Days</p>
                  </div>
                  <div className="text-center">
                    <Shield className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">Secure</p>
                    <p className="text-xs">Payment</p>
                  </div>
                </div>

                {/* Material */}
                <div className="py-6 border-t border-border">
                  <p className="text-sm">
                    <span className="font-medium">Material: </span>
                    <span className="text-muted-foreground">{product.material}</span>
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-24">
                <h2 className="font-serif text-2xl md:text-3xl mb-8">You May Also Like</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {relatedProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
