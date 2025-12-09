import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrders, Order } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/products";

const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      }
      setIsLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (isLoading) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <div className="animate-pulse">Loading order details...</div>
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="pt-32 pb-16 text-center">
          <h1 className="font-serif text-3xl mb-4">Order Not Found</h1>
          <Button variant="luxury" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const statusSteps = [
    { icon: CheckCircle, label: "Confirmed", active: true },
    { icon: Package, label: "Processing", active: order.status !== "pending" },
    { icon: Truck, label: "Shipped", active: order.status === "shipped" || order.status === "delivered" },
    { icon: MapPin, label: "Delivered", active: order.status === "delivered" },
  ];

  return (
    <>
      <Helmet>
        <title>Order Confirmed | BHUMI</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Layout>
        <div className="pt-24 pb-16">
          <div className="container-luxury max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h1 className="font-serif text-3xl md:text-4xl mb-4">
                Thank You for Your Order!
              </h1>
              <p className="text-muted-foreground">
                Your order has been confirmed and will be shipped soon.
              </p>
              <p className="font-medium mt-2">
                Order Number: <span className="text-accent">{order.order_number}</span>
              </p>
            </motion.div>

            {/* Order Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/50 p-6 rounded-sm mb-8"
            >
              <h2 className="font-serif text-xl mb-6">Order Status</h2>
              <div className="flex justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step.label} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        step.active
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs text-center ${
                        step.active ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {step.label}
                    </span>
                    {index < statusSteps.length - 1 && (
                      <div className="hidden md:block absolute h-px bg-border w-full top-5 left-1/2" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card p-6 rounded-sm border border-border"
            >
              <h2 className="font-serif text-xl mb-6">Order Details</h2>

              {/* Items */}
              <div className="space-y-4 mb-6">
                {order.order_items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >
                    {item.product_image && (
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-16 h-20 object-cover rounded-sm"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.product_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {order.shipping === 0 ? "Free" : formatPrice(order.shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(order.tax)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-serif text-lg">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>

              {/* Shipping Address */}
              {order.shipping_address && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-sm text-muted-foreground">
                      {order.shipping_address.name}<br />
                      {order.shipping_address.address}<br />
                      {order.shipping_address.city}, {order.shipping_address.postal_code}<br />
                      {order.shipping_address.country}<br />
                      {order.shipping_address.phone}
                    </p>
                  </div>
                </>
              )}
            </motion.div>

            <div className="flex gap-4 justify-center mt-8">
              <Button variant="luxury" asChild>
                <Link to="/account">View All Orders</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default OrderConfirmation;
