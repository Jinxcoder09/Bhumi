import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: "men" | "women" | "trending" | "sale";
  subcategory: string;
  description: string;
  material: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Cashmere Wool Sweater",
    price: 12999,
    image: product1,
    images: [product1, product1, product1],
    category: "women",
    subcategory: "Knitwear",
    description: "Luxuriously soft cashmere blend sweater with a relaxed fit. Perfect for layering or wearing on its own during cooler months. Features ribbed cuffs and hem for a refined finish.",
    material: "70% Cashmere, 30% Merino Wool",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#F5F5DC" },
      { name: "Camel", hex: "#C19A6B" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    isNew: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Tailored Wool Blazer",
    price: 24999,
    image: product2,
    images: [product2, product2, product2],
    category: "men",
    subcategory: "Outerwear",
    description: "Impeccably tailored blazer crafted from premium Italian wool. Features a modern slim fit with notched lapels, two-button closure, and functional button cuffs.",
    material: "100% Italian Wool",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    isBestSeller: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "Camel Wool Trench Coat",
    price: 34999,
    originalPrice: 44999,
    image: product3,
    images: [product3, product3, product3],
    category: "sale",
    subcategory: "Outerwear",
    description: "Timeless trench coat in rich camel wool. Double-breasted design with storm flaps, belted waist, and gun flap details. Fully lined for comfort.",
    material: "80% Wool, 20% Cashmere",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Camel", hex: "#C19A6B" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "Linen Shirt Dress",
    price: 15999,
    image: product4,
    images: [product4, product4, product4],
    category: "women",
    subcategory: "Dresses",
    description: "Effortlessly elegant shirt dress in premium linen. Features a relaxed silhouette with side pockets, adjustable waist tie, and mother-of-pearl buttons.",
    material: "100% Belgian Linen",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sand", hex: "#C2B280" },
      { name: "Sage", hex: "#9CAF88" },
    ],
    isNew: true,
    rating: 4.6,
    reviews: 78,
  },
  {
    id: "5",
    name: "Merino Crewneck Sweater",
    price: 8999,
    image: product5,
    images: [product5, product5, product5],
    category: "men",
    subcategory: "Knitwear",
    description: "Classic crewneck sweater in ultra-fine merino wool. Lightweight yet warm, perfect for year-round wear. Features a regular fit with ribbed trim.",
    material: "100% Extra Fine Merino Wool",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1e3a5f" },
      { name: "Burgundy", hex: "#722F37" },
      { name: "Forest", hex: "#228B22" },
    ],
    isBestSeller: true,
    rating: 4.8,
    reviews: 203,
  },
  {
    id: "6",
    name: "Tailored Wool Jumpsuit",
    price: 19999,
    originalPrice: 27999,
    image: product6,
    images: [product6, product6, product6],
    category: "trending",
    subcategory: "Jumpsuits",
    description: "Sophisticated jumpsuit crafted from lightweight wool blend. Features a wrap-front design, cinched waist with belt, and tapered legs for a flattering silhouette.",
    material: "65% Wool, 35% Polyester",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Olive", hex: "#808000" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    rating: 4.5,
    reviews: 67,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((p) => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((p) => p.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter((p) => p.isBestSeller);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};
