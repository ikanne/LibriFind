/* =====================================================
   LIBRARY DATA — edit this file to add or change libraries.

   LOCATIONS  → the choices in the location dropdown.
                All cards use one photo: images/library.jpg
                (to give one library its own photo, add image: "name.jpg").
   LIBRARIES  → one block per library. Copy a block, add a comma,
                and change the values. Give each a unique id.
   freeShort  → the short “free access” line shown on the card
   tags       → used by the filter chips (see AMENITY_OPTIONS below)
   amenities  → free text shown on the card
   ===================================================== */

const LOCATIONS = ["Taguig", "Pasig", "Makati", "Antipolo"];

const LIBRARIES = [
  /* ---------- TAGUIG ---------- */
  { id: 1, freeShort: "Free access",
    type: "City public library",
    name: "Taguig City Public Library", city: "Taguig",
    address: "Taguig City Hall GPD, Gen. A. Luna St., Tuktukan, Taguig City",
    hours: "Check before visiting",
    free: "Yes — public library",
    amenities: "Library resources; Taguig’s wider E-Library services offer digital access and computers",
    tags: ["Computers"],
    note: "Listed as an active city public library in the National Library of the Philippines directory.",
    source: "National Library of the Philippines",
    emoji: "🏛️", hue: 200 },

  { id: 2, freeShort: "Free access",
    type: "Barangay reading center",
    name: "Upper Bicutan Barangay Library", city: "Taguig",
    address: "Barangay Upper Bicutan, Taguig City",
    hours: "Check before visiting",
    free: "Yes — barangay reading center",
    amenities: "Reading materials; other facilities should be confirmed",
    tags: ["Reading space"],
    note: "Listed as a barangay reading center in the National Library directory.",
    source: "National Library of the Philippines",
    emoji: "📖", hue: 30 },

  { id: 3, freeShort: "Free access",
    type: "Government special library",
    name: "NAMRIA Library and Documentation Services", city: "Taguig",
    address: "NAMRIA Main Office, Lawton Avenue, Fort Andres Bonifacio, Taguig City",
    hours: "Mon–Fri · 8:00 AM–5:00 PM; closed on public holidays",
    free: "Yes",
    amenities: "Specialized maps, geographic information, and research materials",
    tags: ["Special collection"],
    note: "A government special library focused on mapping and geographic resources.",
    source: "",
    emoji: "🗺️", hue: 150 },

  /* ---------- PASIG ---------- */
  { id: 4, freeShort: "Free (some special services may charge)",
    type: "City public library",
    name: "Pasig City Library and Learning Resource Center", city: "Pasig",
    address: "Caruncho Avenue, Barangay San Nicolas, Pasig City",
    hours: "Mon–Fri · 8:00 AM–5:00 PM (listed library sections)",
    free: "Yes for public library services; some special services may have separate charges",
    amenities: "Children’s section, high school section, college library, Filipiniana section, and Science Discovery Centrum",
    tags: ["Children’s section", "Special collection"],
    note: "The library’s published information lists its different sections and weekday operating hours.",
    source: "pasigcitylibrary.wordpress.com",
    emoji: "🔬", hue: 260 },

  { id: 5, freeShort: "Free access",
    type: "Barangay reading center",
    name: "Ugong Barangay Library", city: "Pasig",
    address: "Purok 2, C. Santos Street, Barangay Ugong, Pasig City",
    hours: "Check before visiting",
    free: "Yes — barangay reading center",
    amenities: "Reading resources; other amenities should be confirmed",
    tags: ["Reading space"],
    note: "Listed in the National Library’s public library directory.",
    source: "National Library of the Philippines",
    emoji: "📚", hue: 15 },

  { id: 6, freeShort: "Free access",
    type: "Public reading and book-sharing space",
    name: "The Podium Book Nook", city: "Pasig",
    address: "Ortigas Center, Pasig City",
    hours: "Daily · 10:00 AM–10:00 PM",
    free: "Yes",
    amenities: "Reading space and book browsing/exchange",
    tags: ["Reading space", "Book sharing"],
    note: "A public walk-in reading and book-sharing space inside a mall.",
    source: "",
    emoji: "🛍️", hue: 320 },

  /* ---------- MAKATI ---------- */
  { id: 7, freeShort: "Free to browse, no card needed",
    type: "Community library",
    name: "Reading Club 2000", city: "Makati",
    address: "1454 Balagtas Street, Makati City",
    hours: "Check before visiting",
    free: "Yes — no membership, library card, or ID is required to browse the books",
    amenities: "Large collection of freely available books and a community book-sharing space",
    tags: ["Book sharing"],
    note: "Describes itself as a free-for-all community library with a unique borrow-and-return or keep-a-book concept.",
    source: "readingclub2000.com",
    emoji: "🔄", hue: 45 },

  { id: 8, freeShort: "Free access",
    type: "Community book-sharing space",
    name: "The Public Book Box", city: "Makati",
    address: "Rada Street entrance, Union Church of Manila, Legazpi Village, Makati City",
    hours: "Outdoor book-sharing space; check before visiting",
    free: "Yes",
    amenities: "Free book browsing and community book exchange",
    tags: ["Book sharing"],
    note: "“Take a book, leave a book.” A community book-sharing space connected with the Union Church of Manila Library.",
    source: "The Library at UCM",
    emoji: "📦", hue: 20 },

  { id: 9, freeShort: "Free to read and study",
    type: "Church community library",
    name: "The Library at UCM", city: "Makati",
    address: "Union Church of Manila, Rada Street corner Legazpi Street, Legazpi Village, Makati City",
    hours: "Wed 9 AM–6 PM · Thu–Sat 9 AM–5 PM · Sun 10 AM–1 PM",
    free: "Reading and studying are allowed without a library card; borrowing books and Wi-Fi access require membership",
    amenities: "Reading and study spaces; Wi-Fi for eligible members; book collection",
    tags: ["Reading space", "Study space", "Wi-Fi"],
    wifi: "Members only (eligible members)",
    note: "Publishes its current schedule and visitor guidelines on its official website. Wi-Fi is for eligible members only.",
    source: "The Library at UCM",
    emoji: "⛪", hue: 220 },

  /* ---------- ANTIPOLO ---------- */
  { id: 10, freeShort: "Free access",
    type: "City public library",
    name: "Antipolo City Library", city: "Antipolo",
    address: "257 San Jose Street, Antipolo City, Rizal",
    hours: "Check before visiting",
    free: "Yes — public library",
    amenities: "Reading and study space; book resources",
    tags: ["Reading space", "Study space"],
    note: "A local government public library.",
    source: "",
    emoji: "🌄", hue: 120 },

  { id: 11, freeShort: "Check visitor requirements",
    type: "Community library",
    name: "Kiwanis Club of Antipolo Community Library", city: "Antipolo",
    address: "P. Oliveros Street, Antipolo City, Rizal",
    hours: "Mon–Fri · 8:30 AM–5:00 PM",
    free: "Community library; check visitor requirements before visiting",
    amenities: "Reading and study space; other services should be confirmed",
    tags: ["Reading space", "Study space"],
    note: "Public listings show weekday operating hours for this community library.",
    source: "",
    emoji: "🤝", hue: 190 },

  { id: 12, freeShort: "Free access",
    type: "Community book-sharing spot",
    name: "Antipolo City Book Barter", city: "Antipolo",
    address: "Sumulong Park area, M.L. Quezon Street, Antipolo City",
    hours: "Located in a public park; check before visiting",
    free: "Yes",
    amenities: "Outdoor reading and community book-sharing",
    tags: ["Reading space", "Book sharing"],
    note: "A small community book-sharing spot in Antipolo.",
    source: "",
    emoji: "🌳", hue: 100 }
];

// Filter chips shown on the page. Each must match a word used in `tags` above.
const AMENITY_OPTIONS = ["Reading space", "Study space", "Wi-Fi", "Book sharing", "Computers", "Children’s section", "Special collection"];
