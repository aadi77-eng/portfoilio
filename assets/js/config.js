/**
 * ====================================================================
 * DEEPAK AHER — PORTFOLIO CONFIGURATION & OWNER SETTINGS
 * ====================================================================
 * All editable personal details, contact verification toggles,
 * event categories, and integration keys are maintained here.
 * Modify this file to update information across the entire website.
 */

const SITE_CONFIG = {
  // --- Personal & Brand Identity ---
  brand: {
    fullName: "Deepak Bansi Aher",
    displayName: "Deepak Aher",
    wordmark: "Deepak Aher",
    monogram: "DA",
    title: "Professional Anchor & Event Host",
    eyebrow: "PROFESSIONAL ANCHOR • EVENT HOST",
    heroHeadline: "Let’s Create Magic Moments Together!",
    heroMarathi: "तुमच्या प्रत्येक सोहळ्याला दर्जेदार सूत्रसंचालनाची साथ!",
    heroDescription:
      "Bringing energy, elegance and emotion to every stage. From weddings and family celebrations to corporate events, I aim to make every occasion engaging, memorable and special.",
    location: "Nashik, Maharashtra, India (Available Statewide)",
    languages: ["Marathi (मराठी)", "Hindi (हिंदी)", "English"],
  },

  // --- Contact Information & Verification Controls ---
  // Verified telephone & WhatsApp number from authentic event poster: 8888842142.
  // Active for direct calling (tel:) and WhatsApp (wa.me) integrations.
  contact: {
    isPhoneConfirmed: true,
    phonePosterNumber: "8888842142",
    formattedPhone: "+91 88888 42142",
    telNumber: "+918888842142",
    
    // Configurable WhatsApp target number (international format digits only, no +, spaces, or dashes)
    // Uses official poster number 8888842142 prefixed with India country code 91.
    whatsappNumber: "918888842142",
    isWhatsAppConfirmed: true,
    email: "contact@deepakaher.com", // Owner email placeholder
    isEmailConfirmed: false,
    
    // Verified Social Profiles from official posters
    social: {
      instagramHandle1: "aher_sirr",
      instagramUrl1: "https://www.instagram.com/aher_sirr",
      instagramHandle2: "fit_anchor_deepak_aher",
      instagramUrl2: "https://www.instagram.com/fit_anchor_deepak_aher",
      youtubeUrl: "", // Will be populated once verified
      facebookUrl: "",
    },

    // Backend form integration target:
    // Supported options: 'formspree', 'emailjs', 'custom_webhook', 'local_demo'
    formEndpointType: "local_demo", 
    formspreeEndpoint: "", // e.g. "https://formspree.io/f/your_form_id"
    emailjsConfig: {
      serviceId: "",
      templateId: "",
      publicKey: "",
    },
  },

  // --- Authentic Media & Newspaper Coverage ---
  mediaCoverage: {
    publication: "दैनिक युवक आधार (Dainik Yuvak Aadhar)",
    date: "26 July 2026",
    headline: "गुरूंचा सन्मान म्हणजे संस्कारांचा सन्मान!",
    subheadline: "स्टार प्रवाहच्या 'गुरुवंदन सोहळ्यात' शिक्षक श्री. दीपक आहेर यांचा हृदयस्पर्शी गौरव",
    event: "स्टार प्रवाह 'गुरुवंदन सोहळा' (Guruvandan Sohala, Mumbai)",
    presenters: "ज्येष्ठ अभिनेते अविनाश नारकर व अभिनेत्री ऐश्वर्या नारकर",
    schoolAffiliation: "श्री डी. आर. भोसले माध्यमिक व उच्च माध्यमिक विद्यालय, देवगाव (निफाड, नाशिक)",
    clippingImage: "assets/images/j10.png",
    photoImage: "assets/images/j9.png",
  },

  // --- Anchoring Events & Services ---
  events: [
    {
      id: "wedding",
      titleEn: "Wedding Ceremonies",
      titleMr: "लग्न सोहळा",
      icon: "rings",
      shortDesc: "Traditional rituals guidance, emotional varmala hosting, and joyous celebratory moments for the couple and families.",
    },
    {
      id: "engagement",
      titleEn: "Engagement Ceremonies",
      titleMr: "साखरपुडा सोहळा",
      icon: "gem",
      shortDesc: "Welcoming both families with warmth, graceful ring exchange ceremony hosting, and lively family interactions.",
    },
    {
      id: "birthday",
      titleEn: "Birthday Parties",
      titleMr: "वाढदिवस सोहळा",
      icon: "cake",
      shortDesc: "Fun-filled stage games, high-spirited cake cutting coordination, and engaging entertainment across all age groups.",
    },
    {
      id: "sangeet",
      titleEn: "Sangeet Ceremonies",
      titleMr: "संगीत सेरेमनी",
      icon: "music",
      shortDesc: "Electrifying dance performance cues, playful family banter, and vibrant musical coordination that rocks the floor.",
    },
    {
      id: "retirement",
      titleEn: "Retirement Functions",
      titleMr: "सेवापूर्ती / सेवानिवृत्ती सोहळा",
      icon: "award",
      shortDesc: "Dignified, touching tribute honoring dedicated service, milestones, heartfelt speeches, and memorable reminiscence.",
    },
    {
      id: "corporate",
      titleEn: "Corporate Events",
      titleMr: "कंपनी व कॉर्पोरेट फंक्शन्स",
      icon: "briefcase",
      shortDesc: "Punctual, structured presentation for annual general meetings, corporate award nights, and product unveilings.",
    },
    {
      id: "inauguration",
      titleEn: "Inauguration Ceremonies",
      titleMr: "उद्घाटन सोहळा",
      icon: "ribbon",
      shortDesc: "Prestigious ribbon-cutting, ceremonial lamp lighting protocol, dignitary introductions, and grand keynote moderation.",
    },
    {
      id: "school",
      titleEn: "School Gatherings",
      titleMr: "शालेय स्नेहसंमेलन",
      icon: "school",
      shortDesc: "Vibrant annual gathering anchoring, student stage talent presentations, and encouraging prize distribution flow.",
    },
    {
      id: "college",
      titleEn: "College Gatherings",
      titleMr: "कॉलेज गॅदरिंग",
      icon: "graduation",
      shortDesc: "High-voltage youth energy, cultural festivals, personality pageants, and dynamic stage crowd interaction.",
    },
    {
      id: "baby_shower",
      titleEn: "Baby Shower / Dohale Jevan",
      titleMr: "डोहाळे जेवण सोहळा",
      icon: "lotus",
      shortDesc: "Traditional Maharashtrian Dohale Jevan customs, poetic Ovi recitation, cheerful traditional games, and blessings.",
    },
    {
      id: "special_events",
      titleEn: "Other Special Events",
      titleMr: "इतर विशेष कार्यक्रम",
      icon: "sparkles",
      shortDesc: "Cultural celebrations, felicitation evenings, public assemblies, and bespoke celebrations crafted to your theme.",
    },
  ],

  // --- Authentic Gallery Items ---
  gallery: [
    {
      id: "gal-1",
      title: "Regal Stage Hosting Attire",
      marathiTitle: "राजेशाही शेरवानी सादरीकरण",
      category: "stage",
      image: "assets/images/j1.jpg",
      caption: "Deepak Aher anchoring with poise, cue cards in hand, for grand traditional weddings and cultural ceremonies.",
      isAuthentic: true,
    },
    {
      id: "gal-2",
      title: "Contemporary Formal Anchoring",
      marathiTitle: "आधुनिक फॉर्मल अँकरिंग",
      category: "stage",
      image: "assets/images/j2.png",
      caption: "Anchoring high-energy ceremonies in tailored royal navy suit with charismatic stage poise.",
      isAuthentic: true,
    },
    {
      id: "gal-3",
      title: "Wedding Host Vibes at Ramsons Empire",
      marathiTitle: "विवाह सोहळा सूत्रसंचालन - रॅमसन एम्पायर",
      category: "stage",
      image: "assets/images/j3.jpg",
      caption: "Hosting with panache and vibrant energy at Ramsons Empire, orchestrating grand wedding receptions and family celebrations.",
      isAuthentic: true,
    },
    {
      id: "gal-4",
      title: "Live Stage Crowd Engagement",
      marathiTitle: "थेट मंचावरील उत्स्फूर्त संवाद",
      category: "stage",
      image: "assets/images/j4.jpg",
      caption: "Radiating warmth and joyful stage presence, engaging guests with spontaneous humor and seamless ceremony coordination.",
      isAuthentic: true,
    },
    {
      id: "gal-5",
      title: "Institutional & Cultural Ceremonies",
      marathiTitle: "शालेय व संस्थात्मक सोहळे",
      category: "stage",
      image: "assets/images/j5.jpg",
      caption: "Poised, formal anchoring in sharp suit and badge for school gatherings, college festivals, and ceremonial inaugurations.",
      isAuthentic: true,
    },
    {
      id: "gal-6",
      title: "Magic Moments Celebration Poster",
      marathiTitle: "मॅजिक मोमेंट्स सूत्रसंचालन पोस्टर",
      category: "posters",
      image: "assets/images/j6.png",
      caption: "High-resolution official creative detailing 11 event categories and core anchoring values for memorable celebrations.",
      isAuthentic: true,
    },
    {
      id: "gal-7",
      title: "Anchoring with Excellence Poster",
      marathiTitle: "उत्कृष्ट सूत्रसंचालन अधिकृत पोस्टर",
      category: "posters",
      image: "assets/images/j7.png",
      caption: "Official feature creative presenting wedding, engagement, birthday, baby shower, and special celebration hosting services.",
      isAuthentic: true,
    },
    {
      id: "gal-8",
      title: "Signature Anchor Feature Poster",
      marathiTitle: "अधिकृत सूत्रसंचालक पोस्टर",
      category: "posters",
      image: "assets/images/j8.png",
      caption: "Official announcement poster highlighting state-wide hosting experience and signature presentation quality.",
      isAuthentic: true,
    },
    {
      id: "gal-9",
      title: "Star Pravah Guruvandan Felicitation",
      marathiTitle: "स्टार प्रवाह 'गुरुवंदन सोहळा' सन्मान",
      category: "press",
      image: "assets/images/j9.png",
      caption: "State-level honor presented by renowned Marathi cinema actors Avinash Narkar and Aishwarya Narkar in Mumbai.",
      isAuthentic: true,
    },
    {
      id: "gal-10",
      title: "Dainik Yuvak Aadhar Press Coverage",
      marathiTitle: "दैनिक युवक आधार वृत्तपत्र बातमी",
      category: "press",
      image: "assets/images/j10.png",
      caption: "Full unedited published news article on July 26, 2026 (Mumbai) documenting state-level felicitation.",
      isAuthentic: true,
    },
  ],
};

// Freeze configuration to prevent inadvertent runtime mutations
if (typeof Object.freeze === "function") {
  Object.freeze(SITE_CONFIG);
}

// Attach to window and module.exports
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
