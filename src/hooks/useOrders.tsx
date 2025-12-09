import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";
import { CartItem } from "@/context/CartContext";

export interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shipping_address: any;
  payment_method: string;
  payment_status: string;
  created_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export const useOrders = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (
    items: CartItem[],
    shippingAddress: any,
    paymentMethod: string
  ): Promise<Order | null> => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to place an order",
        variant: "destructive",
      });
      return null;
    }

    setIsLoading(true);

    try {
      const subtotal = items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const shipping = subtotal >= 5000 ? 0 : 499;
      const tax = Math.round(subtotal * 0.18);
      const total = subtotal + shipping + tax;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          subtotal,
          shipping,
          tax,
          total,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          status: "confirmed",
          payment_status: "paid",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.product.name,
        product_image: item.product.image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Order placed successfully!",
        description: `Your order ${order.order_number} has been confirmed.`,
      });

      return order as unknown as Order;
    } catch (error: any) {
      console.error("Error creating order:", error);
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrders = async (): Promise<Order[]> => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`*, order_items (*)`)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as unknown as Order[]) || [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select(`*, order_items (*)`)
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return data as unknown as Order;
    } catch (error) {
      console.error("Error fetching order:", error);
      return null;
    }
  };

  return { createOrder, getOrders, getOrderById, isLoading };
};
