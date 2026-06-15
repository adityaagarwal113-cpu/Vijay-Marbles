export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  reviews: Review[];
  features: string[];
  specs: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  userName: string;
  rating: number;
  text: string;
  role: string;
}

export interface SiteConfig {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroImage: string;
  aboutTitle: string;
  aboutText1: string;
  aboutText2: string;
  aboutImage: string;
  contactPhone: string;
  contactEmail: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  gst: number;
  total: number;
  date: string;
  status: "pending" | "processed" | "shipped" | "cancelled";
}

