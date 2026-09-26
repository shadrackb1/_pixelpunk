
import React from 'react';
import { ItemStatus, Product, ArchiveItem } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'PX-001',
    name: 'HYBRID BLAZER // ARCHIVE-01',
    price: '$240',
    status: ItemStatus.AVAILABLE,
    category: 'Outerwear',
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    provenance: 'Found in Berlin. A perfect 90s silhouette that works with modern tech-wear or casual street fits.',
    details: ['Heavy structured wool', 'Oversized modern fit', 'Refurbished original buttons'],
    carbonSaved: '12.4kg',
    era: 'VINTAGE_BASE'
  },
  {
    id: 'PX-002',
    name: 'URBAN COMMAND UTILITY VEST',
    price: '$180',
    status: ItemStatus.SOLD,
    category: 'Vests',
    imageUrl: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?q=80&w=800&auto=format&fit=crop',
    provenance: 'London Sourcing. A rare find that brings an industrial edge to a simple hoodie or tee.',
    details: ['Multi-functional pockets', 'Water-resistant nylon', 'Adjustable side straps'],
    carbonSaved: '8.2kg',
    era: 'EARLY_2000S'
  },
  {
    id: 'PX-003',
    name: 'LAB-REWORKED OVERSIZED TEE',
    price: '$145',
    status: ItemStatus.AVAILABLE,
    category: 'Tops',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    provenance: 'Customized in-house. We took a heavy 80s cotton blank and gave it a modern digital-glitch wash.',
    details: ['Heavyweight 400gsm cotton', 'One-of-a-kind dye pattern', 'Dropped shoulder fit'],
    carbonSaved: '5.1kg',
    era: 'MODERN_HYBRID'
  },
  {
    id: 'PX-004',
    name: 'ARCHIVE_DENIM // WIDE LEG',
    price: '$210',
    status: ItemStatus.AVAILABLE,
    category: 'Bottoms',
    imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop',
    provenance: 'Sourced for its incredible natural wash. These are the jeans modern brands try to copy, but can\'t.',
    details: ['Authentic raw aging', 'Straight wide-leg cut', 'Original reinforced rivets'],
    carbonSaved: '15.6kg',
    era: '1980S_RECOVERED'
  }
];

export const ARCHIVE_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-01',
    title: 'THE MODERN ARCHIVE',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop',
    description: 'How to mix 40-year-old fabrics with today\'s sharpest silhouettes.',
    date: 'NOV 2024',
    tags: ['MIXING', 'STYLING']
  },
  {
    id: 'arch-02',
    title: 'STREET ORIGINS',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    description: 'Tracking the evolution of utility gear from the factory to the city.',
    date: 'OCT 2024',
    tags: ['UTILITY', 'HISTORY']
  },
  {
    id: 'arch-03',
    title: 'DIGITAL FABRIC',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop',
    description: 'Exploring why vintage textures look so good in high-definition photos.',
    date: 'SEP 2024',
    tags: ['AESTHETIC', 'TEXTURE']
  }
];

// Re-writing POLICY_CONTENT to use React.createElement to fix syntax errors in a .ts file
export const POLICY_CONTENT: Record<string, React.ReactNode> = {
  authenticity: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "PixelPunk stands behind every piece we sell. Each item goes through three checks before it reaches the vault:"),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Structural Audit:"), " Stitch count, seam construction, and hardware hallmarks."),
      React.createElement('li', null, React.createElement('strong', null, "Historical Cross-Reference:"), " Labels and wash tags matched against known manufacturing eras."),
      React.createElement('li', null, React.createElement('strong', null, "Provenance Logging:"), " Where the item was sourced and how it likely moved over the years.")
    ),
    React.createElement('p', null, "Items that fail authenticity or grade checks never go up for sale. What you buy is a real historical piece.")
  ),
  shipping: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "We pack every archive shipment the way a historical piece deserves."),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Express Handling:"), " Orders leave within 48 hours."),
      React.createElement('li', null, React.createElement('strong', null, "Secure Packaging:"), " Items go out in pH-neutral acid-free tissue so nothing chemically ages in transit."),
      React.createElement('li', null, React.createElement('strong', null, "Global Tracking:"), " Tracking on every international order through our priority courier network.")
    ),
    React.createElement('p', null, "Delivery usually takes 3 to 7 business days, depending on how far you are from the nearest archive hub.")
  ),
  terms: React.createElement('div', { className: "space-y-6" },
    React.createElement('h4', { className: "text-white font-bold" }, "1. Exclusive Ownership"),
    React.createElement('p', null, "Archive items are unique. By completing a checkout, you acknowledge that you are securing a one-of-a-kind piece. Stock is not guaranteed until checkout completion."),
    React.createElement('h4', { className: "text-white font-bold" }, "2. Vintage Condition"),
    React.createElement('p', null, "You are buying pre-owned or archive goods. Natural aging, patina, and minor marks are part of the item's history. We describe condition honestly, but we never promise perfection. History is messy."),
    React.createElement('h4', { className: "text-white font-bold" }, "3. Returns"),
    React.createElement('p', null, "Because these pieces are one of one, we accept returns within 14 days if the item is unworn and the security tags are still on.")
  ),
  privacy: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "Your privacy matters as much as the archive. We do not sell your data."),
    React.createElement('p', null, "We collect only what we need to fulfill your order and ship it: email, name, and delivery address. Transactions run over encrypted connections."),
    React.createElement('p', null, "Your history with us stays with us.")
  ),
  care: React.createElement('div', { className: "space-y-6" },
    React.createElement('p', null, "Vintage fabrics do better with a light touch. We recommend:"),
    React.createElement('ul', { className: "list-disc pl-5 space-y-2" },
      React.createElement('li', null, React.createElement('strong', null, "Hand Wash Only:"), " Avoid heavy mechanical agitation."),
      React.createElement('li', null, React.createElement('strong', null, "Steam Over Iron:"), " High heat from an iron can flatten historical textures. Use gentle steam."),
      React.createElement('li', null, React.createElement('strong', null, "Breathable Storage:"), " Skip long-term plastic bags. Use cotton garment bags.")
    )
  )
};
