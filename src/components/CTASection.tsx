import { motion } from "motion/react";
import { Phone, Mail, Sparkles } from "lucide-react";
import { SiteConfig } from "../types";

interface CTASectionProps {
  siteConfig: SiteConfig;
}

export default function CTASection({ siteConfig }: CTASectionProps) {
  return (
    <section className="relative py-28 bg-[#2D2D2D] text-white overflow-hidden z-10 font-sans border-t border-brand-border/10">
      {/* Visual luxury overlay */}
      <div className="absolute inset-0 opacity-10">
        <img
          src={siteConfig.aboutImage}
          alt={`${siteConfig.siteName} Decorative craft backdrop`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/90 blend-multiply" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Sparkle decorative */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-12 h-12 rounded-full bg-brand-accent/20 mx-auto flex items-center justify-center mb-8 text-brand-accent"
        >
          <Sparkles className="w-5 h-5" />
        </motion.div>

        {/* Text Title */}
        <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-6 uppercase max-w-3xl mx-auto leading-tight">
          Redefine Elegance with {siteConfig.siteName}
        </h2>

        {/* Subtitle */}
        <p className="text-sm md:text-base text-[#FAF7F2]/75 font-light leading-relaxed mb-10 max-w-2xl mx-auto">
          Need a personalized brassware sizing or custom bathroom layout recommendation? Contact our luxury showroom experts to configure beautiful sanitary fittings suited for your modern luxury spaces.
        </p>

        {/* Interactive Contact Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            id="cta-phone-btn"
            href={`tel:${siteConfig.contactPhone}`}
            className="flex items-center space-x-2.5 bg-brand-accent hover:bg-brand-accent-hover text-[#FAF7F2] text-xs font-semibold px-8 py-4 uppercase tracking-widest transition-all duration-300 rounded-sm shadow-md cursor-pointer hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" />
            <span>Call {siteConfig.contactPhone}</span>
          </a>

          <a
            id="cta-email-btn"
            href={`mailto:${siteConfig.contactEmail}`}
            className="flex items-center space-x-2.5 bg-transparent hover:bg-white/10 border border-[#FAF7F2]/30 hover:border-brand-accent text-white hover:text-brand-accent text-xs font-semibold px-8 py-4 uppercase tracking-widest transition-all duration-300 rounded-sm cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email Concierge</span>
          </a>
        </div>

      </div>
    </section>
  );
}
