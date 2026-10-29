// Central Product Data Model for Amrit Mati
// All prices in INR. Unit prices dynamically computed per kg or litre.

export const CATEGORIES = [
  { id: 'all', name: 'All Staples', count: 12 },
  { id: 'flours', name: 'Atta & Flours', count: 3, description: 'Slow stone-milled whole grains retaining wheat germ and dietary bran.' },
  { id: 'rice', name: 'Heritage Rice', count: 3, description: 'Traditional aromatic and heirloom cultivars aged naturally for flavour.' },
  { id: 'dals', name: 'Heirloom Dals', count: 3, description: 'Naturally unpolished pulses sun-dried and free from chemical washes.' },
  { id: 'oils', name: 'Cold-Pressed Oils', count: 2, description: 'Wood-churned (Kachi Ghani) at ambient temperature below 42°C.' },
  { id: 'millets', name: 'Native Millets', count: 2, description: 'Climate-resilient, low-GI whole millets direct from dryland collectives.' }
];

export const PRODUCTS = [
  {
    id: 'sehore-sharbati-atta',
    slug: 'sehore-sharbati-whole-wheat-atta',
    name: 'Sehore Sharbati Whole Wheat Atta',
    category: 'flours',
    categoryName: 'Atta & Flours',
    headline: 'Traditional Chakki Stone-Ground Wheat with 100% Germ & Bran',
    shortDescription: 'Naturally sweet, golden-grain Sharbati wheat grown in Madhya Pradesh’s rain-fed black soil. Slow-milled on traditional emery stone at low RPM to preserve delicate vitamins and moisture, creating soft, fragrant rotis that stay tender for hours.',
    rating: 4.9,
    reviewCount: 184,
    badge: 'Pantry Bestseller',
    isBestseller: true,
    inStock: true,
    harvestSeason: 'Rabi 2026',
    origin: {
      region: 'Sehore District',
      state: 'Madhya Pradesh',
      soil: 'Deep Vertisol (Black Cotton Soil)',
      farmerCollective: 'Narmada Organic Farmers Producer Co.'
    },
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Trial Pack', weightKg: 1, price: 95, mrp: 110, discountPercent: 14 },
      { id: '5kg', label: '5 kg Family Pack', weightKg: 5, price: 440, mrp: 525, discountPercent: 16, isDefault: true },
      { id: '10kg', label: '10 kg Value Sack', weightKg: 10, price: 820, mrp: 1000, discountPercent: 18 }
    ],
    millingType: 'Slow Emery Stone-Chakki (< 40°C flour exit temperature)',
    ingredients: '100% Single-origin Sharbati Whole Wheat (Triticum aestivum)',
    allergens: 'Contains Gluten. Processed in a dedicated stone-mill facility free from nuts.',
    shelfLife: '90 days from date of milling (no chemical preservatives or bleaching agents).',
    storageInstructions: 'Store in an airtight stainless steel or brass canister in a cool, dry pantry away from direct sunlight.',
    nutrition: {
      servingBasis: 'Per 100g unbaked flour',
      calories: '364 kcal',
      protein: '12.8 g',
      dietaryFiber: '11.5 g',
      carbohydrates: '71.2 g',
      fats: '2.1 g',
      iron: '3.9 mg (22% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-MP04',
      date: '14 Oct 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Organophosphate Pesticides (52 screen)', found: 'Not Detected (<0.01 mg/kg)', status: 'PASS' },
        { parameter: 'Lead & Heavy Metals', found: '0.012 mg/kg (Permissible: 0.20 mg/kg)', status: 'PASS' },
        { parameter: 'Aflatoxin B1 + Total', found: 'Below detection limit', status: 'PASS' },
        { parameter: 'Synthetic Whitening Agents (Benzoyl Peroxide)', found: 'Zero / Absent', status: 'PASS' }
      ]
    }
  },
  {
    id: 'taraori-aged-basmati-rice',
    slug: 'dehradun-taraori-aged-basmati-rice',
    name: 'Dehradun Taraori 24-Mo Aged Basmati',
    category: 'rice',
    categoryName: 'Heritage Rice',
    headline: 'Traditional Long-Grain Cultivar Naturally Aged in Himalayan Foothills',
    shortDescription: 'The crown jewel of traditional basmati varieties. Sourced from the glacial canal-fed plains near the Shivalik foothills. Naturally aged in well-ventilated wooden granaries for 24 months to crystallize amylose, yielding slender, non-sticky grains that expand up to 2.5× in length with an intoxicating nutty aroma.',
    rating: 5.0,
    reviewCount: 247,
    badge: '2-Year Aged',
    isBestseller: true,
    inStock: true,
    harvestSeason: 'Kharif 2024 (Aged 24 Months)',
    origin: {
      region: 'Taraori & Dehradun Basin',
      state: 'Uttarakhand / Haryana Belt',
      soil: 'Mineral-rich Himalayan alluvial silt',
      farmerCollective: 'Shivalik Heirloom Rice Growers'
    },
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Vintage Tin', weightKg: 1, price: 185, mrp: 215, discountPercent: 14 },
      { id: '2.5kg', label: '2.5 kg Heritage Canister', weightKg: 2.5, price: 435, mrp: 510, discountPercent: 15, isDefault: true },
      { id: '5kg', label: '5 kg Cotton Linen Sack', weightKg: 5, price: 825, mrp: 990, discountPercent: 17 }
    ],
    millingType: 'Single-pass de-husking with gentle bran polishing (<4%)',
    ingredients: '100% Pure Heritage Taraori Basmati Rice (Oryza sativa)',
    allergens: 'Naturally Gluten-free.',
    shelfLife: '24 months from packaging when kept moisture-free.',
    storageInstructions: 'Keep in an airtight container with 2–3 dried bay leaves or whole cloves to deter ambient pests naturally.',
    nutrition: {
      servingBasis: 'Per 100g uncooked grain',
      calories: '356 kcal',
      protein: '8.4 g',
      dietaryFiber: '2.2 g',
      carbohydrates: '77.8 g',
      fats: '0.6 g',
      iron: '1.2 mg (7% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-UK09',
      date: '02 Oct 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Varietal Purity (DNA Fingerprint)', found: '99.4% Pure Taraori', status: 'PASS' },
        { parameter: 'Moisture Content', found: '11.2% (Target < 12.5% for aging)', status: 'PASS' },
        { parameter: 'Mineral Oil / Glaze Residue', found: 'Absent', status: 'PASS' },
        { parameter: 'Heavy Metals (Arsenic/Cadmium)', found: 'Below EU & FSSAI threshold', status: 'PASS' }
      ]
    }
  },
  {
    id: 'bundelkhand-desi-toor-dal',
    slug: 'bundelkhand-unpolished-desi-toor-dal',
    name: 'Bundelkhand Desi Toor Dal (Unpolished)',
    category: 'dals',
    categoryName: 'Heirloom Dals',
    headline: 'Native Rain-Fed Pigeon Pea with Zero Water-Polishing or Oil Buffing',
    shortDescription: 'Unlike commercial dal treated with synthetic leather belts, oil buffs, and mineral water washing to look glossy, our Desi Toor is harvested from smallholder farms in Bundelkhand. Split using traditional hand-turned chakkis and sun-dried, it cooks with a rich aroma and earthy sweetness.',
    rating: 4.8,
    reviewCount: 139,
    badge: '100% Unpolished',
    isBestseller: true,
    inStock: true,
    harvestSeason: 'Kharif 2025',
    origin: {
      region: 'Lalitpur & Jhansi Belt',
      state: 'Uttar Pradesh / MP Border',
      soil: 'Red and Yellow gravelly loam',
      farmerCollective: 'Bundelkhand Rainfed Farmer Alliance'
    },
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Kraft Pouch', weightKg: 1, price: 195, mrp: 230, discountPercent: 15, isDefault: true },
      { id: '2kg', label: '2 kg Value Pack', weightKg: 2, price: 375, mrp: 445, discountPercent: 16 },
      { id: '5kg', label: '5 kg Pantry Tub', weightKg: 5, price: 890, mrp: 1080, discountPercent: 18 }
    ],
    millingType: 'Traditional mechanical stone-split, unpolished',
    ingredients: '100% Native Unpolished Pigeon Pea (Cajanus cajan)',
    allergens: 'Naturally Gluten-free. Packed in a facility handling pulses.',
    shelfLife: '12 months from date of packing.',
    storageInstructions: 'Store in a dry container. In humid weather, adding a piece of rock salt helps maintain crisp freshness.',
    nutrition: {
      servingBasis: 'Per 100g dry pulse',
      calories: '343 kcal',
      protein: '22.3 g',
      dietaryFiber: '15.1 g',
      carbohydrates: '62.8 g',
      fats: '1.5 g',
      iron: '5.2 mg (29% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-UP12',
      date: '20 Sep 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Synthetic Color / Metanil Yellow', found: 'Negative / Absent', status: 'PASS' },
        { parameter: 'Mineral Oil Glaze', found: 'Zero Detected', status: 'PASS' },
        { parameter: 'Protein Content', found: '22.3% (Commercial avg: 18-19%)', status: 'PASS' }
      ]
    }
  },
  {
    id: 'saurashtra-wood-pressed-groundnut-oil',
    slug: 'saurashtra-wood-pressed-groundnut-oil',
    name: 'Saurashtra Wood-Pressed Groundnut Oil',
    category: 'oils',
    categoryName: 'Cold-Pressed Oils',
    headline: 'Real Marachekku / Vaagai Wood Churned at Ambient Temperature',
    shortDescription: 'Extracted slowly from sun-dried Saurashtra red-skin peanuts in wooden mortars (Kolhu / Chekku). No chemical solvents (hexane), zero refining, bleaching, or deodorizing. Sedimented naturally by settling under gravity, retaining authentic nutty fragrance and natural Vitamin E.',
    rating: 4.9,
    reviewCount: 162,
    badge: 'Wood-Churned',
    isBestseller: true,
    inStock: true,
    harvestSeason: 'Rabi 2026',
    origin: {
      region: 'Junagadh & Rajkot',
      state: 'Gujarat',
      soil: 'Coastal Calcareous Loam',
      farmerCollective: 'Gir Agro Producer Company'
    },
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1L', label: '1 Litre Glass Bottle', weightKg: 1, price: 340, mrp: 395, discountPercent: 14, isDefault: true },
      { id: '2L', label: '2 Litre Family Tin', weightKg: 2, price: 650, mrp: 770, discountPercent: 16 },
      { id: '5L', label: '5 Litre Traditional Tin', weightKg: 5, price: 1540, mrp: 1850, discountPercent: 17 }
    ],
    millingType: 'Traditional Wood Mortar Kolhu (< 42°C extraction)',
    ingredients: '100% Single-Origin Cold-Pressed Peanut Oil (Arachis hypogaea)',
    allergens: 'Contains Peanut. Free from soy, palm, and trans fats.',
    shelfLife: '9 months from pressing in unexposed amber glass or tin.',
    storageInstructions: 'Store in a dark, cool cupboard. Do not refrigerate. Slight cloudiness or sediment at the bottom is proof of unfiltered authenticity.',
    nutrition: {
      servingBasis: 'Per 100ml cold-pressed oil',
      calories: '884 kcal',
      protein: '0 g',
      dietaryFiber: '0 g',
      carbohydrates: '0 g',
      fats: '100 g (Monounsaturated: 48g, Polyunsaturated: 34g, Saturated: 18g)',
      vitaminE: '15.7 mg (105% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-GJ18',
      date: '28 Sep 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Free Fatty Acids (as Oleic)', found: '0.42% (Max limit: 1.5%)', status: 'PASS' },
        { parameter: 'Hexane / Chemical Solvent Residue', found: 'Zero / Absent (<0.1 ppm)', status: 'PASS' },
        { parameter: 'Argemone & Mineral Oil', found: 'Negative', status: 'PASS' }
      ]
    }
  },
  {
    id: 'mandya-foxtail-millet',
    slug: 'mandya-unpolished-foxtail-millet',
    name: 'Mandya Unpolished Foxtail Millet (Navane)',
    category: 'millets',
    categoryName: 'Native Millets',
    headline: 'Native Dryland Whole Grain with Intact Bran Layer and Low Glycemic Index',
    shortDescription: 'Grown sustainably with zero canal irrigation by women-led farmer collectives in Karnataka. De-hulled using low-friction rubberized shellers to leave the golden bran intact. Naturally rich in iron, zinc, and slow-release dietary fibre, making it an ideal wholesome swap for polished white rice.',
    rating: 4.8,
    reviewCount: 96,
    badge: 'Low Glycemic',
    isBestseller: false,
    inStock: true,
    harvestSeason: 'Kharif 2025',
    origin: {
      region: 'Mandya & Tumkur',
      state: 'Karnataka',
      soil: 'Red Gravelly Semi-Arid Soil',
      farmerCollective: 'Cauvery Native Millets Federation'
    },
    images: [
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Vacuum Pack', weightKg: 1, price: 145, mrp: 175, discountPercent: 17, isDefault: true },
      { id: '3kg', label: '3 kg Triple Pack', weightKg: 3, price: 399, mrp: 495, discountPercent: 19 }
    ],
    millingType: 'Low-friction rubberized de-huller with intact pericarp',
    ingredients: '100% Unpolished Native Foxtail Millet (Setaria italica)',
    allergens: 'Naturally Gluten-free.',
    shelfLife: '12 months in sealed vacuum packaging.',
    storageInstructions: 'Store in an airtight glass or steel jar once opened.',
    nutrition: {
      servingBasis: 'Per 100g dry grain',
      calories: '351 kcal',
      protein: '12.3 g',
      dietaryFiber: '8.0 g',
      carbohydrates: '60.9 g',
      fats: '4.3 g',
      iron: '2.8 mg (16% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-KA07',
      date: '08 Oct 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Bran Layer Retention', found: '> 91% intact pericarp', status: 'PASS' },
        { parameter: 'Pesticide Multiresidue Screen', found: 'Below quantification limit', status: 'PASS' },
        { parameter: 'Uric Acid & Foreign Seeds', found: 'Zero', status: 'PASS' }
      ]
    }
  },
  {
    id: 'khapli-emmer-wheat-flour',
    slug: 'maharashtra-khapli-emmer-wheat-flour',
    name: 'Maharashtra Khapli (Emmer) Flour',
    category: 'flours',
    categoryName: 'Atta & Flours',
    headline: 'Ancient Low-Gluten Heirloom Grain from Solapur Basin',
    shortDescription: 'Khapli is an ancient, un-hybridized ancestor of modern wheat cultivated for thousands of years across the Deccan plateau. Naturally low in gluten indices, it is slow-ground on water-cooled stone mills into an aromatic, fibrous flour celebrated for light digestion and rustic, nutty flatbreads.',
    rating: 4.9,
    reviewCount: 114,
    badge: 'Ancient Heirloom',
    isBestseller: false,
    inStock: true,
    harvestSeason: 'Rabi 2026',
    origin: {
      region: 'Solapur & Sangli',
      state: 'Maharashtra',
      soil: 'Medium Black Volcanic Loam',
      farmerCollective: 'Sahyadri Desi Seeds Conservation Group'
    },
    images: [
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Kraft Canister', weightKg: 1, price: 135, mrp: 160, discountPercent: 16, isDefault: true },
      { id: '5kg', label: '5 kg Eco Cotton Sack', weightKg: 5, price: 620, mrp: 750, discountPercent: 17 }
    ],
    millingType: 'Slow Emery Stone-Chakki (< 38°C exit temperature)',
    ingredients: '100% Unhybridized Ancient Emmer Wheat (Triticum dicoccum)',
    allergens: 'Contains naturally low-index gluten. Not suitable for diagnosed celiac.',
    shelfLife: '90 days from stone milling.',
    storageInstructions: 'Keep in an airtight jar in a cool pantry.',
    nutrition: {
      servingBasis: 'Per 100g unbaked flour',
      calories: '348 kcal',
      protein: '14.1 g',
      dietaryFiber: '13.2 g',
      carbohydrates: '65.4 g',
      fats: '2.2 g',
      iron: '4.8 mg (27% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-MH22',
      date: '19 Oct 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Hybrid Marker Test', found: 'Pure 28-chromosome Dicoccum', status: 'PASS' },
        { parameter: 'Pesticide Screen (250 compounds)', found: 'Not Detected', status: 'PASS' }
      ]
    }
  },
  {
    id: 'govindobhog-aromatic-rice',
    slug: 'bengal-govindobhog-aromatic-baby-rice',
    name: 'Bengal Govindobhog Aromatic Rice',
    category: 'rice',
    categoryName: 'Heritage Rice',
    headline: 'Sweet Buttery Fragrance Heirloom Rice from Burdwan',
    shortDescription: 'Beloved in eastern kitchens for ceremonial khichuri, payesh, and ghee-bhat. Govindobhog is a small, tender white grain infused with a distinct sweet buttery scent that fills the kitchen as it simmers. Gently harvested and aged for 12 months.',
    rating: 4.9,
    reviewCount: 88,
    badge: 'GI-Tagged Origin',
    isBestseller: false,
    inStock: true,
    harvestSeason: 'Aman Harvest 2025',
    origin: {
      region: 'Purba Bardhaman',
      state: 'West Bengal',
      soil: 'Damodar River Alluvial Basin',
      farmerCollective: 'Radharani Traditional Rice Cultivators'
    },
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1kg', label: '1 kg Vintage Pack', weightKg: 1, price: 165, mrp: 195, discountPercent: 15, isDefault: true },
      { id: '2.5kg', label: '2.5 kg Heritage Canister', weightKg: 2.5, price: 390, mrp: 460, discountPercent: 15 }
    ],
    millingType: 'Traditional rubber roller hulling with unbleached natural polish',
    ingredients: '100% Traditional Govindobhog Rice (Oryza sativa)',
    allergens: 'Naturally Gluten-free.',
    shelfLife: '18 months from packing.',
    storageInstructions: 'Store in a cool dry pantry away from spices.',
    nutrition: {
      servingBasis: 'Per 100g uncooked grain',
      calories: '358 kcal',
      protein: '7.9 g',
      dietaryFiber: '1.9 g',
      carbohydrates: '79.2 g',
      fats: '0.8 g',
      iron: '1.1 mg (6% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-WB15',
      date: '11 Oct 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Aroma Compound (2-AP content)', found: 'High Natural Retention', status: 'PASS' },
        { parameter: 'Adulteration with non-aromatic grains', found: 'Zero', status: 'PASS' }
      ]
    }
  },
  {
    id: 'rajasthan-black-mustard-oil',
    slug: 'rajasthan-cold-pressed-black-mustard-oil',
    name: 'Rajasthan Cold-Pressed Black Mustard Oil',
    category: 'oils',
    categoryName: 'Cold-Pressed Oils',
    headline: 'High-Pungency Traditional Kachi Ghani Mustard Oil',
    shortDescription: 'Pressed from small, high-oil black mustard seeds grown in the dry sandy loams of Alwar. Slowly cold-pressed in wooden kolhus without heat or steam injection, keeping the sinus-clearing allylisothiocyanate bite intact. The quintessential companion for north and east Indian subzis, fish curries, and winter pickles.',
    rating: 4.8,
    reviewCount: 121,
    badge: 'Raw & Unfiltered',
    isBestseller: false,
    inStock: true,
    harvestSeason: 'Rabi 2026',
    origin: {
      region: 'Alwar & Bharatpur',
      state: 'Rajasthan',
      soil: 'Semi-Arid Alluvial Sand',
      farmerCollective: 'Matsya Mustard Seed Growers'
    },
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80'
    ],
    variants: [
      { id: '1L', label: '1 Litre Glass Bottle', weightKg: 1, price: 285, mrp: 330, discountPercent: 14, isDefault: true },
      { id: '2L', label: '2 Litre Family Tin', weightKg: 2, price: 540, mrp: 640, discountPercent: 16 },
      { id: '5L', label: '5 Litre Traditional Tin', weightKg: 5, price: 1290, mrp: 1550, discountPercent: 17 }
    ],
    millingType: 'Traditional Kachi Ghani wood mortar extraction',
    ingredients: '100% Pure Cold-Pressed Black Mustard Oil (Brassica nigra)',
    allergens: 'Contains Mustard. Free from artificial colour, argemone, and blending oils.',
    shelfLife: '12 months from extraction.',
    storageInstructions: 'Store in amber glass or tin in a dark cupboard.',
    nutrition: {
      servingBasis: 'Per 100ml cold-pressed oil',
      calories: '884 kcal',
      protein: '0 g',
      dietaryFiber: '0 g',
      carbohydrates: '0 g',
      fats: '100 g (Omega-3: 11g, Omega-6: 15g, Monounsaturated: 60g)',
      vitaminE: '18.2 mg (121% RDA)'
    },
    labReport: {
      reportNo: 'AM-LAB-2026-RJ31',
      date: '25 Sep 2026',
      accreditation: 'NABL Accredited Food Testing Laboratory (ISO/IEC 17025)',
      results: [
        { parameter: 'Natural Pungency (Allyl isothiocyanate)', found: '0.34% (Optimal high pungency)', status: 'PASS' },
        { parameter: 'Argemone Oil Screen', found: 'Negative', status: 'PASS' },
        { parameter: 'Polycyclic Aromatic Hydrocarbons', found: 'Below detection limit', status: 'PASS' }
      ]
    }
  }
];

// Helper to calculate price per kg/litre for any variant
export const getUnitPriceDisplay = (variant) => {
  const unitPrice = Math.round(variant.price / variant.weightKg);
  const unit = variant.id.includes('L') ? 'L' : 'kg';
  return `₹${unitPrice}/${unit}`;
};
