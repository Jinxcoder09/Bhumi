import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Star, Check, X, Trash2 } from "lucide-react";
import { AdminLayout } from "./AdminLayout";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  is_approved: boolean;
  is_verified_purchase: boolean;
  created_at: string;
}

const Reviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteReviewId, setDeleteReviewId] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleApproval = async (reviewId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: !currentStatus })
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: currentStatus ? "Review hidden" : "Review approved",
      });
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error updating review",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!deleteReviewId) return;

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", deleteReviewId);

      if (error) throw error;

      toast({ title: "Review deleted" });
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error deleting review",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setDeleteReviewId(null);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Reviews">
        <div className="animate-pulse">Loading reviews...</div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reviews Management | BHUMI Admin</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <AdminLayout title="Reviews">
        <div className="bg-card rounded-sm border border-border overflow-hidden">
          {reviews.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No reviews yet
            </div>
          ) : (
            <div className="divide-y divide-border">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating
                                  ? "fill-accent text-accent"
                                  : "text-muted-foreground"
                              )}
                            />
                          ))}
                        </div>
                        {!review.is_approved && (
                          <span className="text-xs px-2 py-0.5 bg-destructive/10 text-destructive rounded-sm">
                            Hidden
                          </span>
                        )}
                        {review.is_verified_purchase && (
                          <span className="text-xs text-success">
                            ✓ Verified
                          </span>
                        )}
                      </div>

                      {review.title && (
                        <h3 className="font-medium mb-1">{review.title}</h3>
                      )}
                      <p className="text-muted-foreground mb-2">
                        {review.comment}
                      </p>

                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt={`Review image ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-sm"
                            />
                          ))}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          toggleApproval(review.id, review.is_approved)
                        }
                        title={review.is_approved ? "Hide review" : "Approve review"}
                      >
                        {review.is_approved ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteReviewId(review.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation */}
        <AlertDialog
          open={!!deleteReviewId}
          onOpenChange={() => setDeleteReviewId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Review</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this review? This action cannot
                be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminLayout>
    </>
  );
};

export default Reviews;
