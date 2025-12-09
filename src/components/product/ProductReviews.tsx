import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, Camera, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useReviews, Review } from "@/hooks/useReviews";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { user } = useAuth();
  const { reviews, averageRating, reviewCount, isLoading, addReview, deleteReview } = useReviews(productId);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) return;

    setIsSubmitting(true);
    const success = await addReview(rating, title, comment, images);
    if (success) {
      setShowForm(false);
      setRating(5);
      setTitle("");
      setComment("");
      setImages([]);
    }
    setIsSubmitting(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className="animate-pulse py-8">Loading reviews...</div>;
  }

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="font-serif text-2xl mb-2">Customer Reviews</h2>
          {reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(averageRating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="font-medium">{averageRating}</span>
              <span className="text-muted-foreground">
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>

        {user && !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && user && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-secondary/50 p-6 rounded-sm mb-8"
          onSubmit={handleSubmit}
        >
          <h3 className="font-serif text-lg mb-4">Write Your Review</h3>

          {/* Rating */}
          <div className="mb-4">
            <Label className="mb-2 block">Your Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1"
                >
                  <Star
                    className={cn(
                      "h-6 w-6 transition-colors",
                      star <= (hoverRating || rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <Label htmlFor="review-title">Review Title (optional)</Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="mt-1"
              maxLength={100}
            />
          </div>

          {/* Comment */}
          <div className="mb-4">
            <Label htmlFor="review-comment">Your Review</Label>
            <Textarea
              id="review-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this product?"
              className="mt-1 min-h-[120px]"
              maxLength={1000}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <Label className="mb-2 block">Add Photos (optional)</Label>
            <div className="flex flex-wrap gap-3">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img
                    src={img}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="w-20 h-20 border-2 border-dashed border-border rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-foreground transition-colors">
                  <Camera className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-xs text-muted-foreground">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="submit" variant="cart" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </div>
        </motion.form>
      )}

      {/* Reviews List */}
      {reviewCount === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No reviews yet. Be the first to review this product!</p>
          {!user && (
            <p className="mt-2">
              <a href="/auth" className="underline hover:text-foreground">
                Sign in
              </a>{" "}
              to write a review.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b border-border pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex gap-0.5 mb-1">
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
                  {review.title && (
                    <h4 className="font-medium">{review.title}</h4>
                  )}
                </div>
                {user?.id === review.user_id && (
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    title="Delete review"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-3">
                {review.user_name} • {formatDate(review.created_at)}
                {review.is_verified_purchase && (
                  <span className="text-success ml-2">✓ Verified Purchase</span>
                )}
              </p>

              <p className="text-foreground mb-4">{review.comment}</p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className="w-16 h-16 overflow-hidden rounded-sm hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={img}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh]">
            <img
              src={selectedImage}
              alt="Review"
              className="max-w-full max-h-[80vh] object-contain rounded-sm"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-4 -right-4 p-2 bg-foreground text-background rounded-full"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
