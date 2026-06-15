import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, ShoppingCart, Heart, Search, Check, Sparkles } from "lucide-react";
import { Product } from "../types";

interface ProductGridProps {
  products: Product[];
  wishlist: string[];
  searchQuery: string;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isHomeView?: boolean;
  onViewAllProducts?: () => void;
}

export default function ProductGrid({
  products,
  wishlist,
  searchQuery,
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isHomeView = false,
  onViewAllProducts,
}: ProductGridProps) {
  // Category separation filters
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const categories = [
    { label: "All Masterworks", id: "ALL" },
    { label: "Premium Cocks & Faucets", id: "FAUCETS" },
    { label: "Luxury Showers", id: "SHOWER" },
    { label: "Elite Accessories", id: "ACCESSORIES" },
  ];

  // Helper categorization mapping
  const getProductCategory = (product: Product): string => {
    const name = product.name.toLowerCase();
    if (name.includes("cock")) return "FAUCETS";
    if (name.includes("shower")) return "SHOWER";
    return "ACCESSORIES";
  };

  // Perform filtering combined with search
  const filteredProducts = products.filter((p) => {
    // Search match
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category match
    if (selectedCategory === "ALL") return true;
    return getProductCategory(p) === selectedCategory;
  });

  const itemsToDisplay = isHomeView ? filteredProducts.slice(0, 3) : filteredProducts;

  const handleAddToCartWithAnimation = (product: Product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="product-collection" className="py-24 bg-brand-bg px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16">
          <div className={`${isHomeView ? "max-w-2xl mx-auto text-center" : "max-w-xl"}`}>
            <div className={`flex items-center space-x-2.5 mb-4 ${isHomeView ? "justify-center" : ""}`}>
              <div className="h-[1px] w-6 bg-brand-accent" />
              <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-brand-accent">
                {isHomeView ? "Curated Highlight" : "Our Collection"}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-brand-text tracking-tight leading-tight uppercase">
              {isHomeView ? "Featured Showroom Masterpieces" : "Curated Showroom Grid"}
            </h2>
            <p className="text-brand-text-sec text-xs md:text-sm mt-3 font-light font-sans max-w-md mx-auto">
              {isHomeView 
                ? "A handpicked preview of our heavy-duty chrome and eco-brass fittings. Built for premium homes and decades of sleek performance."
                : "Discover absolute fluid design, luxury surfaces, and mechanical perfection. Fit your sanctuary today."}
            </p>
          </div>

          {/* Luxury Categories Navigation Filter Tabs - Hidden on Home featured view */}
          {!isHomeView && (
            <div className="flex flex-wrap gap-2 mt-8 md:mt-0 font-sans text-xs tracking-widest uppercase">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2.5 px-4 scroll-smooth transition-all duration-300 rounded-sm ${
                    selectedCategory === cat.id
                      ? "bg-brand-accent text-brand-bg font-medium shadow-md"
                      : "bg-brand-card hover:bg-brand-gradient hover:text-brand-accent text-brand-text border border-brand-border/60"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Filter Indicator */}
        {!isHomeView && searchQuery && (
          <div className="mb-8 p-3 px-4 bg-brand-bg-sec border border-brand-border text-xs text-brand-text-sec font-mono rounded flex items-center justify-between">
            <span>
              Showing results filtered by search phrase "<strong>{searchQuery}</strong>" (Found {filteredProducts.length} items)
            </span>
          </div>
        )}

        {/* Grid of luxury items */}
        {itemsToDisplay.length > 0 ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
              {itemsToDisplay.map((p, index) => {
                const inWishlist = wishlist.includes(p.id);
                const alreadyAdded = justAddedId === p.id;

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.05 }}
                    className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border/60 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col justify-between"
                  >
                    {/* Image wrapper with hovering gestures */}
                    <div className="relative aspect-square w-full overflow-hidden bg-brand-bg-sec cursor-pointer" onClick={() => onProductClick(p)}>
                      
                      {/* Main Image with Zoom transition on group-hover */}
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Tags at top */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-2 pointer-events-none z-10">
                        {p.price > 2000 && (
                          <span className="bg-brand-accent/90 text-[9px] text-white tracking-[0.2em] font-sans font-medium uppercase px-2.5 py-1 rounded-full shadow-sm backdrop-blur-xs flex items-center">
                            <Sparkles className="w-2.5 h-2.5 mr-1" /> Elite Series
                          </span>
                        )}
                      </div>

                      {/* Right core: Wishlist Icon Overlay */}
                      <button
                        id={`wishlist-add-btn-${p.id}`}
                        aria-label="Add to Wishlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(p.id);
                        }}
                        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md shadow-md border transition-all duration-300 focus:outline-none ${
                          inWishlist
                            ? "bg-brand-accent border-brand-accent text-white"
                            : "bg-brand-card/85 hover:bg-brand-card border-brand-border text-brand-text hover:scale-105"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
                      </button>

                      {/* Reveal Button Overlay (Desktop design) */}
                      <div className="absolute inset-0 bg-brand-text/10 group-hover:bg-brand-text/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100 z-10 pb-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ scale: 1.05 }}
                          className="bg-brand-card/90 hover:bg-brand-card text-brand-text p-3 px-5 rounded-full shadow-lg border border-brand-border flex items-center space-x-1.5 transition-all duration-300 text-xs font-sans uppercase font-medium tracking-widest"
                        >
                          <Eye className="w-4 h-4 text-brand-accent" />
                          <span>Quick View</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Product Metadata Content Block */}
                    <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Product Title matching color definitions */}
                        <h3
                          onClick={() => onProductClick(p)}
                          className="font-serif font-semibold text-brand-text text-lg cursor-pointer hover:text-brand-accent transition-colors duration-300 tracking-wide line-clamp-1 mb-2 uppercase"
                        >
                          {p.name}
                        </h3>

                        {/* Brief Elegant Description */}
                        <p className="text-brand-text-sec text-xs line-clamp-2 mb-6 font-light leading-relaxed font-sans">
                          {p.description}
                        </p>
                      </div>

                      {/* Bottom: Price and Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-brand-border/60">
                        <div>
                          <span className="text-[10px] tracking-widest text-brand-text-sec uppercase block font-sans">
                            Investment
                          </span>
                          <span className="text-lg font-semibold text-brand-text font-sans">
                            ₹{p.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Buy Action Trigger */}
                        <button
                          id={`add-to-cart-btn-${p.id}`}
                          onClick={() => handleAddToCartWithAnimation(p)}
                          disabled={alreadyAdded}
                          className={`flex items-center justify-center p-3 px-4 rounded-sm transition-all duration-300 border focus:outline-none cursor-pointer tracking-widest uppercase text-xs font-sans font-medium ${
                            alreadyAdded
                              ? "bg-brand-success border-brand-success text-brand-card scale-95"
                              : "bg-brand-text hover:bg-brand-accent border-brand-text hover:border-brand-accent text-white shadow-sm hover:shadow-md"
                          }`}
                        >
                          {alreadyAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1" />
                              Added
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                              Add
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* View All Products Button shown exclusively on Home View */}
            {isHomeView && onViewAllProducts && (
              <div className="text-center pt-4">
                <button
                  id="view-all-fittings-cta-btn"
                  onClick={onViewAllProducts}
                  className="bg-brand-text text-white hover:bg-brand-accent hover:shadow-xl border border-brand-text hover:border-brand-accent px-10 py-5 rounded-sm tracking-widest text-xs uppercase font-sans font-semibold shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                >
                  View Complete Showroom Catalog ({products.length} Products)
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-24 text-center bg-brand-card rounded-2xl border border-brand-border/80">
            <h3 className="font-serif text-2xl text-brand-text font-medium mb-2">No fixtures matching your request</h3>
            <p className="text-brand-text-sec text-sm max-w-sm mx-auto font-sans font-light">
              Try updating your search query or selecting another navigation tab to browse our curated options.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("ALL");
              }}
              className="mt-6 border border-brand-accent text-brand-accent px-6 py-2.5 rounded-sm tracking-widest text-xs uppercase"
            >
              Reset Category
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
