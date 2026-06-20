// ─── ROOMS ──────────────────────────────────────────────────────────────────
export const mockRooms = [
  {
    id: 1,
    name: "Standard Room",
    roomNumber: "101",
    type: "Standard",
    price: 2500,
    discountPrice: 2200,
    maxGuests: 2,
    bedType: "Double Bed",
    size: "250 sq ft",
    floor: "1st Floor",
    shortDescription: "Cozy standard room with modern amenities and garden view.",
    description:
      "Experience comfort in our well-appointed standard room featuring a plush double bed, modern bathroom, and a tranquil garden view. Perfect for solo travelers and couples.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water", "Daily Housekeeping"],
    images: ["/images/tribhuvan/rooms/standard-room.jpg"],
    status: "Available",
    featured: false,
  },
  {
    id: 2,
    name: "Deluxe Room",
    roomNumber: "201",
    type: "Deluxe",
    price: 4000,
    discountPrice: 3500,
    maxGuests: 2,
    bedType: "King Bed",
    size: "350 sq ft",
    floor: "2nd Floor",
    shortDescription: "Spacious deluxe room with premium furnishings and city view.",
    description:
      "Our deluxe room offers premium furnishings, a king-sized bed, and stunning city views. Enjoy high-speed WiFi and upgraded bathroom amenities.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water", "Mini Fridge", "Daily Housekeeping", "Room Service"],
    images: ["/images/tribhuvan/rooms/deluxe-room.jpg"],
    status: "Booked",
    featured: true,
  },
  {
    id: 3,
    name: "Premium Suite",
    roomNumber: "301",
    type: "Suite",
    price: 7000,
    discountPrice: 6500,
    maxGuests: 3,
    bedType: "King Bed + Sofa Bed",
    size: "550 sq ft",
    floor: "3rd Floor",
    shortDescription: "Luxurious suite with separate living area and panoramic views.",
    description:
      "The Premium Suite features a separate living area, king bedroom, and panoramic hillside views. Perfect for a luxury getaway.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water", "Mini Bar", "Bathtub", "Room Service", "Daily Housekeeping", "Balcony"],
    images: ["/images/tribhuvan/rooms/suite.jpg"],
    status: "Available",
    featured: true,
  },
  {
    id: 4,
    name: "Royal Suite",
    roomNumber: "401",
    type: "Royal Suite",
    price: 12000,
    discountPrice: null,
    maxGuests: 4,
    bedType: "King Bed + Twin Beds",
    size: "900 sq ft",
    floor: "4th Floor",
    shortDescription: "Our finest accommodation with butler service and private terrace.",
    description:
      "The Royal Suite is the pinnacle of luxury with a private terrace, butler service, and opulent interiors. Experience royalty at Tribhuvan Residency.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water", "Full Bar", "Jacuzzi", "Room Service", "Butler Service", "Private Terrace", "Daily Housekeeping"],
    images: ["/images/tribhuvan/rooms/royal-suite.jpg"],
    status: "Available",
    featured: true,
  },
  {
    id: 5,
    name: "Family Room",
    roomNumber: "202",
    type: "Family",
    price: 5500,
    discountPrice: 5000,
    maxGuests: 4,
    bedType: "2 Double Beds",
    size: "450 sq ft",
    floor: "2nd Floor",
    shortDescription: "Ideal for families with two double beds and extra space.",
    description:
      "Our family room provides ample space for the whole family with two comfortable double beds, a large bathroom, and a cozy sitting area.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water", "Mini Fridge", "Room Service", "Daily Housekeeping"],
    images: ["/images/tribhuvan/rooms/family-room.jpg"],
    status: "Maintenance",
    featured: false,
  },
  {
    id: 6,
    name: "Budget Single Room",
    roomNumber: "102",
    type: "Single",
    price: 1800,
    discountPrice: 1600,
    maxGuests: 1,
    bedType: "Single Bed",
    size: "180 sq ft",
    floor: "1st Floor",
    shortDescription: "Affordable and comfortable room for solo travelers.",
    description:
      "A clean and comfortable room perfect for solo business travelers or backpackers. All essential amenities included.",
    amenities: ["AC", "Free WiFi", "LED TV", "Hot Water"],
    images: ["/images/tribhuvan/rooms/single-room.jpg"],
    status: "Available",
    featured: false,
  },
];

