// Single source of truth for The Tribhuvan Residency website.
// Content sourced from the property's MakeMyTrip listing & public details.

export const site = {
  name: "The Tribhuvan Residency",
  shortName: "Tribhuvan Residency",
  brandTop: "THE",
  brandMain: "TRIBHUVAN",
  brandBottom: "RESIDENCY",
  tagline: "A Divine Stay, Steps from Shree Ram Janmabhoomi",
  intro:
    "An elegant guest house in the heart of Ayodhya, just a short walk from the revered Shree Ram Mandir — where warm hospitality meets a peaceful, spiritual retreat.",
  description:
    "Welcome to The Tribhuvan Residency, an exquisite guest house located just a short walk from the main gate of the revered Shree Ram Janmabhoomi Mandir in Ayodhya. Thoughtfully designed for pilgrims and travellers, our well-appointed air-conditioned rooms offer spotless comfort, modern western bathrooms with 24-hour hot water, and the quiet calm you need after a day of darshan. Courteous, ever-helpful staff, in-room dining from trusted nearby kitchens, free Wi-Fi and secure parking make every stay effortless — perfect for early-morning aarti and a serene Ayodhya yatra.",
  phone: "+919953969721",
  phoneDisplay: "+91 99539 69721",
  altPhone: "08069266023",
  email: "reservations@thetribhuvanresidency.in",
  website: "https://tribhuvanresidency.in",
  address:
    "Ram Path Road, New Colony, Behind Birla Dharamshala, Gali No. 2, 100 m from Ram Temple Gate, Ayodhya, Uttar Pradesh 224123",
  addressShort: "Behind Birla Dharamshala, Near Ram Mandir Gate, Ayodhya",
  area: "New Colony, Ayodhya",
  city: "Ayodhya, Uttar Pradesh",
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  rating: 3.9,
  ratingText: "Very Good",
  ratingsCount: 163,
  reviewsCount: 104,
  type: "Guest House",
  mapEmbed:
    "https://www.google.com/maps?q=The%20Tribhuvan%20Residency%20Behind%20Birla%20Dharamshala%20Ayodhya&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=The+Tribhuvan+Residency+Ayodhya",
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
  },
  // WhatsApp number in international format (no +, spaces or dashes)
  whatsapp: "919953969721",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

// Property facilities (icon keys map to react-icons in components)
export const facilities = [
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    description:
      "Stay connected throughout your stay with complimentary high-speed wireless internet in every room.",
  },
  {
    icon: "ac",
    title: "Air-Conditioned Rooms",
    description:
      "Cool, comfortable air-conditioned rooms with modern western bathrooms and 24-hour hot water.",
  },
  {
    icon: "parking",
    title: "Secure Parking",
    description:
      "Dedicated on-site parking for cars and vehicles, with round-the-clock security and CCTV.",
  },
  {
    icon: "power",
    title: "24×7 Power Backup",
    description:
      "Uninterrupted power supply and full-time power backup so your comfort is never disturbed.",
  },
];

// Fuller amenities list for About / Rooms pages
export const amenities = [
  { icon: "wifi", title: "Free Wi-Fi" },
  { icon: "ac", title: "Air Conditioning" },
  { icon: "parking", title: "Free Parking" },
  { icon: "power", title: "Power Backup" },
  { icon: "housekeeping", title: "Daily Housekeeping" },
  { icon: "room-service", title: "24-hr Room Service" },
  { icon: "dining", title: "In-room Dining" },
  { icon: "water", title: "Mineral Drinking Water" },
  { icon: "bath", title: "Western Attached Bath" },
  { icon: "hot-water", title: "24-hr Hot Water" },
  { icon: "lounge", title: "Lounge / Sitting Area" },
  { icon: "caretaker", title: "Caretaker & Luggage Help" },
];

export const ratingBreakdown = [
  { label: "Location", score: 4.3 },
  { label: "Cleanliness", score: 4.1 },
  { label: "Value for Money", score: 3.9 },
  { label: "Child Friendliness", score: 4.1 },
];

