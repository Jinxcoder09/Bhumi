import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const instagramPosts = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop",
];

export const InstagramFeed = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <a
            href="https://instagram.com/bhumi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm tracking-widest uppercase">@bhumi</span>
          </a>
          <h2 className="font-serif text-3xl md:text-4xl mt-4">
            Follow Our Journey
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
        {instagramPosts.map((post, index) => (
          <motion.a
            key={index}
            href="https://instagram.com/bhumi"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative aspect-square overflow-hidden group"
          >
            <img
              src={post}
              alt={`Instagram post ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors flex items-center justify-center">
              <Instagram className="h-8 w-8 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};
