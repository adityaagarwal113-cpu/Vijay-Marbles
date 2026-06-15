import { motion } from "motion/react";
import { Sparkles, Trophy } from "lucide-react";
import { SiteConfig } from "../types";

interface AboutProps {
  siteConfig: SiteConfig;
}

export default function About({ siteConfig }: AboutProps) {
  return (
    <section id="about-section" className="py-24 md:py-32 bg-brand-bg relative overflow-hidden">
      {/* Decorative backdrops */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-bg-sec rounded-full blur-3xl opacity-60 pointer-events-none -mr-48 -mt-24" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-border/30 rounded-full blur-3xl opacity-50 pointer-events-none -ml-48 -mb-24" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Boutique Quality Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            {/* Elegant framing design representation */}
            <div className="absolute -top-4 -left-4 w-2/3 h-2/3 border border-brand-accent/20 -z-10 rounded-sm" />
            <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 border border-brand-accent/20 -z-10 rounded-sm" />
            
            <div className="overflow-hidden rounded-sm shadow-xl aspect-[4/5] bg-brand-bg-sec">
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src={siteConfig.aboutImage}
                alt={`${siteConfig.siteName} Artisan Handloom Craft`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Little floating text overlay */}
            <div className="absolute bottom-6 right-6 bg-brand-card p-5 shadow-lg border border-brand-border rounded-sm max-w-[200px]">
              <span className="text-3xl font-serif text-brand-accent font-semibold">100%</span>
              <p className="text-[10px] tracking-widest text-brand-text-sec uppercase mt-1 font-sans">
                Authentic Indian Handloom Clusters
              </p>
            </div>
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* Section Tag */}
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="h-[1.5px] w-6 bg-brand-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-brand-accent">
                Our Philosophy
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-brand-text mb-8 leading-tight font-medium">
              {siteConfig.aboutTitle}
            </h2>

            {/* Description paragraphs */}
            <div className="space-y-6 text-brand-text-sec text-base leading-relaxed font-light">
              <p>{siteConfig.aboutText1}</p>
              <p>{siteConfig.aboutText2}</p>
            </div>

            {/* Bullet list of brand merits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="flex items-start">
                <div className="bg-brand-bg-sec p-2.5 rounded-full mr-4 text-brand-accent">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-brand-text text-sm uppercase tracking-wider">
                    Masterful Stitching
                  </h4>
                  <p className="text-xs text-brand-text-sec mt-1">
                    Carefully padded fittings with pristine scalloped finishes and linings.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-brand-bg-sec p-2.5 rounded-full mr-4 text-brand-accent">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-brand-text text-sm uppercase tracking-wider">
                    Pure Silk Accents
                  </h4>
                  <p className="text-xs text-brand-text-sec mt-1">
                    Imported handloom Chanderi & Mulberry drapes that breath beautifully.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