export const rooms = [
  {
    slug: "deluxe-room",
    name: "Deluxe Room",
    size: "132 sq.ft",
    sizeSqm: "12 sq.mt",
    guests: 2,
    bed: "1 Double Bed",
    bathrooms: 1,
    price: 2400,
    priceLabel: "₹2,400",
    inventory: 5,
    featured: false,
    image: "/images/tribhuvan/hotel-2.jpg",
    gallery: [
      "/images/tribhuvan/hotel-2.jpg",
      "/images/tribhuvan/hotel-3.jpg",
      "/images/tribhuvan/guest-2.jpg",
    ],
    short:
      "A cosy, spotless air-conditioned room with a comfortable double bed — ideal for couples and solo pilgrims.",
    description:
      "Our Deluxe Room is a warm, well-kept retreat designed for a restful stay. It features a comfortable double bed, air conditioning, an air purifier, a modern western attached bathroom with 24-hour hot water, and daily housekeeping. In-room dining is available from trusted nearby kitchens, so you can relax after a long day of darshan.",
    amenities: [
      "Air Conditioning",
      "Daily Housekeeping",
      "In-room Dining",
      "Iron / Ironing Board",
      "Air Purifier",
      "Free Wi-Fi",
      "Western Attached Bathroom",
      "Heater (on request)",
    ],
  },
  {
    slug: "super-deluxe-room",
    name: "Super Deluxe Room",
    size: "250 sq.ft",
    sizeSqm: "23 sq.mt",
    guests: 2,
    bed: "1 Double Bed",
    bathrooms: 1,
    price: 2700,
    priceLabel: "₹2,700",
    inventory: 5,
    featured: true,
    image: "/images/tribhuvan/super-deluxe-room.jpeg",
    gallery: [
      "/images/tribhuvan/super-deluxe-room.jpeg",
      "/images/tribhuvan/hotel-1.jpg",
      "/images/tribhuvan/hotel-3.jpg",
    ],
    short:
      "A spacious room with a separate living area, premium bedding and all modern comforts for a relaxed stay.",
    description:
      "The Super Deluxe Room offers extra space and a dedicated living area to unwind. Enjoy a plush double bed, air conditioning, complimentary mineral water, free Wi-Fi, a stylish modern bathroom and attentive room service. It is our most-loved room — perfect for families and guests who want a little more room to breathe.",
    amenities: [
      "Air Conditioning",
      "Living Area",
      "Free Wi-Fi",
      "Mineral Water",
      "Room Service",
      "Western Attached Bathroom",
      "Daily Housekeeping",
      "In-room Dining",
    ],
  },
  {
    slug: "triple-bed-room",
    name: "Triple Bed Room",
    size: "250 sq.ft",
    sizeSqm: "23 sq.mt",
    guests: 3,
    bed: "1 Double + 1 Single Bed",
    bathrooms: 1,
    price: 3100,
    priceLabel: "₹3,100",
    inventory: 5,
    featured: false,
    image: "/images/tribhuvan/guest-4.jpg",
    gallery: [
      "/images/tribhuvan/guest-4.jpg",
      "/images/tribhuvan/guest-1.jpg",
      "/images/tribhuvan/guest-5.jpg",
    ],
    short:
      "A roomy option for small families or groups of three, with a double and a single bed plus all essentials.",
    description:
      "Travelling as a family or a small group? The Triple Bed Room comfortably sleeps three with a double bed and an additional single bed. It comes with air conditioning, free Wi-Fi, complimentary mineral water, a clean western attached bathroom, daily housekeeping and prompt room service — everything you need for a hassle-free Ayodhya yatra.",
    amenities: [
      "Air Conditioning",
      "Free Wi-Fi",
      "Mineral Water",
      "Room Service",
      "Daily Housekeeping",
      "Western Attached Bathroom",
      "In-room Dining",
    ],
  },
];

