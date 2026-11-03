/**
 * CENTRALIZED WEDDING DATA CONFIGURATION
 * Wedding: KRITIKA WEDS ASHISH
 * Venue: P.S. Baag Marriage Garden, Jhotwara, Jaipur
 * Date: 25 November 2026 — Barat Swagat 7:00 PM IST
 *
 * Source: the printed Chouhan Parivar invitation card.
 * Haldi / Mehendi dates and times are NOT printed on that card, so they
 * are shown here as wedding-week celebrations with no invented date/time.
 * Set their dateStr/displayDate once the family confirms them.
 */

export interface VenueContact {
  role: string;
  name: string;
  phone: string;
  formattedPhone: string;
}

export interface Ceremony {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  hindiTagline?: string;
  dateStr: string; // ISO date for calculation (YYYY-MM-DD)
  displayDate: string;
  time?: string; // Optional time; if undefined or empty, shows "समय शीघ्र साझा किया जाएगा / Time to be announced"
  timeGracefulLabel: string;
  venueName: string;
  venueAddress: string;
  description: string;
  image: string;
  accentColor: string;
  badgeText: string;
  directionsUrl: string;
  baraatAnnouncement?: {
    hindiText: string;
    englishText: string;
  };
}

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  coupleInitials: string;
  monogram: string;
  eyebrow: string;
  subtitle: string;
  hindiSubtitle: string;
  weddingBlessing: string;
  divineBlessingHeading: string;
  divineBlessingText: string;
  divineBlessingMantra: string;
  ganeshBlessing: {
    heading: string;
    subheading: string;
    shloka: string;
    hindiText: string;
    image: string;
  };
  audio: {
    trackTitle: string;
    sourceUrl: string;
    fallbackUrl?: string;
  };
  weddingDateTime: string; // ISO format with timezone
  weddingTimezone: string; // Asia/Kolkata
  formattedWeddingDate: string;
  cityLocation: string;
  venue: {
    name: string;
    description: string;
    addressHindi: string;
    addressEnglish: string;
    city: string;
    state: string;
    pincode: string;
    mapQuery: string;
    mapEmbedUrl: string;
    directionsUrl: string;
    contacts: VenueContact[];
  };
  familyContacts: string[];
  story: {
    heading: string;
    hindiHeading: string;
    supportingText: string;
    hindiSupportingText: string;
    welcomeMessage: string;
    images: {
      hands: string;
      varmala: string;
    };
  };
  ceremonies: Ceremony[];
  rsvp: {
    coupleWhatsAppPhone?: string;
    displayWhatsAppPhone?: string;
    prefilledMessage: string;
  };
  footerWhatsAppPhone?: string;
  footerDisplayWhatsAppPhone?: string;
  closingQuote: string;
  hindiClosing: string;
  closingFamilyNote: string;
}

