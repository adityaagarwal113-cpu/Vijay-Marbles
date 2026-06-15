import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6500); // Luxury slow auto-scroll (6.5s)
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section id="testimonials-section" className="py-24 md:py-28 bg-brand-bg relative overflow-hidden z-10 border-b border-brand-border/40">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Quote graphical watermark */}
        <div className="absolute top-0 left-12 -z-10 text-brand-border/30">
          <Quote className="w-36 h-36 opacity-35" />
        </div>

        {/* Section tag heading */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-[1px] w-5 bg-brand-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-brand-accent">
              Showroom Praises
            </span>
            <div className="h-[1px] w-5 bg-brand-accent" />
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-brand-text uppercase">
            Client Endorsements
          </h2>
        </div>

        {/* Testimonials Carousel Slider container */}
        <div className="relative min-h-[260px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="text-center px-4 md:px-12 flex flex-col items-center"
            >
              {}
              <div className="flex items-center text-amber-500 mb-6 space-x-1.5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Feedback text */}
              <p className="font-serif text-lg md:text-2xl text-brand-text leading-relaxed font-light italic mb-8 max-w-3xl">
                "{current.text}"
              </p>

              {/* Author name & details */}
              <div>
                <h4 className="font-sans font-semibold text-brand-text text-sm uppercase tracking-wider">
                  {current.userName}
                </h4>
                <p className="text-xs text-brand-accent font-medium uppercase tracking-widest mt-1">
                  {current.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrow buttons */}
        <div className="flex items-center justify-center space-x-4 mt-12">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-brand-border text-brand-text-sec hover:text-brand-accent hover:border-brand-accent transition-colors focus:outline-none bg-brand-card/50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Dot indicators */}
          <div className="flex space-x-2.5">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  activeIndex === index ? "bg-brand-accent w-6" : "bg-brand-border hover:bg-brand-accent-hover"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-brand-border text-brand-text-sec hover:text-brand-accent hover:border-brand-accent transition-colors focus:outline-none bg-brand-card/50"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
