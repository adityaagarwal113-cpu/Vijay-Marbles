import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingCart, Trash2, ShieldCheck } from "lucide-react";
import { Product } from "../types";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  products,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistDrawerProps) {
  const wishlistedItems = products.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-text/50 backdrop-blur-xs"
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="w-screen max-w-md bg-brand-card shadow-2xl h-full flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center space-x-3 text-brand-text">
                  <Heart className="w-5 h-5 text-brand-accent fill-brand-accent" />
                  <h2 className="font-serif text-xl font-medium tracking-wide placeholder-brand-text uppercase">
                    Your Wishlist ({wishlistedItems.length})
                  </h2>
                </div>
                <button
                  id="wishlist-close-btn"
                  onClick={onClose}
                  className="p-1 hover:text-brand-accent transition-colors text-brand-text focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 divide-y divide-brand-border animate-fade-in">
                {wishlistedItems.length > 0 ? (
                  wishlistedItems.map((product) => (
                    <div key={product.id} className="py-5 flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-cover rounded-md border border-brand-border"
                        />
                        <div className="ml-4">
                          <h4 className="font-serif font-semibold text-brand-text text-sm uppercase tracking-wider">
                            {product.name}
                          </h4>
                          <p className="text-xs text-brand-accent font-serif mt-1">
                            ₹{product.price.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Quick Add To Cart */}
                        <button
                          id={`wishlist-add-to-cart-${product.id}`}
                          onClick={() => {
                            onAddToCart(product);
                            onClose();
                          }}
                          className="p-2 border border-brand-text hover:border-brand-accent text-brand-text hover:text-brand-accent rounded-sm hover:bg-brand-bg transition-colors"
                          title="Add to selection"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>

                        {/* Quick Trash */}
                        <button
                          id={`wishlist-remove-${product.id}`}
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="p-2 text-brand-text-sec hover:text-red-600 transition-colors"
                          title="Remove from desires"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                    <Heart className="w-12 h-12 text-brand-border mb-4" />
                    <h3 className="font-serif text-lg font-medium text-brand-text">Your list is clear</h3>
                    <p className="text-brand-text-sec text-xs max-w-xs mt-2 leading-relaxed font-light">
                      Capture beautiful inspiration tags as you explore Vijay Marbles fittings and save them here.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 border border-brand-accent text-brand-accent text-xs font-semibold px-6 py-3 tracking-widest uppercase rounded-sm"
                    >
                      Start Designing
                    </button>
                  </div>
                )}
              </div>

              {/* Keep footer empty or with branding */}
              <div className="p-6 md:p-8 bg-brand-bg-sec border-t border-brand-border text-center text-xs text-brand-text-sec font-mono">
                <div className="flex items-center justify-center space-x-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-brand-accent" />
                  <span>Personalized Showroom Wishlist</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