const realWeddingData: WeddingConfig = {
  groomName: "Ashish",
  brideName: "Kritika",
  coupleInitials: "K & A",
  monogram: "K ✤ A",
  eyebrow: "CHOUHAN PARIVAR KA SNEHPOORN NIMANTRAN",
  subtitle: "Two families, one beautiful beginning — in Jaipur.",
  hindiSubtitle: "चौहान परिवार का स्नेहपूर्ण निमंत्रण।",
  weddingBlessing: "॥ श्री गणेशाय नमः ॥",
  divineBlessingHeading: "WITH DIVINE BLESSINGS",
  divineBlessingText: "श्री हनुमान जी, माता शाकम्भरी जी, नाहरसिंह बाबा एवं काला गौरा भैरू जी की असीम अनुकम्पा से।",
  divineBlessingMantra: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
  // Countdown Target: 25 November 2026, 19:00 Asia/Kolkata (Barat Swagat)
  weddingDateTime: "2026-11-25T19:00:00+05:30",
  weddingTimezone: "Asia/Kolkata",
  formattedWeddingDate: "Wednesday, 25th November 2026",
  cityLocation: "Jaipur, Rajasthan",
  venue: {
    name: "P.S. BAAG MARRIAGE GARDEN",
    description: "Marriage Garden • Jhotwara, Jaipur",
    addressHindi: "गोपी नगर, नौ दुकान, कालवाड़ रोड़, राधा गोविन्द ज्यूस वाली गली से अन्दर, झोटवाड़ा, जयपुर",
    addressEnglish: "Gopi Nagar, 9 Dukan, Kalwad Road, Radha Govind Juice wali gali se andar, Jhotwara, Jaipur, Rajasthan, India",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "",
    mapQuery: "P.S. Baag Marriage Garden Gopi Nagar Kalwad Road Jhotwara Jaipur",
    mapEmbedUrl: "https://maps.google.com/maps?q=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur",
    contacts: [
      { role: "Chouhan Parivar", name: "Hanuman Sahay Chouhan", phone: "9166652239", formattedPhone: "+91 91666 52239" },
      { role: "Chouhan Parivar", name: "Chouhan Parivar", phone: "7014917472", formattedPhone: "+91 70149 17472" },
    ],
  },
  familyContacts: ["9166652239", "7014917472"],
  ganeshBlessing: {
    heading: "॥ श्री गणेशाय नमः ॥",
    subheading: "With the blessings of Lord Ganesha",
    shloka: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    hindiText: "श्री हनुमान जी, माता शाकम्भरी जी, नाहरसिंह बाबा एवं काला गौरा भैरू जी की असीम अनुकम्पा से श्रीमती रुकमणि देवी एवं श्री हनुमान सहाय चौहान अपनी सुपुत्री के मंगल परिणोत्सव पर आपको सस्नेह सादर आमंत्रित करते हैं।",
    image: "/images/ganesh.jpg",
  },
  audio: {
    trackTitle: "Peaceful Krishna Flute Instrumental",
    sourceUrl: "/audio/Krishna%20Flute.mp3",
    fallbackUrl: "/audio/krishna-flute.mp3",
  },
  story: {
    heading: "THE BEGINNING OF FOREVER",
    hindiHeading: "एक नए सफर की शुरुआत",
    supportingText: "Some moments bring families closer, hearts together, and a beautiful new chapter to life. With the blessings of our loved ones, we invite you to celebrate the beginning of our forever.",
    hindiSupportingText: "अपनों के स्नेह और बड़ों के आशीर्वाद के साथ, हम अपने जीवन के इस नए अध्याय की शुरुआत करने जा रहे हैं। हमारी खुशियों के इस खास अवसर पर आपकी उपस्थिति और शुभकामनाएँ हमारे लिए अनमोल हैं।",
    welcomeMessage: "Shrimati Rukmani Devi and Shri Hanuman Sahay Chouhan, with the Chouhan Parivar, invite you to the Mangal Parinotsav of their daughter Kritika (Gungun) with Ashish.",
    images: { hands: "/images/story_hands.jpg", varmala: "/images/story_varmala.jpg" },
  },
  ceremonies: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      hindiName: "हल्दी रस्म",
      tagline: "Golden Moments, Joyful Beginnings",
      hindiTagline: "हल्दी की खुशियों और अपनों के साथ एक मंगलमय शुरुआत।",
      dateStr: "2026-11-25",
      displayDate: "Wedding week, Jaipur — date to be announced",
      time: undefined,
      timeGracefulLabel: "समय शीघ्र साझा किया जाएगा (Time to be announced)",
      venueName: "Jaipur",
      venueAddress: "Chouhan Parivar, Jhotwara, Jaipur",
      description: "An auspicious ceremony of golden turmeric, fragrant blossoms, laughter, and blessings as we begin our wedding festivities.",
      image: "/images/haldi.jpg",
      accentColor: "#D49024",
      badgeText: "AUSPICIOUS RITUAL",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur",
    },
    {
      id: "mehendi",
      name: "Mehendi Ceremony",
      hindiName: "मेहंदी उत्सव",
      tagline: "Little Details, Beautiful Memories",
      hindiTagline: "हाथों में मेहंदी, दिल में खुशियाँ और साथ अपनों का।",
      dateStr: "2026-11-25",
      displayDate: "Wedding week, Jaipur — date to be announced",
      time: undefined,
      timeGracefulLabel: "समय शीघ्र साझा किया जाएगा (Time to be announced)",
      venueName: "Jaipur",
      venueAddress: "Chouhan Parivar, Jhotwara, Jaipur",
      description: "A joyous celebration adorned with intricate henna art, cheerful melodies, festive colors, and cherished moments with loved ones.",
      image: "/images/mehendi.jpg",
      accentColor: "#4E6B56",
      badgeText: "HENNA & CELEBRATION",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur",
    },
    {
      id: "wedding",
      name: "Shaadi / Wedding",
      hindiName: "शुभ विवाह",
      tagline: "The Day Our Forever Begins",
      hindiTagline: "शुभ विवाह — दो जीवन, एक खूबसूरत सफर।",
      dateStr: "2026-11-25",
      displayDate: "25 November 2026",
      time: "7:00 PM — Barat Swagat",
      timeGracefulLabel: "सायं 07:00 बजे (Barat Swagat)",
      venueName: "P.S. Baag Marriage Garden",
      venueAddress: "Gopi Nagar, Kalwad Road, Jhotwara, Jaipur",
      description: "Barat Swagat at 7:00 PM, Pritibhoj from 6:00 PM, and Panigrahan Sanskar at the Shubh Lagna — the sacred union where two souls pledge seven eternal vows.",
      image: "/images/wedding.jpg",
      accentColor: "#702D43",
      badgeText: "THE SACRED PHERAS",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur",
      baraatAnnouncement: {
        hindiText: "बारात स्वागत बुधवार, 25 नवम्बर 2026 को सायं 7 बजे, पी.एस. बाग मैरिज गार्डन, गोपी नगर, झोटवाड़ा, जयपुर में होगा।",
        englishText: "Barat Swagat on Wednesday, 25 November 2026 at 7:00 PM at P.S. Baag Marriage Garden, Gopi Nagar, Jhotwara, Jaipur.",
      },
    },
    {
      id: "vidai",
      name: "Vidai Ceremony",
      hindiName: "विदाई समारोह",
      tagline: "New Beginnings, Endless Blessings",
      hindiTagline: "नई राहों पर खुशियों और आशीर्वाद के साथ।",
      dateStr: "2026-11-25",
      displayDate: "25 November 2026 (night, after the ceremony)",
      time: "After Panigrahan Sanskar",
      timeGracefulLabel: "पाणिग्रहण संस्कार के पश्चात्",
      venueName: "P.S. Baag Marriage Garden",
      venueAddress: "Gopi Nagar, Kalwad Road, Jhotwara, Jaipur",
      description: "A tender, heartfelt moment of new beginnings and fond embraces, accompanied by the unconditional blessings of parents and family.",
      image: "/images/vidai.jpg",
      accentColor: "#B27382",
      badgeText: "A GRACEFUL FAREWELL",
      directionsUrl: "https://www.google.com/maps/search/?api=1&query=P.S.+Baag+Marriage+Garden+Gopi+Nagar+Kalwad+Road+Jhotwara+Jaipur",
    },
  ],
  rsvp: {
    coupleWhatsAppPhone: "919166652239",
    displayWhatsAppPhone: "+91 91666 52239",
    prefilledMessage: "Namaste! Main Kritika aur Ashish ki shaadi — 25 Nov 2026, Jaipur — ke invitation ke sambandh mein sampark kar raha/rahi hoon.",
  },
  footerWhatsAppPhone: "918279050569",
  footerDisplayWhatsAppPhone: "+91 82790 50569",
  closingQuote: "Together, always and forever.",
  hindiClosing: "आपका स्नेह और आशीर्वाद हमारे लिए अनमोल है।",
  closingFamilyNote: "With love, blessings, and warm regards from the Chouhan Parivar.",
};


