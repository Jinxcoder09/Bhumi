import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ChevronLeft, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/products";

const shippingSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  address: z.string().min(5, "Address is required").max(200),
  city: z.string().min(2, "City is required").max(100),
  postal_code: z.string().min(4, "Postal code is required").max(20),
  country: z.string().min(2, "Country is required").max(100),
  phone: z.string().min(10, "Valid phone number required").max(20),
});

type ShippingFormData = z.infer<typeof shippingSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder, isLoading } = useOrders();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
  });

  if (!user) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">
            You need to be signed in to checkout.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/auth">Sign In</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Your Bag is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add items to your bag to proceed with checkout.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const shipping = totalPrice >= 5000 ? 0 : 499;
  const tax = Math.round(totalPrice * 0.18);
  const total = totalPrice + shipping + tax;

  const onSubmit = async (data: ShippingFormData) => {
    const order = await createOrder(items, data, paymentMethod);
    if (order) {
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | BHUMI</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-16">
          <div className="container-luxury">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Continue Shopping
            </Link>

            <h1 className="font-serif text-3xl md:text-4xl mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Checkout Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Shipping Address */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-accent" />
                      <h2 className="font-serif text-xl">Shipping Address</h2>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...register("name")}
                          className="mt-1"
                        />
                        {errors.name && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          {...register("address")}
                          className="mt-1"
                        />
                        {errors.address && (
                          <p className="text-destructive text-sm mt-1">
                            {errors.address.message}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            {...register("city")}
                            className="mt-1"
                          />
                          {errors.city && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="postal_code">Postal Code</Label>
                          <Input
                            id="postal_code"
                            {...register("postal_code")}
                            className="mt-1"
                          />
                          {errors.postal_code && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.postal_code.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            {...register("country")}
                            defaultValue="India"
                            className="mt-1"
                          />
                          {errors.country && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            {...register("phone")}
                            className="mt-1"
                          />
                          {errors.phone && (
                            <p className="text-destructive text-sm mt-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-accent" />
                      <h2 className="font-serif text-xl">Payment Method</h2>
                    </div>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-sm hover:border-foreground transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-sm hover:border-foreground transition-colors">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex-1 cursor-pointer">
                          UPI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border border-border rounded-sm hover:border-foreground transition-colors">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          Cash on Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4" />
                    Your payment information is secure and encrypted
                  </div>

                  <Button
                    type="submit"
                    variant="cart"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : `Place Order • ${formatPrice(total)}`}
                  </Button>
                </form>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:sticky lg:top-32 lg:self-start"
              >
                <div className="bg-secondary/50 p-6 rounded-sm">
                  <h2 className="font-serif text-xl mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="flex gap-4"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-20 h-24 object-cover rounded-sm"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.size} / {item.color}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="font-medium mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? "Free" : formatPrice(shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (18%)</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-serif text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  {totalPrice < 5000 && (
                    <p className="text-sm text-muted-foreground mt-4">
                      Add {formatPrice(5000 - totalPrice)} more for free
                      shipping
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
