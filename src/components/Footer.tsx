import { Mail, Phone, MapPin, ArrowUp, ArrowRight, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-text text-[#E7DED3] pt-20 pb-8 border-t border-brand-border/20 relative z-10 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-brand-border/10">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <h3 className="font-serif text-2xl tracking-widest text-white uppercase font-bold mb-3">
              Vijay Marbles
            </h3>
            <p className="text-[9px] tracking-[0.4em] text-brand-accent uppercase mb-6 font-medium">
              Timeless Hardware Showroom
            </p>
            <p className="text-xs text-[#6B6B6B]/80 hover:text-[#E7DED3]/75 transition-colors leading-relaxed font-light mb-8">
              At Vijay Marbles, we believe every fixture should be a blend of beauty and functionality. We curated a state-of-the-art collection of bathroom faucet, showers, and accessories to bring timeless refined craftsmanship into elite modern homes.
            </p>
            <div className="flex items-center space-x-2 text-[10px] tracking-widest text-[#B99772] uppercase font-mono">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <span>Verified Jaquar & Kohler Partner</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="font-serif text-sm uppercase tracking-widest text-white font-semibold mb-6">
              Quick Showroom Links
            </h4>
            <ul className="space-y-4 text-xs font-light text-[#E7DED3]/80">
              <li>
                <a
                  href="#product-collection"
                  className="hover:text-brand-accent transition-colors duration-300 flex items-center group cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-5 group-hover:ml-0 text-brand-accent" />
                  <span>Browse Collections</span>
                </a>
              </li>
              <li>
                <a
                  href="#about-section"
                  className="hover:text-brand-accent transition-colors duration-300 flex items-center group cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-5 group-hover:ml-0 text-brand-accent" />
                  <span>Our Craftsmanship</span>
                </a>
              </li>
              <li>
                <a
                  href="#features-grid"
                  className="hover:text-brand-accent transition-colors duration-300 flex items-center group cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-5 group-hover:ml-0 text-brand-accent" />
                  <span>Services & Finishes</span>
                </a>
              </li>
              <li>
                <a
                  href="#testimonials-section"
                  className="hover:text-brand-accent transition-colors duration-300 flex items-center group cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-5 group-hover:ml-0 text-brand-accent" />
                  <span>Client Testimonials</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-sm uppercase tracking-widest text-white font-semibold mb-6">
              Showroom Inquiries
            </h4>
            <ul className="space-y-5 text-xs text-[#E7DED3]/80 font-light">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Vijay Marbles Premium Showroom, Architectural Fittings Wing, India
                </span>
              </li>
              <li>
                <a
                  href="mailto:helloakjain03@gmail.com"
                  className="flex items-center hover:text-brand-accent transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0" />
                  <span className="font-semibold underline underline-offset-4">
                    helloakjain03@gmail.com
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="tel:9229265644"
                  className="flex items-center hover:text-brand-accent transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 mr-3 text-brand-accent flex-shrink-0" />
                  <span className="font-semibold text-[#E7DED3] hover:text-brand-accent">
                    +91 922926 5644
                  </span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright/Tribute */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B6B6B] font-mono leading-relaxed">
          <p className="text-center sm:text-left mb-4 sm:mb-0">
            © {currentYear} Vijay Marbles. All rights reserved. Designed for Luxury & Perfection.
          </p>
          <div className="flex items-center space-x-6">
            <button
              onClick={handleScrollTop}
              className="flex items-center space-x-1.5 text-brand-accent hover:text-brand-accent-hover transition-colors font-sans font-medium uppercase tracking-widest text-[9px] focus:outline-none"
            >
              <span>Back To Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