// ─── GUESTS ─────────────────────────────────────────────────────────────────
export const mockGuests = [
  { id: 1, name: "Rajesh Kumar", phone: "9876543210", email: "rajesh@gmail.com", address: "New Delhi, India", idType: "Aadhar Card", idNumber: "XXXX-XXXX-1234", stays: 3, lastBooking: "2025-06-10", vip: true, notes: "Prefers top floor room" },
  { id: 2, name: "Priya Sharma", phone: "9812345678", email: "priya.sharma@yahoo.com", address: "Mumbai, India", idType: "Passport", idNumber: "P1234567", stays: 1, lastBooking: "2025-05-20", vip: false, notes: "" },
  { id: 3, name: "Amit Verma", phone: "9988776655", email: "amit.v@gmail.com", address: "Bangalore, India", idType: "Driving License", idNumber: "KA05-2019-123456", stays: 2, lastBooking: "2025-06-01", vip: false, notes: "Vegetarian meals only" },
  { id: 4, name: "Sunita Joshi", phone: "7654321098", email: "sunita.j@hotmail.com", address: "Kathmandu, Nepal", idType: "Passport", idNumber: "N9876543", stays: 5, lastBooking: "2025-06-15", vip: true, notes: "Regular guest, provide complimentary fruit basket" },
  { id: 5, name: "David Wilson", phone: "9001122334", email: "david.w@gmail.com", address: "London, UK", idType: "Passport", idNumber: "GB1234567", stays: 1, lastBooking: "2025-04-10", vip: false, notes: "" },
  { id: 6, name: "Meera Patel", phone: "8877665544", email: "meera.p@gmail.com", address: "Ahmedabad, India", idType: "Aadhar Card", idNumber: "XXXX-XXXX-5678", stays: 2, lastBooking: "2025-06-12", vip: false, notes: "" },
  { id: 7, name: "Arjun Singh", phone: "9123456780", email: "arjun.s@email.com", address: "Chandigarh, India", idType: "PAN Card", idNumber: "ABCDE1234F", stays: 4, lastBooking: "2025-06-18", vip: true, notes: "Corporate client" },
  { id: 8, name: "Kavya Reddy", phone: "9955443322", email: "kavya.r@gmail.com", address: "Hyderabad, India", idType: "Aadhar Card", idNumber: "XXXX-XXXX-9012", stays: 1, lastBooking: "2025-05-05", vip: false, notes: "" },
];

