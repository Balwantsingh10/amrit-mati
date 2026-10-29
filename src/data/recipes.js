// 3 Regional Indian Pantry Recipes linked to Amrit Mati products

export const RECIPES = [
  {
    id: 'bundelkhand-dal-tadka',
    title: 'Slow-Simmered Bundelkhand Desi Dal Tadka',
    regionalOrigin: 'Central Indian Homestyle',
    prepTime: '15 mins',
    cookTime: '30 mins',
    servings: '4 persons',
    difficulty: 'Easy Everyday',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80',
    description: 'Unpolished toor dal simmers into a naturally thick, golden broth without artificial starches. Finished with a smoky cumin and Kashmiri deggi mirch tadka in wood-pressed groundnut oil.',
    linkedProducts: [
      { id: 'bundelkhand-desi-toor-dal', name: 'Bundelkhand Desi Toor Dal', pack: '1 kg', price: 195 },
      { id: 'saurashtra-wood-pressed-groundnut-oil', name: 'Wood-Pressed Groundnut Oil', pack: '1 L', price: 340 }
    ],
    ingredients: [
      '1 cup Amrit Mati Unpolished Desi Toor Dal (washed & soaked 20 mins)',
      '3.5 cups water with 1/2 tsp turmeric and 1 tsp rock salt',
      '2 tbsp Amrit Mati Wood-Pressed Groundnut Oil (or A2 Desi Ghee)',
      '1 tsp cumin seeds (jeera) and 1/4 tsp hing (asafoetida)',
      '2 green chillies slit, 1 inch grated ginger, 3 crushed garlic cloves',
      '1 medium ripe tomato, finely diced',
      'Fresh chopped coriander leaves and a squeeze of lime juice'
    ],
    method: [
      'Pressure cook soaked toor dal with water, turmeric, and rock salt for 4 whistles on medium flame until tender and velvety.',
      'In a heavy-bottom iron tadka pan, heat wood-pressed groundnut oil. Splutter cumin seeds and add hing.',
      'Add crushed garlic and ginger; saute until pale golden, then add green chillies and diced tomatoes.',
      'Cook until tomatoes break down softly, then pour the sizzling tadka directly over the bubbling dal.',
      'Cover with lid for 3 minutes to trap the aroma. Garnish with coriander and serve hot with Sharbati phulkas or steamed rice.'
    ]
  },
  {
    id: 'dehradun-shahi-jeera-pulao',
    title: 'Aromatic Shivalik Jeera & Clove Pulao',
    regionalOrigin: 'North Indian Classic',
    prepTime: '20 mins',
    cookTime: '22 mins',
    servings: '4 persons',
    difficulty: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80',
    description: 'Showcasing the extraordinary length and floral aroma of 24-month aged Taraori Basmati. Each grain cooks separate, slender, and fragrant.',
    linkedProducts: [
      { id: 'taraori-aged-basmati-rice', name: 'Dehradun Taraori Aged Basmati', pack: '2.5 kg', price: 435 }
    ],
    ingredients: [
      '1.5 cups Amrit Mati 24-Mo Aged Taraori Basmati Rice (washed gently twice)',
      '2.75 cups warm water (1:1.8 ratio for aged basmati)',
      '2 tbsp cold-pressed oil or ghee',
      '1.5 tsp shahi jeera (caraway seeds), 4 green cardamoms, 4 cloves, 1 bay leaf, 1 black cardamom',
      '1 small cinnamon quill, 1 tsp pink rock salt'
    ],
    method: [
      'Soak the aged basmati grains gently in cool water for 25 minutes, then drain thoroughly in a colander.',
      'In a wide, heavy saucepan, heat the cooking fat. Add whole spices and shahi jeera; sizzle on low heat for 45 seconds until fragrant.',
      'Add drained rice and gently toast with the spices for 90 seconds, coating each grain without breaking.',
      'Pour in warm water and salt. Bring to a rapid rolling boil on high flame.',
      'Once water level touches grain surface, cover tightly with a sealed lid, reduce flame to lowest possible, and simmer for 10 minutes.',
      'Switch off heat. Leave undisturbed for 10 minutes before gently fluffing with a flat fork from the edge inward.'
    ]
  },
  {
    id: 'soft-sharbati-phulkas',
    title: 'Traditional Soft Balloon Phulkas',
    regionalOrigin: 'Everyday Indian Kitchen',
    prepTime: '15 mins + 15 min rest',
    cookTime: '15 mins',
    servings: '3-4 persons (10-12 rotis)',
    difficulty: 'Everyday Mastery',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
    description: 'Fresh stone-milled Sharbati atta retains moisture naturally, producing paper-thin rotis that balloon effortlessly on open flame and remain tender in the casserole all day.',
    linkedProducts: [
      { id: 'sehore-sharbati-atta', name: 'Sehore Sharbati Whole Wheat Atta', pack: '5 kg', price: 440 }
    ],
    ingredients: [
      '2 cups Amrit Mati Sehore Sharbati Whole Wheat Atta',
      '3/4 to 1 cup lukewarm water (adjust per humidity)',
      '1/2 tsp rock salt (optional)',
      'Dry atta for dusting',
      '1 tsp cold-pressed oil or butter to finish (optional)'
    ],
    method: [
      'In a traditional brass or wood parat, combine Sharbati flour and salt. Gradually add lukewarm water and knead for 6–8 minutes into a supple, pliable dough.',
      'Cover with a damp cotton muslin cloth and rest for 15 minutes to allow natural gluten strands to relax.',
      'Pinch lemon-sized dough balls. Roll smoothly without cracks, dust lightly in flour, and roll out evenly into 6-inch circles.',
      'Heat an iron tawa on medium-high. Place the rolled roti; flip once faint bubbles appear on top (about 20 seconds).',
      'Cook the second side for 35 seconds until golden specks appear, then transfer directly onto open flame with tongs — watch it puff completely into a balloon.',
      'Stack inside a cotton cloth-lined brass roti box.'
    ]
  }
];
