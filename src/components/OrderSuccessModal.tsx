import { motion, AnimatePresence } from "motion/react";
import { Check, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderSuccessModal({ isOpen, onClose }: OrderSuccessModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-text/50 backdrop-blur-md"
          />

          {/* Modal Card content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative bg-brand-card w-full max-w-md p-8 md:p-12 text-center rounded-2xl shadow-2xl border border-brand-border z-10 overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none -ml-10 -mt-10" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-success/5 rounded-full blur-2xl pointer-events-none -mr-10 -mb-10" />

            {/* Scale Animated Green Circle Icon with Check */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, damping: 12, stiffness: 180 }}
              className="w-20 h-20 bg-[#3E6B48] text-[#FAF7F2] rounded-full mx-auto flex items-center justify-center shadow-lg shadow-brand-success/20 mb-8"
            >
              <Check className="w-10 h-10 stroke-[2.5]" />
            </motion.div>

            {/* Headline and text */}
            <h3 className="font-serif text-3xl font-medium text-brand-text mb-4 uppercase tracking-wide">
              Order Placed Successfully
            </h3>
            
            <p className="text-sm text-brand-text-sec leading-relaxed font-light font-sans mb-8">
              Thank you for choosing Vijay Marbles. Our premier catalog representatives will organize your order package and contact you shortly to confirm the scheduled delivery details.
            </p>

            {/* Quick Summary details */}
            <div className="bg-brand-bg-sec p-4 rounded-xl border border-brand-border/80 text-xs font-sans text-left space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-brand-text-sec">Showroom Rep Assigned</span>
                <span className="font-semibold text-brand-text font-serif">Alok Jain</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-text-sec">Estimated Consultation</span>
                <span className="font-semibold text-brand-text flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-brand-accent" />
                  Within 2 Hours
                </span>
              </div>
            </div>

            {/* CTA action buttons */}
            <button
              id="order-success-close-btn"
              onClick={onClose}
              className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold py-4 px-8 tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-lg rounded-sm cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Continue Showroom Tour</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security validation badge in modal */}
            <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] text-brand-text-sec/60 font-serif font-light">
              <ShieldCheck className="w-4 h-4 text-brand-accent animate-pulse" />
              <span>Vijay Marbles Secure Procurement Standards</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
