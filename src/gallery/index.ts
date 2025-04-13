
// Gallery image collection with alt text
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category?: string;
}

// Main gallery collection
export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/src/gallery/images/bali-beach.jpg',
    alt: 'Beautiful sunset over Bali beach with traditional boats',
    category: 'Beach'
  },
  {
    id: '2',
    src: '/src/gallery/images/paris-eiffel.jpg',
    alt: 'Eiffel Tower in Paris at sunset',
    category: 'City'
  },
  {
    id: '3',
    src: '/src/gallery/images/kyoto-temple.jpg',
    alt: 'Ancient temple in Kyoto surrounded by autumn foliage',
    category: 'Cultural'
  },
  {
    id: '4',
    src: '/src/gallery/images/santorini-view.jpg',
    alt: 'White buildings with blue domes overlooking the Aegean Sea in Santorini',
    category: 'Island'
  },
  {
    id: '5',
    src: '/src/gallery/images/new-york-skyline.jpg',
    alt: 'New York City skyline with Empire State Building at night',
    category: 'City'
  },
  {
    id: '6',
    src: '/src/gallery/images/machu-picchu.jpg',
    alt: 'Ancient Incan citadel of Machu Picchu in Peru',
    category: 'Historical'
  },
  {
    id: '7',
    src: '/src/gallery/images/swiss-alps.jpg',
    alt: 'Snow-capped peaks of the Swiss Alps with green valley',
    category: 'Mountain'
  },
  {
    id: '8',
    src: '/src/gallery/images/venice-canal.jpg',
    alt: 'Gondola on a canal in Venice with historic buildings',
    category: 'City'
  },
  {
    id: '9',
    src: '/src/gallery/images/dubai-skyline.jpg',
    alt: 'Futuristic skyline of Dubai with Burj Khalifa',
    category: 'City'
  },
  {
    id: '10',
    src: '/src/gallery/images/maldives-overwater.jpg',
    alt: 'Overwater bungalows in the crystal clear waters of the Maldives',
    category: 'Beach'
  }
];

// Function to get an image by id
export const getImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(image => image.id === id);
};

// Function to get images by category
export const getImagesByCategory = (category: string): GalleryImage[] => {
  return galleryImages.filter(image => image.category === category);
};