// --- Routes ---------------------------------------------------------------
// Main route (/) shows DEMO data with a demo mobile number.
// The real Kritika-Ashish copy lives only on /kritika-ashish (and /real).
// Components all import `weddingData`, so this single switch moves the
// whole site between demo and real without touching any component.
export function isRealRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/$/, '');
  return path === '/kritika-ashish' || path === '/real' || path.startsWith('/kritika-ashish/') || path.startsWith('/real/');
}

const demoWeddingData: WeddingConfig = {
  ...realWeddingData,
  groomName: "Demo Groom",
  brideName: "Demo Bride",
  coupleInitials: "D & D",
  monogram: "D \u2724 D",
  eyebrow: "DEMO PARIVAR KA SNEHPOORN NIMANTRAN",
  subtitle: "Two families, one beautiful beginning — in Demo City.",
  hindiSubtitle: "डेमो परिवार का स्नेहपूर्ण निमंत्रण।",
  divineBlessingText: "With the blessings of our loved ones.",
  venue: {
    ...realWeddingData.venue,
    name: "DEMO MARRIAGE GARDEN",
    description: "Marriage Garden \u2022 Demo City",
    addressHindi: "डेमो नगर, डेमो रोड, डेमो सिटी",
    addressEnglish: "Demo Nagar, Demo Road, Demo City, India",
    city: "Demo City",
    mapQuery: "Demo Marriage Garden Demo City",
    mapEmbedUrl: "https://maps.google.com/maps?q=Demo+Marriage+Garden+Demo+City&t=&z=15&ie=UTF8&iwloc=&output=embed",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Demo+Marriage+Garden+Demo+City",
    contacts: [
      { role: "Demo Parivar", name: "Demo Parivar", phone: "9999999999", formattedPhone: "+91 99999 99999" },
    ],
  },
  familyContacts: ["9999999999"],
  cityLocation: "Demo City",
  story: {
    ...realWeddingData.story,
    welcomeMessage: "Demo Parivar invites you to the wedding of Demo Bride with Demo Groom.",
    images: { hands: "/images/demo/demo-wedding-couple.jpg", varmala: "/images/demo/demo-varmala.jpg" },
  },
  ceremonies: realWeddingData.ceremonies.map((c) => ({
    ...c,
    venueName: "Demo City",
    venueAddress: "Demo Parivar, Demo City",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Demo+Marriage+Garden+Demo+City",
    image:
      c.id === "haldi" ? "/images/demo/demo-haldi.jpg"
      : c.id === "mehendi" ? "/images/demo/demo-mehendi.jpg"
      : c.id === "wedding" ? "/images/demo/demo-wedding-couple.jpg"
      : c.id === "vidai" ? "/images/demo/demo-varmala.jpg"
      : c.image,
  })),
  rsvp: {
    ...realWeddingData.rsvp,
    coupleWhatsAppPhone: "919999999999",
    displayWhatsAppPhone: "+91 99999 99999",
    prefilledMessage: "Namaste! Main Demo Bride aur Demo Groom ki shaadi ke invitation ke sambandh mein sampark kar raha/rahi hoon.",
  },
  footerWhatsAppPhone: "919999999999",
  footerDisplayWhatsAppPhone: "+91 99999 99999",
  closingFamilyNote: "With love, blessings, and warm regards from the Demo Parivar.",
};

export const weddingData: WeddingConfig = isRealRoute() ? realWeddingData : demoWeddingData;

export function getWeekdayName(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00Z`);
  return d.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
}
