
import { ProductType } from './types';

export const PRODUCTS: ProductType[] = [
  {
    id: 'tshirt-white',
    name: 'Premium White Tee',
    category: 'Apparel',
    defaultPrompt: 'Place this logo naturally on a high-quality white cotton t-shirt worn by a model in a bright, modern studio. The logo should follow the fabric wrinkles and lighting.',
    thumbnail: 'https://picsum.photos/seed/tee/200/200'
  },
  {
    id: 'hoodie-black',
    name: 'Urban Black Hoodie',
    category: 'Apparel',
    defaultPrompt: 'Place this logo on the chest of a black oversized hoodie. Cinematic lighting, street style background, high detail.',
    thumbnail: 'https://picsum.photos/seed/hoodie/200/200'
  },
  {
    id: 'mug-ceramic',
    name: 'Ceramic Coffee Mug',
    category: 'Drinkware',
    defaultPrompt: 'Place this logo on a white ceramic coffee mug sitting on a wooden cafe table with soft bokeh background.',
    thumbnail: 'https://picsum.photos/seed/mug/200/200'
  },
  {
    id: 'cap-navy',
    name: 'Classic Navy Cap',
    category: 'Accessories',
    defaultPrompt: 'Place this logo as an embroidered patch on the front of a navy blue baseball cap. Macro shot showing fabric texture.',
    thumbnail: 'https://picsum.photos/seed/cap/200/200'
  },
  {
    id: 'tote-bag',
    name: 'Eco Canvas Tote',
    category: 'Accessories',
    defaultPrompt: 'Place this logo on a natural canvas tote bag held by someone walking in a sunny park.',
    thumbnail: 'https://picsum.photos/seed/tote/200/200'
  }
];

export const LOADING_MESSAGES = [
  "Crafting your custom merch...",
  "Applying logo physics...",
  "Rendering cinematic lighting...",
  "Finalizing textures...",
  "Gemini is thinking...",
  "Polishing the print details..."
];
