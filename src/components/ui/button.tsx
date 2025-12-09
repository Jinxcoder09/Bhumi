import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md active:scale-[0.98]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md active:scale-[0.98]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md active:scale-[0.98]",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground rounded-md active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium BHUMI variants
        luxury: "bg-primary text-primary-foreground tracking-widest uppercase text-xs hover:bg-charcoal-light rounded-sm shadow-soft hover:shadow-medium active:scale-[0.98]",
        "luxury-outline": "border-2 border-primary bg-transparent text-primary tracking-widest uppercase text-xs hover:bg-primary hover:text-primary-foreground rounded-sm active:scale-[0.98]",
        gold: "bg-accent text-accent-foreground tracking-widest uppercase text-xs hover:bg-gold-dark rounded-sm shadow-soft hover:shadow-medium active:scale-[0.98]",
        "gold-outline": "border-2 border-accent bg-transparent text-accent tracking-widest uppercase text-xs hover:bg-accent hover:text-accent-foreground rounded-sm active:scale-[0.98]",
        hero: "bg-primary text-primary-foreground tracking-[0.2em] uppercase text-xs px-10 py-4 hover:bg-charcoal-light rounded-sm shadow-medium hover:shadow-elevated active:scale-[0.98]",
        "hero-secondary": "bg-transparent border-2 border-primary-foreground text-primary-foreground tracking-[0.2em] uppercase text-xs px-10 py-4 hover:bg-primary-foreground/10 rounded-sm active:scale-[0.98]",
        cart: "bg-accent text-accent-foreground tracking-widest uppercase text-xs w-full hover:bg-gold-dark rounded-sm shadow-soft hover:shadow-medium active:scale-[0.98]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
