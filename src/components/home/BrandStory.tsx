import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BrandStory = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Story
            </p>
            <h2 className="font-serif text-3xl md:text-5xl mb-6">
              Crafted with Purpose,
              <br />
              <span className="italic">Worn with Pride</span>
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                BHUMI was born from a simple belief: that clothing should be both beautiful and meaningful. We partner with skilled artisans across India to create pieces that honor traditional craftsmanship while embracing modern design.
              </p>
              <p>
                Every garment tells a story—of the hands that made it, the materials we carefully source, and the timeless style it embodies. We believe in slow fashion, quality over quantity, and pieces that become treasured parts of your wardrobe.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="font-serif text-4xl text-accent">100%</p>
                <p className="text-sm text-muted-foreground mt-1">Sustainable Materials</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-accent">50+</p>
                <p className="text-sm text-muted-foreground mt-1">Artisan Partners</p>
              </div>
              <div>
                <p className="font-serif text-4xl text-accent">10K+</p>
                <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="luxury" asChild>
                <Link to="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=533&fit=crop"
                    alt="Artisan crafting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop"
                    alt="Fabric details"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="pt-8 space-y-4">
                <div className="aspect-square bg-muted rounded-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop"
                    alt="Premium materials"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] bg-muted rounded-sm overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=533&fit=crop"
                    alt="Fashion showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-accent rounded-sm -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
