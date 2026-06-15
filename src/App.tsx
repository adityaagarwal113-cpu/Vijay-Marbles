import { useState, useEffect } from "react";
import { INITIAL_PRODUCTS, INITIAL_ORDERS, DEFAULT_SITE_CONFIG } from "./data";
import { Product, CartItem, Review, SiteConfig, Order } from "./types";
import { Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Reusable Showroom Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import ProductGrid from "./components/ProductGrid";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import OrderSuccessModal from "./components/OrderSuccessModal";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import AdminPortal from "./components/AdminPortal";

export default function App() {
  // Core dynamic database arrays stored in active state
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [activeTab, setActiveTab] = useState("home");

  // Shopping States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal & Portal Toggles
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Selected item computed
  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;

  // Hydrate local data on mount to provide full persistent capability
  useEffect(() => {
    const savedCart = localStorage.getItem("vijay_marbles_cart");
    const savedWishlist = localStorage.getItem("vijay_marbles_wishlist");
    const savedProducts = localStorage.getItem("vijay_marbles_products");
    const savedOrders = localStorage.getItem("vijay_marbles_orders");
    const savedConfig = localStorage.getItem("vijay_marbles_config");

    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
    }
    if (savedWishlist) {
      try { setWishlist(JSON.parse(savedWishlist)); } catch (e) { console.error(e); }
    }
    if (savedProducts) {
      try { setProducts(JSON.parse(savedProducts)); } catch (e) { console.error(e); }
    }
    if (savedOrders) {
      try { setOrders(JSON.parse(savedOrders)); } catch (e) { console.error(e); }
    }
    if (savedConfig) {
      try { setSiteConfig(JSON.parse(savedConfig)); } catch (e) { console.error(e); }
    }
  }, []);

  // Sync operations helpers
  const saveCartToStorage = (newCart: CartItem[]) => {
    localStorage.setItem("vijay_marbles_cart", JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: string[]) => {
    localStorage.setItem("vijay_marbles_wishlist", JSON.stringify(newWishlist));
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { product, quantity }];
      }
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      saveCartToStorage(updated);
      return updated;
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.product.id !== productId);
      saveCartToStorage(updated);
      return updated;
    });
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      let updated: string[];
      if (prev.includes(productId)) {
        updated = prev.filter((id) => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => {
      const updated = prev.filter((id) => id !== productId);
      saveWishlistToStorage(updated);
      return updated;
    });
  };

  // Reviews submission
  const handleAddReview = (productId: string, newReview: Omit<Review, "id" | "date">) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === productId) {
          const formattedReview: Review = {
            id: `review-${productId}-${Date.now()}`,
            userName: newReview.userName,
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date().toISOString().split("T")[0],
          };
          return {
            ...p,
            reviews: [formattedReview, ...p.reviews],
          };
        }
        return p;
      });
      localStorage.setItem("vijay_marbles_products", JSON.stringify(updated));
      return updated;
    });
  };

  // Order Placement - places a REAL Order object into Admin register in real-time
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const gst = subtotal * 0.05;
    const total = subtotal + gst;

    const newOrder: Order = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      customerName: "Aditya Agarwal",
      customerPhone: siteConfig.contactPhone || "+91 92292 65644",
      customerEmail: "adityaagarwal113@gmail.com",
      customerAddress: "Flat 102, Shanti Kutir, Link Road, Bandra West, Mumbai, MH - 400050",
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal,
      gst,
      total,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem("vijay_marbles_orders", JSON.stringify(updated));
      return updated;
    });

    setIsCartOpen(false);
    setIsSuccessOpen(true);
    setCart([]);
    localStorage.removeItem("vijay_marbles_cart");
  };

  // Administrative handlers passed down
  const handleUpdateSiteConfig = (newConfig: SiteConfig) => {
    setSiteConfig(newConfig);
    localStorage.setItem("vijay_marbles_config", JSON.stringify(newConfig));
  };

  const handleAdminAddProduct = (newProd: Omit<Product, "reviews">) => {
    const fresh: Product = { ...newProd, reviews: [] };
    setProducts((prev) => {
      const updated = [fresh, ...prev];
      localStorage.setItem("vijay_marbles_products", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAdminDeleteProduct = (id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("vijay_marbles_products", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAdminUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
      localStorage.setItem("vijay_marbles_orders", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAdminDeleteReview = (productId: string, reviewId: string) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            reviews: p.reviews.filter((r) => r.id !== reviewId),
          };
        }
        return p;
      });
      localStorage.setItem("vijay_marbles_products", JSON.stringify(updated));
      return updated;
    });
  };

  const handleScrollToGrid = () => {
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = () => {
    setActiveTab("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-brand-accent selection:text-white bg-brand-bg text-brand-text">
      
      {/* Sliding Announcement Banner Marquee matching mockup styling */}
      <div className="bg-[#FAF7F2] text-brand-accent tracking-[0.2em] text-[10px] uppercase font-sans font-semibold py-2.5 text-center border-b border-brand-border/60 relative z-50">
        <div className="inline-block animate-pulse">
          <span>{siteConfig.tagline}</span>
        </div>
      </div>

      {/* Header Sticky Navigation */}
      <Header
        cart={cart}
        wishlist={wishlist}
        products={products}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchChange={setSearchQuery}
        onProductClick={(p) => setSelectedProductId(p.id)}
        siteConfig={siteConfig}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Luxury Sections */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <Hero
                onShopClick={handleScrollToGrid}
                onExploreClick={handleScrollToAbout}
                siteConfig={siteConfig}
              />
              
              <About siteConfig={siteConfig} />
              
              <Features />
              
              <ProductGrid
                products={products}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onProductClick={(p) => setSelectedProductId(p.id)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={handleToggleWishlist}
                isHomeView={true}
                onViewAllProducts={() => {
                  setActiveTab("products");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
              
              <Testimonials />
              
              <CTASection siteConfig={siteConfig} />
            </motion.div>
          )}

          {activeTab === "products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-24"
            >
              <ProductGrid
                products={products}
                wishlist={wishlist}
                searchQuery={searchQuery}
                onProductClick={(p) => setSelectedProductId(p.id)}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onToggleWishlist={handleToggleWishlist}
                isHomeView={false}
              />
              
              <CTASection siteConfig={siteConfig} />
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="pt-24"
            >
              <About siteConfig={siteConfig} />
              
              <Features />
              
              <Testimonials />
              
              <CTASection siteConfig={siteConfig} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding seal */}
      <Footer siteConfig={siteConfig} />

      {/* Product Detail Custom Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        onAddToCart={handleAddToCart}
        onAddReview={handleAddReview}
      />

      {/* Live Cart Drawer Slider */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Curated Desires Wishlist Drawer Slider */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        products={products}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Order Complete Success Notification Popover */}
      <OrderSuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />

      {/* Floating Gear Action Button to Access Admin Panel (Matches user request perfectly) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsAdminOpen(true)}
          id="admin-gear-portal-trigger"
          className="bg-brand-text text-white hover:bg-brand-accent p-4 rounded-full shadow-2xl flex items-center justify-center border border-brand-border/20 transition-colors duration-300 pointer-events-auto cursor-pointer focus:outline-none"
          title="Open Admin Control Portal"
        >
          <Settings className="w-6 h-6 animate-[spin_20s_linear_infinite]" />
        </motion.button>
      </div>

      {/* Admin Panel Multi-tab Portal */}
      <AdminPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        siteConfig={siteConfig}
        onUpdateSiteConfig={handleUpdateSiteConfig}
        onAddProduct={handleAdminAddProduct}
        onDeleteProduct={handleAdminDeleteProduct}
        onUpdateOrderStatus={handleAdminUpdateOrderStatus}
        onDeleteReview={handleAdminDeleteReview}
      />
      
    </div>
  );
}
