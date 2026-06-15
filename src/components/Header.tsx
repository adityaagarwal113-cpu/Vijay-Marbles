import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { CartItem, Product } from "../types";

interface HeaderProps {
  cart: CartItem[];
  wishlist: string[];
  products: Product[];
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSearchChange: (query: string) => void;
  onProductClick: (product: Product) => void;
}

export default function Header({
  cart,
  wishlist,
  products,
  onOpenCart,
  onOpenWishlist,
  onSearchChange,
  onProductClick,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for header background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Filter products live as user types
  const filteredSearch = searchVal.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.description.toLowerCase().includes(searchVal.toLowerCase())
      )
    : [];

  const handleSearchInput = (val: string) => {
    setSearchVal(val);
    onSearchChange(val);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-brand-card/95 backdrop-blur-md border-b border-brand-border py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Desktop Left: Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-sm tracking-widest font-sans font-medium text-brand-text">
          <button
            onClick={() => scrollToSection("product-collection")}
            className="hover:text-brand-accent transition-colors duration-300 relative group uppercase"
          >
            Shop
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("about-section")}
            className="hover:text-brand-accent transition-colors duration-300 relative group uppercase"
          >
            Craftsmanship
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("testimonials-section")}
            className="hover:text-brand-accent transition-colors duration-300 relative group uppercase"
          >
            Reviews
            <span className="absolute left-0 bottom-[-4px] w-0 h-[1.5px] bg-brand-accent transition-all duration-300 group-hover:w-full"></span>
          </button>
        </nav>

        {/* Mobile Left: Hamburguer */}
        <div className="md:hidden">
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle Mobile Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-brand-text focus:outline-none p-1 hover:text-brand-accent transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center: Branding */}
        <div className="text-center">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="focus:outline-none"
          >
            <h1 className="font-serif text-2xl md:text-3xl tracking-widest text-brand-text font-semibold uppercase relative inline-block transition-transform duration-300 active:scale-95 leading-normal">
              Vijay Marbles
            </h1>
            <p className="text-[8px] tracking-[0.4em] text-brand-accent -mt-1 font-sans uppercase font-medium">
              Timeless Hardware
            </p>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4 md:space-x-6 text-brand-text">
          {/* Search Trigger */}
          <div className="relative">
            <button
              id="search-toggle-btn"
              aria-label="Open Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1 hover:text-brand-accent transition-all duration-300 rounded-full focus:outline-none hover:bg-brand-bg-sec"
            >
              <Search className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

          {/* Wishlist Trigger */}
          <button
            id="wishlist-trigger-btn"
            aria-label="Open Wishlist"
            onClick={onOpenWishlist}
            className="p-1 hover:text-brand-accent transition-all duration-300 rounded-full focus:outline-none hover:bg-brand-bg-sec relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-serif font-medium shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            id="cart-drawer-toggle-btn"
            aria-label="Open Cart"
            onClick={onOpenCart}
            className="p-1 hover:text-brand-accent transition-all duration-300 rounded-full focus:outline-none hover:bg-brand-bg-sec relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-success text-brand-card text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-serif font-medium shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Floating Animated Search Drawer */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 w-full bg-brand-card shadow-lg border-b border-brand-border py-6 px-6 md:px-12 z-40"
          >
            <div className="max-w-3xl mx-auto relative">
              <div className="relative flex items-center border-b border-brand-accent/50 pb-2">
                <Search className="w-5 h-5 text-brand-accent mr-3" />
                <input
                  type="text"
                  placeholder="Search our luxury collection... (e.g. Faucet, Shower, Towel)"
                  value={searchVal}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  className="w-full bg-transparent border-none text-brand-text text-lg focus:outline-none font-sans placeholder-brand-text-sec/55"
                  autoFocus
                />
                {searchVal && (
                  <button
                    onClick={() => handleSearchInput("")}
                    className="p-1 text-brand-text-sec hover:text-brand-text"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-xs text-brand-text-sec mt-2 font-mono">
                Press ESC or click search icon again to close
              </p>

              {/* Show matching items inside the search panel for luxurious UX */}
              {searchVal.trim() !== "" && (
                <div className="mt-4 max-h-[300px] overflow-y-auto divide-y divide-brand-border">
                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onProductClick(product);
                          setSearchOpen(false);
                          setSearchVal("");
                        }}
                        className="flex items-center py-3 cursor-pointer hover:bg-brand-bg/50 transition-colors rounded-lg px-2 group"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-md border border-brand-border"
                        />
                        <div className="ml-4 flex-1">
                          <h4 className="font-serif font-medium text-brand-text text-sm group-hover:text-brand-accent transition-colors">
                            {product.name}
                          </h4>
                          <p className="text-xs text-brand-text-sec line-clamp-1">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center text-xs font-serif text-brand-accent font-medium ml-4">
                          ₹{product.price.toLocaleString("en-IN")}
                          <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-brand-text-sec text-sm">
                      No fixtures matching "{searchVal}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-brand-text z-40 md:hidden"
            />
            {/* Menu Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[80%] max-w-[320px] bg-brand-bg-sec h-full shadow-2xl z-50 p-6 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-6">
                  <div>
                    <h3 className="font-serif text-lg tracking-wider text-brand-text uppercase font-semibold">
                      Vijay Marbles
                    </h3>
                    <p className="text-[8px] tracking-widest text-brand-accent uppercase font-sans">
                      Timeless Showroom
                    </p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 hover:text-brand-accent text-brand-text"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex flex-col space-y-6">
                  <button
                    onClick={() => scrollToSection("hero-banner")}
                    className="text-left font-serif text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => scrollToSection("product-collection")}
                    className="text-left font-serif text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    Browse Collections
                  </button>
                  <button
                    onClick={() => scrollToSection("about-section")}
                    className="text-left font-serif text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    Our Craftsmanship
                  </button>
                  <button
                    onClick={() => scrollToSection("features-grid")}
                    className="text-left font-serif text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    Our Services
                  </button>
                  <button
                    onClick={() => scrollToSection("testimonials-section")}
                    className="text-left font-serif text-lg font-medium text-brand-text hover:text-brand-accent transition-colors"
                  >
                    Client Testimonials
                  </button>
                </div>
              </div>

              <div className="border-t border-brand-border pt-6 text-xs text-brand-text-sec font-sans space-y-2">
                <p className="font-medium text-brand-text">VIJAY MARBLES SHOWROOM</p>
                <p>Phone: 9229265644</p>
                <p>Email: helloakjain03@gmail.com</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
