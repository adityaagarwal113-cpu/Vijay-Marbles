import { Product, Testimonial } from "./types";

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "long-body-bib-cock",
    name: "LONG BODY BIB COCK",
    price: 1250,
    image: "https://images.unsplash.com/photo-1584622781514-f570d603e12e?auto=format&fit=crop&q=80&w=600",
    description: "An elegant, long-body bib cock cast from high-grade solid virgin brass. Engineered with multi-layered luxury mirror chrome plating and our proprietary ceramic disc cartridges for leak-proof longevity.",
    features: [
      "Solid Lead-Free Brass Construction",
      "Seven-Layer Mirror Finish Chrome Plating",
      "Quarter-turn SilkControl Ceramic Disc Cartridge",
      "High-performance honeycomb aerator for a splash-free, soft foam flow"
    ],
    specs: {
      Material: "Premium Virgin Brass",
      Finish: "Polished Mirror Chrome",
      "Cartridge Life": "Up to 500,000 cycles",
      Inlet: "1/2 inch BSP thread",
      Warranty: "10 Years Limited Warranty"
    },
    reviews: [
      {
        id: "r1-1",
        userName: "Amit Sharma",
        rating: 5,
        comment: "Excellent finish and premium quality. Looks ultra luxury in my powder room.",
        date: "2026-05-12"
      }
    ]
  },
  {
    id: "pillar-cock",
    name: "PILLAR COCK",
    price: 1450,
    image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&q=80&w=600",
    description: "Designed for premium deck-mounted basins, this majestic pillar cock combines high-profile design with unmatched sensory feedback. The quarter-turn lever action represents the pinnacle of tactile ergonomics.",
    features: [
      "Striking deck-mount architectural configuration",
      "Anti-scale Aerator with self-cleaning capabilities",
      "Ultra-precise hot/cold or ambient water control",
      "Heavy weighted luxury brass base plate"
    ],
    specs: {
      Material: "Architectural Grade Brass",
      Finish: "Warm Brass / High Gloss Polish",
      Mounting: "Deck Mounted",
      "Height of Spout": "150 mm",
      Warranty: "10 Years Limited Warranty"
    },
    reviews: [
      {
        id: "r2-1",
        userName: "Priya Jain",
        rating: 5,
        comment: "Looks beautiful in our new bathroom. The turn movement is incredibly smooth.",
        date: "2026-06-01"
      }
    ]
  },
  {
    id: "sink-cock",
    name: "SINK COCK",
    price: 1850,
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=600",
    description: "A premium kitchen workstation and wet bar masterpiece. Our high-arch swivel sink cock offers comprehensive basin coverage, turning modern meal preparation into an elegant culinary experience.",
    features: [
      "360-degree high-angle smooth swivel range",
      "EcoSmart Water Saving technology up to 40%",
      "Smooth glide lever mechanism with progressive friction",
      "Dual spray aerated comfort stream"
    ],
    specs: {
      Material: "Dezincification Resistant Brass",
      Finish: "Double Nickel-Chrome Coat",
      Mounting: "Wall Mounted with adjustable flange",
      "Spout Reach": "220 mm",
      Warranty: "7 Years Warranty"
    },
    reviews: [
      {
        id: "r3-1",
        userName: "Suresh Patel",
        rating: 5,
        comment: "Beautifully designed faucet. Makes my new modular kitchen looks so premium.",
        date: "2026-04-20"
      }
    ]
  },
  {
    id: "angle-cock",
    name: "ANGLE COCK",
    price: 950,
    image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&q=80&w=600",
    description: "The background hero of premium plumbing. This high-luster angle valve is built with durability in mind, acting as a reliable, decorative stop valve for high-end toilets, wash basins, and premium geysers.",
    features: [
      "Compact sculptural design with rounded contours",
      "Tear-resistant silicone sealing gaskets for dual seal longevity",
      "Wall flange plate included to conceal unsightly drill margins",
      "Highly corrosion-resistant formulation"
    ],
    specs: {
      Material: "Solid Extruded Brass",
      Finish: "Chamber-Polished Chrome",
      "Handle Type": "Architectural Cross Knob",
      Pressure: "0.5 bar to 10 bar working range",
      Warranty: "10 Years Limited Warranty"
    },
    reviews: []
  },
  {
    id: "shower",
    name: "SHOWER",
    price: 2850,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600",
    description: "A transformative, sensory wellness shower head that recreates natural luxury elements. Featuring custom silicon nozzles engineered to sustain equalized fluid pressure across every active droplet.",
    features: [
      "Overhead 8-inch wide luxury rain shower face",
      "Anti-clog self-cleaning silicon spray channels",
      "Integrated swivel ball joint allows 15-degree angle adjustments",
      "Laminar flow optimizer creating full, satisfying droplets"
    ],
    specs: {
      Material: "Reinforced Brass & High-Impact Polymers",
      Finish: "Premium Luster Plating",
      Mounting: "Wall or Ceiling Shower Arm compatible",
      FlowRate: "9.5 Litres per min at 3 bar",
      Warranty: "5 Years Rainware Warranty"
    },
    reviews: [
      {
        id: "r5-1",
        userName: "Rajesh K.",
        rating: 5,
        comment: "Absolutely majestic shower. Feeds water so softly, the design is elite.",
        date: "2026-05-30"
      }
    ]
  },
  {
    id: "towel-rod",
    name: "TOWEL ROD",
    price: 1150,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600",
    description: "A minimal, beautiful hardware piece that brings order and high-end bathroom luxury to life. Built with structural concealed anchors to maintain a smooth, sleek horizontal outline.",
    features: [
      "Heavy load support solid mounting studs",
      "Fully moisture proof and steam proof chrome formulation",
      "24 inches of premium towel display surface",
      "Perfect color match to Vijay Marbles faucet collection"
    ],
    specs: {
      Material: "Solid Heavy Brass Alloy",
      Finish: "Rust-Resistant Multi-layered Chrome",
      Length: "600 mm (24 inches)",
      Installation: "Wall mount with hex expansion screws",
      Warranty: "5 Years Polish Warranty"
    },
    reviews: []
  },
  {
    id: "soap-dispenser",
    name: "SOAP DISPENSER",
    price: 850,
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=600",
    description: "The ideal sink accessory for clean luxury vanity setups. Eliminates soap bottle clutter, providing smooth, tactile fluid release from a solid metal pump head with premium return spring dampening.",
    features: [
      "Deck mounted architectural integration",
      "Anti-corrosive internal fluid suction tubing",
      "Refill easily from the top without crawling under deck",
      "Generous 350ml thick-gauge container capacity"
    ],
    specs: {
      Material: "Polished Stainless Steel & Brass Pump Head",
      Finish: "Premium Chromium Polish",
      Capacity: "350 ml",
      "Desk Hole Cutout": "25 - 35 mm required",
      Warranty: "2 Years Pump Mechanism Warranty"
    },
    reviews: [
      {
        id: "r7-1",
        userName: "Ananya Mehta",
        rating: 5,
        comment: "Extremely tidy pump. Matches our hotel-like bathroom perfectly.",
        date: "2026-06-11"
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    userName: "Vikram Malhotra",
    rating: 5,
    text: "Vijay Marbles has transformed our new penthouse into a premium private sanctuary. The faucets have that unique Jaquar-esque and Kohler-level heavy weight, incredible water flow, and timeless elegance. Highly recommended for premium homes.",
    role: "Luxury Homeowner, Mumbai"
  },
  {
    id: "t2",
    userName: "Meera Sen",
    rating: 5,
    text: "As an interior architect, I always struggle to source brassware that is both artistically minimal and functionally flawless. Vijay Marbles fixtures represent premium craftsmanship at its finest. The mirror chrome finish is pristine.",
    role: "Lead Interior Designer, Delhi"
  },
  {
    id: "t3",
    userName: "Rohan Singhal",
    rating: 5,
    text: "We used Vijay Marbles faucets and shower accessories for our boutique resort project. Guests frequently compliment the sleek, modern design and the organic rain-like flow of the showers. Excellent post-sales dedication and quality.",
    role: "Managing Director, Singhal Resorts"
  }
];
