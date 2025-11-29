export type DesignSource = {
  name: string;
  store: string;
  url: string;
};

export type Design = {
  id: string;
  title: string;
  image: string;
  roomType: string;
  style: string[];
  colors: string[];
  materials: string[];
  propertyType: string;
  budget: string;
  palette: string[];
  sources: DesignSource[];
  description?: string;
};

export const designLibrary: Design[] = [
  {
    id: "modern-living",
    title: "Airy Modern Living",
    image:
      "https://images.unsplash.com/photo-1484156818044-c040038b0710?auto=format&fit=crop&w=1600&q=85",
    roomType: "Living Room",
    style: ["Modern", "Minimalist"],
    colors: ["Neutral", "Light"],
    materials: ["Wood", "Glass"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
    palette: ["#F5F5F5", "#0A0F2C", "#00D9FF"],
    sources: [
      {
        name: "LANDSKRONA Sofa",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/landskrona-sofa-gunnared-beige-80315559/",
      },
      {
        name: "SINNERLIG Pendant Lamp",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/sinnerlig-pendant-lamp-bamboo-90310905/",
      },
      {
        name: "BILLY Bookcase",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/billy-bookcase-white-00263850/",
      },
    ],
  },
  {
    id: "scandi-bedroom",
    title: "Cozy Scandi Bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=85",
    roomType: "Bedroom",
    style: ["Scandinavian", "Cozy"],
    colors: ["Neutral", "Warm"],
    materials: ["Wood", "Textile"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
    palette: ["#F7F3EE", "#D4AF37", "#0A0F2C"],
    sources: [
      {
        name: "TUFJORD Bed Frame",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/tufjord-upholstered-bed-frame-80439460/",
      },
      {
        name: "MARKUS Desk Chair",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/markus-office-chair-glose-black-50261151/",
      },
      {
        name: "VITTSJO Side Table",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/vittsjoe-laptop-table-black-brown-glass-80213312/",
      },
    ],
  },
  {
    id: "industrial-loft",
    title: "Industrial Loft",
    image:
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1600&q=85",
    roomType: "Loft",
    style: ["Industrial"],
    colors: ["Dark", "Cool"],
    materials: ["Brick", "Metal", "Concrete"],
    propertyType: "Loft",
    budget: "$30k - $50k",
    palette: ["#1F2937", "#9CA3AF", "#FBBF24"],
    sources: [
      {
        name: "MORABO Sofa",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/morabo-sofa-gunnared-dark-gray-50453139/",
      },
      {
        name: "HEKTAR Floor Lamp",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/hektar-floor-lamp-dark-gray-50393560/",
      },
      {
        name: "FJALLBO Coffee Table",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/fjaellbo-coffee-table-black-80339791/",
      },
    ],
  },
  {
    id: "luxury-dining",
    title: "Luxury Dining",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=85",
    roomType: "Dining Room",
    style: ["Luxury", "Contemporary"],
    colors: ["Dark", "Gold"],
    materials: ["Marble", "Metal"],
    propertyType: "House",
    budget: "$50k+",
    palette: ["#111827", "#D4AF37", "#F3F4F6"],
    sources: [
      {
        name: "BJURSTA Dining Table",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/bjursta-extendable-table-brown-50116276/",
      },
      {
        name: "VOLFGANG Chair",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/volfgang-chair-dark-brown-40456478/",
      },
      {
        name: "KRUSNING Pendant",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/krusning-pendant-lamp-shade-white-80309525/",
      },
    ],
  },
  {
    id: "bright-kitchen",
    title: "Bright Minimal Kitchen",
    image:
      "https://images.unsplash.com/photo-1505693415763-3e1b2e1a1402?auto=format&fit=crop&w=1600&q=85",
    roomType: "Kitchen",
    style: ["Modern", "Minimalist"],
    colors: ["Light", "Neutral"],
    materials: ["Wood", "Concrete"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
    palette: ["#E5E7EB", "#0A0F2C", "#22D3EE"],
    sources: [
      {
        name: "KUNGSBACKA Fronts",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/kungsbacka-door-anthracite-30337999/",
      },
      {
        name: "VOXTORP Cabinet",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/voxtorp-base-cabinet-dark-gray-60205431/",
      },
      {
        name: "RASKOG Cart",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/raskog-utility-cart-black-20382932/",
      },
    ],
  },
  {
    id: "warm-office",
    title: "Warm Home Office",
    image:
      "https://images.unsplash.com/photo-1529429617124-aee7c5cdaa5a?auto=format&fit=crop&w=1600&q=85",
    roomType: "Home Office",
    style: ["Contemporary", "Cozy"],
    colors: ["Warm", "Neutral"],
    materials: ["Wood", "Textile"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
    palette: ["#FDF2E9", "#1F2937", "#22C55E"],
    sources: [
      {
        name: "BEKANT Desk",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/bekant-desk-white-s49324819/",
      },
      {
        name: "LAGKAPTEN Shelf",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/lagkapten-sindvik-shelving-unit-white-20482643/",
      },
      {
        name: "KALLAX Storage",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/kallax-shelf-unit-white-80275887/",
      },
    ],
  },
  {
    id: "spa-bathroom",
    title: "Spa Bathroom",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=85&sat=-12",
    roomType: "Bathroom",
    style: ["Minimalist"],
    colors: ["Light", "Neutral"],
    materials: ["Stone", "Glass"],
    propertyType: "Apartment",
    budget: "$15k - $30k",
    palette: ["#F3F4F6", "#9CA3AF", "#14B8A6"],
    sources: [
      {
        name: "GODMORGON Sink Cabinet",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/godmorgon-bathroom-vanity-white-90344027/",
      },
      {
        name: "BROGRUND Faucet",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/brogrund-bath-faucet-chrome-00343022/",
      },
      {
        name: "LANGESUND Mirror",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/langesund-mirror-white-20431214/",
      },
    ],
  },
  {
    id: "coastal-living",
    title: "Coastal Living",
    image:
      "https://images.unsplash.com/photo-1505692069463-5e3405e3e7ee?auto=format&fit=crop&w=1600&q=85",
    roomType: "Living Room",
    style: ["Coastal", "Minimalist"],
    colors: ["Light", "Blue"],
    materials: ["Wood", "Textile"],
    propertyType: "House",
    budget: "$15k - $30k",
    palette: ["#ECFEFF", "#0EA5E9", "#0A0F2C"],
    sources: [
      {
        name: "EKTORP Sofa",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/ektorp-sofa-ljungen-medium-blue-60463049/",
      },
      {
        name: "LISTERBY Table",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/listerby-coffee-table-brown-80453780/",
      },
      {
        name: "BLAVINGAD Rug",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/blavingad-rug-flatwoven-multicolor-90518244/",
      },
    ],
  },
  {
    id: "colorful-living",
    title: "Colorful Living",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=85",
    roomType: "Living Room",
    style: ["Contemporary", "Colorful"],
    colors: ["Colorful"],
    materials: ["Textile", "Wood"],
    propertyType: "Apartment",
    budget: "$5k - $15k",
    palette: ["#0A0F2C", "#F97316", "#22C55E"],
    sources: [
      {
        name: "KLIPPAN Loveseat",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/klippan-loveseat-vissle-gray-10340453/",
      },
      {
        name: "TISKEN Shelf",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/tisken-shelf-with-suction-cup-white-70459491/",
      },
      {
        name: "STOENSE Rug",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/stoense-rug-low-pile-blue-00426824/",
      },
    ],
  },
  {
    id: "rustic-bedroom",
    title: "Rustic Bedroom",
    image:
      "https://images.unsplash.com/photo-1523419400520-2f1154188a23?auto=format&fit=crop&w=1600&q=85",
    roomType: "Bedroom",
    style: ["Rustic", "Cozy"],
    colors: ["Warm", "Neutral"],
    materials: ["Wood", "Textile"],
    propertyType: "House",
    budget: "$5k - $15k",
    palette: ["#F5E8DD", "#8B5E3C", "#0A0F2C"],
    sources: [
      {
        name: "HEMNES Bed Frame",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/hemnes-bed-frame-white-00221444/",
      },
      {
        name: "GURLI Throw",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/gurli-throw-light-brown-00494073/",
      },
      {
        name: "BERGPALM Duvet",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/bergpalm-duvet-cover-and-2-pillowcases-brown-50449401/",
      },
    ],
  },
  {
    id: "studio-minimal",
    title: "Minimal Studio",
    image:
      "https://images.unsplash.com/photo-1523419400520-2f1154188a23?auto=format&fit=crop&w=1600&q=85&sat=-10",
    roomType: "Studio",
    style: ["Minimalist"],
    colors: ["Neutral", "Light"],
    materials: ["Concrete", "Glass"],
    propertyType: "Studio",
    budget: "$15k - $30k",
    palette: ["#E5E7EB", "#0A0F2C", "#9CA3AF"],
    sources: [
      {
        name: "BESTA Storage",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/besta-storage-combination-white-stained-oak-veneer-s89474322/",
      },
      {
        name: "LINNEBO Table",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/linnebo-coffee-table-white-90525703/",
      },
      {
        name: "SKURUP Pendant",
        store: "IKEA",
        url: "https://www.ikea.com/us/en/p/skurup-pendant-lamp-black-50386598/",
      },
    ],
  },
];

export const filterOptions = {
  styles: Array.from(new Set(designLibrary.flatMap((d) => d.style))),
  roomTypes: Array.from(new Set(designLibrary.map((d) => d.roomType))),
  colors: Array.from(new Set(designLibrary.flatMap((d) => d.colors))),
  materials: Array.from(new Set(designLibrary.flatMap((d) => d.materials))),
  propertyTypes: Array.from(new Set(designLibrary.map((d) => d.propertyType))),
  budgets: Array.from(new Set(designLibrary.map((d) => d.budget))),
};
