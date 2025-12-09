import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
const footerLinks = {
  shop: [{
    name: "New Arrivals",
    href: "/shop?filter=new"
  }, {
    name: "Women",
    href: "/shop?category=women"
  }, {
    name: "Men",
    href: "/shop?category=men"
  }, {
    name: "Sale",
    href: "/shop?category=sale"
  }, {
    name: "Lookbook",
    href: "/lookbook"
  }],
  support: [{
    name: "Contact Us",
    href: "/contact"
  }, {
    name: "Size Guide",
    href: "/size-guide"
  }, {
    name: "Shipping & Returns",
    href: "/shipping"
  }, {
    name: "FAQs",
    href: "/faqs"
  }, {
    name: "Track Order",
    href: "/track"
  }],
  company: [{
    name: "About BHUMI",
    href: "/about"
  }, {
    name: "Sustainability",
    href: "/sustainability"
  }, {
    name: "Careers",
    href: "/careers"
  }, {
    name: "Press",
    href: "/press"
  }, {
    name: "Blog",
    href: "/blog"
  }]
};
const socialLinks = [{
  name: "Instagram",
  icon: Instagram,
  href: "https://instagram.com"
}, {
  name: "Facebook",
  icon: Facebook,
  href: "https://facebook.com"
}, {
  name: "Twitter",
  icon: Twitter,
  href: "https://twitter.com"
}, {
  name: "Youtube",
  icon: Youtube,
  href: "https://youtube.com"
}];
export const Footer = () => {
  return <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container-luxury py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-2xl md:text-3xl mb-4">
              Join the BHUMI Community
            </h3>
            <p className="text-primary-foreground/70 mb-8">
              Subscribe to receive exclusive offers, early access to new collections, and style inspiration.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-accent transition-colors" />
              <button type="submit" className="px-8 py-3 bg-accent text-accent-foreground tracking-widest uppercase text-xs font-medium hover:bg-gold-dark transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h2 className="font-serif text-2xl tracking-[0.15em]">BHUMI</h2>
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs">
              Premium clothing crafted with care. Timeless designs for the modern wardrobe.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(social => <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-primary-foreground/10 rounded-md transition-colors" aria-label={social.name}>
                  <social.icon className="h-5 w-5" />
                </a>)}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-primary-foreground/90">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-primary-foreground/90">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm tracking-widest uppercase mb-6 text-primary-foreground/90">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map(link => <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-wrap gap-6 md:gap-12 text-sm text-primary-foreground/70">
            <a className="flex items-center gap-2 hover:text-primary-foreground transition-colors" href="mailto:Bhumiosborn@gmail.com">
              <Mail className="h-4 w-4" />
              Bhumiosborn@gmail.com
            </a>
            <a className="flex items-center gap-2 hover:text-primary-foreground transition-colors" href="tel:+91 8171575922">
              <Phone className="h-4 w-4" />
              +91 8171575922  
            </a>
            <span className="flex items-center gap-2">​   <MapPin className="h-4 w-4" />
              ​Fatehpur Sikri, Agra, India 
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-foreground/60">
            <p>© 2024 BHUMI. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};