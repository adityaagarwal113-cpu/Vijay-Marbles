import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  LayoutDashboard,
  Package,
  ClipboardList,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Check,
  RotateCcw,
  RefreshCw,
  ShoppingBag,
  DollarSign,
  AlertCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { Product, Order, SiteConfig, Review } from "../types";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  siteConfig: SiteConfig;
  onUpdateSiteConfig: (config: SiteConfig) => void;
  onAddProduct: (product: Omit<Product, "reviews">) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void;
  onDeleteReview: (productId: string, reviewId: string) => void;
}

type AdminTab = "dashboard" | "products" | "orders" | "reviews" | "site-config";

export default function AdminPortal({
  isOpen,
  onClose,
  products,
  orders,
  siteConfig,
  onUpdateSiteConfig,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onDeleteReview
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  // Site Config form states
  const [siteNameState, setSiteNameState] = useState(siteConfig.siteName);
  const [taglineState, setTaglineState] = useState(siteConfig.tagline);
  const [heroTitleState, setHeroTitleState] = useState(siteConfig.heroTitle);
  const [heroSubtitleState, setHeroSubtitleState] = useState(siteConfig.heroSubtitle);
  const [heroButtonTextState, setHeroButtonTextState] = useState(siteConfig.heroButtonText);
  const [heroImageState, setHeroImageState] = useState(siteConfig.heroImage);
  const [aboutTitleState, setAboutTitleState] = useState(siteConfig.aboutTitle);
  const [aboutText1State, setAboutText1State] = useState(siteConfig.aboutText1);
  const [aboutText2State, setAboutText2State] = useState(siteConfig.aboutText2);
  const [aboutImageState, setAboutImageState] = useState(siteConfig.aboutImage);
  const [contactPhoneState, setContactPhoneState] = useState(siteConfig.contactPhone);
  const [contactEmailState, setContactEmailState] = useState(siteConfig.contactEmail);

  // New product form states
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdPrice, setNewProdPrice] = useState<number | "">("");
  const [newProdImage, setNewProdImage] = useState("");
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdFeature1, setNewProdFeature1] = useState("");
  const [newProdFeature2, setNewProdFeature2] = useState("");
  const [newProdFeature3, setNewProdFeature3] = useState("");
  const [newProdFabric, setNewProdFabric] = useState("");
  const [newProdColor, setNewProdColor] = useState("");
  const [newProdCraft, setNewProdCraft] = useState("");

  if (!isOpen) return null;

  // Handle saving the dynamic configuration
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteConfig({
      siteName: siteNameState,
      tagline: taglineState,
      heroTitle: heroTitleState,
      heroSubtitle: heroSubtitleState,
      heroButtonText: heroButtonTextState,
      heroImage: heroImageState,
      aboutTitle: aboutTitleState,
      aboutText1: aboutText1State,
      aboutText2: aboutText2State,
      aboutImage: aboutImageState,
      contactPhone: contactPhoneState,
      contactEmail: contactEmailState
    });
    // Trigger toast notification
    alert("✨ Configuration updated successfully!");
  };

  // Preset sample image selections for showroom
  const PRESET_IMAGES = [
    { title: "Long Body Cock", url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600" },
    { title: "Pillar Cock", url: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600" },
    { title: "Sink Cock", url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600" },
    { title: "Angle Valve", url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600" },
    { title: "Rain Shower", url: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=600" }
  ];

  // Handle adding a new showroom hardware item
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdImage) {
      alert("Please complete the Name, Price, and Image URL fields.");
      return;
    }

    const priceNum = Number(newProdPrice);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid product price.");
      return;
    }

    const featuresArr = [newProdFeature1, newProdFeature2, newProdFeature3].filter(Boolean);
    const specsObj: Record<string, string> = {};
    if (newProdFabric) specsObj["Material"] = newProdFabric;
    if (newProdColor) specsObj["Color"] = newProdColor;
    if (newProdCraft) specsObj["Finish"] = newProdCraft;
    specsObj["Care Instructions"] = "Wipe with soft cloth; avoid harsh cleaners";
    specsObj["Warranty"] = "10-Year Service Guarantee";

    onAddProduct({
      id: "prod-" + Date.now(),
      name: newProdName,
      price: priceNum,
      image: newProdImage,
      description: newProdDesc || "High-performance designer bathroom fixture featuring multi-layered copper-alloy plating and smooth quarter-turn control.",
      features: featuresArr.length ? featuresArr : ["Solid brass core casing", "Multi-layer mirror-gloss plating", "Integrated water-saving aerator"],
      specs: specsObj
    });

    // Reset fields
    setNewProdName("");
    setNewProdPrice("");
    setNewProdImage("");
    setNewProdDesc("");
    setNewProdFeature1("");
    setNewProdFeature2("");
    setNewProdFeature3("");
    setNewProdFabric("");
    setNewProdColor("");
    setNewProdCraft("");
    setIsAddingProduct(false);
  };

  // Compute Dashboard Statistics
  const totalRevenue = orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.total, 0);

  const activeCatalogCount = products.length;
  const pendingOrdersCount = orders.filter(o => o.status === "pending").length;

  const totalReviewsCount = products.reduce((sum, p) => sum + p.reviews.length, 0);

  // Collect all reviews into a single list
  const allReviewsList: { pr: Product; rv: Review }[] = [];
  products.forEach(p => {
    p.reviews.forEach(r => {
      allReviewsList.push({ pr: p, rv: r });
    });
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-text/50 font-sans backdrop-blur-sm flex justify-center items-start p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="bg-brand-bg w-full max-w-7xl rounded-md overflow-hidden border border-brand-border shadow-2xl flex flex-col min-h-[85vh] mt-4"
      >
        {/* Banner/Header bar inside the portal */}
        <div className="bg-[#FAF7F2] border-b border-brand-border p-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Close / Back button */}
            <button
              onClick={onClose}
              className="text-brand-text hover:text-brand-accent p-2 rounded-full hover:bg-brand-bg-sec transition-colors cursor-pointer"
              aria-label="Back to Storefront"
              id="admin-back-btn"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-brand-text">
                Admin Control Portal
              </h2>
              <p className="text-[10px] tracking-[0.25em] text-brand-accent uppercase font-medium mt-0.5">
                MANAGING {siteConfig.siteName}
              </p>
            </div>
          </div>

          {/* Navigation Tab pills */}
          <div className="flex overflow-x-auto max-w-full scrollbar-none items-center bg-brand-bg-sec p-1 rounded-full border border-brand-border gap-1 md:gap-0">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "products", label: "Products", icon: Package },
              { id: "orders", label: "Orders", icon: ClipboardList },
              { id: "reviews", label: "Reviews", icon: MessageSquare },
              { id: "site-config", label: "Site Config", icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as AdminTab)}
                  className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2.5 rounded-full transition-all tracking-wider uppercase cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-brand-text text-white shadow-md transform scale-102"
                      : "text-brand-text-sec hover:text-brand-text hover:bg-brand-bg/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Content Panel */}
        <div className="flex-1 p-6 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* ==================================== DASHBOARD TAB ==================================== */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* StatCard 1 */}
                    <div className="bg-brand-card p-6 rounded-md border border-brand-border shadow-sm flex items-start justify-between">
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-brand-text-sec font-medium">
                          Total Revenue
                        </span>
                        <h3 className="font-serif text-3xl font-semibold text-brand-text">
                          ₹{totalRevenue.toLocaleString("en-IN")}
                        </h3>
                        <p className="text-[10px] text-brand-success font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Includes processed & pending</span>
                        </p>
                      </div>
                      <div className="bg-brand-success/10 text-brand-success p-3 rounded-full">
                        <DollarSign className="w-6 h-6" />
                      </div>
                    </div>

                    {/* StatCard 2 */}
                    <div className="bg-brand-card p-6 rounded-md border border-brand-border shadow-sm flex items-start justify-between">
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-brand-text-sec font-medium">
                          Showroom Catalog
                        </span>
                        <h3 className="font-serif text-3xl font-semibold text-brand-text">
                          {activeCatalogCount}
                        </h3>
                        <p className="text-[10px] text-brand-text-sec font-mono">
                          Active showroom designs
                        </p>
                      </div>
                      <div className="bg-brand-accent/10 text-brand-accent p-3 rounded-full">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    </div>

                    {/* StatCard 3 */}
                    <div className="bg-brand-card p-6 rounded-md border border-brand-border shadow-sm flex items-start justify-between">
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-brand-text-sec font-medium">
                          Pending Orders
                        </span>
                        <h3 className="font-serif text-3xl font-semibold text-brand-accent">
                          {pendingOrdersCount}
                        </h3>
                        <p className="text-[10px] text-[#A67C52] font-semibold flex items-center gap-1 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Needs verification</span>
                        </p>
                      </div>
                      <div className="bg-amber-100/50 text-[#A67C52] p-3 rounded-full">
                        <ClipboardList className="w-6 h-6" />
                      </div>
                    </div>

                    {/* StatCard 4 */}
                    <div className="bg-brand-card p-6 rounded-md border border-brand-border shadow-sm flex items-start justify-between">
                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-widest text-brand-text-sec font-medium">
                          Customer Reviews
                        </span>
                        <h3 className="font-serif text-3xl font-semibold text-brand-text">
                          {totalReviewsCount}
                        </h3>
                        <p className="text-[10px] text-brand-text-sec font-mono mt-0.5">
                          Authentic social voices
                        </p>
                      </div>
                      <div className="bg-[#F3EEE8] text-brand-text-sec p-3 rounded-full">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Operational Updates Log */}
                  <div className="bg-brand-card p-6 rounded-md border border-brand-border shadow-sm">
                    <h4 className="font-serif text-lg font-medium tracking-tight mb-4 text-brand-text">
                      Recent Activity & Status Reports
                    </h4>
                    <div className="space-y-4">
                      {orders.length === 0 ? (
                        <p className="text-sm text-brand-text-sec">No recent orders yet.</p>
                      ) : (
                        orders.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-3 border-b border-brand-border last:border-none"
                          >
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-brand-text">
                                Order {item.id} received from {item.customerName}
                              </p>
                              <p className="text-xs text-brand-text-sec font-mono">
                                Total: ₹{item.total.toLocaleString("en-IN")} • {item.date}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${
                                item.status === "pending"
                                  ? "bg-amber-100 text-[#A67C52]"
                                  : item.status === "processed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : item.status === "shipped"
                                  ? "bg-sky-100 text-sky-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================== PRODUCTS TAB ==================================== */}
              {activeTab === "products" && (
                <div className="space-y-8">
                  {/* Top Header Section */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-medium tracking-tight text-brand-text uppercase">
                      Active Showcase Catalog ({products.length})
                    </h3>
                    <button
                      onClick={() => setIsAddingProduct(!isAddingProduct)}
                      className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-5 py-3 rounded-full flex items-center space-x-2 tracking-widest uppercase transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product</span>
                    </button>
                  </div>

                  {/* Add Product Form Collapse */}
                  {isAddingProduct && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleAddProductSubmit}
                      className="bg-[#FAF7F2] border border-brand-border rounded-md p-6 md:p-8 space-y-6"
                    >
                      <div className="border-b border-brand-border pb-4">
                        <h4 className="font-serif text-lg font-medium text-brand-text mt-1">
                          Add Showroom Product
                        </h4>
                        <p className="text-xs text-brand-text-sec font-mono">
                          Introduce designer hardware or premium accessories to the store catalog
                        </p>
                      </div>

                      {/* Input inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={newProdName}
                            onChange={(e) => setNewProdName(e.target.value)}
                            placeholder="e.g. MULTI-FLOW SINK COCK"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Aesthetic Price (INR) *
                          </label>
                          <input
                            type="number"
                            required
                            min="100"
                            value={newProdPrice}
                            onChange={(e) => setNewProdPrice(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="e.g. 1850"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Image URL *
                          </label>
                          <input
                            type="text"
                            required
                            value={newProdImage}
                            onChange={(e) => setNewProdImage(e.target.value)}
                            placeholder="Paste Unsplash URL or pick below"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>
                      </div>

                      {/* Unsplash Preset suggestions for easy testing */}
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-brand-text-sec block mb-2">
                          Testing Presets (Click an image to fetch URL instantly):
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {PRESET_IMAGES.map((img, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setNewProdImage(img.url);
                                if (!newProdName) setNewProdName(img.title + " Set");
                              }}
                              className="group text-left border border-brand-border/60 hover:border-brand-accent p-1.5 rounded bg-white flex items-center space-x-2 transition-all cursor-pointer"
                            >
                              <img
                                src={img.url}
                                alt={img.title}
                                className="w-8 h-8 rounded object-cover"
                              />
                              <span className="text-[9px] font-medium text-brand-text-sec group-hover:text-brand-accent truncate">
                                {img.title}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                          Design Description
                        </label>
                        <textarea
                          value={newProdDesc}
                          onChange={(e) => setNewProdDesc(e.target.value)}
                          placeholder="Describe the elegant finish, quality core brass, and special flow features..."
                          rows={3}
                          className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                        />
                      </div>

                      {/* Craft specifics and Features */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Material / Core Metal
                          </label>
                          <input
                            type="text"
                            value={newProdFabric}
                            onChange={(e) => setNewProdFabric(e.target.value)}
                            placeholder="e.g. Forged Solid Brass Core"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Plating Finish / Color
                          </label>
                          <input
                            type="text"
                            value={newProdColor}
                            onChange={(e) => setNewProdColor(e.target.value)}
                            placeholder="e.g. Polished Mirror Chrome"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-wider font-semibold text-brand-text">
                            Cartridge Quality
                          </label>
                          <input
                            type="text"
                            value={newProdCraft}
                            onChange={(e) => setNewProdCraft(e.target.value)}
                            placeholder="e.g. 1/4-Turn Ceramic Disc"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm text-brand-text focus:outline-none focus:ring-1 focus:ring-brand-accent w-full"
                          />
                        </div>
                      </div>

                      {/* Core Highlights */}
                      <div className="space-y-3">
                        <label className="text-xs uppercase tracking-wider font-semibold text-brand-text block">
                          Core Craft Highlights (Bullet points on card details)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            value={newProdFeature1}
                            onChange={(e) => setNewProdFeature1(e.target.value)}
                            placeholder="Highlight 1: e.g. 100% Solid Extruded Brass Core"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm focus:outline-none w-full"
                          />
                          <input
                            type="text"
                            value={newProdFeature2}
                            onChange={(e) => setNewProdFeature2(e.target.value)}
                            placeholder="Highlight 2: e.g. Multi-layer High-Gloss Chrome coating"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm focus:outline-none w-full"
                          />
                          <input
                            type="text"
                            value={newProdFeature3}
                            onChange={(e) => setNewProdFeature3(e.target.value)}
                            placeholder="Highlight 3: e.g. Quarter-turn Ceramic Disc stem"
                            className="bg-white border border-brand-border rounded-md p-3 text-sm focus:outline-none w-full"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProduct(false)}
                          className="border border-brand-border hover:bg-brand-bg-sec px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-brand-accent text-white hover:bg-brand-accent-hover px-8 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md cursor-pointer"
                        >
                          Save New Product
                        </button>
                      </div>
                    </motion.form>
                  )}

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((item) => (
                      <div
                        key={item.id}
                        className="bg-brand-card rounded-md border border-brand-border overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col group"
                      >
                        {/* Image wrapper */}
                        <div className="aspect-[4/5] overflow-hidden relative bg-[#FAF7F2]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                          <span className="absolute top-4 left-4 bg-brand-text text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>

                        {/* Product details */}
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <h4 className="font-serif text-lg font-medium text-brand-text tracking-wide uppercase line-clamp-1">
                              {item.name}
                            </h4>
                            <p className="text-xs text-brand-text-sec line-clamp-2 mt-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {/* Action footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-brand-border/60">
                            <span className="text-[10px] font-mono font-medium text-brand-accent">
                              ID: {item.id}
                            </span>
                            <button
                              id={`delete-prod-${item.id}`}
                              onClick={() => {
                                if (
                                  confirm(`Are you sure you want to remove \"${item.name}\" from the catalog?`)
                                ) {
                                  onDeleteProduct(item.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors cursor-pointer"
                              title="Delete Design"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================== ORDERS TAB ==================================== */}
              {activeTab === "orders" && (
                <div className="space-y-8">
                  <div className="border-b border-brand-border pb-4">
                    <h3 className="font-serif text-xl font-medium tracking-wide text-brand-text uppercase">
                      Showroom Order Register
                    </h3>
                    <p className="text-xs text-brand-text-sec font-mono mt-1">
                      Process high-end fixture delivery or customer reservation orders from local bookings
                    </p>
                  </div>

                  {orders.length === 0 ? (
                    <div className="bg-brand-card p-12 text-center rounded-md border border-brand-border">
                      <p className="text-sm text-brand-text-sec font-mono">No customer orders filed yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="bg-brand-card rounded-md border border-brand-border shadow-sm overflow-hidden"
                        >
                          {/* Order sub bar info */}
                          <div className="bg-[#FAF7F2] p-4 px-6 border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                              <span className="font-serif font-semibold text-brand-text">
                                {ord.id}
                              </span>
                              <span className="text-xs font-mono text-brand-text-sec">
                                {ord.date}
                              </span>
                            </div>

                            {/* Status Pills dropdown actions */}
                            <div className="flex items-center space-x-3">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-text-sec">
                                Order Status:
                              </span>
                              <select
                                id={`status-select-${ord.id}`}
                                value={ord.status}
                                onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as Order["status"])}
                                className={`text-xs font-bold uppercase tracking-wider rounded-full px-4 py-1.5 focus:outline-none border border-brand-border cursor-pointer ${
                                  ord.status === "pending"
                                    ? "bg-amber-100 text-[#A67C52]"
                                    : ord.status === "processed"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : ord.status === "shipped"
                                    ? "bg-sky-100 text-sky-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                <option value="pending" className="text-amber-800 uppercase">Pending</option>
                                <option value="processed" className="text-emerald-800 uppercase">Processed</option>
                                <option value="shipped" className="text-sky-800 uppercase">Shipped</option>
                                <option value="cancelled" className="text-red-800 uppercase">Cancelled</option>
                              </select>
                            </div>
                          </div>

                          {/* Customer address & Cart deliverables */}
                          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Contact Card */}
                            <div className="space-y-3 md:border-r border-brand-border/60 md:pr-8">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B99772] font-mono">
                                Customer Delivery Profile
                              </span>
                              <div className="space-y-1">
                                <h4 className="font-semibold text-brand-text text-sm">
                                  {ord.customerName}
                                </h4>
                                <p className="text-xs text-brand-text-sec">{ord.customerEmail}</p>
                                <p className="text-xs text-brand-text-sec">{ord.customerPhone}</p>
                                <p className="text-xs text-brand-text-sec leading-relaxed mt-2 p-2.5 bg-brand-bg-sec rounded border border-brand-border/60">
                                  {ord.customerAddress}
                                </p>
                              </div>
                            </div>

                            {/* Ordered items summary */}
                            <div className="space-y-3 md:col-span-2 flex flex-col justify-between">
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#B99772] font-mono block">
                                  Deliverable Products Summary
                                </span>
                                <div className="space-y-2">
                                  {ord.items.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between text-xs py-1 border-b border-brand-border/40 last:border-none text-brand-text"
                                    >
                                      <span>
                                        {item.productName}{" "}
                                        <strong className="text-brand-accent ml-1">
                                          x{item.quantity}
                                        </strong>
                                      </span>
                                      <span className="font-mono">
                                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Price check summary */}
                              <div className="bg-brand-bg-sec/50 p-4 rounded border border-brand-border/40 mt-4">
                                <div className="grid grid-cols-2 gap-2 text-xs font-mono text-brand-text">
                                  <div>Subtotal:</div>
                                  <div className="text-right">₹{ord.subtotal.toLocaleString("en-IN")}</div>
                                  <div>Estimating GST (5%):</div>
                                  <div className="text-right">₹{ord.gst.toLocaleString("en-IN")}</div>
                                  <div className="font-bold border-t border-brand-border/40 pt-2 mt-1">
                                    Grand Total:
                                  </div>
                                  <div className="font-bold text-right border-t border-brand-border/40 pt-2 mt-1 text-brand-accent">
                                    ₹{ord.total.toLocaleString("en-IN")}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ==================================== REVIEWS TAB ==================================== */}
              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="border-b border-brand-border pb-4">
                    <h3 className="font-serif text-xl font-medium tracking-wide text-brand-text uppercase">
                      Showroom Reviews Guard
                    </h3>
                    <p className="text-xs text-brand-text-sec font-mono mt-1">
                      Monitor customer reviews, flag inappropriate content, or manage ratings instantly
                    </p>
                  </div>

                  {allReviewsList.length === 0 ? (
                    <div className="bg-brand-card p-12 text-center rounded-md border border-brand-border">
                      <p className="text-sm text-brand-text-sec font-mono">No client reviews reported yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {allReviewsList.map((entry) => {
                        const { pr, rv } = entry;
                        return (
                          <div
                            key={rv.id}
                            className="bg-brand-card rounded-md border border-brand-border p-6 shadow-sm flex flex-col justify-between space-y-4"
                          >
                            <div className="space-y-2">
                              {/* Product Context subtitle */}
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] uppercase tracking-wider font-bold bg-[#FAF7F2] text-brand-accent px-2.5 py-1 rounded inline-block truncate max-w-[200px]">
                                  Sourced from: {pr.name}
                                </span>
                                <span className="text-[10px] font-mono text-brand-text-sec">
                                  {rv.date}
                                </span>
                              </div>

                              <div className="flex items-center space-x-1 text-amber-500 text-sm">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>
                                    {i < rv.rating ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>

                              <blockquote className="text-sm text-brand-text italic leading-relaxed pt-1">
                                "{rv.comment}"
                              </blockquote>
                            </div>

                            {/* Moderator footer card */}
                            <div className="flex items-center justify-between border-t border-brand-border/60 pt-4 mt-2">
                              <cite className="text-xs not-italic font-semibold text-brand-text">
                                — {rv.userName}
                              </cite>
                              <button
                                id={`delete-review-${rv.id}`}
                                onClick={() => {
                                  if (
                                    confirm(`Are you sure you want to delete ${rv.userName}'s review for ${pr.name}?`)
                                  ) {
                                    onDeleteReview(pr.id, rv.id);
                                  }
                                }}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition-all cursor-pointer flex items-center space-x-1"
                                title="Remove Review"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="text-[10px] font-semibold tracking-wider uppercase">Purge</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ==================================== SITE CONFIG TAB ==================================== */}
              {activeTab === "site-config" && (
                <form onSubmit={handleSaveConfig} className="space-y-8 text-brand-text">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-border pb-4 gap-4">
                    <div>
                      <h3 className="font-serif text-xl font-medium tracking-wide uppercase">
                        Dynamic Site Configurator
                      </h3>
                      <p className="text-xs text-brand-text-sec font-mono mt-1">
                        Editing below parameters modifies the landing titles, values & contact lists instantly
                      </p>
                    </div>
                    <button
                      type="submit"
                      id="save-config-btn"
                      className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-8 py-3 rounded-full flex items-center justify-center space-x-2 tracking-widest uppercase transition-all shadow-md mt-2 sm:mt-0 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  {/* Core cards stacked (Image 3 mockup style) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Brand Settings Section */}
                    <div className="bg-brand-card p-6 md:p-8 rounded-md border border-brand-border shadow-sm space-y-6">
                      <div className="flex items-center space-x-3 border-b border-brand-border pb-3">
                        <div className="bg-[#FAF7F2] p-2 text-brand-accent rounded">
                          <Settings className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-medium text-brand-text">
                          Brand Settings
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                            Store / Site Name
                          </label>
                          <input
                            type="text"
                            id="config-site-name"
                            value={siteNameState}
                            onChange={(e) => setSiteNameState(e.target.value)}
                            placeholder="VIJAY MARBLES"
                            className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full text-brand-text font-serif font-semibold"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                            Announcement Marquee Text
                          </label>
                          <textarea
                            id="config-announcement-text"
                            value={taglineState}
                            onChange={(e) => setTaglineState(e.target.value)}
                            placeholder="✦ EST. 1998 • CHROME & BRASS ATELIER ✦ CRADLED IN PREMIUM ACCENTS..."
                            rows={3}
                            className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs leading-relaxed focus:outline-none w-full text-brand-text"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                            Philosophical Quote Text
                          </label>
                          <textarea
                            id="config-quote-text"
                            value={aboutTitleState}
                            onChange={(e) => setAboutTitleState(e.target.value)}
                            placeholder="Every color in our palette is a feeling..."
                            rows={3}
                            className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs leading-relaxed italic focus:outline-none w-full text-brand-text"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hero Banner Section */}
                    <div className="bg-brand-card p-6 md:p-8 rounded-md border border-brand-border shadow-sm space-y-6">
                      <div className="flex items-center space-x-3 border-b border-brand-border pb-3">
                        <div className="bg-[#FAF7F2] p-2 text-brand-accent rounded">
                          <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-medium text-brand-text">
                          Hero Banner Configurations
                        </h4>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              Main Title
                            </label>
                            <input
                              type="text"
                              id="config-hero-title"
                              value={heroTitleState}
                              onChange={(e) => setHeroTitleState(e.target.value)}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              Button Text
                            </label>
                            <input
                              type="text"
                              id="config-hero-btn"
                              value={heroButtonTextState}
                              onChange={(e) => setHeroButtonTextState(e.target.value)}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                            Hero Subtitle / Tagline
                          </label>
                          <textarea
                            id="config-hero-sub"
                            value={heroSubtitleState}
                            onChange={(e) => setHeroSubtitleState(e.target.value)}
                            rows={2}
                            className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs focus:outline-none w-full text-brand-text"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                            Main Banner Image URL
                          </label>
                          <input
                            type="text"
                            id="config-hero-img"
                            value={heroImageState}
                            onChange={(e) => setHeroImageState(e.target.value)}
                            className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs font-mono focus:outline-none w-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* About Craft Philosophy Section */}
                    <div className="bg-brand-card p-6 md:p-8 rounded-md border border-brand-border shadow-sm space-y-6 lg:col-span-2">
                      <div className="flex items-center space-x-3 border-b border-brand-border pb-3">
                        <div className="bg-[#FAF7F2] p-2 text-brand-accent rounded">
                          <FileText className="w-5 h-5" />
                        </div>
                        <h4 className="font-serif text-lg font-medium text-brand-text">
                          Bespoke Narrative & Contact Concierge
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              About Section Philosophy Title
                            </label>
                            <input
                              type="text"
                              value={taglineState} // re-using tag/tagline mapping
                              onChange={(e) => setTaglineState(e.target.value)}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full font-serif"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              Bespoke Narrative Paragraph 1
                            </label>
                            <textarea
                              value={aboutText1State}
                              onChange={(e) => setAboutText1State(e.target.value)}
                              rows={4}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs leading-relaxed focus:outline-none w-full"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              Bespoke Narrative Paragraph 2
                            </label>
                            <textarea
                              value={aboutText2State}
                              onChange={(e) => setAboutText2State(e.target.value)}
                              rows={4}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs leading-relaxed focus:outline-none w-full"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                                Contact Phone
                              </label>
                              <input
                                type="text"
                                value={contactPhoneState}
                                onChange={(e) => setContactPhoneState(e.target.value)}
                                className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full font-mono"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                                Contact Email Address
                              </label>
                              <input
                                type="email"
                                value={contactEmailState}
                                onChange={(e) => setContactEmailState(e.target.value)}
                                className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-sm focus:outline-none w-full"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-sec block">
                              About Showcase Image URL
                            </label>
                            <input
                              type="text"
                              value={aboutImageState}
                              onChange={(e) => setAboutImageState(e.target.value)}
                              className="bg-[#FAF7F2]/50 border border-brand-border rounded p-3 text-xs font-mono focus:outline-none w-full"
                            />
                            {aboutImageState && (
                              <img
                                src={aboutImageState}
                                alt="About preview"
                                className="w-full h-32 object-cover rounded mt-2 border border-brand-border"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Submission footer */}
                  <div className="flex justify-end pt-4 border-t border-brand-border">
                    <button
                      type="submit"
                      className="bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold px-10 py-4 rounded-full tracking-widest uppercase transition-all shadow-md cursor-pointer"
                    >
                      Apply All Configurations
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