// ─── BOOKINGS ────────────────────────────────────────────────────────────────
export const mockBookings = [
  { id: "TRB-001", guestId: 1, guestName: "Rajesh Kumar", phone: "9876543210", email: "rajesh@gmail.com", room: "Deluxe Room (201)", checkIn: "2025-06-20", checkOut: "2025-06-23", guests: 2, nights: 3, totalAmount: 10500, paymentStatus: "Paid", bookingStatus: "Confirmed", createdAt: "2025-06-15" },
  { id: "TRB-002", guestId: 2, guestName: "Priya Sharma", phone: "9812345678", email: "priya.sharma@yahoo.com", room: "Standard Room (101)", checkIn: "2025-06-21", checkOut: "2025-06-22", guests: 1, nights: 1, totalAmount: 2200, paymentStatus: "Paid", bookingStatus: "Confirmed", createdAt: "2025-06-17" },
  { id: "TRB-003", guestId: 3, guestName: "Amit Verma", phone: "9988776655", email: "amit.v@gmail.com", room: "Premium Suite (301)", checkIn: "2025-06-22", checkOut: "2025-06-25", guests: 2, nights: 3, totalAmount: 19500, paymentStatus: "Partial", bookingStatus: "Pending", createdAt: "2025-06-18" },
  { id: "TRB-004", guestId: 4, guestName: "Sunita Joshi", phone: "7654321098", email: "sunita.j@hotmail.com", room: "Royal Suite (401)", checkIn: "2025-06-15", checkOut: "2025-06-17", guests: 2, nights: 2, totalAmount: 24000, paymentStatus: "Paid", bookingStatus: "Checked-out", createdAt: "2025-06-10" },
  { id: "TRB-005", guestId: 5, guestName: "David Wilson", phone: "9001122334", email: "david.w@gmail.com", room: "Deluxe Room (201)", checkIn: "2025-06-19", checkOut: "2025-06-21", guests: 1, nights: 2, totalAmount: 7000, paymentStatus: "Paid", bookingStatus: "Checked-in", createdAt: "2025-06-14" },
  { id: "TRB-006", guestId: 6, guestName: "Meera Patel", phone: "8877665544", email: "meera.p@gmail.com", room: "Family Room (202)", checkIn: "2025-06-25", checkOut: "2025-06-28", guests: 4, nights: 3, totalAmount: 15000, paymentStatus: "Pending", bookingStatus: "Pending", createdAt: "2025-06-19" },
  { id: "TRB-007", guestId: 7, guestName: "Arjun Singh", phone: "9123456780", email: "arjun.s@email.com", room: "Standard Room (101)", checkIn: "2025-06-18", checkOut: "2025-06-20", guests: 1, nights: 2, totalAmount: 4400, paymentStatus: "Paid", bookingStatus: "Checked-in", createdAt: "2025-06-12" },
  { id: "TRB-008", guestId: 8, guestName: "Kavya Reddy", phone: "9955443322", email: "kavya.r@gmail.com", room: "Premium Suite (301)", checkIn: "2025-06-28", checkOut: "2025-07-01", guests: 2, nights: 3, totalAmount: 19500, paymentStatus: "Pending", bookingStatus: "Pending", createdAt: "2025-06-20" },
  { id: "TRB-009", guestId: 1, guestName: "Rajesh Kumar", phone: "9876543210", email: "rajesh@gmail.com", room: "Royal Suite (401)", checkIn: "2025-05-10", checkOut: "2025-05-12", guests: 2, nights: 2, totalAmount: 24000, paymentStatus: "Paid", bookingStatus: "Checked-out", createdAt: "2025-05-05" },
  { id: "TRB-010", guestId: 3, guestName: "Amit Verma", phone: "9988776655", email: "amit.v@gmail.com", room: "Budget Single (102)", checkIn: "2025-06-30", checkOut: "2025-07-02", guests: 1, nights: 2, totalAmount: 3200, paymentStatus: "Paid", bookingStatus: "Confirmed", createdAt: "2025-06-20" },
];

// ─── GALLERY ─────────────────────────────────────────────────────────────────
export const mockGallery = [
  { id: 1, title: "Hotel Exterior", alt: "Front view of Tribhuvan Residency", category: "Exterior", url: "/images/tribhuvan/gallery/exterior1.jpg" },
  { id: 2, title: "Hotel Lobby", alt: "Grand lobby entrance", category: "Lobby", url: "/images/tribhuvan/gallery/lobby1.jpg" },
  { id: 3, title: "Deluxe Room Interior", alt: "Deluxe room bed and decor", category: "Rooms", url: "/images/tribhuvan/gallery/room1.jpg" },
  { id: 4, title: "Suite Living Area", alt: "Premium suite living space", category: "Rooms", url: "/images/tribhuvan/gallery/suite1.jpg" },
  { id: 5, title: "Restaurant Dining", alt: "In-house restaurant setting", category: "Restaurant", url: "/images/tribhuvan/gallery/restaurant1.jpg" },
  { id: 6, title: "Garden View", alt: "Beautiful garden area", category: "Exterior", url: "/images/tribhuvan/gallery/garden1.jpg" },
  { id: 7, title: "Event Hall", alt: "Banquet and event hall", category: "Events", url: "/images/tribhuvan/gallery/event1.jpg" },
  { id: 8, title: "Hotel Corridor", alt: "Elegant hotel corridor", category: "Interior", url: "/images/tribhuvan/gallery/corridor1.jpg" },
];

