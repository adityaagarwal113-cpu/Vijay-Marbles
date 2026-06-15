import { Product, Testimonial, SiteConfig, Order } from "./types";

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  siteName: "VIJAY MARBLES",
  tagline: "EST. 1998 • CHROME & BRASS ATELIER",
  heroTitle: "Elevate Everyday Living",
  heroSubtitle: "Curated premium bathroom and kitchen fixtures crafted for timeless elegance.",
  heroButtonText: "SHOP COLLECTION",
  heroImage: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200", // Modern luxury bathroom background with brassware
  aboutTitle: "Our Craftsmanship",
  aboutText1: "At Vijay Marbles, we believe every fixture should be a blend of beauty and functionality. Our carefully curated collection of faucets, showers, and accessories brings refined craftsmanship into modern living spaces.",
  aboutText2: "With over two decades of trust, we supply leading interior designers, architects, and premium homeowners with high-grade brassware and sanitary fittings. Each component undergoes meticulous design checks, boasting durable multilayer coatings designed to repel residue and resist tarnishing for a lifetime.",
  aboutImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800", // High quality chrome tap / bathroom setting
  contactPhone: "9229265644",
  contactEmail: "helloakjain03@gmail.com"
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "long-body-bib-cock",
    name: "LONG BODY BIB COCK",
    price: 1250,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600",
    description: "An elegant, heavy-duty brass bib cock featuring a prolonged spout reach. The multi-layer high-luster chrome finish ensures a durable mirror shine and prevents corrosion, while providing a soft aerated flow.",
    features: [
      "100% Solid Extruded Brass Core Construction",
      "Premium Multi-layered Mirror Chrome Finish",
      "Integrated Water-saving Foam Flow Aerator",
      "Quarter-turn Ceramic Disc Cartridge for Drip-free Performance"
    ],
    specs: {
      Material: "Solid Extruded Brass",
      Finish: "Polished Mirror Chrome",
      InletSize: "1/2 inch BSP thread",
      FlowRate: "8.5 Litres/min at 3 Bar pressure",
      Warranty: "10-Year Leak-Free Valve Guarantee"
    },
    reviews: [
      {
        id: "r1",
        userName: "Amit Sharma",
        rating: 5,
        comment: "Excellent finish and premium quality. Installed in our master bathroom and it looks incredibly luxurious.",
        date: "2026-06-02"
      },
      {
        id: "r2",
        userName: "Suresh Gupta",
        rating: 5,
        comment: "Solid weight and very smooth lever motion. Definitely premium grade brassware.",
        date: "2026-06-10"
      }
    ]
  },
  {
    id: "pillar-cock",
    name: "PILLAR COCK",
    price: 1450,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=600",
    description: "A sleek, deck-mounted vertical pillar cock perfect for designer luxury washbasins. Features a high-arch goose-neck profile and effortless quarterly turn controls.",
    features: [
      "Modern Minimalist Single-Handle Design",
      "Eco-friendly Water-saving Neoperl Aerator",
      "Lead-Free Eco-Brass Core Structure",
      "Pristine Scratch-Resistant Outer Treatment"
    ],
    specs: {
      Material: "High-Grade Architectural Brass",
      Finish: "Satin Chrome Overlay",
      MountType: "Single Hole Deck Mounted",
      Cartridge: "Premium Ceramic Disc",
      Warranty: "10-Year Service Guarantee"
    },
    reviews: [
      {
        id: "r3",
        userName: "Priya Jain",
        rating: 5,
        comment: "Looks beautiful in our new bathroom. Easy to keep spot-free and the flow is super gentle.",
        date: "2026-05-28"
      }
    ]
  },
  {
    id: "sink-cock",
    name: "SINK COCK",
    price: 1850,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600",
    description: "A high-performance kitchen or utility sink tap engineered for premium homes. The 360-degree rotating swivel neck provides complete basin coverage with smooth, silent glide.",
    features: [
      "360-degree Smooth Swivel High-Arch Spout",
      "Dual-mode Spray & Stream Aerator with toggle control",
      "Heavy-Duty Thick Wall Brass Housing for Lifelong Durability",
      "Supplied with Premium Flexible Connectors"
    ],
    specs: {
      Material: "Heavy Solid-Cast Core Brass",
      Finish: "Warm Polished Chrome / Matte Accents",
      Rotation: "Full 360-Degree Swivel Range",
      WorkingPressure: "0.5 to 5.0 Bar operating capacity",
      Warranty: "7-Year Showroom Warranty"
    },
    reviews: [
      {
        id: "r4",
        userName: "Rajesh K.",
        rating: 5,
        comment: "Very elegant design. The swivel is butter smooth and double aerator is extremely practical for big sinks.",
        date: "2026-06-05"
      }
    ]
  },
  {
    id: "angle-cock",
    name: "ANGLE COCK",
    price: 950,
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=600",
    description: "High-grade forged brass quarter-turn angle valve designed for connecting water heaters, health faucets, and washbasins. Supplied with a matching premium heavy wall flange cover.",
    features: [
      "High-thickness Solid Brass Flange Plate",
      "Quarter-turn High-Resistance Ceramic Disc Spindle",
      "Extremely compact and neat flush wall-mount profile",
      "Tested to withstand high water temperature up to 90°C"
    ],
    specs: {
      Material: "Forged Heavy Brass Core",
      Finish: "Ultra-Durable Triple Chrome Plating",
      Connections: "1/2 inch Metric Inlet x 1/2 inch Outlet",
      PressureRating: "PN-10 leakproof certification"
    },
    reviews: []
  },
  {
    id: "shower",
    name: "SHOWER",
    price: 2850,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=600",
    description: "An incredibly immersive overhead rain showerhead with premium self-cleaning silicon nozzles. Designed with air-injection technology to deliver standard luxury pressure even with low inlet pressure.",
    features: [
      "Generous 8-inch Slim Rain Shower Faceplate",
      "Self-cleaning German Silicon Anti-calcification Nozzles",
      "Includes Heavy Brass Shower Arm & Threaded Wall escutcheon",
      "Oxygen-enriched droplets for a soothing spa experience"
    ],
    specs: {
      Material: "Premium Grade SS-304 Face & Heavy Brass Swivel Joint",
      Finish: "Mirror-Like Chrome Electroplating",
      Dimensions: "200mm x 200mm Square Shape",
      FlowRegulator: "In-built 9.5 LPM flow saver pre-installed"
    },
    reviews: [
      {
        id: "r5",
        userName: "Ananya Deshpande",
        rating: 5,
        comment: "The rain flow is incredibly soothing. Feels like a premium hotel spa. No clogging or scaling after months of use.",
        date: "2026-06-12"
      }
    ]
  },
  {
    id: "towel-rod",
    name: "TOWEL ROD",
    price: 1150,
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600",
    description: "Sleek, horizontal metal towel bar styled to complement modern high-end bathroom suites. Solid concealed wall fasteners ensure absolute structural stability.",
    features: [
      "Double concealed structural screw mounting brackets",
      "Steam-proof and rust-proof high polished plating",
      "Sleek 24-inch length offers generous drying space",
      "Smooth round corners protect soft premium linen and accessories"
    ],
    specs: {
      Material: "Heavy-Gauge Structural Alloys & Brass Posts",
      Finish: "Glossy Protective Chrome Seal",
      OverallLength: "24 inches (610mm)",
      MaxWeightCap: "Strictly rated up to 15kg load"
    },
    reviews: []
  },
  {
    id: "soap-dispenser",
    name: "SOAP DISPENSER",
    price: 850,
    image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=600",
    description: "A premium designer wall-mounted liquid soap holder. Styled from frosted tempered heavy glass and paired with an elegant solid brass pump head.",
    features: [
      "Easy-press solid brass core pump mechanism",
      "Rustproof and non-dripping interior dispenser tube",
      "Frosted elegant heavy-duty glass container",
      "Saves sink space with secure sleek wall-bracket mount"
    ],
    specs: {
      Material: "Tempered Frosted Vessel & Brass Pump Fitting",
      Finish: "Polished Chrome / Satin Rim Accent",
      Capacity: "350 ml storage volume",
      MountStyle: "Dual-anchor wall mount"
    },
    reviews: []
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    userName: "Amit Sharma",
    rating: 5,
    text: "Vijay Marbles completely transformed our villa bathrooms. The chrome finish on the pillar cocks is literally mirror-like and feels so heavy and solid in hand. A truly premium brand with flawless service.",
    role: "Architect & Partner, Studio V"
  },
  {
    id: "t2",
    userName: "Priya Jain",
    rating: 5,
    text: "The matte sink cocks perform flawlessly, turning silently with absolute ease. Finding this level of designer brassware at honest prices is rare. Highly recommended for premium homes.",
    role: "Interior Stylist, Mumbai"
  },
  {
    id: "t3",
    userName: "Rohan Kapoor",
    rating: 5,
    text: "Their concierge customized fitting sizes for our unique rain shower pipes without any delay. The durability and finish are leagues ahead of common retail alternatives. Five-star experience.",
    role: "Luxury Homeowner, Pune"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-9841",
    customerName: "Aditya Agarwal",
    customerPhone: "9229265644",
    customerEmail: "adityaagarwal113@gmail.com",
    customerAddress: "Flat 102, Shanti Kutir, Link Road, Bandra West, Mumbai, MH - 400050",
    items: [
      {
        productId: "long-body-bib-cock",
        productName: "LONG BODY BIB COCK",
        price: 1250,
        quantity: 2
      },
      {
        productId: "shower",
        productName: "SHOWER",
        price: 2850,
        quantity: 1
      }
    ],
    subtotal: 5350,
    gst: 267.5,
    total: 5617.5,
    date: "2026-06-14",
    status: "pending"
  },
  {
    id: "ORD-9524",
    customerName: "Anjali Mehta",
    customerPhone: "+91 98251 12345",
    customerEmail: "anjali.mehta@yahoo.com",
    customerAddress: "Saraswati Bungalow, Near Judges Bungalow Road, Bodakdev, Ahmedabad, GJ - 380054",
    items: [
      {
        productId: "sink-cock",
        productName: "SINK COCK",
        price: 1850,
        quantity: 1
      }
    ],
    subtotal: 1850,
    gst: 92.5,
    total: 1942.5,
    date: "2026-06-12",
    status: "processed"
  }
];
