/**
 * =======================================================================
 * VINEETH & ALIDA — WEDDING RECEPTION INVITATION CONFIGURATION
 * =======================================================================
 * This file is the single source of truth for all wedding details.
 * To customize the invitation, simply update the values below.
 * Beginners: You do NOT need to edit any React code to change details!
 */

export interface CoupleProfile {
  name: string;
  fullName: string;
  title: string;
  familyNote: string;
  oneLiner?: string;
  portrait: string;
  originCity: string;
}

export interface WeddingConfig {
  couple: {
    groom: CoupleProfile;
    bride: CoupleProfile;
    monogram: string;
    combinedNames: string;
    hashtag?: string;
    // Tasteful travel micro-detail
    originJourney?: {
      from: string;
      to: string;
      note: string;
    };
  };

  family: {
    invitationHeadline: string;
    invitationMessage: string;
    warmClosing: string;
    hosts: string[];
  };

  reception: {
    badge: string;
    title: string;
    subtitle: string;
    // Set to your planned reception date & time (ISO format: YYYY-MM-DDTHH:mm:ss)
    // Note: If you don't know the exact date yet, keep this placeholder or adjust.
    isoDateTime: string;
    formattedDate: string;
    formattedDay: string;
    formattedTime: string;
    timeZone: string;
    venueName: string;
    venueHall?: string;
    fullAddress: string;
    city: string;
    googleMapsUrl: string;
    googleMapsEmbedQuery?: string;
    calendarDetails: {
      title: string;
      description: string;
      location: string;
    };
  };

  photos: {
    heroPortrait: string;
    moments: Array<{
      id: string;
      url: string;
      caption: string;
      subtitle?: string;
    }>;
  };

  wishes: {
    enabled: boolean;
    whatsappNumber: string; // e.g. "919876543210" (international format without + or spaces)
    defaultRecipientName: string;
    presetMessages: string[];
  };

  audio: {
    enabled: boolean;
    filePath: string;
    trackTitle: string;
    artist?: string;
  };

  guestPersonalization: {
    enabled: boolean;
    fallbackGreeting: string;
    greetingTemplate: (guestName: string) => string;
  };

  metadata: {
    siteTitle: string;
    siteDescription: string;
    ogImage: string;
    themeColor: string;
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: "Vineeth",
      fullName: "Vineeth",
      title: "The Groom",
      familyNote: "Son of Mr. & Mrs. Family",
      oneLiner: "Balancing life's ledger with joy, heart & humor",
      portrait: "/images/groom-vineeth.jpg",
      originCity: "Dubai",
    },
    bride: {
      name: "Alida",
      fullName: "Alida",
      title: "The Bride",
      familyNote: "Daughter of Mr. & Mrs. Family",
      oneLiner: "Advocating for endless love, laughter & forever",
      portrait: "/images/bride-alida.jpg",
      originCity: "Kerala",
    },
    monogram: "V & A",
    combinedNames: "Vineeth & Alida",
    hashtag: "#VineethWedsAlida",
    originJourney: {
      from: "Dubai",
      to: "Kerala",
      note: "Coming home to celebrate our beginning",
    },
  },

  family: {
    invitationHeadline: "Together with our families",
    invitationMessage:
      "We cordially invite you to join us for an evening of celebration, joyful laughter, and dinner as we celebrate the wedding reception of Vineeth & Alida.",
    warmClosing: "With love, prayers, and heartfelt anticipation",
    hosts: ["The Parents & Family of Vineeth", "The Parents & Family of Alida"],
  },

  reception: {
    badge: "The Wedding Reception",
    title: "Grand Evening Reception",
    subtitle: "A celebratory evening of music, dining, and blessings",
    // Planned date for the reception (Change to your exact confirmed reception date/time)
    isoDateTime: "2026-11-29T18:00:00+05:30",
    formattedDate: "Sunday, 29 November 2026",
    formattedDay: "Sunday Evening",
    formattedTime: "6:00 PM Onwards",
    timeZone: "Asia/Kolkata",
    venueName: "The Grand Pavilion",
    venueHall: "Imperial Banquet Hall",
    fullAddress: "The Grand Pavilion, Marine Drive Road, Kochi, Kerala 682011",
    city: "Kochi, Kerala",
    // Replace with exact Google Maps URL when ready
    googleMapsUrl: "https://maps.google.com/?q=The+Grand+Pavilion+Kochi+Kerala",
    calendarDetails: {
      title: "Wedding Reception of Vineeth & Alida",
      description: "Join Vineeth and Alida for an evening of joy, dining, and celebration at their wedding reception.",
      location: "The Grand Pavilion, Marine Drive Road, Kochi, Kerala 682011",
    },
  },

  photos: {
    heroPortrait: "/images/hero-couple.jpg",
    moments: [
      {
        id: "moment-1",
        url: "/images/moment-1.jpg",
        caption: "The Journey Begins",
        subtitle: "Two worlds meeting with grace",
      },
      {
        id: "moment-2",
        url: "/images/moment-2.jpg",
        caption: "A Shared Smile",
        subtitle: "Laughter in every conversation",
      },
      {
        id: "moment-3",
        url: "/images/moment-3.jpg",
        caption: "Together in Love",
        subtitle: "Counting down to forever",
      },
    ],
  },

  wishes: {
    enabled: true,
    // Replace with the couple's or coordinator's actual WhatsApp phone number (with country code, no + or spaces)
    whatsappNumber: "919876543210",
    defaultRecipientName: "Vineeth & Alida",
    presetMessages: [
      "Wishing you a lifetime of endless love, joyful laughter, and abundant blessings!",
      "Congratulations Vineeth & Alida! So thrilled to celebrate your special evening with you!",
      "May your new journey together be filled with harmony, prosperity, and happiness!",
      "Heartfelt congratulations! Sending all our prayers and warmest love to both families!",
    ],
  },

  audio: {
    enabled: true,
    filePath: "/audio/wedding-bgm.mp3",
    trackTitle: "Romantic Acoustic Celebration",
    artist: "Wedding Melodies",
  },

  guestPersonalization: {
    enabled: true,
    fallbackGreeting: "Cordially Welcoming You & Your Family",
    greetingTemplate: (guestName: string) => `Cordially Welcoming ${guestName}`,
  },

  metadata: {
    siteTitle: "Vineeth & Alida — Wedding Reception Invitation",
    siteDescription:
      "Together with their families, Vineeth and Alida warmly invite you to celebrate their wedding reception.",
    ogImage: "/images/og-wedding.jpg",
    themeColor: "#315B4B",
  },
};
