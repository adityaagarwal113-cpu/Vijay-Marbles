import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Star, Plus, Minus, ShieldCheck, Check, Sparkles, MessageSquarePlus } from "lucide-react";
import { Product, Review } from "../types";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onAddReview: (productId: string, review: Omit<Review, "id" | "date">) => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddReview,
}: ProductModalProps) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "reviews">("features");
  
  // Custom review form states
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      userName: reviewName.trim(),
      comment: reviewComment.trim(),
      rating: reviewRating,
    });

    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    setReviewSuccess(true);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 3000);
  };

  const roundedAverageRating = product.reviews.length
    ? Math.round(product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length)
    : 5;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-text/50 backdrop-blur-sm"
          />

          {/* Modal Centered Wrapper */}
          <div className="flex min-h-screen items-center justify-center p-4 md:p-6 lg:p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-5xl bg-brand-card rounded-2xl shadow-2xl overflow-hidden border border-brand-border"
            >
              {/* Close Button Button */}
              <button
                id="modal-close-btn"
                onClick={onClose}
                className="absolute top-6 right-6 z-20 bg-brand-bg-sec hover:bg-brand-border p-2 rounded-full text-brand-text hover:text-brand-accent transition-all duration-300 focus:outline-none shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Solid Luxury Image Panel */}
                <div className="relative bg-brand-bg-sec flex items-center justify-center p-6 md:p-12 border-b md:border-b-0 md:border-r border-brand-border">
                  <div className="aspect-square w-full rounded-xl overflow-hidden shadow-md border border-brand-border">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Luxury tag watermark */}
                  <div className="absolute bottom-6 left-6 flex items-center space-x-2 text-xs font-mono font-medium tracking-widest text-[#B99772] uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Vijay Marbles Certified Seal</span>
                  </div>
                </div>

                {/* Right Side: Product Configuration Console */}
                <div className="p-8 md:p-12 max-h-[85vh] overflow-y-auto flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex items-center space-x-2.5 mb-4">
                      <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-brand-accent font-semibold bg-brand-bg px-2.5 py-1 rounded-sm">
                        Masterworks
                      </span>
                      <div className="flex items-center text-[#B99772]">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-serif font-medium ml-1">
                          {roundedAverageRating}.0 ({product.reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Faucet/Shower Title */}
                    <h2 className="font-serif text-3xl font-medium text-brand-text mb-3 tracking-wide uppercase leading-normal">
                      {product.name}
                    </h2>

                    {/* Price Tag with custom font scale */}
                    <div className="flex items-baseline space-x-3 mb-6">
                      <span className="text-2xl font-serif text-brand-accent font-semibold">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] text-brand-text-sec uppercase tracking-widest font-mono">
                        (Inclusive of showroom duties)
                      </span>
                    </div>

                    {/* Product description */}
                    <p className="text-brand-text-sec text-sm leading-relaxed mb-8 font-light font-sans">
                      {product.description}
                    </p>

                    {/* Configuration Controller: Quantity & ADD */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pt-6 border-t border-brand-border">
                      <div className="flex items-center border border-brand-border rounded-sm bg-brand-bg-sec">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 hover:text-brand-accent text-brand-text transition-colors focus:outline-none"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-5 text-sm font-semibold text-brand-text font-serif">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 hover:text-brand-accent text-brand-text transition-colors focus:outline-none"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        id="add-to-cart-from-modal-btn"
                        onClick={() => {
                          onAddToCart(product, quantity);
                          onClose();
                        }}
                        className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold py-4 px-8 tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-lg rounded-sm cursor-pointer"
                      >
                        Add to Showroom Cart
                      </button>
                    </div>

                    {/* Elegant Tabs for Features, Specs, Reviews */}
                    <div className="flex border-b border-brand-border mb-6">
                      {(["features", "specs", "reviews"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 pr-6 text-xs uppercase tracking-widest font-sans font-medium hover:text-brand-accent transition-all duration-300 relative ${
                            activeTab === tab ? "text-brand-accent font-semibold" : "text-brand-text-sec"
                          }`}
                        >
                          {tab}
                          {activeTab === tab && (
                            <motion.div
                              layoutId="activeModalTabBorder"
                              className="absolute bottom-0 left-0 right-6 h-[1.5px] bg-brand-accent"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Tabs Content Blocks */}
                    <div className="min-h-[180px] font-sans text-sm mb-4">
                      {/* 1. FEATURES TAB */}
                      {activeTab === "features" && (
                        <motion.ul
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-3.5"
                        >
                          {product.features.map((feat, index) => (
                            <li key={index} className="flex items-start text-brand-text-sec font-light text-xs md:text-sm">
                              <span className="text-brand-accent bg-brand-bg p-1 rounded-full mr-3.5 flex items-center justify-center">
                                <Check className="w-3 h-3" />
                              </span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}

                      {/* 2. SPECIFICATION DETAILS TAB */}
                      {activeTab === "specs" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="overflow-hidden border border-brand-border rounded-sm text-xs"
                        >
                          <table className="w-full text-left font-sans border-collapse">
                            <tbody>
                              {Object.entries(product.specs).map(([label, val], index) => (
                                <tr
                                  key={index}
                                  className={`${index % 2 === 0 ? "bg-brand-bg-sec/40" : "bg-transparent"} border-b border-brand-border/60`}
                                >
                                  <td className="p-3 font-semibold text-brand-text uppercase tracking-wider w-1/3">
                                    {label}
                                  </td>
                                  <td className="p-3 text-brand-text-sec font-light">
                                    {val}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      )}

                      {/* 3. REVIEW SYSTEM TAB */}
                      {activeTab === "reviews" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-6"
                        >
                          {/* List Existing Reviews */}
                          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2 divide-y divide-brand-border/60">
                            {product.reviews.length > 0 ? (
                              product.reviews.map((rev) => (
                                <div key={rev.id} className="pt-3 first:pt-0">
                                  <div className="flex items-center justify-between mb-1.5">
                                    <h4 className="font-serif font-semibold text-brand-text text-sm">
                                      {rev.userName}
                                    </h4>
                                    <div className="flex text-amber-500">
                                      {Array.from({ length: rev.rating }).map((_, i) => (
                                        <Star key={i} className="w-3.5 h-3.5 fill-current md:w-3" />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text-xs text-brand-text-sec font-light italic leading-relaxed">
                                    "{rev.comment}"
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-brand-text-sec italic py-4">
                                No guest reviews yet. Be the first to express your craftsmanship thoughts below.
                              </p>
                            )}
                          </div>

                          {/* Submit New Review Form */}
                          <div className="border-t border-brand-border pt-6">
                            <h4 className="font-serif font-medium text-brand-text text-sm mb-4 uppercase tracking-wider flex items-center">
                              <MessageSquarePlus className="w-4 h-4 mr-2 text-brand-accent" /> Write A Showroom Review
                            </h4>
                            
                            {/* Animate review success alert */}
                            <AnimatePresence>
                              {reviewSuccess && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0 }}
                                  className="p-3 mb-4 bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/20 rounded-sm text-xs font-medium flex items-center"
                                >
                                  <Check className="w-3.5 h-3.5 mr-2" /> Review published successfully.
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] tracking-widest text-brand-text-sec uppercase mb-1.5 font-medium">
                                    Full Name
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    placeholder="e.g. Priyesh Shah"
                                    className="w-full bg-brand-bg-sec border border-brand-border px-3.5 py-2.5 text-xs text-brand-text rounded-sm focus:outline-none focus:border-brand-accent placeholder-brand-text-sec/45 font-sans"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-[10px] tracking-widest text-brand-text-sec uppercase mb-1.5 font-medium">
                                    Experience Score
                                  </label>
                                  <div className="flex items-center space-x-1.5 py-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        type="button"
                                        key={star}
                                        onClick={() => setReviewRating(star)}
                                        className="focus:outline-none group"
                                      >
                                        <Star
                                          className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                                            star <= reviewRating
                                              ? "text-amber-500 fill-current"
                                              : "text-brand-border hover:text-amber-500"
                                          }`}
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="block text-[10px] tracking-widest text-brand-text-sec uppercase mb-1.5 font-medium">
                                  Your Comment
                                </label>
                                <textarea
                                  required
                                  rows={3}
                                  value={reviewComment}
                                  onChange={(e) => setReviewComment(e.target.value)}
                                  placeholder="Provide feedback on finish, water aerator fluidity, lever action etc."
                                  className="w-full bg-brand-bg-sec border border-brand-border px-3.5 py-2.5 text-xs text-brand-text rounded-sm focus:outline-none focus:border-brand-accent placeholder-brand-text-sec/45 font-sans resize-none"
                                />
                              </div>

                              <button
                                type="submit"
                                className="bg-brand-text hover:bg-brand-accent text-white hover:text-brand-card transition-colors duration-300 py-3 px-6 text-[10px] uppercase tracking-widest font-sans font-semibold rounded-sm"
                              >
                                Submit Verified Review
                              </button>
                            </form>
                          </div>
                        </motion.div>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
