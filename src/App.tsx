import { useState, useEffect } from "react";
import { INITIAL_PRODUCTS } from "./data";
import { Product, CartItem, Review } from "./types";

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

export default function App() {
  // Store products in state so reviews can be appended dynamically
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal & Drawer visibility toggles
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Derive selected product dynamically from state to ensure updated reviews reflect immediately
  const selectedProduct = products.find((p) => p.id === selectedProductId) || null;

  // Sync state with localStorage if wanted, but keep it clean
  useEffect(() => {
    const savedCart = localStorage.getItem("vijay_cart");
    const savedWishlist = localStorage.getItem("vijay_wishlist");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    localStorage.setItem("vijay_cart", JSON.stringify(newCart));
  };

  const saveWishlistToStorage = (newWishlist: string[]) => {
    localStorage.setItem("vijay_wishlist", JSON.stringify(newWishlist));
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

  // Append reviews dynamically inside local state
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
      return updated;
    });
  };

  const handlePlaceOrder = () => {
    setIsCartOpen(false);
    setIsSuccessOpen(true);
    setCart([]);
    localStorage.removeItem("vijay_cart");
  };

  const handleScrollToGrid = () => {
    const element = document.getElementById("product-collection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToAbout = () => {
    const element = document.getElementById("about-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-brand-accent selection:text-white bg-brand-bg text-brand-text">
      {/* Header Sticky Navigation */}
      <Header
        cart={cart}
        wishlist={wishlist}
        products={products}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSearchChange={setSearchQuery}
        onProductClick={(p) => setSelectedProductId(p.id)}
      />

      {/* Main Luxury Sections */}
      <main className="flex-1">
        <Hero
          onShopClick={handleScrollToGrid}
          onExploreClick={handleScrollToAbout}
        />
        
        <About />
        
        <Features />
        
        <ProductGrid
          products={products}
          wishlist={wishlist}
          searchQuery={searchQuery}
          onProductClick={(p) => setSelectedProductId(p.id)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          onToggleWishlist={handleToggleWishlist}
        />
        
        <Testimonials />
        
        <CTASection />
      </main>

      {/* Footer Branding seal */}
      <Footer />

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
    </div>
  );
}