export const galleryImages = [
  { src: "/images/tribhuvan/hotel-1.jpg", caption: "Guest Lounge" },
  { src: "/images/tribhuvan/hotel-2.jpg", caption: "Deluxe Room" },
  { src: "/images/tribhuvan/super-deluxe-room.jpeg", caption: "Super Deluxe Room" },
  { src: "/images/tribhuvan/hotel-3.jpg", caption: "Modern Bathroom" },
  { src: "/images/tribhuvan/guest-4.jpg", caption: "Triple Bed Room" },
  { src: "/images/tribhuvan/guest-5.jpg", caption: "In-room Comforts" },
];

// Real guest reviews from the property's listing
export const reviews = [
  {
    name: "Arun K.",
    meta: "Family • Jun 2026",
    rating: 5,
    text: "Had a very pleasant stay at the hotel. The room was clean, comfortable, and well-maintained. The staff was courteous and always ready to help. Overall, it was a relaxing and enjoyable experience.",
  },
  {
    name: "Anshika M.",
    meta: "Family • Jun 2026",
    rating: 5,
    text: "Very comfortable and clean room with AC, super close to Ram Mandir. They offer food from a nearby restaurant, delivered to the room. Great for your Ayodhya trip, especially if going for morning aarti.",
  },
  {
    name: "Sai B.",
    meta: "Family • May 2026",
    rating: 5,
    text: "Room and washroom were very clean, neat and comfortable. The room is very near to the temple — exactly what we needed for our visit.",
  },
  {
    name: "Soumyadip M.",
    meta: "Family • Oct 2025",
    rating: 5,
    text: "All the staff is supportive, the property is in a good location and maintains hygiene in all areas. Highly recommended for a temple visit.",
  },
  {
    name: "Sapna D.",
    meta: "Family • Oct 2025",
    rating: 4,
    text: "Great stay! Loved my time here — clean rooms, friendly staff, tasty food, and a relaxing vibe. Perfect location and excellent service. Highly recommended!",
  },
  {
    name: "Abanti B.",
    meta: "Family • Mar 2026",
    rating: 5,
    text: "Nice service and clean rooms. Polite staff, very helpful. The location is also near the Mandir, making darshan very convenient.",
  },
];

export const reviewSummary = [
  "Great location, just a short walk from Shree Ram Mandir.",
  "Staff is courteous and always ready to help.",
  "Clean and tidy rooms with all essential amenities.",
  "Peaceful ambiance with a cosy, homely vibe.",
];

export const attractions = [
  { name: "Shree Ram Janmabhoomi Mandir", distance: "5 min walk", type: "temple" },
  { name: "Hanuman Garhi Mandir", distance: "6 min walk", type: "temple" },
  { name: "Kanak Bhawan", distance: "10 min walk", type: "temple" },
  { name: "Ram Ki Paidi (Saryu Ghat)", distance: "2.5 km", type: "ghat" },
  { name: "Ayodhya Dham Junction Railway Station", distance: "1.4 km", type: "transit" },
  { name: "Maharishi Valmiki Intl. Airport", distance: "8.1 km", type: "airport" },
];

export const faqs = [
  {
    q: "How far is The Tribhuvan Residency from Shree Ram Mandir?",
    a: "We are located just behind Birla Dharamshala, roughly a 5-minute walk (about 100–300 metres) from the Ram Temple gate — ideal for early-morning aarti and darshan.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-in is from 12:00 PM and check-out is by 11:00 AM. Early check-in or late check-out may be arranged on request, subject to availability.",
  },
  {
    q: "Do you provide food at the property?",
    a: "While we do not run an in-house restaurant, we arrange fresh in-room dining delivered from trusted nearby kitchens, so you can enjoy a comfortable meal in your room.",
  },
  {
    q: "Are the rooms air-conditioned and is hot water available?",
    a: "Yes. All our rooms are air-conditioned and every room has a modern western attached bathroom with 24-hour hot water.",
  },
  {
    q: "Is parking available?",
    a: "Yes, we offer secure on-site parking for cars and vehicles, supported by CCTV and 24×7 security.",
  },
  {
    q: "Is the property suitable for families with children?",
    a: "Absolutely. Families love our clean, spacious rooms and helpful staff — the property is rated highly for child friendliness, and our Triple Bed Room is perfect for small families.",
  },
];
