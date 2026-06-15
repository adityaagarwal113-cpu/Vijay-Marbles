import React from "react";
import { motion } from "motion/react";
import { Award, Droplets, Shield, Compass } from "lucide-react";

interface FeatureCard {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const FEATURE_ITEMS: FeatureCard[] = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "Forged from heavy, lead-free virgin brass cores with flawless structural density to counter extreme variations."
  },
  {
    icon: Droplets,
    title: "Water Efficient",
    description: "Integrated with custom EcoSmart aerators that infuse water with oxygen, saving up to 40% consumption."
  },
  {
    icon: Shield,
    title: "Durable Finish",
    description: "Multilayer Nickel and Chromium plating protecting our brassware from hard water corrosion and staining."
  },
  {
    icon: Compass,
    title: "Modern Design",
    description: "Designed in sleek, architectural symmetry, honoring clean minimalist guidelines and timeless proportions."
  }
];

export default function Features() {
  return (
    <section id="features-grid" className="py-24 bg-brand-bg-sec relative z-10 border-t border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-[1px] w-5 bg-brand-accent" />
            <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-brand-accent">
              Engineering Excellence
            </span>
            <div className="h-[1px] w-5 bg-brand-accent" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] tracking-tight text-brand-text font-medium leading-tight">
            Designed for Lifetime Service
          </h2>
          <p className="text-sm md:text-base text-brand-text-sec mt-4 font-light leading-relaxed">
            Every fixture is rigorously checked across 20 high-pressure testing standards ensuring lifetime durability, visual luster, and tactile precision.
          </p>
        </div>

        {/* Features Content Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {FEATURE_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-brand-card p-8 md:p-10 rounded-sm border border-brand-border/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center group"
              >
                {/* Outlined Round icon */}
                <div className="w-14 h-14 rounded-full border border-brand-accent/30 bg-brand-bg/50 flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-brand-bg transition-colors duration-300 text-brand-accent">
                  <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Card title */}
                <h3 className="font-serif font-medium text-brand-text text-lg uppercase tracking-wider mb-4">
                  {item.title}
                </h3>

                {/* Card description */}
                <p className="text-xs md:text-sm text-brand-text-sec leading-relaxed font-light">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
