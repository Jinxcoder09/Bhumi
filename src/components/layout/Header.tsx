import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "New Arrivals", href: "/shop?filter=new" },
  { name: "Women", href: "/shop?category=women" },
  { name: "Men", href: "/shop?category=men" },
  { name: "Trending", href: "/shop?category=trending" },
  { name: "Sale", href: "/shop?category=sale" },
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { user } = useAuth();
  const { wishlist } = useWishlist();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isHome
            ? "bg-transparent hover:bg-background/95 hover:backdrop-blur-md"
            : "bg-background/95 backdrop-blur-md border-b border-border"
        )}
      >
        <div className="container-luxury">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 hover:bg-secondary rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0"
            >
              <h1 className="font-serif text-2xl md:text-3xl tracking-[0.15em] font-medium">
                BHUMI
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm tracking-wide uppercase link-underline text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              <button
                className="hidden sm:flex p-2 hover:bg-secondary rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link
                to="/account"
                className="hidden sm:flex p-2 hover:bg-secondary rounded-md transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-destructive text-destructive-foreground text-xs rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to={user ? "/account" : "/auth"}
                className="hidden sm:flex p-2 hover:bg-secondary rounded-md transition-colors"
                aria-label="Account"
              >
                <User className={cn("h-5 w-5", user && "text-accent")} />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-secondary rounded-md transition-colors"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-accent text-accent-foreground text-xs rounded-full"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[320px] bg-background z-50 lg:hidden shadow-elevated"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-serif text-xl tracking-[0.15em]">BHUMI</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="p-6">
                <ul className="space-y-4">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-3 text-lg tracking-wide uppercase border-b border-border/50 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 space-y-4">
                  <Link
                    to={user ? "/account" : "/auth"}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>{user ? "Account" : "Sign In"}</span>
                  </Link>
                  <Link
                    to="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
