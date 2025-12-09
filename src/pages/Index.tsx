import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BrandStory } from "@/components/home/BrandStory";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { InstagramFeed } from "@/components/home/InstagramFeed";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BHUMI - Premium Clothing Store India | Modern Fashion & Apparel</title>
        <meta
          name="description"
          content="Discover BHUMI's curated collection of premium clothing. Shop timeless, elegant apparel crafted with the finest materials. Free shipping on orders over ₹5000."
        />
        <meta
          name="keywords"
          content="premium clothing store India, BHUMI apparel, modern fashion, trendy winter wear, affordable premium clothing, luxury fashion India"
        />
        <link rel="canonical" href="https://bhumiexplore.web.app" />
        <meta property="og:title" content="BHUMI - Premium Clothing Store India" />
        <meta
          property="og:description"
          content="Discover BHUMI's curated collection of premium clothing. Timeless elegance meets modern design."
        />
        <meta property="og:url" content="https://bhumiexplore.web.app" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ClothingStore",
            name: "BHUMI",
            description: "Premium clothing store offering timeless, elegant apparel",
            url: "https://bhumiexplore.web.app",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Mumbai",
              addressCountry: "IN",
            },
            priceRange: "₹₹₹",
          })}
        </script>
      </Helmet>

      <Layout>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts
          title="New Arrivals"
          subtitle="Fresh Picks"
          filter="new"
          limit={4}
        />
        <BrandStory />
        <FeaturedProducts
          title="Best Sellers"
          subtitle="Customer Favorites"
          filter="bestseller"
          limit={4}
        />
        <TestimonialsSection />
        <InstagramFeed />
      </Layout>
    </>
  );
};

export default Index;