// ─── AMENITIES ───────────────────────────────────────────────────────────────
export const mockAmenities = [
  { id: 1, name: "Free WiFi", icon: "wifi", description: "High-speed WiFi available throughout the property", status: true },
  { id: 2, name: "AC Rooms", icon: "snowflake", description: "All rooms equipped with air conditioning", status: true },
  { id: 3, name: "Free Parking", icon: "car", description: "Complimentary parking for all hotel guests", status: true },
  { id: 4, name: "Restaurant", icon: "utensils", description: "Multi-cuisine in-house restaurant serving 3 meals daily", status: true },
  { id: 5, name: "Room Service", icon: "bell", description: "24-hour in-room dining service", status: true },
  { id: 6, name: "Power Backup", icon: "zap", description: "Uninterrupted power supply with generator backup", status: true },
  { id: 7, name: "Laundry Service", icon: "shirt", description: "Same-day laundry and dry cleaning service", status: true },
  { id: 8, name: "Elevator / Lift", icon: "building", description: "Elevator access to all floors", status: true },
  { id: 9, name: "24x7 Reception", icon: "clock", description: "Round-the-clock front desk assistance", status: true },
  { id: 10, name: "Conference Room", icon: "briefcase", description: "Modern conference room for business meetings", status: false },
];

// ─── OFFERS ──────────────────────────────────────────────────────────────────
export const mockOffers = [
  { id: 1, title: "Early Bird Discount", subtitle: "Book 30 days in advance", description: "Save 20% when you book your stay at least 30 days in advance.", discountType: "Percentage", discountValue: 20, promoCode: "EARLY20", startDate: "2025-06-01", endDate: "2025-12-31", bannerImage: "", status: true },
  { id: 2, title: "Weekend Getaway", subtitle: "Fri-Sun Special Rates", description: "Enjoy exclusive weekend rates with complimentary breakfast for two.", discountType: "Percentage", discountValue: 15, promoCode: "WEEKEND15", startDate: "2025-06-01", endDate: "2025-09-30", bannerImage: "", status: true },
  { id: 3, title: "Honeymoon Package", subtitle: "For newlyweds", description: "A romantic package with suite upgrade, dinner, and spa vouchers.", discountType: "Fixed", discountValue: 2000, promoCode: "HONEY2K", startDate: "2025-01-01", endDate: "2025-12-31", bannerImage: "", status: true },
  { id: 4, title: "Monsoon Magic", subtitle: "Rainy season special", description: "Special monsoon rates with complimentary hot beverages and indoor activities.", discountType: "Percentage", discountValue: 25, promoCode: "MONSOON25", startDate: "2025-07-01", endDate: "2025-09-30", bannerImage: "", status: false },
  { id: 5, title: "Corporate Rate", subtitle: "For business travelers", description: "Exclusive discounted rates for corporate clients with flexible cancellation.", discountType: "Percentage", discountValue: 10, promoCode: "CORP10", startDate: "2025-01-01", endDate: "2025-12-31", bannerImage: "", status: true },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const mockTestimonials = [
  { id: 1, name: "Rajesh Kumar", location: "New Delhi, India", rating: 5, review: "An absolutely wonderful experience! The staff was incredibly hospitable and the room was pristine. Will definitely be coming back.", photo: "", status: "Approved" },
  { id: 2, name: "Sarah Mitchell", location: "London, UK", rating: 5, review: "Tribhuvan Residency exceeded all our expectations. The food was superb and the views from the suite were breathtaking.", photo: "", status: "Approved" },
  { id: 3, name: "Priya Sharma", location: "Mumbai, India", rating: 4, review: "Great hotel with excellent service. The location is perfect and the rooms are spacious and clean. Highly recommended!", photo: "", status: "Approved" },
  { id: 4, name: "Amit Verma", location: "Bangalore, India", rating: 5, review: "Stayed here for our anniversary and it was magical. The romantic setup arranged by the team was beyond our expectations.", photo: "", status: "Pending" },
  { id: 5, name: "Sunita Joshi", location: "Kathmandu, Nepal", rating: 4, review: "My fifth stay at Tribhuvan and it keeps getting better. The loyalty to service quality is commendable.", photo: "", status: "Approved" },
  { id: 6, name: "David Wilson", location: "London, UK", rating: 3, review: "Good hotel overall. Room service could be faster but the ambiance and location are top-notch.", photo: "", status: "Pending" },
];

// ─── INQUIRIES ────────────────────────────────────────────────────────────────
export const mockInquiries = [
  { id: "INQ-001", name: "Rahul Gupta", phone: "9876501234", email: "rahul.g@gmail.com", subject: "Room Availability for Wedding", message: "I need 10 rooms for 3 nights in December for a family wedding. Please send me the group booking rates.", date: "2025-06-19", status: "New" },
  { id: "INQ-002", name: "Lisa Chen", phone: "9988001122", email: "lisa.c@yahoo.com", subject: "Corporate Booking Inquiry", message: "Our company needs accommodation for 5 executives for a 2-day conference. Looking for conference hall as well.", date: "2025-06-18", status: "Replied" },
  { id: "INQ-003", name: "Vinod Kapoor", phone: "7894561230", email: "vinod.k@hotmail.com", subject: "Cancellation Policy", message: "I have a booking for next week (TRB-003). Due to unforeseen circumstances I may need to cancel. What is your cancellation policy?", date: "2025-06-17", status: "Replied" },
  { id: "INQ-004", name: "Meera Singh", phone: "8800112233", email: "meera.s@gmail.com", subject: "Honeymoon Package Details", message: "Hi, my fiancé and I are planning our honeymoon for August. Could you share details about your honeymoon packages?", date: "2025-06-16", status: "New" },
  { id: "INQ-005", name: "James Brown", phone: "9001234567", email: "j.brown@company.com", subject: "Long Stay Discount", message: "I am planning to stay for 2 weeks. Do you offer long-stay discounts? Please share details.", date: "2025-06-15", status: "Closed" },
  { id: "INQ-006", name: "Pooja Nair", phone: "9823456789", email: "pooja.n@gmail.com", subject: "Pool and Spa Availability", message: "Does the hotel have a swimming pool and spa? I want to plan a wellness retreat.", date: "2025-06-14", status: "New" },
  { id: "INQ-007", name: "Karan Mehta", phone: "9871234560", email: "karan.m@email.com", subject: "Birthday Decoration Request", message: "I am planning a surprise birthday for my wife. Can the hotel arrange in-room decoration?", date: "2025-06-13", status: "Replied" },
];

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export const mockPayments = [
  { id: "PAY-001", bookingId: "TRB-001", guestName: "Rajesh Kumar", amount: 10500, date: "2025-06-15", method: "UPI", reference: "UPI123456789", status: "Completed", notes: "" },
  { id: "PAY-002", bookingId: "TRB-002", guestName: "Priya Sharma", amount: 2200, date: "2025-06-17", method: "Card", reference: "CARD987654321", status: "Completed", notes: "" },
  { id: "PAY-003", bookingId: "TRB-003", guestName: "Amit Verma", amount: 10000, date: "2025-06-18", method: "Bank Transfer", reference: "NEFT20250618", status: "Completed", notes: "Partial payment - balance ₹9,500 pending" },
  { id: "PAY-004", bookingId: "TRB-004", guestName: "Sunita Joshi", amount: 24000, date: "2025-06-10", method: "UPI", reference: "UPI987123456", status: "Completed", notes: "" },
  { id: "PAY-005", bookingId: "TRB-005", guestName: "David Wilson", amount: 7000, date: "2025-06-14", method: "Card", reference: "CARD112233445", status: "Completed", notes: "" },
  { id: "PAY-006", bookingId: "TRB-007", guestName: "Arjun Singh", amount: 4400, date: "2025-06-12", method: "Cash", reference: "CASH-20250612", status: "Completed", notes: "" },
  { id: "PAY-007", bookingId: "TRB-009", guestName: "Rajesh Kumar", amount: 24000, date: "2025-05-05", method: "UPI", reference: "UPI456789123", status: "Completed", notes: "" },
  { id: "PAY-008", bookingId: "TRB-010", guestName: "Amit Verma", amount: 3200, date: "2025-06-20", method: "UPI", reference: "UPI111222333", status: "Completed", notes: "" },
];

// ─── STAFF ────────────────────────────────────────────────────────────────────
export const mockStaff = [
  { id: 1, name: "Tribhuvan Admin", email: "admin@tribhuvanresidency.com", phone: "9800000001", role: "Super Admin", status: true, createdAt: "2024-01-01" },
  { id: 2, name: "Rohit Sharma", email: "rohit.sharma@tribhuvanresidency.com", phone: "9800000002", role: "Manager", status: true, createdAt: "2024-03-15" },
  { id: 3, name: "Anita Dubey", email: "anita.dubey@tribhuvanresidency.com", phone: "9800000003", role: "Reception", status: true, createdAt: "2024-06-01" },
  { id: 4, name: "Suresh Patel", email: "suresh.patel@tribhuvanresidency.com", phone: "9800000004", role: "Reception", status: false, createdAt: "2024-08-10" },
  { id: 5, name: "Deepa Rani", email: "deepa.rani@tribhuvanresidency.com", phone: "9800000005", role: "Content Editor", status: true, createdAt: "2025-01-20" },
];

// ─── CONTENT ──────────────────────────────────────────────────────────────────
export const mockContent = {
  hero: {
    heading: "Welcome to Tribhuvan Residency",
    subheading: "Experience unparalleled luxury and comfort in the heart of Kathmandu",
    ctaText: "Book Your Stay",
    ctaLink: "/rooms",
    heroImage: "/images/tribhuvan/hero-banner.jpg",
  },
  about: {
    title: "A Heritage of Hospitality",
    description:
      "Tribhuvan Residency is a premier hotel offering world-class amenities with warm Nepali hospitality. Founded in 2010, we have been welcoming guests from around the world.",
    image: "/images/tribhuvan/about.jpg",
  },
  whyChooseUs: {
    title: "Why Choose Tribhuvan Residency?",
    features: ["Prime Location", "World Class Service", "Best Price Guarantee", "24/7 Support"],
  },
  contactInfo: {
    address: "Thamel, Kathmandu, Nepal",
    phone: "+977 1 4000000",
    whatsapp: "+977 9800000000",
    email: "info@tribhuvanresidency.com",
    mapEmbed: "https://www.google.com/maps/embed?pb=...",
  },
  footer: {
    aboutText: "Tribhuvan Residency – Where comfort meets heritage. Your home away from home in Kathmandu.",
    facebook: "https://facebook.com/tribhuvanresidency",
    instagram: "https://instagram.com/tribhuvanresidency",
    youtube: "",
    copyright: "© 2025 Tribhuvan Residency. All rights reserved.",
  },
};

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export const mockSettings = {
  hotel: {
    name: "Tribhuvan Residency",
    logo: "/logo.png",
    favicon: "/favicon.png",
    description: "A premier hotel in Kathmandu offering luxury accommodation and world-class service.",
    address: "Thamel, Kathmandu, Nepal",
    phone: "+977 1 4000000",
    email: "info@tribhuvanresidency.com",
    checkInTime: "12:00",
    checkOutTime: "11:00",
  },
  seo: {
    metaTitle: "Tribhuvan Residency | Luxury Hotel in Kathmandu",
    metaDescription: "Experience luxury stays at Tribhuvan Residency, Kathmandu. Book rooms, suites and packages.",
    keywords: "hotel kathmandu, tribhuvan residency, luxury hotel nepal, thamel hotel",
    ogImage: "/images/tribhuvan/og-image.jpg",
  },
  social: {
    facebook: "https://facebook.com/tribhuvanresidency",
    instagram: "https://instagram.com/tribhuvanresidency",
    whatsapp: "+977 9800000000",
    youtube: "",
    googleBusiness: "",
  },
  booking: {
    roomTax: 13,
    serviceCharge: 10,
    advanceAmount: 30,
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. 50% charge within 48 hours.",
  },
};

// ─── DASHBOARD STATS ─────────────────────────────────────────────────────────
export function getDashboardStats() {
  const totalRooms = mockRooms.length;
  const availableRooms = mockRooms.filter((r) => r.status === "Available").length;
  const bookedRooms = mockRooms.filter((r) => r.status === "Booked").length;
  const pendingBookings = mockBookings.filter((b) => b.bookingStatus === "Pending").length;
  const totalGuests = mockGuests.length;
  const revenue = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const newInquiries = mockInquiries.filter((i) => i.status === "New").length;
  const activeOffers = mockOffers.filter((o) => o.status).length;

  return { totalRooms, availableRooms, bookedRooms, pendingBookings, totalGuests, revenue, newInquiries, activeOffers };
}
