import { motion } from "motion/react";
import { ArrowDown, Flame, ShieldCheck } from "lucide-react";

interface HeroProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onShopClick, onExploreClick }: HeroProps) {
  return (
    <section
      id="hero-banner"
      className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background image container with premium zoom animation */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.05, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1620626011761-996317b6979a?auto=format&fit=crop&q=80&w=1600"
          alt="Premium Bathroom Showroom Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft luxury warm beige / champagne overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/95 via-brand-bg/75 to-transparent blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-bg to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col items-start mt-12">
        <div className="max-w-2xl">
          {/* Subtle luxurious tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-2.5 mb-5 md:mb-6"
          >
            <div className="h-[1px] w-8 bg-brand-accent" />
            <span className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-brand-accent">
              Architectural Brassware Showroom
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-[76px] tracking-tight font-medium text-brand-text mb-6 md:mb-8 leading-[1.08]"
          >
            Elevate <br className="hidden md:inline" />
            Everyday Living
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            className="text-base md:text-xl font-sans text-brand-text-sec leading-relaxed mb-10 md:mb-12 font-light"
          >
            Curated premium bathroom and kitchen fixtures crafted for timeless elegance, tactile sensory perfection, and lifelong endurance. Specially handpicked for elite homeowners and interior architects.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <button
              id="hero-shop-now-btn"
              onClick={onShopClick}
              className="bg-brand-accent hover:bg-brand-accent-hover text-brand-bg font-sans font-medium text-sm py-4 px-8 tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 rounded-sm"
            >
              Shop Collection
            </button>
            <button
              id="hero-explore-craft-btn"
              onClick={onExploreClick}
              className="border border-brand-accent hover:border-brand-accent-hover text-brand-accent hover:text-brand-accent-hover font-sans font-medium text-sm py-4 px-8 tracking-widest uppercase transition-all duration-300 hover:bg-brand-bg-sec rounded-sm"
            >
              Explore Craftsmanship
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating features quick summary overlay at the bottom right */}
      <div className="absolute right-12 bottom-12 hidden lg:flex items-center space-x-8 text-xs font-mono tracking-wider text-brand-text/75 bg-brand-card/75 backdrop-blur-md p-4 px-6 border border-brand-border rounded-sm shadow-sm">
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 inline-block"></span>
          VIRGIN BRASS CORES
        </div>
        <div className="flex items-center">
          <span className="w-2 h-2 rounded-full bg-brand-accent mr-2 inline-block"></span>
          10-YEAR WARRANTY
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={onShopClick}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10 group"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-brand-text-sec mb-2 group-hover:text-brand-accent transition-colors font-sans">
          Scroll to explore
        </span>
        <ArrowDown className="w-4 h-4 text-brand-text-sec group-hover:text-brand-accent transition-colors" />
      </motion.div>
    </section>
  );
}
