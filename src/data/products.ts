export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: "rice" | "spices" | "pulses" | "fmcg" | "textiles" | "machinery" | "utensils" | "fruits" | "sweets" | "mats";
  categoryLabel: string;
  subtitle: string;
  description: string;
  image: string;
  featured?: boolean;
  hsCode: string;
  origin: string;
  packagingOptions: string[];
  specifications: ProductSpec[];
  certifications: string[];
  shelfLife: string;
  minOrderQuantity: string;
}

export const PRODUCTS: Product[] = [
  // --- BASMATI & NON-BASMATI RICE ---
  {
    id: "deity-1121-steam-basmati",
    slug: "deity-1121-steam-basmati-rice",
    name: "Deity 1121 Steam Basmati Rice",
    category: "rice",
    categoryLabel: "Basmati Rice",
    subtitle: "Extra-long grain aromatic basmati, naturally aged for exquisite elongation & culinary elegance.",
    description:
      "Deity 1121 Steam Basmati Rice is our flagship export-grade commodity, renowned across the Middle East, Europe, and North America. Sourced exclusively from the fertile Terai plains of Punjab and Haryana, the paddy undergoes controlled steam conditioning to preserve grain integrity, lock in natural nutrients, and guarantee an extraordinary cooked elongation of over 20mm with zero stickiness.",
    image: "/images/Deity_Rice.png",
    featured: true,
    hsCode: "1006.30.20",
    origin: "Punjab & Haryana, India",
    packagingOptions: [
      "1 kg, 5 kg, 10 kg, 20 kg Premium BOPP & Non-Woven Zipper Bags",
      "25 kg & 50 kg PP Woven Bags (with inner poly liner)",
      "Custom Private Label Master Cartons for Supermarket Retailers",
    ],
    specifications: [
      { label: "Average Grain Length (AGL)", value: "8.35 mm - 8.40 mm" },
      { label: "Elongation Ratio", value: "2.5x to 3x upon cooking" },
      { label: "Moisture Content", value: "Max 12.5%" },
      { label: "Purity", value: "95% Min" },
      { label: "Broken Grain", value: "Max 1.0%" },
      { label: "Damage / Discolored Grain", value: "Max 0.5%" },
      { label: "Sortex Cleaned", value: "100% Optical Double Sortexed" },
      { label: "Aroma", value: "Distinctive Sweet Earthy Basmati Bouquet" },
    ],
    certifications: ["APEDA Certified", "FSSAI Grade A", "ISO 9001:2015", "Non-GMO Verification", "SGS Inspected"],
    shelfLife: "24 Months (when stored in cool, dry conditions)",
    minOrderQuantity: "1 x 20ft FCL (approx. 24–25 MT)",
  },
  {
    id: "deity-1509-golden-sella-basmati",
    slug: "deity-1509-golden-sella-basmati-rice",
    name: "Deity 1509 Golden Sella Basmati Rice",
    category: "rice",
    categoryLabel: "Basmati Rice",
    subtitle: "Parboiled nutrient-sealed golden grain, exceptionally resilient for catering & biryani perfection.",
    description:
      "Deity 1509 Golden Sella Basmati Rice undergoes hydrothermal parboiling prior to milling, imparting a distinguished golden tint and sealing the grain surface against breakage. Favored by international commercial kitchens, luxury catering establishments, and food service distributors for its hardiness, superior yield, and fluffy individual grain separation.",
    image: "/images/Rotate-Rice.png",
    featured: true,
    hsCode: "1006.30.20",
    origin: "Northern India (Gangetic Belt)",
    packagingOptions: [
      "10 kg & 20 kg BOPP Bags with Handle",
      "25 kg & 50 kg Laminated HDPE/PP Export Bags",
      "Bulk container liner bags for institutional repackers",
    ],
    specifications: [
      { label: "Average Grain Length (AGL)", value: "8.40 mm Min" },
      { label: "Moisture Content", value: "Max 12.5%" },
      { label: "Broken Ratio", value: "Max 1.0%" },
      { label: "Chalky Grains", value: "Nil" },
      { label: "Purity", value: "95% Min" },
      { label: "Grain Color", value: "Rich Golden Honey Tint" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015", "Phytosanitary Clearance"],
    shelfLife: "24 Months",
    minOrderQuantity: "1 x 20ft FCL (25 MT)",
  },
  {
    id: "sugandha-steam-rice",
    slug: "sugandha-steam-non-basmati-rice",
    name: "Sugandha Steam Long Grain Rice",
    category: "rice",
    categoryLabel: "Long Grain Rice",
    subtitle: "Economical aromatic long-grain alternative offering exceptional aroma and length.",
    description:
      "Sugandha Rice is an economical hybrid variety celebrated for pleasant natural fragrance and impressive grain elongation closely mirroring pure basmati at competitive international volume pricing.",
    image: "/images/Rice.png",
    featured: false,
    hsCode: "1006.30.90",
    origin: "Uttar Pradesh & Haryana, India",
    packagingOptions: ["25 kg & 50 kg Woven PP Bags", "10 kg Non-woven Handle Bags"],
    specifications: [
      { label: "Average Grain Length (AGL)", value: "7.80 mm Min" },
      { label: "Moisture Content", value: "Max 13.0%" },
      { label: "Broken Grain", value: "Max 2.0%" },
      { label: "Sortex Cleaning", value: "100% Machine Cleaned" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015"],
    shelfLife: "24 Months",
    minOrderQuantity: "1 x 20ft FCL (25 MT)",
  },

  // --- SPICES & SEASONINGS ---
  {
    id: "salem-turmeric-finger-powder",
    slug: "salem-turmeric-finger-and-powder",
    name: "Salem Pure Turmeric Fingers & Powder",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "High-curcumin golden yellow turmeric harvested from prime Southern agro-corridors.",
    description:
      "Sourced directly from the renowned turmeric belts of Salem and Erode in Tamil Nadu and Nizamabad in Telangana. Selected for deep saffron-golden pigmentation, high natural curcuminoid concentration (3.0% to 5.0%), and intense warm earthiness. Available as double-polished whole fingers and ultra-fine mesh ground powder.",
    image: "/images/Turmeric_Powder.jpg",
    featured: true,
    hsCode: "0910.30.20",
    origin: "Salem (Tamil Nadu) & Nizamabad (Telangana), India",
    packagingOptions: [
      "25 kg & 50 kg Heavy Jute Bags / Gunny Sacks",
      "25 kg Multi-wall Kraft Paper Bags with PE inner barrier",
      "500g, 1kg & 5kg Aluminum Foil Pouches for Retail",
    ],
    specifications: [
      { label: "Curcumin Content", value: "3.2% - 4.5% Min" },
      { label: "Moisture Content", value: "Max 10.0%" },
      { label: "Total Ash", value: "Max 7.0%" },
      { label: "Acid Insoluble Ash", value: "Max 1.0%" },
      { label: "Extraneous Matter", value: "Nil / Max 0.5%" },
      { label: "Mesh Size (Powder)", value: "80 - 100 Mesh" },
    ],
    certifications: ["Spices Board India", "FSSAI", "ISO 9001:2015", "US FDA Registered Sourcing"],
    shelfLife: "18 Months in airtight nitrogen-flushed or sealed barrier packs",
    minOrderQuantity: "1 x 20ft FCL (approx. 18 MT whole / 20 MT ground)",
  },
  {
    id: "guntur-red-chilli-whole-powder",
    slug: "guntur-red-chilli-sannam-teja",
    name: "Guntur Red Chilli (Sannam S4 & Teja)",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "Vibrant scarlet pungency with controlled heat levels for global spice processors.",
    description:
      "Exported from Andhra Pradesh's world-famous Guntur market hub. Available with stem (Stem-on) or destemmed (Stemless), sun-dried under monitored hygienic conditions, Sortex sorted for spotless uniform red color, and ground under cryogenic or low-temperature milling to preserve volatile capsaicin oils.",
    image: "/images/Red_Chilli.png",
    featured: true,
    hsCode: "0904.21.10",
    origin: "Guntur & Prakasam, Andhra Pradesh, India",
    packagingOptions: [
      "10 kg & 25 kg Compressed Jute / Gunny Bales",
      "25 kg Cartoon Boxes / PP Laminated Sacks",
      "100g, 200g, 1kg Stand-up Pouches (Ground)",
    ],
    specifications: [
      { label: "SHU (Scoville Heat Units)", value: "25,000 - 75,000 SHU (variety dependent)" },
      { label: "Color Value (ASTA)", value: "80 - 120 ASTA Units" },
      { label: "Moisture Content", value: "Max 11.0%" },
      { label: "Aflatoxin & Sudan Dye", value: "Guaranteed Negative / Certified Compliant" },
    ],
    certifications: ["Spices Board India", "APEDA", "FSSAI", "SGS Certified Lab Tested"],
    shelfLife: "12 - 18 Months",
    minOrderQuantity: "1 x 40ft FCL for Whole Bales (14 MT) / 1 x 20ft FCL for Powder",
  },
  {
    id: "malabar-black-pepper",
    slug: "malabar-black-pepper-garbled-bold",
    name: "Malabar Garbled Black Pepper (TGSEB)",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "The King of Spices: Telicherry Garbled Special Extra Bold high-piperine peppercorns.",
    description:
      "Hand-harvested from the biodiverse Western Ghats rainforest estates of Kerala. Dense, heavily wrinkled berries offering robust biting pungency, woody aroma, and intense heat fueled by natural piperine content.",
    image: "/images/Black_Pepper.png",
    featured: false,
    hsCode: "0904.11.20",
    origin: "Kerala (Malabar Coast), India",
    packagingOptions: ["25 kg & 50 kg Jute Sacks", "25 kg Kraft Paper Bags with Poly Liner"],
    specifications: [
      { label: "Grade", value: "TGSEB / MG-1 (Tellicherry Garbled)" },
      { label: "Density (Liter Weight)", value: "550 g/L - 580 g/L Min" },
      { label: "Piperine Content", value: "4.5% - 5.5% Min" },
      { label: "Moisture Content", value: "Max 11.0%" },
    ],
    certifications: ["Spices Board India", "FSSAI", "ISO 9001:2015"],
    shelfLife: "24 Months",
    minOrderQuantity: "1 x 20ft FCL (15 MT)",
  },
  {
    id: "cumin-seeds-jeera",
    slug: "indian-cumin-seeds-sortex-clean",
    name: "Indian Cumin Seeds (Jeera)",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "Sortex-cleaned Singapore & Europe quality cumin seeds packed with volatile essential oils.",
    description:
      "Procured from the prime arid harvesting epicenters of Unjha and Saurashtra in Gujarat and Rajasthan. Processed on precision optical sorting machinery to achieve up to 99.5% purity with zero foreign matter.",
    image: "/images/Cumin_Seeds.png",
    featured: false,
    hsCode: "0909.31.29",
    origin: "Gujarat & Rajasthan, India",
    packagingOptions: ["25 kg & 50 kg PP / Jute Bags", "Custom consumer cartons"],
    specifications: [
      { label: "Purity Grades", value: "99% Singapore Quality / 99.5% Europe Quality" },
      { label: "Volatile Oil Content", value: "2.5% - 3.2% Min" },
      { label: "Moisture Content", value: "Max 9.0%" },
      { label: "Total Ash", value: "Max 8.5%" },
    ],
    certifications: ["Spices Board India", "FSSAI", "ISO 9001:2015"],
    shelfLife: "24 Months",
    minOrderQuantity: "1 x 20ft FCL (14 MT)",
  },
  {
    id: "green-cardamom-bold",
    slug: "green-cardamom-alleppey-bold",
    name: "Green Cardamom (Alleppey Extra Bold)",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "Hand-picked plump 8mm green pods rich in camphoraceous eucalyptus oils.",
    description:
      "Harvested in the mist-shrouded Cardamom Hills of Idukki, Kerala. Renowned as the Queen of Spices, graded by diameter (7mm, 7.5mm, 8mm bold), with deep jade coloring and unmatched aromatic potency.",
    image: "/images/Cardamom.png",
    featured: false,
    hsCode: "0908.31.10",
    origin: "Idukki (Kerala) & Coorg (Karnataka), India",
    packagingOptions: ["10 kg & 25 kg Master Corrugated Boxes with inner vacuum pouch", "500g Luxury Pouches"],
    specifications: [
      { label: "Pod Diameter", value: "7.5mm - 8.2mm Extra Bold" },
      { label: "Volatile Oil", value: "7.0% - 9.0% Min" },
      { label: "Color", value: "Deep Natural Parrot Green" },
      { label: "Moisture", value: "Max 10.0%" },
    ],
    certifications: ["Spices Board India", "FSSAI", "ISO 9001:2015"],
    shelfLife: "24 Months",
    minOrderQuantity: "500 kg air freight / 5 MT combined container",
  },
  {
    id: "coriander-seeds-and-powder",
    slug: "coriander-seeds-dhaniya-eagle-quality",
    name: "Coriander Seeds & Powder (Dhaniya)",
    category: "spices",
    categoryLabel: "Spices & Seasonings",
    subtitle: "Greenish-brown aromatic globular seeds of Eagle & Scooter export specifications.",
    description:
      "Grown in Rajasthan and Madhya Pradesh, cleaned through multi-deck aspirators and destoners to deliver uniform grain, high linalool essential oil, and crisp sweet citrus notes.",
    image: "/images/Coriander_Seed.png",
    featured: false,
    hsCode: "0909.21.10",
    origin: "Kota & Ramganj Mandi (Rajasthan), India",
    packagingOptions: ["25 kg & 40 kg PP Bags", "10 kg paper sacks"],
    specifications: [
      { label: "Grade", value: "Eagle / Scooter / Single Machine Clean" },
      { label: "Purity", value: "98% - 99% Min" },
      { label: "Moisture Content", value: "Max 10.0%" },
      { label: "Splits", value: "Max 5.0%" },
    ],
    certifications: ["Spices Board India", "FSSAI", "ISO 9001:2015"],
    shelfLife: "18 Months",
    minOrderQuantity: "1 x 20ft FCL (10 MT)",
  },

  // --- AGRO PULSES & LENTILS ---
  {
    id: "toor-dhal-pigeon-peas",
    slug: "toor-dhal-split-pigeon-peas",
    name: "Toor Dhal (Yellow Pigeon Peas Split)",
    category: "pulses",
    categoryLabel: "Agro Pulses & Dals",
    subtitle: "Sortex-graded premium yellow split pigeon peas, oily and unpolished varieties.",
    description:
      "Toor dhal is a premier staple pulse exported across the diaspora and global protein distributors. Sourced from Maharashtra and Karnataka, processed through modern automated de-husking mills, sortexed for brilliant uniform canary yellow hue, and tested for fast cooking time.",
    image: "/images/3-toor-dhal-480x480.jpg",
    featured: true,
    hsCode: "0713.60.00",
    origin: "Latur (Maharashtra) & Gulbarga (Karnataka), India",
    packagingOptions: [
      "1 kg, 2 kg & 5 kg Food-Grade Retail Nitrogen-Sealed Pouches",
      "25 kg & 50 kg PP Woven Bags with Inner Poly Liners",
      "Private Label Supermarket Master Cartons",
    ],
    specifications: [
      { label: "Processing", value: "Unpolished / Sortex Cleaned" },
      { label: "Purity", value: "99.0% Min" },
      { label: "Foreign Matter", value: "Max 0.25%" },
      { label: "Damaged / Discolored Grains", value: "Max 1.0%" },
      { label: "Moisture Content", value: "Max 11.5%" },
      { label: "Protein Content", value: "Approx. 22% by weight" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015", "Non-GMO Certificate"],
    shelfLife: "18 Months",
    minOrderQuantity: "1 x 20ft FCL (24 MT)",
  },
  {
    id: "green-moong-dhal-whole-split",
    slug: "green-moong-dhal-whole-and-split",
    name: "Green Moong (Whole & Split Lentils)",
    category: "pulses",
    categoryLabel: "Agro Pulses & Dals",
    subtitle: "High-protein lustrous green gram, available whole, split with husk, and yellow washed.",
    description:
      "Sourced from the fertile agricultural heartlands of Rajasthan and Madhya Pradesh. Naturally dried, destoned, mechanically cleaned, and calibrated by seed size. Highly prized worldwide for plant-based nutrition, sprouting, and savory confectionery.",
    image: "/images/Green-Moong-Dhall-Whole-480x480.jpg",
    featured: false,
    hsCode: "0713.31.00",
    origin: "Rajasthan & Madhya Pradesh, India",
    packagingOptions: ["25 kg & 50 kg Heavy Duty PP Bags", "1kg & 5kg Retail Packs"],
    specifications: [
      { label: "Purity", value: "99.0% Min" },
      { label: "Moisture Content", value: "Max 11.0%" },
      { label: "Weeviled Grains", value: "Nil / Max 0.2%" },
      { label: "Sortex Grade", value: "Double Optical Sorted" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015"],
    shelfLife: "24 Months",
    minOrderQuantity: "1 x 20ft FCL (24 MT)",
  },
  {
    id: "black-urid-dhal-gota-split",
    slug: "black-urid-dhal-gota-and-split",
    name: "Urid Dhal (Black Gram Gota & Split)",
    category: "pulses",
    categoryLabel: "Agro Pulses & Dals",
    subtitle: "Sortex-cleaned white peeled gota and split black gram for traditional batter & dough processing.",
    description:
      "Top-tier black gram cultivated in Andhra Pradesh and Tamil Nadu. Available as whole black urid, washed white urid gota (whole peeled), and urid dal split. Delivers supreme batter fermentation elasticity for culinary applications.",
    image: "/images/1-urid-gota-480x480.jpg",
    featured: false,
    hsCode: "0713.31.00",
    origin: "Andhra Pradesh & Maharashtra, India",
    packagingOptions: ["25 kg & 50 kg PP Sacks", "Custom Poly Bags"],
    specifications: [
      { label: "Variety", value: "White Urid Gota / Black Urid Split" },
      { label: "Purity", value: "99.5% Min" },
      { label: "Moisture", value: "Max 11.0%" },
      { label: "Cooking Quality", value: "High aeration and fermentation yield" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015"],
    shelfLife: "18 Months",
    minOrderQuantity: "1 x 20ft FCL (24 MT)",
  },
  {
    id: "channa-dal-bengal-gram",
    slug: "channa-dal-split-bengal-gram",
    name: "Channa Dal (Split Bengal Gram)",
    category: "pulses",
    categoryLabel: "Agro Pulses & Dals",
    subtitle: "Sweet, nutty yellow split chickpeas sorted for uniform size and rapid cooking.",
    description:
      "Processed from hand-selected Desi Chickpeas grown in Madhya Pradesh. Husk-removed and split with precision grading machinery, delivering uniform golden yellow lentils loaded with zinc, folate, and dietary fiber.",
    image: "/images/4-channa-dal-480x480.jpg",
    featured: false,
    hsCode: "0713.20.00",
    origin: "Madhya Pradesh & Rajasthan, India",
    packagingOptions: ["25 kg & 50 kg PP Bags", "1kg & 2kg Retail Packaging"],
    specifications: [
      { label: "Purity", value: "99.0% Min" },
      { label: "Moisture Content", value: "Max 11.0%" },
      { label: "Foreign Matter", value: "Max 0.5%" },
      { label: "Broken Ratio", value: "Max 1.5%" },
    ],
    certifications: ["APEDA", "FSSAI", "ISO 9001:2015"],
    shelfLife: "18 Months",
    minOrderQuantity: "1 x 20ft FCL (24 MT)",
  },

  // --- FMCG & PROVISIONS ---
  {
    id: "fmcg-packaged-provisions",
    slug: "fmcg-packaged-grocery-commodities",
    name: "FMCG Branded Food & Provisions",
    category: "fmcg",
    categoryLabel: "FMCG Provisions",
    subtitle: "Consolidated supermarket provisions, flours, seasonings & private label packaging.",
    description:
      "Jay Impex provides turn-key FMCG export consolidation for international ethnic grocery store chains, retail distributors, and hypermarkets. We consolidate mixed 20ft and 40ft containerized shipments with multi-SKU manifests including specialty flours (Chakki Atta, Besan, Rice flour), ready blended spice mixes, edible oils, and packaged staples.",
    image: "/images/FMCG.jpg",
    featured: true,
    hsCode: "2103.90.40",
    origin: "Chennai, Tamil Nadu, India",
    packagingOptions: [
      "Mixed Multi-SKU Palletized Containers",
      "Full Custom Artwork & Multilingual Nutritional Labeling",
      "Barcoded Retail Master Cartons",
    ],
    specifications: [
      { label: "Service", value: "Containerized Consolidation & Multi-SKU Staging" },
      { label: "Packaging Standards", value: "FMCG Retail Compliant / Barcoded" },
      { label: "Private Labeling", value: "Available under client brand or OEM" },
      { label: "Documentation", value: "Certificate of Analysis, Bill of Lading, Legalized Invoices" },
    ],
    certifications: ["FSSAI", "APEDA", "Legal Metrology Compliant", "ISO 9001:2015"],
    shelfLife: "Varies by individual packaged SKU (12–24 Months)",
    minOrderQuantity: "1 x 20ft FCL (Mixed Commodities Allowed)",
  },

  // --- TEXTILES & APPAREL ---
  {
    id: "textiles-fabrics-garments",
    slug: "indian-cotton-textiles-fabrics-garments",
    name: "Indian Cotton Textiles, Fabrics & Garments",
    category: "textiles",
    categoryLabel: "Textiles & Garments",
    subtitle: "Custom Indian cotton fabrics, knitted apparel, home textiles & institutional linens sourced to client tech packs.",
    description:
      "Beyond agro commodities, Jay Impex operates as an agile merchant sourcing partner for international buyers requiring prime Indian textiles. Sourced directly from South India's renowned manufacturing clusters in Tirupur, Karur, and Coimbatore, we procure premium 100% combed cotton fabrics, readymade garments, kitchen towels, bed linen sets, and institutional uniforms tailored precisely to your technical specifications, GSM, colorways, and retail labeling.",
    image: "/images/textiles-sourcing.jpg",
    featured: true,
    hsCode: "6302.21.00",
    origin: "Tirupur, Karur & Coimbatore, Tamil Nadu, India",
    packagingOptions: [
      "Custom Retail Polybags with Barcoded Hangtags & Brand Inserts",
      "Export Master Corrugated Cartons with Moisture-Proof Strapping",
      "Full Container Load (FCL) Palletized Assortments for Retail Distribution",
    ],
    specifications: [
      { label: "Fabric Material", value: "100% Combed Cotton / Organic / Poly-Cotton Blends" },
      { label: "Weight / GSM", value: "120 GSM to 450 GSM (as specified by client)" },
      { label: "Product Portfolio", value: "T-Shirts, Woven Fabrics, Bed Linens, Bath & Kitchen Towels, Made-ups" },
      { label: "Dyeing & Fastness", value: "Grade 4+ Reactive / Vat Dyed, Azo-Free Eco Friendly Colors" },
      { label: "Customization", value: "OEM Private Label, Custom Embroidery, Screen & Digital Printing" },
      { label: "Quality Standard", value: "AQL 2.5 Standard Pre-Shipment Quality Assurance Audits" },
    ],
    certifications: ["OEKO-TEX Standard 100 Compliant", "GOTS Certified Organic Available", "Export Inspection Agency (EIA)"],
    shelfLife: "Non-Perishable Merchandise",
    minOrderQuantity: "500 Pieces per SKU or Mixed 20ft Container",
  },

  // --- INDUSTRIAL MACHINERY & EQUIPMENT ---
  {
    id: "industrial-agro-machinery",
    slug: "industrial-food-processing-agro-machinery",
    name: "Industrial Food Processing & Agro Machinery",
    category: "machinery",
    categoryLabel: "Machinery & Equipment",
    subtitle: "Heavy-duty agro processing machines, grain milling, Sortex cleaning & custom automated packaging lines.",
    description:
      "Leveraging South India's precision engineering capitals in Coimbatore and Chennai, Jay Impex procures, inspects, and exports robust industrial machinery and food processing plant equipment. We deliver turnkey rice milling lines, spice pulverizers, optical sortex sorting stations, vertical form-fill-seal (VFFS) bagging machines, and commercial flour mills built to international electrical standards and CE/ISO directives.",
    image: "/images/industrial-machinery.jpg",
    featured: true,
    hsCode: "8437.80.10",
    origin: "Coimbatore & Chennai, Tamil Nadu, India",
    packagingOptions: [
      "Seaworthy Heavy Duty Treated Wooden Crates (ISPM 15 Fumigated)",
      "Vacuum Barrier Anti-Corrosion Foil Wrap with Industrial Desiccant Packets",
      "Reinforced Steel Base Frames for Safe Containerized Ocean Transit",
    ],
    specifications: [
      { label: "Material Construction", value: "Food-Grade SS 304 / SS 316 Contact Surfaces & Structural Steel Base" },
      { label: "Power & Voltage", value: "Custom 380V/415V 3-Phase, 50Hz/60Hz to Destination Grid Specs" },
      { label: "Capacity Range", value: "100 kg/hr to 5,000 kg/hr custom configurations" },
      { label: "Automation", value: "Semi-Automatic / Fully Automatic with PLC Touchscreen Controls" },
      { label: "Pre-Shipment Testing", value: "100% Factory Acceptance Testing (FAT) with Raw Material Video Trial" },
    ],
    certifications: ["ISO 9001:2015", "CE Directive Compliant Available", "ISPM-15 Phytosanitary Crate Certified"],
    shelfLife: "Machinery Capital Equipment (1 Year Warranty + Spare Parts Kit)",
    minOrderQuantity: "1 Unit / Full Plant Consignment",
  },

  // --- STAINLESS STEEL UTENSILS & COOKWARE ---
  {
    id: "stainless-steel-kitchenware",
    slug: "stainless-steel-utensils-commercial-cookware",
    name: "Stainless Steel Utensils & Commercial Cookware",
    category: "utensils",
    categoryLabel: "Utensils & Cookware",
    subtitle: "Food-grade stainless steel kitchenware, commercial catering vessels, thali sets & traditional brassware.",
    description:
      "Tamil Nadu, particularly Salem and Chennai, is world-famous for its high-grade stainless steel metallurgy. Jay Impex supplies commercial kitchens, hotel chains, and retail department stores across Australia, the Gulf, and North America with heavy-gauge stainless steel cookware, induction-bottom pots, idli/rice steamers, dinner thali sets, and traditional brass/bronze handcrafted cooking vessels.",
    image: "/images/stainless-utensils.jpg",
    featured: true,
    hsCode: "7323.93.00",
    origin: "Salem & Chennai, Tamil Nadu, India",
    packagingOptions: [
      "Individual Color Box / Shrink Wrap Packing with Barcode",
      "Heavy 5-Ply / 7-Ply Export Master Cartons with Corner Protectors",
      "Custom Branded Outer Packaging for Supermarket Shelves",
    ],
    specifications: [
      { label: "Steel Grade", value: "Food-Grade AISI 304 (18/8) & Heavy Gauge AISI 202/201" },
      { label: "Gauge / Thickness", value: "0.8 mm to 3.0 mm Heavy Bottom Induction Base" },
      { label: "Finish", value: "Mirror Polish Exterior / Satin Matt Interior / Hammered Copper Bottom" },
      { label: "Product Portfolio", value: "Cookware Pots, Pressure Cookers, Thalis, Bowls, Storage Canisters, Cutlery" },
      { label: "Dishwasher Safe", value: "100% Rust-Proof & Commercial Dishwasher Safe" },
    ],
    certifications: ["Bureau of Indian Standards (BIS)", "Food Contact Safe (US FDA / LFGB Compliant)", "ISO 9001:2015"],
    shelfLife: "Lifetime Durability",
    minOrderQuantity: "500 Sets or Mixed 20ft Container Load",
  },

  // --- SEASONAL FRESH FRUITS ---
  {
    id: "seasonal-fresh-fruits",
    slug: "indian-seasonal-fresh-fruits-mangoes-produce",
    name: "Indian Seasonal Fresh Fruits (Mangoes & Fresh Produce)",
    category: "fruits",
    categoryLabel: "Seasonal Fruits",
    subtitle: "Farm-fresh Banganapalli, Alphonso & Totapuri mangoes, Cavendish bananas and pomegranates with cold-chain air & reefer export.",
    description:
      "Under APEDA registered phytosanitary protocols, Jay Impex exports harvest-fresh Indian seasonal fruits. We source directly from designated orchard belts: GI-tagged Banganapalli and Totapuri from Andhra Pradesh/Tamil Nadu, Ratnagiri Alphonso mangoes, Bhagwa pomegranates from Maharashtra, and fresh Cavendish bananas. Consignments undergo vapor heat treatment (VHT) or irradiation where mandated, followed by strict cold-chain dispatch via air cargo and reefer sea containers to international supermarket chains in Australia, Middle East, and Europe.",
    image: "/images/seasonal-fruits.jpg",
    featured: true,
    hsCode: "0804.50.20",
    origin: "Tamil Nadu, Andhra Pradesh & Maharashtra, India",
    packagingOptions: [
      "Air Cargo: 2.5 kg, 3.0 kg & 4.5 kg Ventilated Telescopic CFB Cartons with Protective Foam Sleeves",
      "Sea Reefer: 5 kg to 18 kg Controlled Atmosphere Export Crates on Pallets",
      "Phytosanitary Certified Sealed Export Packaging with Traceability QR Codes",
    ],
    specifications: [
      { label: "Fruit Varieties", value: "Banganapalli, Alphonso, Kesar, Totapuri, Pomegranates (Bhagwa), Bananas (G9)" },
      { label: "Grade", value: "Export Grade A / Extra Class (Uniform sizing & zero blemishes)" },
      { label: "Brix Sugar Level", value: "18° - 22° Brix at Full Maturity" },
      { label: "Pre-Treatment", value: "Hot Water Dip / Vapor Heat Treatment (VHT) / Gamma Irradiation as per destination protocol" },
      { label: "Transit Temperature", value: "+10°C to +13°C Reefer / Air Express Express" },
    ],
    certifications: ["APEDA Registered Exporter", "NPPO Phytosanitary Certificate", "GLOBALG.A.P. Farm Standards"],
    shelfLife: "14–21 Days under temperature-controlled cold chain",
    minOrderQuantity: "1,000 kg (Air Freight) or 1 x 40ft Reefer Container (Sea Freight)",
  },

  // --- TRADITIONAL INDIAN SWEETS ---
  {
    id: "traditional-indian-sweets",
    slug: "traditional-sweets-packaged-indian-confectionery",
    name: "Traditional Sweets & Packaged Indian Confectionery",
    category: "sweets",
    categoryLabel: "Traditional Sweets",
    subtitle: "Authentic ghee Mysore Pak, Kaju Katli, Halwa, Laddus & traditional festive confectionery with extended export shelf-life.",
    description:
      "Bringing authentic Indian culinary heritage to the global diaspora and international connoisseurs, Jay Impex sources and exports premium traditional sweets and confectionery. Procured from master sweetmakers across Tamil Nadu and western/northern India, our range features pure ghee Mysore Pak, melt-in-mouth Kaju Katli (cashew fudge), Tirunelveli Halwa, Besan Laddus, and Gulab Jamun. Packaged in modified atmosphere packaging (MAP) and nitrogen-flushed tins to guarantee prolonged freshness, aroma, and food safety during international ocean freight.",
    image: "/images/indian-sweets.jpg",
    featured: true,
    hsCode: "1704.90.90",
    origin: "Chennai, Tamil Nadu & Pan-India",
    packagingOptions: [
      "250g, 500g & 1 kg Hermetically Sealed Gift Boxes with Golden Inner Foil Trays",
      "Nitrogen Flushed Tins & Vacuum Retort Pouches",
      "Consolidated Multi-SKU Master Export Cartons for Retail Stores",
    ],
    specifications: [
      { label: "Sweet Varieties", value: "Pure Ghee Mysore Pak, Kaju Katli, Motichoor Laddu, Tirunelveli Halwa, Soan Papdi" },
      { label: "Key Ingredients", value: "Pure Desi Cow Ghee, Premium Cashews, Gram Flour (Besan), Saffron, Cardamom" },
      { label: "Preservation Tech", value: "Modified Atmosphere Packaging (MAP) / Nitrogen Flushed (Zero Preservatives)" },
      { label: "Nutritional Compliance", value: "Export Nutrition Facts Labeling with English/Bilingual Ingredients" },
    ],
    certifications: ["FSSAI Food Safety Licensed", "APEDA Approved Consignor", "US FDA Bioterrorism Act Compliant", "ISO 22000 / HACCP"],
    shelfLife: "6 to 9 Months (MAP packaging)",
    minOrderQuantity: "500 kg Mixed Assortment or Consolidated Pallet",
  },

  // --- NATURAL COIR & RUBBER DOOR MATS ---
  {
    id: "natural-coir-door-mats",
    slug: "natural-coir-rubber-door-mats-floor-coverings",
    name: "Natural Coir & Heavy-Duty Rubber Door Mats",
    category: "mats",
    categoryLabel: "Door Mats & Floor Coverings",
    subtitle: "Eco-friendly natural coir entrance mats, molded anti-slip rubber mats & hand-woven jute/cotton rugs.",
    description:
      "South India produces over 80% of the world's finest coir and natural fiber floor coverings. Sourced from traditional coir hubs in Alleppey and Karur, Jay Impex exports high-durability natural coconut coir door mats, tufted PVC-backed scraper mats, anti-fatigue commercial vulcanized rubber mats, and woven cotton floor runners. Our door mats are engineered for extreme weather resistance, dirt trapping, and anti-slip safety, popular across home improvement retail stores in Australia, Europe, and the Americas.",
    image: "/images/coir-door-mats.jpg",
    featured: true,
    hsCode: "5702.20.00",
    origin: "Alleppey & Karur, South India",
    packagingOptions: [
      "Individual Header Card / Belly Band with Retail Barcode & Hook",
      "Shrink Wrapped Bundles of 10 or 20 Mats",
      "Full Palletized Container Loads (FCL) for Big-Box Hardware & Home Stores",
    ],
    specifications: [
      { label: "Material Composition", value: "100% Biodegradable Natural Coconut Coir Fiber, Heavy-Duty SBR Rubber Backing" },
      { label: "Standard Sizes", value: "40x60 cm, 45x75 cm, 60x90 cm, 80x120 cm & Custom Cut Runners" },
      { label: "Thickness / Pile Height", value: "15 mm to 30 mm Dense Brush Pile" },
      { label: "Design Options", value: "Natural Plain, Bleached, Screen Printed Graphics, Embossed Welcome Motifs" },
      { label: "Weather Resistance", value: "100% Weatherproof, Mildew Resistant & High Dirt Scrape Efficiency" },
    ],
    certifications: ["Coir Board India Registered", "REACH Compliant (EU)", "BSCI Social Audit Compliant Factories"],
    shelfLife: "Long-Term Commercial Durability",
    minOrderQuantity: "1,000 Pieces or 1 x 20ft FCL (approx. 4,500–5,000 mats)",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Commodities", count: PRODUCTS.length },
  { id: "rice", label: "Basmati & Non-Basmati Rice", count: PRODUCTS.filter((p) => p.category === "rice").length },
  { id: "spices", label: "Spices & Seasonings", count: PRODUCTS.filter((p) => p.category === "spices").length },
  { id: "pulses", label: "Agro Pulses & Dals", count: PRODUCTS.filter((p) => p.category === "pulses").length },
  { id: "fmcg", label: "FMCG Provisions", count: PRODUCTS.filter((p) => p.category === "fmcg").length },
  { id: "textiles", label: "Textiles & Garments", count: PRODUCTS.filter((p) => p.category === "textiles").length },
  { id: "machinery", label: "Machinery & Equipment", count: PRODUCTS.filter((p) => p.category === "machinery").length },
  { id: "utensils", label: "Utensils & Cookware", count: PRODUCTS.filter((p) => p.category === "utensils").length },
  { id: "fruits", label: "Seasonal Fresh Fruits", count: PRODUCTS.filter((p) => p.category === "fruits").length },
  { id: "sweets", label: "Traditional Sweets", count: PRODUCTS.filter((p) => p.category === "sweets").length },
  { id: "mats", label: "Door Mats & Floor Coverings", count: PRODUCTS.filter((p) => p.category === "mats").length },
] as const;
