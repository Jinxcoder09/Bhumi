import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";
import { useToast } from "./use-toast";

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  is_verified_purchase: boolean;
  created_at: string;
  user_name?: string;
}

export const useReviews = (productId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);

  const fetchReviews = async () => {
    if (!productId) return;

    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const reviewsWithNames = await Promise.all(
        (data || []).map(async (review) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("user_id", review.user_id)
            .maybeSingle();

          return {
            ...review,
            user_name: profile?.full_name || "Anonymous",
          };
        })
      );

      setReviews(reviewsWithNames);

      if (reviewsWithNames.length > 0) {
        const avg =
          reviewsWithNames.reduce((sum, r) => sum + r.rating, 0) /
          reviewsWithNames.length;
        setAverageRating(Math.round(avg * 10) / 10);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const addReview = async (
    rating: number,
    title: string,
    comment: string,
    images: string[] = []
  ): Promise<boolean> => {
    if (!user || !productId) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to leave a review",
        variant: "destructive",
      });
      return false;
    }

    try {
      const { error } = await supabase.from("reviews").insert({
        product_id: productId,
        user_id: user.id,
        rating,
        title,
        comment,
        images,
      });

      if (error) throw error;

      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      });

      await fetchReviews();
      return true;
    } catch (error: any) {
      console.error("Error adding review:", error);
      toast({
        title: "Failed to submit review",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteReview = async (reviewId: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: "Review deleted",
      });

      await fetchReviews();
      return true;
    } catch (error: any) {
      console.error("Error deleting review:", error);
      toast({
        title: "Failed to delete review",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    reviews,
    averageRating,
    reviewCount: reviews.length,
    isLoading,
    addReview,
    deleteReview,
  };
};
