import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import categoryWomen from "@/assets/category-women.jpg";
import categoryMen from "@/assets/category-men.jpg";

const categories = [
  {
    name: "Women",
    description: "Elegant essentials for the modern woman",
    image: categoryWomen,
    href: "/shop?category=women",
  },
  {
    name: "Men",
    description: "Refined classics for the contemporary gentleman",
    image: categoryMen,
    href: "/shop?category=men",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Collections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl">Shop by Category</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={category.href}
                className="group block relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-3xl md:text-4xl text-primary-foreground mb-2">
                        {category.name}
                      </h3>
                      <p className="text-primary-foreground/70 text-sm">
                        {category.description}
                      </p>
                    </div>
                    <div className="p-3 bg-primary-foreground text-foreground rounded-full transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
