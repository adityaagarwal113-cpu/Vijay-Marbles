import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Trash2, ShoppingBag, CreditCard, ShieldCheck, Plus } from "lucide-react";
import { CartItem } from "../types";

interface CartDrawerProps {
  isOpen: boolean;
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onPlaceOrder: () => void;
}

export default function CartDrawer({
  isOpen,
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
}: CartDrawerProps) {
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gstEstimate = Math.round(subtotal * 0.18); // 18% GST for premium luxury brassware
  const grandTotal = subtotal + gstEstimate;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-text/50 backdrop-blur-xs"
          />

          {/* Drawer alignment wrapper */}
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="w-screen max-w-md bg-brand-card shadow-2xl h-full flex flex-col justify-between"
            >
              {/* Header Container */}
              <div className="p-6 md:p-8 border-b border-brand-border flex items-center justify-between">
                <div className="flex items-center space-x-3 text-brand-text">
                  <ShoppingBag className="w-5 h-5 text-brand-accent" />
                  <h2 className="font-serif text-xl font-medium tracking-wide uppercase">
                    Your Selection ({cart.length})
                  </h2>
                </div>
                <button
                  id="cart-close-btn"
                  onClick={onClose}
                  className="p-1 hover:text-brand-accent transition-colors text-brand-text focus:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Central Catalog Products Area */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-4 divide-y divide-brand-border">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.product.id} className="py-5 flex items-center">
                      {/* Thumbnail with secure attributes */}
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover rounded-md border border-brand-border bg-brand-bg-sec/30"
                      />

                      {/* Info core */}
                      <div className="ml-4 flex-1">
                        <h4 className="font-serif font-semibold text-brand-text text-sm uppercase tracking-wider">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-brand-accent font-serif font-medium mt-1">
                          ₹{item.product.price.toLocaleString("en-IN")} each
                        </p>

                        {/* Adjusters */}
                        <div className="flex items-center mt-3 space-x-3">
                          <div className="flex items-center border border-brand-border rounded-sm bg-brand-bg/40 text-xs">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  onUpdateQuantity(item.product.id, item.quantity - 1);
                                } else {
                                  onRemoveItem(item.product.id);
                                }
                              }}
                              className="p-1.5 px-2 hover:text-brand-accent text-brand-text transition-colors focus:outline-none"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 font-semibold font-serif text-brand-text">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1.5 px-2 hover:text-brand-accent text-brand-text transition-colors focus:outline-none"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Delete Trash command */}
                          <button
                            id={`remove-cart-item-${item.product.id}`}
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-xs text-brand-text-sec hover:text-red-600 transition-colors flex items-center space-x-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      {/* Cumulative total */}
                      <div className="ml-4 text-right text-sm font-semibold font-serif text-brand-text whitespace-nowrap">
                        ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-bg-sec flex items-center justify-center text-brand-text-sec mb-5">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-brand-text">Your cart is empty</h3>
                    <p className="text-brand-text-sec text-xs max-w-xs mt-2 leading-relaxed font-light font-sans">
                      Let's design a magnificent room. Browse our collections and add premium brassware to your cart.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-6 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-6 py-3 tracking-widest uppercase rounded-sm"
                    >
                      Continue Showroom Tour
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout Calculation Panel */}
              {cart.length > 0 && (
                <div className="p-6 md:p-8 bg-brand-bg-sec border-t border-brand-border">
                  <div className="space-y-3.5 text-sm font-sans mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center text-brand-text-sec font-light text-xs md:text-sm">
                      <span>Selection Subtotal</span>
                      <span className="font-semibold font-serif text-brand-text">
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* GST Estimate (18% code verified) */}
                    <div className="flex justify-between items-center text-brand-text-sec font-light text-xs md:text-sm">
                      <span>GST Estimate (18%)</span>
                      <span className="font-semibold font-serif text-brand-text">
                        ₹{gstEstimate.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between items-center pt-3.5 border-t border-brand-border/60 text-base">
                      <span className="font-serif font-medium text-brand-text">Consolidated Total</span>
                      <span className="font-semibold font-serif text-brand-accent text-lg">
                        ₹{grandTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Operational triggers */}
                  <div className="space-y-3">
                    <button
                      id="place-order-drawer-btn"
                      onClick={onPlaceOrder}
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold py-4 tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 rounded-sm cursor-pointer"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Place Order Securely</span>
                    </button>
                    
                    <button
                      id="continue-shopping-drawer-btn"
                      onClick={onClose}
                      className="w-full border border-brand-border hover:border-brand-accent text-brand-text hover:text-brand-accent text-xs font-semibold py-3.5 tracking-widest uppercase transition-colors duration-300 bg-brand-card rounded-sm"
                    >
                      Continue Browsing
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-brand-text-sec/75 font-serif font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
                    <span>Vijay Marbles Showroom Assurance Guarantee</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
