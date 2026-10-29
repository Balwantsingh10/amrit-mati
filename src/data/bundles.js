// Starter Bundles & "Build Your Pantry" Bundle Builder Data

export const PRESET_BUNDLES = [
  {
    id: 'essential-pantry-starter',
    name: 'The Essential Indian Pantry Starter',
    badge: 'Most Popular for New Homes',
    description: 'Everything you need to reset your kitchen staples: fresh stone-ground Sharbati atta, 2-year aged Taraori Basmati, unpolished Bundelkhand toor dal, and cold-pressed Saurashtra groundnut oil.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    items: [
      { name: 'Sehore Sharbati Whole Wheat Atta', pack: '5 kg Family Pack', weight: '5 kg' },
      { name: 'Dehradun Taraori Aged Basmati Rice', pack: '2.5 kg Heritage Canister', weight: '2.5 kg' },
      { name: 'Bundelkhand Desi Toor Dal', pack: '1 kg Kraft Pouch', weight: '1 kg' },
      { name: 'Saurashtra Wood-Pressed Groundnut Oil', pack: '1 Litre Glass Bottle', weight: '1 L' }
    ],
    totalWeight: '9.5 kg staples',
    originalPrice: 1410,
    bundlePrice: 1199,
    savings: 211,
    freeDelivery: true
  },
  {
    id: 'heritage-rice-dal-pair',
    name: 'Heirloom Dal & Fragrant Rice Box',
    badge: 'Flavour & Comfort Box',
    description: 'Curated for wholesome everyday dal-chawal with rich aroma: 2-year aged Basmati, buttery Govindobhog, and native unpolished Bundelkhand Toor.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    items: [
      { name: 'Dehradun Taraori Aged Basmati Rice', pack: '2.5 kg Heritage Canister', weight: '2.5 kg' },
      { name: 'Bengal Govindobhog Aromatic Rice', pack: '1 kg Vintage Pack', weight: '1 kg' },
      { name: 'Bundelkhand Desi Toor Dal', pack: '2 kg Value Pack', weight: '2 kg' }
    ],
    totalWeight: '5.5 kg grains & pulse',
    originalPrice: 975,
    bundlePrice: 849,
    savings: 126,
    freeDelivery: false
  },
  {
    id: 'ancient-grain-wellness',
    name: 'Ancient Grains & Native Millets Trio',
    badge: 'High-Fibre & Low-GI',
    description: 'Crafted for families seeking slow-release complex carbs: unhybridized Khapli Emmer flour and low-GI Mandya Foxtail Millet.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    items: [
      { name: 'Maharashtra Khapli (Emmer) Flour', pack: '5 kg Eco Cotton Sack', weight: '5 kg' },
      { name: 'Mandya Unpolished Foxtail Millet', pack: '3 kg Triple Pack', weight: '3 kg' }
    ],
    totalWeight: '8 kg ancient staples',
    originalPrice: 1019,
    bundlePrice: 899,
    savings: 120,
    freeDelivery: false
  }
];

// Items available in "Build Your Pantry" custom box builder
export const PANTRY_BUILDER_ITEMS = [
  {
    id: 'builder-atta-5kg',
    productId: 'sehore-sharbati-atta',
    variantId: '5kg',
    name: 'Sehore Sharbati Atta',
    pack: '5 kg',
    price: 440,
    category: 'Atta & Flours',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'builder-basmati-2.5kg',
    productId: 'taraori-aged-basmati-rice',
    variantId: '2.5kg',
    name: 'Taraori Aged Basmati',
    pack: '2.5 kg',
    price: 435,
    category: 'Heritage Rice',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'builder-toor-2kg',
    productId: 'bundelkhand-desi-toor-dal',
    variantId: '2kg',
    name: 'Bundelkhand Desi Toor Dal',
    pack: '2 kg',
    price: 375,
    category: 'Heirloom Dals',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'builder-groundnut-1L',
    productId: 'saurashtra-wood-pressed-groundnut-oil',
    variantId: '1L',
    name: 'Wood-Pressed Groundnut Oil',
    pack: '1 Litre',
    price: 340,
    category: 'Cold-Pressed Oils',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'builder-foxtail-1kg',
    productId: 'mandya-foxtail-millet',
    variantId: '1kg',
    name: 'Mandya Foxtail Millet',
    pack: '1 kg',
    price: 145,
    category: 'Native Millets',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'builder-mustard-1L',
    productId: 'rajasthan-black-mustard-oil',
    variantId: '1L',
    name: 'Black Mustard Oil',
    pack: '1 Litre',
    price: 285,
    category: 'Cold-Pressed Oils',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80'
  }
];
